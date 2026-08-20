# Before this site goes live

Everything on the site works today, but some content is deliberately left as a
placeholder because it is a fact about your business that only you can supply.
Placeholders are highlighted **in violet on the page** (`class="tbd"`) so you
can spot them by eye, and each one has an HTML comment above it explaining what
to do.

Edit the source fragment in `_src/pages/`, then run `python build.py`.

---

## 1. Must fix — do not publish without these

| # | Where | What | File to edit |
|---|---|---|---|
| 1 | Reviews page + home page | **All testimonials are templates.** Replace with real reviews from customers who have given you permission to publish their name and locality, and delete every card you do not fill. Publishing invented reviews is a trust problem and, under the Consumer Protection (E-Commerce) Rules, a legal one. | `_src/pages/testimonials.html`, `_src/pages/index.html` |
| 2 | Reviews page | Google rating (`4.9`) and review count (`[N]`) are placeholders. Put your real numbers in or delete the whole rating block. | `_src/pages/testimonials.html` |
| 3 | About page | Founder name and the three team member cards. | `_src/pages/about.html` |
| 4 | About page | GSTIN, Udyam/MSME number, business PAN. Leave a row out entirely rather than publishing a wrong number. | `_src/pages/about.html` |
| 5 | Privacy policy | Last-updated date, data-retention periods, response window, analytics tool name. **Have a lawyer review the whole document against what you actually do with customer data.** | `_src/pages/privacy-policy.html` |
| 6 | Terms & conditions | Last-updated date, grievance acknowledgement and response timelines. **Same — get it reviewed.** | `_src/pages/terms.html` |
| 7 | Home + product pages | The "from 8.10%" headline rate and the "August 2026" as-on date. Verify against your partner lenders' current rate cards before publishing. Search for `data-lowest-rate` and `data-rate-date`. | `_src/pages/index.html`, `home-loan.html`, `loan-against-property.html`, `bank-comparison.html` |
| 8 | Bank comparison | The whole rate table is indicative and sourced from public rate cards. Check every row, and **set a monthly reminder to refresh it** — a stale rate table is worse than none. | `_src/pages/bank-comparison.html` |
| 9 | Header + footer | Social icons point at `#`. Add your real Facebook / Instagram / YouTube URLs, or delete the icons you do not use. | `_src/partials/header.html`, `_src/partials/footer.html` |
| 10 | Home page | The partner-lender strip lists banks as plain text wordmarks. **Only list lenders you are genuinely empanelled with**, and get written permission before using anyone's logo. | `_src/pages/index.html` |

## 2. Should fix — visibly better with these

| # | Where | What |
|---|---|---|
| 11 | Reviews page | Replace the Google-search fallback links (`data-google-review`) with the direct "write a review" link from your Google Business Profile. |
| 12 | Reviews page | Add real video testimonials: set `data-youtube="VIDEO_ID"` on a `.video-card` and swap the poster image. Cards with no ID render disabled, so unfilled ones look deliberate rather than broken. |
| 13 | Reviews page | Optionally drop in a Google-reviews widget (Elfsight, Trustindex, EmbedSocial…) where the dashed placeholder box is. |
| 14 | About page | Replace the stock photo in the founder section with a real photo of you or the office. Same for the team cards, which currently show initials. |
| 15 | About / services | The percentage split of loan types (42% / 21% / 18% / 12% / 7%) is illustrative. Put your actual mix in, or delete the bars. |
| 16 | Everywhere | Counters say 600+ loans, 2,000+ customers, 6 years, 20+ lenders. Confirm each of these is true and defensible. |
| 17 | Contact page | The map is centred on 17.3522, 78.5493. Fine-tune the pin to the exact office entrance. |
| 18 | `assets/img/` | Every image came from the original site's media library and several are third-party stock. Replace anything you do not hold a licence for. |

## 2b. Resolved — contrast is handled

The old brand gold (`#F8B743`) carried white text at **1.77:1**, far below the
4.5:1 WCAG AA needs. That palette no longer exists. The template now runs on a
single blue accent chosen for contrast:

- `--brand` `#1B54D9` carries white text at **6.3:1** (AA for normal text).
- `--brand-ink` `#123B95` for accent text and links on white: **8.9:1**.
- `--brand-soft` `#8FBBFF` for accents on the dark bands: **9.1:1** on `--dark` (`#101438`).
- Focus rings are `--ink` on light surfaces and white on dark ones, both with a
  halo so they read against either.

Nothing is left for you to decide here.

## 3. Optional — makes the leads better

- **Lead forms currently open WhatsApp (or email) with the enquiry pre-filled.**
  That works with no backend and no monthly cost, and the visitor still has to
  press send. If you want the form to submit silently and land in a spreadsheet
  or inbox instead, point it at a form service (Formspree, Web3Forms, Netlify
  Forms) — the handler is `initLeadForms()` in `assets/js/tools.js`.
- **Analytics.** There is none. If you add Google Analytics or similar, name it
  in the privacy policy (item 5 above).
- **Business email.** The site shows a Gmail address. A `@jsrhomeloanservices.com`
  address converts noticeably better on a financial services site.
- **Google Business Profile.** Make sure the name, address, phone and hours match
  this site exactly — mismatches hurt local search rankings.
- **Submit `sitemap.xml`** to Google Search Console once the site is live.

---

## Things deliberately left as they are

- **Calculator outputs are estimates**, and every calculator says so. They use
  the standard reducing-balance EMI formula; lenders round differently and add
  fees, so a sanction letter will never match to the last rupee.
- **The RBI disclaimer in the footer** states that you are a facilitator/DSA and
  not a lender. Do not remove it — it is the single most important line on the
  site from a compliance point of view.
- **No claims of guaranteed approval** anywhere. Keep it that way.
