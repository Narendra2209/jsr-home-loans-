/**
 * Home page content.
 *
 * Everything marked TODO is a stand-in written to show the layout — it is not
 * real. Replace each one before this site goes live. An invented testimonial or
 * disbursement figure is a legal risk, not a placeholder.
 */

/** TODO: confirm the lenders you actually place loans with. */
export const partnerBanks = [
  "SBI",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra",
  "LIC Housing",
  "Bajaj Housing",
  "PNB Housing",
];

export type BadgeIcon = "star" | "shield" | "check" | "clock";

export const trustBadges: { icon: BadgeIcon; label: string }[] = [
  { icon: "star", label: "4.8 on Google" }, // TODO: real rating
  { icon: "shield", label: "Serving Hyderabad since 2009" },
  { icon: "check", label: "No hidden charges" },
  { icon: "clock", label: "Sanction in 3–7 days" }, // TODO: confirm you want this in writing
];

// The four headline figures moved to src/content/company.ts — the About page shows
// the same ones, and they must never disagree.

export const processSteps = [
  {
    title: "Tell us what you need",
    desc: "A call or the form. Loan amount, property, and where you work — that is enough to start.",
  },
  {
    title: "We match you to lenders",
    desc: "We take your profile to our partner banks and come back with the offers you actually qualify for.",
  },
  {
    title: "Documents and sanction",
    desc: "We prepare the file, coordinate valuation and legal checks, and follow the sanction through.",
  },
  {
    title: "Disbursement",
    desc: "The bank releases funds to the builder or seller. We stay on it until the money moves.",
  },
];

// Testimonials moved to src/content/testimonials.ts — the home page strip and
// the testimonials page now read the same list.

export const faqs = [
  {
    q: "How much home loan can I get?",
    a: "Most lenders fund 75–90% of the property value, and cap your EMI at roughly half your take-home income. On ₹80,000 a month with no existing EMIs, that is usually around ₹46 lakh over 20 years — the eligibility check above gives you your own figure.",
  },
  {
    q: "What documents will I need?",
    a: "KYC (Aadhaar and PAN), income proof — three months of salary slips if you are salaried, two years of ITRs if you are self-employed — six months of bank statements, and the property papers. We tell you exactly which ones your lender wants before you gather anything.",
  },
  {
    q: "How long does approval take?",
    a: "Sanction usually comes in 3–7 working days once your file is complete. Disbursement follows the bank's legal and technical clearance on the property, which typically adds one to two weeks.",
  },
  {
    // TODO: your answer. This is the question people are most afraid to ask.
    q: "What do you charge?",
    a: "[Your answer here.]",
  },
  {
    q: "Can I transfer my existing home loan to a lower rate?",
    a: "Yes. A balance transfer moves your outstanding loan to a lender offering a better rate. It is worth doing when you have several years left — we will tell you honestly if the savings do not cover the switching cost.",
  },
  {
    q: "What credit score do I need?",
    a: "750 and above gets you the best rates. Between 700 and 750 you will still find lenders, at a slightly higher rate. Below 700 the options narrow, but they are not zero — this is exactly where a broker earns their keep.",
  },
];

/**
 * Share of take-home income a lender is assumed to allow toward EMIs.
 * TODO: confirm. Banks sit between 45% and 60% depending on income band.
 */
export const eligibilityIncomeRatio = 0.5;
