/**
 * Eligibility rules used by the checker.
 *
 * These follow standard Indian lending practice. Every lender sets its own, so
 * the page presents the result as an estimate and shows its working.
 *
 * TODO: confirm the FOIR bands against what your panel actually applies.
 */

export type EmploymentType = "salaried" | "self-employed";

export const employmentOptions: { id: EmploymentType; label: string; blurb: string }[] = [
  {
    id: "salaried",
    label: "Salaried",
    blurb: "Income from a job, assessed on payslips and Form 16.",
  },
  {
    id: "self-employed",
    label: "Self-employed",
    blurb: "Income from business or profession, assessed on filed ITRs.",
  },
];

/**
 * Share of monthly income a lender will allow toward all EMIs combined (FOIR).
 * Higher incomes are allowed a larger share, because more is left over after
 * living costs.
 */
export const foirBands = [
  { upTo: 30000, ratio: 0.4 },
  { upTo: 60000, ratio: 0.45 },
  { upTo: 100000, ratio: 0.5 },
  { upTo: Infinity, ratio: 0.55 },
];

/** Lenders are more conservative with self-employed income. */
export const selfEmployedFoirPenalty = 0.05;

export const retirementAge: Record<EmploymentType, number> = {
  salaried: 60,
  "self-employed": 65,
};

export const maxTenureYears: Record<EmploymentType, number> = {
  salaried: 30,
  "self-employed": 25,
};

export const foirFor = (income: number, employment: EmploymentType) => {
  const band = foirBands.find((b) => income <= b.upTo) ?? foirBands[foirBands.length - 1];
  const ratio = employment === "self-employed" ? band.ratio - selfEmployedFoirPenalty : band.ratio;
  return Math.max(0.3, ratio);
};

/** Tenure is capped by how many working years are left, not just by the product. */
export const tenureFor = (age: number, employment: EmploymentType) =>
  Math.max(1, Math.min(maxTenureYears[employment], retirementAge[employment] - age));

/**
 * The four-step walkthrough shown in the hero.
 *
 * Icon keys are resolved to lucide components in the page, so this file stays
 * plain data. The steps describe the form below it, in order.
 */
export const checkerSteps = [
  { icon: "person", title: "Basic Details", desc: "Tell us a bit about yourself" },
  { icon: "work", title: "Employment Information", desc: "Share your work details" },
  { icon: "income", title: "Income Information", desc: "Add your income details" },
  { icon: "estimate", title: "Get Estimate", desc: "See your borrowing estimate instantly" },
] as const;

export type CheckerStepIcon = (typeof checkerSteps)[number]["icon"];

/** What the checker does not ask for. These are the objections people arrive with. */
export const checkerAssurances = [
  { icon: "secure", title: "100% Secure", desc: "Your data is safe and encrypted" },
  { icon: "documents", title: "No Documents", desc: "No uploads. No paperwork." },
  { icon: "phone", title: "No Phone Number", desc: "No calls. No spam." },
  { icon: "instant", title: "Instant Estimate", desc: "Get results in just a few steps" },
] as const;

export type CheckerAssuranceIcon = (typeof checkerAssurances)[number]["icon"];
