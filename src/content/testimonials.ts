/**
 * Customer testimonials — the single source for the home page strip and the
 * full testimonials page.
 *
 * ⚠ EVERY ENTRY BELOW IS WRITTEN, NOT REAL. Replace all of them before this site
 * goes live. A fabricated testimonial is a legal exposure, not a placeholder.
 *
 * Before publishing a real one you need, from each customer:
 *   • permission to use their words
 *   • permission to use their name and area (initials are a fine compromise)
 *   • separate permission for a photograph or video — that is a higher bar
 *
 * Photos: drop the file in src/assets, import it, and set `photo`. Leave it null
 * and the card shows their initial instead — which is what to do when someone is
 * happy to be quoted but not pictured.
 *
 * Videos: set `videoId` to the YouTube video ID only (the part after v=), not the
 * full URL. The video section hides itself entirely while no entry has one.
 */

export type Testimonial = {
  id: string;
  /** Full name, or initials if that is all you have permission for. */
  name: string;
  area: string;
  loanType: string;
  quote: string;
  rating: number;
  photo: string | null;
  videoId: string | null;
  source: "Google" | "Direct";
};

export const testimonials: Testimonial[] = [
  {
    id: "self-employed-rejected",
    name: "[Customer name]",
    area: "LB Nagar",
    loanType: "Home Loan",
    quote:
      "Two banks had already rejected my file because I am self-employed. JSR found a lender who understood my ITRs and got it sanctioned in nine days.",
    rating: 5,
    photo: null,
    videoId: null,
    source: "Google",
  },
  {
    id: "balance-transfer-saving",
    name: "[Customer name]",
    area: "Kothapet",
    loanType: "Balance Transfer",
    quote:
      "They moved my existing loan to a lower rate and my EMI dropped by ₹4,200 a month. I did not step into a single branch.",
    rating: 5,
    photo: null,
    videoId: null,
    source: "Google",
  },
  {
    id: "documents-explained",
    name: "[Customer name]",
    area: "Dilsukhnagar",
    loanType: "Loan Against Property",
    quote:
      "Every document was explained before I signed it. First time a loan process has not felt like something being done to me.",
    rating: 5,
    photo: null,
    videoId: null,
    source: "Direct",
  },
  {
    id: "first-home",
    name: "[Customer name]",
    area: "Vanasthalipuram",
    loanType: "Home Loan",
    quote:
      "We were first-time buyers and did not know what half the paperwork meant. They walked us through all of it and we moved in six weeks later.",
    rating: 5,
    photo: null,
    videoId: null,
    source: "Google",
  },
  {
    id: "personal-loan-speed",
    name: "[Customer name]",
    area: "Nagole",
    loanType: "Personal Loan",
    quote:
      "I needed the money for a medical emergency. Sanctioned the same week, and nobody made me feel like a nuisance for calling twice a day.",
    rating: 5,
    photo: null,
    videoId: null,
    source: "Direct",
  },
];

/** The three shown on the home page. */
export const featuredTestimonials = testimonials.slice(0, 3);

export const loanTypeFilters = ["All", ...Array.from(new Set(testimonials.map((t) => t.loanType)))];
