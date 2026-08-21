/**
 * Lender comparison data.
 *
 * ⚠ EVERY FIGURE BELOW IS UNVERIFIED. They are market-typical values written to
 * make the page work, not quotes from these lenders. Publishing another
 * company's price incorrectly is a real problem, so check each one before this
 * page goes live — and update `lastReviewed` every time you do.
 *
 * Interest rates move with the repo rate and lender promotions. A comparison
 * table nobody maintains is worse than no table: a visitor who acts on a stale
 * number and finds different terms stops trusting the rest of the site.
 */

/** TODO: set this each time you check the figures. Shown on the page. */
export const lastReviewed = "[Month Year]";

export type LoanType = "Home Loan" | "Loan Against Property" | "Personal Loan" | "Balance Transfer";

export const loanTypes: LoanType[] = [
  "Home Loan",
  "Loan Against Property",
  "Personal Loan",
  "Balance Transfer",
];

export type LenderRow = {
  lender: string;
  /** Lowest advertised rate, for sorting. null renders as "on request". */
  rateFrom: number | null;
  processingFee: string;
  maxTenureYears: number | null;
  funding: string;
  note: string;
};

export const comparison: Record<LoanType, LenderRow[]> = {
  "Home Loan": [
    { lender: "SBI", rateFrom: 8.5, processingFee: "0.35%, min ₹2,000", maxTenureYears: 30, funding: "Up to 90%", note: "Lowest rates for high credit scores" },
    { lender: "HDFC Bank", rateFrom: 8.6, processingFee: "0.50%, max ₹3,000", maxTenureYears: 30, funding: "Up to 90%", note: "Fast processing on salaried files" },
    { lender: "ICICI Bank", rateFrom: 8.75, processingFee: "0.50%", maxTenureYears: 30, funding: "Up to 90%", note: "Strong on ready-to-move property" },
    { lender: "Axis Bank", rateFrom: 8.75, processingFee: "₹10,000 flat", maxTenureYears: 30, funding: "Up to 90%", note: "Flexible on self-employed profiles" },
    { lender: "LIC Housing", rateFrom: 8.5, processingFee: "₹3,000 flat", maxTenureYears: 30, funding: "Up to 90%", note: "Competitive for salaried applicants" },
    { lender: "Bajaj Housing", rateFrom: 8.6, processingFee: "Up to 1%", maxTenureYears: 30, funding: "Up to 90%", note: "Quick sanction, higher fee" },
  ],
  "Loan Against Property": [
    { lender: "SBI", rateFrom: 9.75, processingFee: "1%, max ₹50,000", maxTenureYears: 15, funding: "Up to 65%", note: "Lower rates, longer processing" },
    { lender: "HDFC Bank", rateFrom: 9.5, processingFee: "1%", maxTenureYears: 15, funding: "Up to 65%", note: "Residential property preferred" },
    { lender: "ICICI Bank", rateFrom: 9.75, processingFee: "1%", maxTenureYears: 15, funding: "Up to 65%", note: "Commercial property accepted" },
    { lender: "Axis Bank", rateFrom: 10.5, processingFee: "1%", maxTenureYears: 15, funding: "Up to 60%", note: "Good for business income" },
    { lender: "Bajaj Finserv", rateFrom: 10.0, processingFee: "Up to 1.5%", maxTenureYears: 15, funding: "Up to 60%", note: "Faster, at a higher cost" },
  ],
  "Personal Loan": [
    { lender: "HDFC Bank", rateFrom: 10.85, processingFee: "Up to 2.5%", maxTenureYears: 5, funding: "Up to ₹40 lakh", note: "Pre-approved offers for existing customers" },
    { lender: "ICICI Bank", rateFrom: 10.85, processingFee: "Up to 2%", maxTenureYears: 6, funding: "Up to ₹50 lakh", note: "Quick disbursal" },
    { lender: "Axis Bank", rateFrom: 11.25, processingFee: "Up to 2%", maxTenureYears: 5, funding: "Up to ₹40 lakh", note: "Salaried applicants only in most cases" },
    { lender: "SBI", rateFrom: 11.15, processingFee: "1.5%", maxTenureYears: 6, funding: "Up to ₹30 lakh", note: "Best rates for government employees" },
    { lender: "Bajaj Finserv", rateFrom: 11.0, processingFee: "Up to 3.93%", maxTenureYears: 8, funding: "Up to ₹40 lakh", note: "Longest tenure, highest fees" },
  ],
  "Balance Transfer": [
    { lender: "SBI", rateFrom: 8.5, processingFee: "0.35%, min ₹2,000", maxTenureYears: 30, funding: "Outstanding + top-up", note: "Often waived on transfers" },
    { lender: "HDFC Bank", rateFrom: 8.6, processingFee: "0.50%, max ₹3,000", maxTenureYears: 30, funding: "Outstanding + top-up", note: "Fast processing on salaried files" },
    { lender: "ICICI Bank", rateFrom: 8.75, processingFee: "0.50%", maxTenureYears: 30, funding: "Outstanding + top-up", note: "Top-up available with the transfer" },
    { lender: "Axis Bank", rateFrom: 8.75, processingFee: "₹10,000 flat", maxTenureYears: 30, funding: "Outstanding + top-up", note: "Good for self-employed profiles" },
    { lender: "LIC Housing", rateFrom: 8.5, processingFee: "₹3,000 flat", maxTenureYears: 30, funding: "Outstanding only", note: "Lower rates for high credit scores" },
  ],
};
