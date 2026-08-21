# JSR Home Loan Services

The website for JSR Home Loan Services, Hyderabad — a loan DSA arranging home
loans, loans against property, balance transfers and business finance.

Built as a React single-page app (Vite + TypeScript + Tailwind + shadcn/ui).
It replaces the earlier four-page static HTML site, which is kept for reference
in [`legacy-static-site/`](legacy-static-site/) and is no longer served.

## Run it

```bash
npm install
npm run dev      # http://localhost:8080
npm run build    # regenerates sitemap.xml, then builds to dist/
npm run lint
```

`npm run build` runs `scripts/generate-sitemap.mjs` first, so `public/sitemap.xml`
and `public/robots.txt` are always in step with the page list. Never edit those
two files by hand.

## How it is put together

**All editable copy lives in `src/content/`, not in the components.** Change a
rate, a fee, a testimonial or a FAQ answer there and it updates everywhere it
appears. The pages read from these files; they do not hold their own copy.

| File | Holds |
| --- | --- |
| `content/company.ts` | Rates, metrics, phone, address, hours, WhatsApp number, form endpoint — the facts every page shares |
| `content/pages.json` | The one list of public pages. Feeds the sitemap page, `sitemap.xml` and `robots.txt` |
| `content/products.ts` | Construction, renovation, plot, commercial and business loans — five pages from one data file |
| `content/home.ts`, `about.ts`, `homeLoan.ts`, `loanAgainstProperty.ts`, `balanceTransfer.ts`, `bankComparison.ts`, `eligibility.ts`, `testimonials.ts`, `legal.ts` | Copy for the page each is named after |
| `content/articles/` | The guide articles, as typed blocks |

Two shared libraries keep the site consistent with itself:

- `lib/loan.ts` — every EMI, eligibility and saving figure on the site comes from
  these functions, so no two calculators can disagree.
- `lib/enquiry.ts` — form delivery. It reports honestly: a visitor is only told
  their enquiry was sent when a send actually succeeded.

## Before it goes live

Roughly 28 `TODO` markers across `src/content/` are placeholders — real-looking
numbers written to show the layout, not facts. Find them with:

```bash
grep -rn TODO src/content/
```

The ones that matter most:

1. **`company.ts`** — the indicative interest rate, the four headline metrics,
   the founder's establishment year, and the Google profile URL and rating.
2. **`company.ts` → `formEndpoint`** — until a Formspree or Web3Forms endpoint is
   set here, the contact and callback forms tell visitors the form is not
   configured and offer WhatsApp or email instead. They never claim a message was
   sent when it was not.
3. **`pages.json` → `siteUrl`** — set to the real domain. It is written into
   `sitemap.xml` and `robots.txt`; the build warns while the placeholder is there.
4. **`about.ts`** — the founder story, and real names, roles and photos for the
   team, with each person's consent.
5. **`testimonials.ts`** — real customers, with permission. The placeholders are
   written as examples, not as claims.
6. **`legal.ts`** — the fee arrangement clause is bracketed in both the privacy
   policy and the terms. It needs your answer.
7. **`public/og-image.jpg`** — a 1200×630 share image. Without it, links shared on
   WhatsApp and Facebook have no preview picture.

There is deliberately no `Review` or `AggregateRating` structured data on the
testimonials page. Google does not allow a business to mark up reviews of itself,
and doing it risks a manual action.

## Images

`legacy-static-site/assets/img/` carries the photos from the old site. Several
are stock-library preview sizes (`hero-1.jpg` is exactly 612×408) and appear to
be unlicensed comps, so none of them were carried over — only the logo and the
service icons, which are yours, now in `public/brand/`.
