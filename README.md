# JSR Home Loan Services — front-end clone

A static, front-end-only duplicate of <https://jsrhomeloanservices.com/>.
The original is WordPress + Elementor + Royal Elementor Addons; this rebuild
reproduces the same pages, content, layout, palette, typography and
interactions as hand-written HTML/CSS/JS with no framework or build step.

## Run it

Open `index.html` directly, or serve the folder (needed if you want the
Google Map iframe and relative paths to behave exactly like production):

```bash
python -m http.server 8080
# http://localhost:8080
```

## Pages

| File | Mirrors |
| --- | --- |
| `index.html` | `/` |
| `about.html` | `/about/` |
| `services.html` | `/homeloanservices/` |
| `contact.html` | `/contact/` |

## Structure

```
index.html  about.html  services.html  contact.html
assets/
  css/style.css     all styling (design tokens at the top)
  js/main.js        slider, counters, progress bars, mobile nav, back-to-top, form
  img/              25 images pulled from the original media library
_reference/         the scraped originals, kept for comparison
  *.html            original page source
  css/post-*.css    original Elementor per-page stylesheets
  build.py          regenerates the 3 inner pages from index.html's header/footer
  frag_*.html       per-page body fragments used by build.py
```

`about.html`, `services.html` and `contact.html` share `index.html`'s header
and footer verbatim. Edit the header/footer in `index.html`, or a page body in
`_reference/frag_<page>.html`, then run:

```bash
python _reference/build.py
```

## Design tokens (extracted from the live build)

| Token | Value | Used for |
| --- | --- | --- |
| `--navy` | `#0B133C` | top bar, counters strip, footer, service cards |
| `--gold` | `#F8B743` | accent, buttons, eyebrows, flip-box backs, contact cards |
| `--slate` | `#3F466A` | service-card hover border animation |
| `--ink` | `#222222` | headings |
| `--muted` | `#666666` | body copy |
| `--light` | `#E1E7F3` | CTA bands |
| `--pink` | `#F84365` | floating call / back-to-top buttons, mobile menu hover |

Type: **Poppins** for headings and UI, **Montserrat** for body copy, **Roboto**
for the icon-box titles on the contact page — loaded from Google Fonts, with
system fallbacks. Container width 1140px, breakpoints at 1024px and 767px, the
same as the Elementor kit.

## Behaviour reproduced

- **Hero slider** — 2 slides, 50vh, fade transition, prev/next arrows, dots,
  6s autoplay, `rgba(59,63,82,.47)` overlay.
- **Flip boxes** — 5 cards, 3D `rotateY` flip on hover/focus, 179px tall,
  white front / gold back.
- **Counters** — 0.6k / 2k+ / 6 / 100%, animated over 2s when scrolled into view.
- **Progress bars** — 80 / 75 / 82 / 92%, fill + number animate on view.
- **Mobile nav** — hamburger toggle below 767px, full-width dropdown.
- **Back-to-top** appears past 350px; floating call button always visible.
- Sections fade/rise in on scroll via `IntersectionObserver`.

## Front-end only — what is not wired up

- **Contact form** validates in the browser and shows a confirmation note; it
  posts nowhere. Point it at your own endpoint to make it live.
- **Social icons** in the header link to `#` — the original has no URLs on them
  either.
- No WordPress, no REST API, no comments/feeds, no analytics.
- The Google Map is the same public embed URL as the original.

## Content notes

Copy is transcribed verbatim from the live site, including two quirks worth
knowing about before you ship this:

- The first hero slide reads "Get Get Home, Mortgage, and Personal Loans…"
  (duplicated word, as on the original).
- The first flip box ("Construction Loan") still carries Royal Elementor
  placeholder text: *"Hover mouse here to see backend content. Lorem ipsum
  dolor sit."* / *"This is backend content. Lorem ipsum dolor sit amet."*

Images are the originals from the site's media library. They belong to JSR
Home Loan Services (and, in several cases, to third-party stock sources used
on that site) — replace them before using this for anything public.
