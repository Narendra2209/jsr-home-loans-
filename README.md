# JSR Home Loan Services — website

Static site for JSR Home Loan Services (JSR Financial Associates, LB Nagar,
Hyderabad). Plain HTML, CSS and JavaScript — no framework, no npm, no runtime
dependencies. The only build step is a ~120-line Python script that stitches
shared partials into the pages.

## Run it

```bash
python -m http.server 8080
# http://localhost:8080
```

Opening `index.html` directly works too, but serve the folder if you want the
Google Map iframe and relative paths to behave exactly as in production.

## Build

Pages are assembled from fragments so the header, footer and disclaimer live in
one place rather than being copy-pasted 19 times.

```bash
python build.py          # rebuild all pages + sitemap.xml + robots.txt
python _src/build_css.py # only if you edited _src/css-*.css
```

**Edit the files in `_src/`, never the generated `.html` in the root** — they
are overwritten on every build.

`style.css` is part hand-written, part generated. Two regions are owned by
`build_css.py` and replaced wholesale on every run:

```
/* >>> jsr-hero ... <<< */        …from _src/css-hero.css
/* >>> jsr-generated ... <<< */   …from _src/css-components.css … css-polish.css
```

The generated block is appended at the **end** of the file, after the original
hand-written responsive block, so that where specificity ties the newer rules
win. Everything outside those two regions is hand-maintained — edit it directly.

```
build.py                  assembles pages, writes sitemap.xml + robots.txt
_src/
  partials/
    head.html             <head> + opening <body>
    header.html           top bar, nav with dropdowns, "Check Eligibility" CTA
    footer.html           footer, RBI disclaimer, float buttons, mobile bar, JSON-LD
  pages/*.html            one body fragment per page, with front matter
  css-hero.css            hero block (spliced into style.css between markers)
  css-components.css      everything added since the original build
  css-motion.css          glass surfaces + cursor-motion styles
  css-flip.css            direction-aware flip cards
  css-responsive.css      breakpoints for the new components
  css-polish.css          breakpoint ladder, fluid rhythm, touch targets, depth
  build_css.py            splices the six files above into assets/css/style.css
assets/
  css/style.css           the only stylesheet (generated in part — see above)
  js/main.js              nav, accordion, tabs, reveals, counters, video embeds
  js/motion.js            flip cards, cursor sheen, card tilt, magnetic buttons, parallax
  js/tools.js             calculators, comparison table, lead forms
  img/                    images
```

### Breakpoints

`_src/css-polish.css` is spliced in last and holds the ladder. Four widths
carry structure, and new rules belong on one of them:

| Query | Name | What changes |
|---|---|---|
| `<=1023.98px` | nav | header runs out of room, hamburger drawer takes over |
| `<=1024px` | tablet | multi-column grids drop to two |
| `<=767px` | phone | one column, sticky bottom action bar |
| `<=359.98px` | small | tightened gutter and hero |

Plus three that are not about width at all: `(pointer:coarse)` for touch
targets, `(max-height:540px) and (orientation:landscape)` for a phone turned
sideways, and `(min-width:1600px)` for large monitors.

Section and gutter spacing is `clamp()`, not stepped per breakpoint, so it
interpolates between those widths instead of jumping.

Run the audit before shipping a layout change - it drives headless Chrome over
every page at seven widths and fails on horizontal overflow or a touch target
under 24px:

```bash
npm install puppeteer-core   # dev-only, one time; the site itself stays dep-free
node _src/audit.mjs          # add a page list to narrow it: node _src/audit.mjs index,contact
```

It drives whatever Chrome or Edge is already installed, emulates touch at and
below 768px (the touch-target rules are scoped to `pointer:coarse`, so an audit
without it measures the wrong thing), and exits non-zero on a defect.

### Page banners

Every inner page opens on a photograph behind a dark scrim. The image is
chosen in CSS, keyed off the `data-page` attribute `build.py` already puts on
`<body>`, so no page fragment carries its own banner markup:

```css
body[data-page="about"] .page-banner{background-image:url("../img/about-page.jpg");}
```

The mapping lives at the bottom of `_src/css-effects.css`. A page with no rule
of its own gets `page-banner.jpg`, so a new page is never bannerless.

Two constraints shaped the scrim, and both are worth knowing before you weaken
it:

- **Contrast.** The heading sits over whatever pixel the photo happens to put
  behind it. The scrim bounds the worst case. `_src/audit.mjs` measures this
  for real - it screenshots each banner twice, once with the text hidden, and
  compares every text colour against the lightest pixel it actually covers.
- **Resolution.** Only `contact-banner.webp` (1600px) and `page-banner.jpg`
  (1200px) are banner-grade. The rest are 800px or less and stretch about 2.4x
  on a wide monitor. Softness disappears under a dark scrim and is obvious
  under a light one.

**If you swap a banner image**, use a source at least 800px wide, update the
`preload:` line in the matching `_src/pages/*.html` front matter, and re-run
the audit. `make_dist.py` fails the build if the preload and the CSS disagree,
so the two cannot drift apart silently.

### Page front matter

Each fragment starts with an optional block that drives the build:

```html
<!--meta
title: Home Loan EMI Calculator | JSR Home Loan Services
description: Shown in search results and social previews.
nav: tools emi          # which nav items to mark active (space separated)
slug: emi-calculator    # output filename, minus .html
scripts: tools          # extra JS bundles from assets/js/
preload: assets/img/hero-1.jpg   # LCP image to warm (space separated)
-->
```

A fragment may also contain one `<!--head--> … <!--/head-->` block, whose
contents are moved into `<head>`. That is where per-page JSON-LD lives.

To add a page: drop a fragment in `_src/pages/`, add a link in
`_src/partials/header.html` and/or `footer.html`, add it to `sitemap.html`, give
it a priority in `PRIORITY` in `build.py`, and rebuild.

## Pages

| Page | What it does |
| --- | --- |
| `index.html` | Rate headline, EMI calculator above the fold, trust strip, lender strip, product grid, 6-step process, counters, testimonials, FAQ (with schema), callback form |
| `about.html` | Founder story, mission/vision/values, team, loan mix, company registration details |
| `services.html` | All nine loan products, with anchors (`#construction`, `#renovation`, …) |
| `home-loan.html` | Eligibility by applicant type, full document checklist, features, embedded EMI calculator, FAQ |
| `balance-transfer.html` | Savings calculator with break-even, worked examples, switching costs, process, FAQ |
| `loan-against-property.html` | Which properties qualify, LTV table, EMI calculator, documents, FAQ |
| `emi-calculator.html` | Full calculator, donut chart, rate-sensitivity table, year-by-year amortisation, lead capture |
| `eligibility.html` | FOIR-based eligibility, criteria tabs for salaried / self-employed / NRI, how to improve it |
| `bank-comparison.html` | Sortable, filterable rate table with a live EMI column |
| `testimonials.html` | Rating summary, video testimonials, written reviews, Google reviews |
| `blog.html` + 4 articles | Interest rates, CIBIL score, tax benefits, balance transfer |
| `contact.html` | Call/WhatsApp/email/visit cards, callback form, map, what to bring |
| `privacy-policy.html`, `terms.html`, `sitemap.html` | Legal and navigation |

## Calculators

All three run entirely in the browser; nothing is sent anywhere unless the
visitor presses a WhatsApp or email button.

- **EMI** — standard reducing-balance formula, `P·r·(1+r)ⁿ / ((1+r)ⁿ−1)`, plus a
  month-by-month amortisation walk aggregated into years.
- **Eligibility** — FOIR bands by income (45%→65%), retirement-age tenure cap
  (60 salaried / 65 self-employed / 60 NRI), then solves the EMI back into a
  principal. Property value is derived from RBI's LTV slabs (90 / 80 / 75%).
- **Balance transfer** — compares total interest on the old and new rate over the
  remaining tenure, nets off switching costs, and computes the break-even month.
  The "keep my EMI" option solves for the shorter term instead.

The figures quoted in the page copy were checked against these formulas; see
`_src/` history if you need to change one, and update the prose alongside it.

## Lead capture

There is no backend. The callback forms validate in the browser and then open
WhatsApp (or the visitor's mail client) with the enquiry pre-filled — the
visitor still presses send. To route them to a form service instead, replace
`initLeadForms()` in `assets/js/tools.js`.

## Design tokens

Orange, black and white. Warm near-black carries structure, warm off-whites
carry the page, and orange is the single accent.

**The one rule that shapes everything:** a vivid orange cannot do two jobs. At
the logo's hue, `#F1A421` carries near-black text at **8.96:1** but white text
at only **2.08:1** — an orange button can never have a white label. To reach
4.5:1 against white the hue has to darken to about `#A36B0A`, which is a brown,
not an orange. So there are **two** oranges and they are not interchangeable:

| Token | Value | Used for |
| --- | --- | --- |
| `--brand` | `#F1A421` | fills only — buttons, sliders, discs. Label on it is `--ink` (8.96:1). Matches the logo sun exactly. |
| `--brand-600` | `#D98F14` | fill hover (label still `--ink`, 7.02:1) |
| `--brand-ink` | `#AE500A` | **all** orange text, links and meaning-carrying icons on light — 5.31:1 on white |
| `--brand-ink-2` | `#8F3F08` | link hover |
| `--brand-soft` | `#F5B95A` | accent on black surfaces — 10.65:1 on `--dark` |
| `--brand-50/100/200` | `#FFF8ED` / `#FDEEDA` / `#F7D49A` | washes, chips, tint borders |
| `--star` | `#C07D0C` | rating stars — 3.40:1, because WCAG 1.4.11 wants 3:1 for a graphic that carries meaning and the fill orange only manages 2.08:1 |
| `--ink` / `--ink-2` | `#141210` / `#2A2521` | headings, and every label sitting on `--brand` |
| `--body` / `--muted` / `--faint` | `#4A443E` / `#5C554E` / `#6B635B` | 9.60 / 7.33 / 5.90 on white |
| `--surface` / `-2` / `-3` | `#FFFFFF` / `#FAF8F5` / `#F3EFE9` | page, warm alternating band, CTA band |
| `--dark` / `-2` / `--dark-line` | `#141210` / `#221E1A` / `#37312B` | trust strip, counters, footer, result panels, flip backs |
| `--ok` / `--danger` | `#0E7A4F` / `#C4362F` | kept distinct from brand so meaning survives |

Shadow tints are warm (`rgba(20,18,16,…)`); a navy shadow under an orange card
reads dirty.

**Not recoloured, deliberately:** WhatsApp green (`#25D366` — a brand mark),
the Facebook/Instagram/YouTube hover colours, and the success/danger semantics.

The old `--navy`, `--blue`, `--border`, `--light` names survive as aliases, but
note `--blue` now resolves to the **orange fill**, so anything pairing it with
white text is a bug.

Plus Jakarta Sans for headings and UI, Inter for body copy. Breakpoints at 1180,
1024, 900, 767 and 420px.

Section rhythm is `--section` top and bottom; two adjacent plain-white bands
halve the join. Inner-page banners are typographic, not photographic.

## Glass & motion

The header is the most glass-forward surface: 58% white at 22px blur (76% and
26px once `.is-stuck` is set past 8px of scroll), with an inset white hairline
along its top edge — that lit edge is what actually sells it as glass rather
than as a translucent bar. There is a solid `@supports` fallback, because
without `backdrop-filter` the page would scroll straight through the nav.

Animations added in `_src/css-effects.css`, all reduced-motion aware:
a scroll-progress hairline (functional on a page with a 5,000px amortisation
table), the sticky-header elevate, a nav underline that sweeps in from the
cursor's side, a light sweep across primary buttons on hover, a staggered
reveal so card grids arrive as a sweep rather than one block, the section
eyebrow rule drawing itself, and a short settle on calculator figures when they
recompute.


Surfaces are translucent over a soft aurora painted on `body::before`. Glass
only reads as glass when something coloured sits behind it, which is why the
page background is a tinted field rather than flat white.

`backdrop-filter` is expensive, so only a few large, genuinely layered surfaces
blur unconditionally — the header, hero calculator, result panels, dropdowns and
the mobile bar. The many small cards get a real blur **only above 1024px**; below
that they fall back to a translucent fill with a light top edge, which reads the
same at card size and keeps a page of 30 cards from dropping frames on a phone.

`assets/js/motion.js` adds the flip cards, a faint cursor sheen and a 3° tilt.
The motion is deliberately restrained — it acknowledges the pointer rather than
performing. A custom cursor, magnetic buttons and mouse parallax were all built
here and then removed: next to a rate table they read as toys, and this is a
lender's site. It writes only custom properties and transforms, batched
through a single `requestAnimationFrame` loop, and it returns immediately unless
the visitor is on `(hover: hover) and (pointer: fine)` with no reduced-motion
preference — so touch and keyboard users get the glass with nothing moving under
them. Cards holding a slider, a form control or a sortable header get the sheen
but never the tilt, because rotating a surface under a control being dragged
makes the control miss.

The sheen is a `<span class="sheen">` injected by JS rather than a pseudo-element,
because several of these cards already spend both `::before` and `::after` (the
timeline connector, numbered-list counters, the product-link arrow).

The card border-glow masks its own middle out with a two-layer mask. The
composite keyword **must be its own `mask-composite` / `-webkit-mask-composite`
declaration** — folding `exclude` into the `mask` shorthand parses in Firefox but
silently fails in Chrome, which makes the whole rule invisible.

The aurora is single-hue on purpose. An earlier pass ran five gradients across
blue, indigo, cyan and violet; over a page of rate tables that reads as a crypto
landing page. Three blue washes under 13% do the same job for the glass without
the page announcing itself.

Every rule in `css-motion.css` is inert until the script sets its custom
properties, so if `motion.js` never loads the page keeps the glass and nothing
else changes.

### Flip cards

Product, service, blog, feature, document and process cards flip on hover.
`motion.js` rewraps each one as `.is-flip > .flip-inner > (.flip-front +
.flip-back)`; the back face is generated from the front, so there is no back
markup to maintain across 19 pages. The rotation axis and sign come from the
edge the pointer actually crossed — in from the left spins on Y, in from the top
spins on X — and the back face is pre-rotated to match, or it would render
mirrored.

Three rules keep the effect from costing anything:

- The back **restates** the front, so it is `aria-hidden` and its CTA is
  `tabindex="-1"`. Every card is announced once, from the front.
- A back CTA is only generated where the front **already** links somewhere, so a
  flip is never the only route to an action. Service cards qualify only when
  their copy marks a link with a trailing arrow — picking up any link in the
  prose would put "loan against property" on a button. Labels over 28 characters
  fall back to "Read more".
- Flipping cards are excluded from the tilt, since both write `transform`.

`.blog-card-featured` is excluded: it is a wide two-column card and flipping it
reads as a glitch. On touch and under reduced motion the back face is removed
entirely and the front renders flat.


### A trap worth remembering

The dark result panels are **translucent glass**, not solid `--dark`. Checking a
white-alpha text tint against `#141210` measures a colour that never ships: at
`--glass-dark` alpha .72 the panel actually composites to `#555351`, where a
50% white tint is 3.26:1, not the 5.4:1 the inline comments used to claim. Three
AA failures hid behind that mistake on `.calc-results`, `.fact-card` and
`.article-cta`.

**Always measure the composited result, not the token.** `--glass-dark` is now
.92 (panel `#272523`), where the faintest tint in use clears 4.93:1.

The same applies to the accent glow on the counters band: `rgba(241,164,33,.40)`
over `--dark` peaked at `#6C4C17`, dragging the `--brand-soft` title to 4.43:1.
It is .28 now.

And SC 1.4.11 covers a **control's own boundary**, not just its label. The fill
orange is 2.08:1 against the white page, so every filled control — primary
buttons, the skip link, the floating call button, the mobile-bar CTA — carries a
1px `--brand-edge` (#C07D0C, 3.40:1) rim. Card hover borders use the same token,
because a hover border indicates state and state indication is in scope too.

## Logo

`logo-header.png` and `logo-footer.png` are both **white-on-transparent** marks:
the house, the "JSR" lettering and the hands are all white, and only the sun is
gold. They were drawn for the original navy top bar. On any light surface the
white two-thirds of the mark disappears and you are left with a floating sun.

The light header therefore sets the logo on its own navy chip (`.brand img` in
`style.css` — a dark rounded square with `object-fit: contain`). If you ever get
a dark-on-light version of the logo, drop the `background`, `padding` and
`border-radius` from that rule and it will sit directly on the header.

## Accessibility, resilience & SEO

Skip link, visible focus rings, ARIA on tabs / accordions / sortable headers,
`prefers-reduced-motion` honoured, and tables that reflow into stacked cards on
mobile rather than scrolling off-screen. Every page carries a canonical URL,
Open Graph tags and a `FinancialService` JSON-LD block; the home page, balance
transfer page and articles add `FAQPage` / `Article` schema.

**Progressive enhancement.** An inline script in `<head>` adds a `js` class to
`<html>`, and the scroll-reveal animation and the FAQ collapse are both scoped
under `.js`. Content is therefore visible by default: if the script is blocked
or `main.js` fails to load, the page degrades to plain readable HTML instead of
rendering blank. Do not move that hidden state out from under `.js`.

The reveal observer uses `threshold: 0` deliberately. A percentage threshold can
never be satisfied by an element taller than the viewport — the amortisation
table is ~5000px on a phone — which would leave it hidden permanently.

## Before you publish

Read **[TODO-CONTENT.md](TODO-CONTENT.md)**. Testimonials, the Google rating,
team profiles, company registration numbers, social URLs and the interest-rate
table are all placeholders that must be filled in or removed. Placeholders are
highlighted in yellow on the page so they are hard to miss.

The footer carries an RBI disclaimer making clear that JSR is a loan
facilitator / DSA and not a lender. Do not remove it.

## Images

Images came from the original site's media library and several are third-party
stock. Replace anything you do not hold a licence for.

Everything in `assets/img/` has been resized to roughly twice the width it is
actually painted at and recompressed — 1404 KB down to 655 KB. The untouched
originals are in **`assets/img/_original/`**; that folder is not referenced by
any page, so it costs nothing to ship, but delete it if you would rather keep
the repo small. Three files (`favicon.png`, `hero-2.jpg`, `svc-personal.png`)
came out larger when re-encoded and were left as they were.

Every `<img>` carries its intrinsic `width`/`height` (so nothing shifts while
loading), `decoding="async"`, and `loading="lazy"` except the header logo, which
is above the fold on every page. The home page preloads `hero-1.jpg` via the
`preload:` front-matter key, because the hero art is painted from CSS and the
browser cannot otherwise discover it until the stylesheet has parsed.

`page-banner.jpg` and `contact-banner.webp` are no longer referenced by any page
— the inner-page banner is drawn in CSS now. They are safe to delete.
