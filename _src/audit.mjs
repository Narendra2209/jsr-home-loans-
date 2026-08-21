/**
 * Responsive audit - drives headless Chrome over every page at seven widths
 * and reports the two defects that are invisible on a desktop monitor:
 *
 *   1. horizontal overflow - the page scrolls sideways, which on a phone
 *      reads as "this site is broken" and nothing else
 *   2. touch targets under 24x24 CSS px - WCAG 2.2 SC 2.5.8
 *
 * It found both when it was written: a 48px overflow on every page at 768px
 * (iPad portrait), and 21 undersized controls on the home page alone, the
 * worst being the calculator sliders at 6px tall.
 *
 * This is a dev tool, not a build step. The site itself still has no runtime
 * dependencies and `python build.py` still needs nothing but the stdlib.
 * Install the driver ad hoc when you want to run it:
 *
 *     npm install puppeteer-core
 *     node _src/audit.mjs
 *
 * It drives the Chrome or Edge you already have; it does not download one.
 * Exits non-zero if anything overflows, so it can gate a deploy.
 */
import http from 'http';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

/* --- minimal PNG reader ---------------------------------------------------
 * Needed for the banner contrast check: the page banners put a heading over a
 * photograph, and the only honest way to know the contrast is to look at the
 * pixels the text actually covers. Node has zlib but no image decoder, and
 * pulling one in for ~60 lines of work is not worth a dependency.
 * Handles what Chrome emits for a screenshot: 8-bit, non-interlaced, RGB or
 * RGBA. Throws on anything else rather than quietly returning wrong colours.
 */
function decodePNG(input) {
  // Puppeteer returns a Uint8Array; the chunk walk below wants Buffer methods.
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error('not a PNG');
  let pos = 8, width = 0, height = 0, channels = 0;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      const depth = data[8], colorType = data[9], interlace = data[12];
      if (depth !== 8 || interlace !== 0 || (colorType !== 2 && colorType !== 6)) {
        throw new Error(`unsupported PNG: depth=${depth} color=${colorType} interlace=${interlace}`);
      }
      channels = colorType === 6 ? 4 : 3;
    } else if (type === 'IDAT') {
      idat.push(data);
    } else if (type === 'IEND') break;
    pos += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const out = Buffer.alloc(height * stride);
  let src = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[src++];
    const line = raw.subarray(src, src + stride); src += stride;
    const cur = out.subarray(y * stride, (y + 1) * stride);
    const prev = y ? out.subarray((y - 1) * stride, y * stride) : null;
    for (let i = 0; i < stride; i++) {
      const a = i >= channels ? cur[i - channels] : 0;
      const b = prev ? prev[i] : 0;
      const c = prev && i >= channels ? prev[i - channels] : 0;
      let v = line[i];
      if (filter === 1) v += a;
      else if (filter === 2) v += b;
      else if (filter === 3) v += (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        v += (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
      }
      cur[i] = v & 0xff;
    }
  }
  return { width, height, channels, data: out };
}

const toLinear = c => (c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
const luminance = (r, g, b) =>
  0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
const contrast = (l1, l2) =>
  (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
const parseRGB = css => {
  const n = css.slice(css.indexOf('(') + 1, css.indexOf(')')).split(',');
  return n.slice(0, 3).map(x => parseFloat(x));
};

const ROOT = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const WIDTHS = [360, 390, 768, 1024, 1280, 1440, 1920];

// Touch is emulated at and below this width. It matters: the touch-target
// rules are scoped to (pointer:coarse), so auditing without it silently
// measures the desktop rendering and reports failures that do not exist.
const TOUCH_AT_OR_BELOW = 768;

const MIN_TARGET = 24;      // SC 2.5.8, the normative minimum
const COMFORTABLE = 44;     // iOS/Android guideline, reported separately

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find(p => fs.existsSync(p));

if (!CHROME) {
  console.error('No Chrome or Edge found. Set the path in CHROME at the top of this file.');
  process.exit(2);
}

let puppeteer;
try {
  puppeteer = (await import('puppeteer-core')).default;
} catch {
  console.error('puppeteer-core is not installed. Run:  npm install puppeteer-core');
  process.exit(2);
}

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.xml': 'application/xml', '.txt': 'text/plain',
};

const server = http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/') rel = '/index.html';
  const file = path.join(ROOT, rel);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404);
    return res.end('not found');
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const PORT = server.address().port;

const pages = process.argv[2]
  ? process.argv[2].split(',')
  : fs.readdirSync(ROOT).filter(f => f.endsWith('.html')).map(f => f.slice(0, -5));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars', '--force-device-scale-factor=1'],
});

const overflows = [];
const undersized = [];

for (const name of pages) {
  const page = await browser.newPage();
  for (const width of WIDTHS) {
    const touch = width <= TOUCH_AT_OR_BELOW;
    await page.setViewport({ width, height: 900, hasTouch: touch, isMobile: touch });
    await page.goto(`http://127.0.0.1:${PORT}/${name}.html`, { waitUntil: 'networkidle0' });

    const result = await page.evaluate(({ MIN_TARGET, COMFORTABLE }) => {
      const de = document.documentElement;
      const vw = de.clientWidth;

      const over = [];
      if (de.scrollWidth > vw + 1) {
        for (const el of document.querySelectorAll('body *')) {
          const box = el.getBoundingClientRect();
          if (!box.width || !box.height) continue;
          if (box.right <= vw + 1) continue;
          if (getComputedStyle(el).position === 'fixed') continue;
          // An element wider than the viewport inside a deliberately
          // scrollable container (a rate table, say) is not a page defect.
          let holder = el, scrolls = false;
          while (holder && holder !== document.body) {
            if (/auto|scroll/.test(getComputedStyle(holder).overflowX)) { scrolls = true; break; }
            holder = holder.parentElement;
          }
          if (scrolls) continue;
          const cls = (el.className || '').toString().trim().split(/\s+/).filter(Boolean);
          over.push(`${el.tagName.toLowerCase()}${cls.length ? '.' + cls.slice(0, 2).join('.') : ''}`);
        }
      }

      const small = [];
      for (const el of document.querySelectorAll('a,button,input,select,[role=button]')) {
        const box = el.getBoundingClientRect();
        if (!box.width || !box.height) continue;
        // SC 2.5.8 exempts targets sitting in a run of text.
        if (getComputedStyle(el).display === 'inline') continue;
        if (box.height >= COMFORTABLE && box.width >= COMFORTABLE) continue;
        const cls = (el.className || '').toString().trim().split(/\s+/)[0] || '';
        // .5 of slack: getBoundingClientRect returns subpixel values and a
        // control laid out at exactly 24px can measure 23.6.
        small.push({
          id: `${el.tagName.toLowerCase()}${cls ? '.' + cls : ''}`,
          w: Math.round(box.width), h: Math.round(box.height),
          fails: box.height < MIN_TARGET - 0.5 || box.width < MIN_TARGET - 0.5,
        });
      }
      return { scrollW: de.scrollWidth, vw, over: [...new Set(over)].slice(0, 6), small };
    }, { MIN_TARGET, COMFORTABLE });

    if (result.scrollW > result.vw + 1) {
      overflows.push({ name, width, by: result.scrollW - result.vw, culprits: result.over });
    }
    for (const t of result.small.filter(t => t.fails)) {
      undersized.push({ name, width, touch, ...t });
    }
  }
  await page.close();
}

/* --- banner contrast -------------------------------------------------------
 * The page banners set a heading and a breadcrumb over a photograph. Whether
 * that is readable depends on the pixels behind the glyphs, so it is measured,
 * not assumed: screenshot the banner twice - once as it renders, once with the
 * text hidden - and compare each text colour against the LIGHTEST background
 * pixel inside its own box. Lightest, because the text here is light: the
 * brightest thing behind it is the worst case.
 *
 * Swap a banner image for a brighter one and this is what tells you.
 */
const BANNER_WIDTHS = [390, 1280, 1920];
const NEEDS = {
  // The h1 is >=30px at 800 weight, which is "large text" under WCAG - 3:1.
  h1: 3.0,
  crumb: 4.5,
  link: 4.5,
};
const contrastFails = [];
let contrastChecks = 0;

for (const width of BANNER_WIDTHS) {
  for (const name of pages) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 700 });
    await page.goto(`http://127.0.0.1:${PORT}/${name}.html`, { waitUntil: 'networkidle0' });

    const boxes = await page.evaluate(() => {
      const band = document.querySelector('.page-banner');
      if (!band) return null;
      const bb = band.getBoundingClientRect();
      const grab = sel => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.x - bb.x, y: r.y - bb.y, w: r.width, h: r.height, color: getComputedStyle(el).color };
      };
      return { h1: grab('.page-banner h1'), crumb: grab('.page-banner .crumb'), link: grab('.page-banner .crumb a') };
    });
    if (!boxes) { await page.close(); continue; }

    await page.evaluate(() => {
      document.querySelector('.page-banner-inner').style.visibility = 'hidden';
    });
    const shot = await (await page.$('.page-banner')).screenshot({ type: 'png' });
    await page.close();

    const img = decodePNG(shot);
    for (const [kind, box] of Object.entries(boxes)) {
      if (!box) continue;
      const x0 = Math.max(0, Math.floor(box.x)), y0 = Math.max(0, Math.floor(box.y));
      const x1 = Math.min(img.width, Math.ceil(box.x + box.w));
      const y1 = Math.min(img.height, Math.ceil(box.y + box.h));
      if (x1 <= x0 || y1 <= y0) continue;

      let worst = -1, worstPx = null;
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const i = y * img.width * img.channels + x * img.channels;
          const l = luminance(img.data[i], img.data[i + 1], img.data[i + 2]);
          if (l > worst) { worst = l; worstPx = [img.data[i], img.data[i + 1], img.data[i + 2]]; }
        }
      }
      const [r, g, b] = parseRGB(box.color);
      const got = contrast(luminance(r, g, b), worst);
      contrastChecks++;
      if (got < NEEDS[kind]) {
        contrastFails.push({ name, width, kind, got, need: NEEDS[kind], bg: worstPx, fg: box.color });
      }
    }
  }
}

await browser.close();
server.close();

console.log(`\n${pages.length} pages x ${WIDTHS.length} widths = ${pages.length * WIDTHS.length} combinations\n`);

console.log('HORIZONTAL OVERFLOW');
if (!overflows.length) {
  console.log('  none\n');
} else {
  for (const o of overflows) {
    console.log(`  ${o.name.padEnd(20)} @${String(o.width).padStart(4)}px  +${o.by}px  ${o.culprits.join(' | ')}`);
  }
  console.log('');
}

const report = (rows, heading) => {
  console.log(heading);
  if (!rows.length) return console.log('  none\n');
  const seen = new Set();
  for (const t of rows) {
    const key = `${t.name}|${t.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    console.log(`  ${t.name.padEnd(20)} @${String(t.width).padStart(4)}px  ${t.id} ${t.w}x${t.h}`);
  }
  console.log('');
};

const onTouch = undersized.filter(t => t.touch);
const onMouse = undersized.filter(t => !t.touch);

report(onTouch, `TOUCH TARGETS UNDER ${MIN_TARGET}x${MIN_TARGET} (WCAG 2.2 SC 2.5.8)`);

// Above 768px the pointer is a mouse, the size rules scoped to
// (pointer:coarse) correctly do not apply, and SC 2.5.8's spacing exception
// covers most of what is left - an undersized target still passes if it has
// 24px of clearance around it, which this script does not measure. So these
// are printed to look at, not to fail on. A range input reported at 6px tall
// is the painted track: the thing you actually grab is the 22px thumb.
report(onMouse, 'FYI - small controls at mouse widths (not failures, see the comment in this file)');

console.log(`BANNER TEXT CONTRAST OVER THE PHOTO (${contrastChecks} measurements)`);
if (!contrastFails.length) {
  console.log('  every heading, breadcrumb and link clears WCAG AA\n');
} else {
  for (const f of contrastFails.sort((a, b) => a.got - b.got)) {
    console.log(`  ${f.name.padEnd(20)} @${String(f.width).padStart(4)}px  ${f.kind.padEnd(5)} ` +
                `${f.got.toFixed(2)}:1 (needs ${f.need}:1)  ${f.fg} on rgb(${f.bg})`);
  }
  console.log('');
}

process.exit(overflows.length || onTouch.length || contrastFails.length ? 1 : 0);
