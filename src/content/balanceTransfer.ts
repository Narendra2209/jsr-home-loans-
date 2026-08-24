/**
 * Balance Transfer page content.
 *
 * The savings figures on this page are computed from the amortisation formula
 * at render time, not typed in — so they cannot drift. What needs your input is
 * what a switch actually costs.
 */

/**
 * TODO: replace with the charges you actually see. The break-even shown to a
 * visitor is only as honest as these two numbers.
 */
export const switchingCosts = {
  /** Processing fee on the new loan, as a share of the outstanding amount. */
  processingFeeRate: 0.005,
  /** Legal, valuation and incidental charges. */
  legalAndValuation: 5000,
};

/** Worked examples. EMIs and savings are calculated from these four inputs. */
export const examples = [
  { outstanding: 2500000, years: 15, oldRate: 9.25, newRate: 8.35 },
  { outstanding: 4000000, years: 18, oldRate: 9.75, newRate: 8.5 },
  { outstanding: 6000000, years: 20, oldRate: 9.0, newRate: 8.35 },
  // Deliberately not worth doing. A table where every row wins reads as a sales pitch.
  { outstanding: 800000, years: 4, oldRate: 9.25, newRate: 8.5 },
];

/**
 * Fees only — no rate column, by decision.
 *
 * Lender interest rates move with the repo rate and go stale within a month,
 * and publishing a competitor's price wrongly is a real problem. Processing
 * fees move far more slowly. If you ever want the rate column back, it belongs
 * here with a visible "as of" date and someone committed to updating it.
 *
 * TODO: confirm each fee against what you currently see.
 */
export const lenderFees = [
  { lender: "SBI", fee: "[0.35%, min ₹2,000]", note: "[Often waived on transfers]" },
  { lender: "HDFC Bank", fee: "[0.50%, max ₹3,000]", note: "[Fast processing on salaried files]" },
  { lender: "ICICI Bank", fee: "[0.50%]", note: "[Top-up available with the transfer]" },
  { lender: "Axis Bank", fee: "[₹10,000 flat]", note: "[Good for self-employed profiles]" },
  { lender: "LIC Housing", fee: "[₹3,000 flat]", note: "[Lower rates for high credit scores]" },
];

export const dontTransferWhen = [
  {
    title: "Under five years left",
    desc: "Most of your interest is already paid. The switching cost rarely earns itself back in time.",
  },
  {
    title: "The gap is under 0.5%",
    desc: "Below roughly half a percent, fees usually eat the saving. Ask your current lender to reprice instead — it is free.",
  },
  {
    title: "You are selling soon",
    desc: "If the house is going in a year or two, you will never reach break-even.",
  },
  {
    title: "Your credit has slipped",
    desc: "A transfer is a fresh application. If your score has dropped since, the new rate may be worse than the one you have.",
  },
];

export const processSteps = [
  {
    title: "We check the maths",
    desc: "Outstanding, rate, tenure. If a transfer does not pay for itself, we say so and you owe us nothing.",
  },
  {
    title: "Foreclosure letter and documents",
    desc: "We request your statement of account and list of documents from your current lender.",
  },
  {
    title: "New lender sanctions",
    desc: "Fresh appraisal and legal check on the property. We coordinate all of it.",
  },
  {
    // TODO: confirm this matches how it actually runs for you.
    title: "Old loan closed, papers moved",
    desc: "The new bank pays off the old one and collects your original documents directly. They never pass through your hands — or ours.",
  },
];

/**
 * The four-up strip that sits under the hero buttons.
 *
 * Icon keys are resolved to lucide components in the page, so this file stays
 * plain data like the rest of src/content.
 */
export const heroHighlights = [
  { icon: "rate", title: "Lower Interest Rate", desc: "Pay less, save more" },
  { icon: "tenure", title: "Shorter Tenure", desc: "Become debt free sooner" },
  { icon: "savings", title: "More Savings", desc: "Keep more in your pocket" },
  { icon: "process", title: "Simple Process", desc: "Quick, easy & hassle-free" },
] as const;

export type HighlightIcon = (typeof heroHighlights)[number]["icon"];
