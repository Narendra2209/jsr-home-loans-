/**
 * Home Loans page content.
 *
 * Most of this is regulation or market standard and is safe as written — the
 * qualifiers matter, so keep them attached if you edit a row. Bracketed values
 * are the ones only you can supply.
 */

export type FeatureIcon =
  | "banks"
  | "clock"
  | "funding"
  | "documents"
  | "transfer"
  | "tax";

export const features: { icon: FeatureIcon; title: string; desc: string }[] = [
  {
    icon: "banks",
    title: "One application, 20+ banks",
    desc: "We shop your file around so you are not stuck with the first offer.",
  },
  {
    icon: "clock",
    title: "Sanction in 3–7 days",
    desc: "Complete files move fast. We make sure yours is complete.",
  },
  {
    icon: "funding",
    title: "Up to 90% funding",
    desc: "Smaller down payment, so you buy sooner rather than saving longer.",
  },
  {
    icon: "documents",
    title: "Doorstep documentation",
    desc: "We collect and prepare the file. You do not visit a branch.",
  },
  {
    icon: "transfer",
    title: "Balance transfer",
    desc: "Already have a loan? Move it to a lower rate and cut your EMI.",
  },
  {
    icon: "tax",
    title: "Tax benefits",
    desc: "Up to ₹1.5L on principal and ₹2L on interest, under the old regime.",
  },
];

/** TODO: confirm the processing fee range. The rate comes from company.ts. */
export const specifications: { label: string; value: string; note?: string }[] = [
  {
    label: "Loan amount",
    value: "₹5 lakh to ₹5 crore",
    note: "Higher amounts case by case",
  },
  {
    label: "Tenure",
    value: "Up to 30 years",
    note: "Subject to your age at maturity",
  },
  {
    label: "Funding",
    value: "Up to 90% of property value",
    note: "90% up to ₹30L · 80% for ₹30–75L · 75% above ₹75L, per RBI norms",
  },
  {
    label: "Processing fee",
    value: "[0.25%–0.50%] of the loan amount",
    note: "Varies by lender; often negotiable",
  },
  {
    label: "Prepayment charges",
    value: "Nil on floating-rate loans",
    note: "RBI bars foreclosure charges to individual borrowers on floating rates",
  },
  {
    label: "Tax deduction",
    value: "₹1.5L principal (80C) + ₹2L interest (24b)",
    note: "Old regime only — not available under the new regime for a self-occupied property",
  },
];

export type ApplicantType = {
  id: string;
  label: string;
  criteria: { label: string; value: string }[];
  commonDocs: string[];
  specificDocsLabel: string;
  specificDocs: string[];
  docNote: string;
};

const commonDocs = [
  "PAN card and Aadhaar",
  "Passport-size photographs",
  "Address proof",
  "Property documents — sale agreement, title deed, approved plan",
  "Processing fee cheque",
];

const standardNote =
  "We tell you which of these your lender actually wants before you gather anything.";

/**
 * TODO: read all three before this goes live. These criteria are standard for
 * the Indian market, but they are published under your name — a visitor who is
 * turned down will quote them back to you.
 */
export const applicantTypes: ApplicantType[] = [
  {
    id: "salaried",
    label: "Salaried",
    criteria: [
      { label: "Age", value: "21 to 60, or your retirement age — whichever comes first" },
      { label: "Income", value: "From [₹25,000] a month, depending on the city and the lender" },
      { label: "Work history", value: "2 years total, at least 6 months in your current job" },
      {
        label: "Credit score",
        value: "750+ for the best rates. 700–750 still works, at a slightly higher rate",
      },
      { label: "Tenure available", value: "Up to 30 years" },
      {
        label: "Employer",
        value: "Listed companies and government service get the finest pricing",
      },
    ],
    commonDocs,
    specificDocsLabel: "Because you are salaried",
    specificDocs: [
      "Last 3 months' salary slips",
      "Last 6 months' bank statements — salary account",
      "Form 16, or 2 years of ITR",
      "Employment certificate or appointment letter",
    ],
    docNote: standardNote,
  },
  {
    id: "self-employed",
    label: "Self-employed",
    criteria: [
      { label: "Age", value: "21 to 65 at loan maturity" },
      { label: "Business continuity", value: "3 years in the same line of business" },
      {
        label: "Income",
        value: "As shown in your ITR — filed returns matter more than declared turnover",
      },
      {
        label: "Credit score",
        value: "750+ preferred. Lenders look harder at your bank conduct here",
      },
      { label: "Tenure available", value: "Usually up to 20–25 years" },
      {
        label: "Worth knowing",
        value: "Lenders read the same self-employed file very differently — this is where a broker earns their fee",
      },
    ],
    commonDocs,
    specificDocsLabel: "Because you are self-employed",
    specificDocs: [
      "Last 3 years' ITR with computation of income",
      "Audited profit & loss account and balance sheet",
      "Business registration — GST, Shop & Establishment, or licence",
      "Last 12 months' bank statements — current and savings",
      "Business address proof",
    ],
    docNote: standardNote,
  },
  {
    id: "nri",
    label: "NRI",
    criteria: [
      { label: "Age", value: "21 to 60" },
      {
        label: "Employment abroad",
        value: "1 to 2 years overseas, or 6 months abroad with 3 years total experience",
      },
      { label: "Income", value: "Minimum varies by country of residence and lender" },
      { label: "Tenure available", value: "Usually up to 20 years — shorter than for residents" },
      { label: "Repayment", value: "Through your NRE or NRO account, in Indian rupees" },
      {
        label: "Power of Attorney",
        value: "Required — someone in India must be able to sign on your behalf",
      },
    ],
    commonDocs: [
      "PAN card",
      "Passport-size photographs",
      "Property documents — sale agreement, title deed, approved plan",
      "Processing fee cheque",
    ],
    specificDocsLabel: "Because you are an NRI",
    specificDocs: [
      "Passport and valid visa or work permit",
      "Employment contract or appointment letter",
      "Overseas address proof",
      "Last 6 months' overseas bank statements",
      "Last 6 months' NRE or NRO account statements",
      "Salary certificate, attested where required",
      "Power of Attorney, notarised and attested",
    ],
    docNote:
      "Attestation rules differ by country. We will tell you exactly what your embassy requires.",
  },
];

/** Home-loan specific, so it does not echo the general process on the home page. */
export const processSteps = [
  {
    title: "Eligibility and document review",
    desc: "We check what you qualify for and tell you honestly where you stand before you apply.",
  },
  {
    title: "Application to the right lenders",
    desc: "We place your file with the banks most likely to say yes, and follow it up daily.",
  },
  {
    title: "Sanction, valuation and legal clearance",
    desc: "The bank values the property and checks the title. We coordinate both and chase the queries.",
  },
  {
    title: "Disbursement",
    desc: "Funds are released to the builder or seller. We stay on it until the money moves.",
  },
];
