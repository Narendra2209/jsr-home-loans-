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
/* >>> jsr-generated ... <<< */   …from _src/css-components.css + css-responsive.css
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
  css-responsive.css      breakpoints for the new components
  build_css.py            splices the three files above into assets/css/style.css
assets/
  css/style.css           the only stylesheet (generated in part — see above)
  js/main.js              nav, accordion, tabs, reveals, counters, video embeds
  js/tools.js             calculators, comparison table, lead forms
  img/                    images
```

### Page front matter

Each fragment starts with an optional block that drives the build:

```html
<!--meta
title: Home Loan EMI Calculator | JSR Home Loan Services
description: Shown in search results and social previews.
nav: tools emi          # which nav items to mark active (space separated)
slug: emi-calculator    # output filename, minus .html
scripts: tools          # extra JS bundles from assets/js/
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

| Token | Value | Used for |
| --- | --- | --- |
| `--navy` | `#0B133C` | top bar, counters, footer, calculator result panels |
| `--gold` | `#F8B743` | accent, buttons, eyebrows, sliders, donut chart |
| `--ink` | `#222222` | headings |
| `--muted` | `#666666` | body copy |
| `--light` | `#E1E7F3` | CTA bands |

Poppins for headings and UI, Montserrat for body copy, loaded from Google Fonts
with system fallbacks. Container 1140px; breakpoints at 1180, 1024, 767 and 420px.

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
