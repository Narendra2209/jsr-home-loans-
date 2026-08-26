# JSR Home Loan Services — website

A plain HTML, CSS and JavaScript website. **No framework, no build step, no npm.**
Open any `.html` file in a browser and it works.

## Run it

Double-click `index.html`, or serve the folder if you want the Google Map iframe
and everything else to behave exactly as it will in production:

```bash
python -m http.server 8080
# then open http://localhost:8080
```

## Deploy it

Upload the whole folder to any web host — shared hosting, Hostinger, GoDaddy,
Netlify, GitHub Pages, S3, anything. There is nothing to build and nothing to
install. `index.html` is the home page.

## Structure

```
index.html              Home
about.html              About us
services.html           All services
contact.html            Contact + callback form
testimonials.html       Reviews
emi-calculator.html     EMI calculator
eligibility-checker.html  Eligibility checker
bank-comparison.html    Rates and fees by lender
blog.html               Guides index
privacy-policy.html     Privacy policy
terms.html              Terms & conditions
sitemap.html            Human-readable sitemap
404.html                Not-found page

services/               11 loan product pages
  home-loans.html            construction-loan.html
  mortgage-loans.html        home-renovation-loan.html
  balance-transfer.html      plot-purchase-loan.html
  personal-loans.html        commercial-property-loan.html
  education-loan.html        business-loan.html
  car-loan.html

blog/                   4 guides
  home-loan-interest-rates-explained.html
  improve-cibil-score-before-home-loan.html
  home-loan-tax-benefits.html
  home-loan-balance-transfer-guide.html

assets/
  css/style.css         All styling. Design tokens are at the top.
  js/main.js            All behaviour. Editable CONFIG is at the top.
  img/                  Hero photographs

brand/                  Logos and favicon
sitemap.xml             For search engines
robots.txt
```

All links between pages are **relative**, so the site works from the filesystem,
from a subfolder, or from a domain root without any server configuration.

## Editing

### Phone number, email, WhatsApp, rates

These live in **two** places and must be changed in both:

1. `assets/js/main.js` — the `CONFIG` block at the very top. This drives the
   calculators and the enquiry forms.
2. The HTML files — the header, footer and contact page show them as text.

To change the phone number everywhere:

```bash
# macOS / Linux
grep -rl "9000781967" . --include="*.html" --include="*.js"
```

On Windows, use your editor's "Find in Files" for `9000781967`.

### Colours, spacing, fonts

`assets/css/style.css`, section 1 (`:root`). Everything else is built from those
tokens, so changing `--brand` or `--accent` restyles the whole site.

### Header and footer

These are repeated in every HTML file — that is the trade-off for having no
build step. Edit one file, then copy the `<header>…</header>` and
`<footer>…</footer>` blocks into the rest.

## Making the contact form actually send

Right now the forms **do not post anywhere**. When someone submits, they are
handed off to WhatsApp or their email app with the details pre-filled. They are
never told an enquiry was received when it was not.

To make the form send directly:

1. Create a free account at [Formspree](https://formspree.io) or
   [Web3Forms](https://web3forms.com).
2. Paste your endpoint URL into `formEndpoint` in `assets/js/main.js`.

That is the only change needed. The form will post to it, show a success message
on success, and fall back to WhatsApp if the request fails.

## Before this goes live

Text in `[square brackets]` is a placeholder that has not been filled in yet.
Search the HTML for `[` to find all of them. The important ones:

- **Interest rate** — every calculator defaults to 7%. Confirm the figure.
- **Testimonials** (`testimonials.html`, and the strip on `index.html`) — every
  review is written, not real. Replace them, and get permission for each
  person's name, area and photo.
- **Bank comparison** (`bank-comparison.html`) — every rate and fee is
  market-typical, not quoted. Verify each one, then update "Last reviewed".
- **About page** — founder story, team names, milestones and achievements are
  all placeholders.
- **Company details** — legal name, entity type, registration number, GSTIN.
- **What do you charge?** — the FAQ answer on the home page is still empty.
- **Domain** — `sitemap.xml` and `robots.txt` both say
  `https://REPLACE-WITH-YOUR-DOMAIN`.
- **Social links** — the footer row is hidden until real profiles exist.

## Browser support

Works in every current browser. The layout uses CSS Grid and Flexbox; the
JavaScript is ES5-compatible and degrades safely — with JS disabled, every page
still reads and every link still works. Only the calculators and the mobile menu
need it.
