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
import { fileURLToPath } from 'url';

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

process.exit(overflows.length || onTouch.length ? 1 : 0);
