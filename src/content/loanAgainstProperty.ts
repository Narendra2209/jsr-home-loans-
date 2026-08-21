/**
 * Loan Against Property content.
 *
 * This page replaced the old Mortgage Loans page — in the Indian market they are
 * two names for one product, and two pages would have competed with each other
 * in search. The /services/mortgage-loans URL still serves this page.
 *
 * Bracketed values need your figures. Everything else is market standard.
 */

export const acceptedProperty = [
  "Self-occupied residential house or flat",
  "Rented residential property",
  "Commercial shop or office",
  "Residential plot, at a lower funding percentage",
  "Industrial property, with a smaller set of lenders",
];

export const rejectedProperty = [
  "Agricultural land",
  "Gram panchayat properties, at most lenders",
  "Unauthorised or unapproved construction",
  "Property under litigation or with a disputed title",
  "Property whose remaining life is shorter than the loan",
];

/** TODO: confirm against what your panel actually sanctions. */
export const fundingByType = [
  {
    type: "Self-occupied residential",
    funding: "60%–70%",
    note: "The highest funding, and the fastest to process",
  },
  {
    type: "Rented residential",
    funding: "60%–65%",
    note: "Rental income can also support your eligibility",
  },
  {
    type: "Commercial shop or office",
    funding: "55%–65%",
    note: "Location and tenancy affect the valuation heavily",
  },
  {
    type: "Industrial property",
    funding: "50%–55%",
    note: "Fewer lenders; expect a longer timeline",
  },
  {
    type: "Residential plot",
    funding: "50%",
    note: "Lowest funding, as there is no building to value",
  },
];

/** TODO: interest range, processing fee and valuation costs are yours to confirm. */
export const specifications = [
  {
    label: "Interest rate",
    value: "[9%–12%] p.a.",
    note: "Higher than a home loan; varies widely by profile and property",
  },
  {
    label: "Loan amount",
    value: "₹5 lakh to ₹10 crore",
    note: "Driven by the valuation, not by what you ask for",
  },
  {
    label: "Tenure",
    value: "Up to 15 years",
    note: "Some lenders go to 20 on residential property",
  },
  { label: "Processing fee", value: "[0.5%–1%]", note: "Higher than a home loan" },
  {
    label: "Prepayment",
    value: "Nil on floating rate",
    note: "For individual borrowers. Company borrowers may be charged",
  },
  {
    label: "Valuation & legal",
    value: "[₹5,000–₹15,000]",
    note: "Paid to the lender's empanelled valuer and lawyer",
  },
  {
    label: "Tax benefit",
    value: "Only if used for a house",
    note: "No 80C or 24(b) relief on a general-purpose loan against property",
  },
];

export const propertyDocuments = [
  "Sale deed and the chain of prior deeds",
  "Encumbrance certificate, 13 to 30 years",
  "Approved building plan",
  "Latest property tax receipt",
  "Occupancy certificate, where applicable",
  "Recent utility bill for the property",
];

export const applicantDocuments = [
  "PAN, Aadhaar and photographs",
  "Salaried: 3 months' payslips, Form 16, 6 months' statements",
  "Self-employed: 3 years' ITR, audited financials, GST returns",
  "12 months' bank statements",
  "Statements for any existing loans",
];
