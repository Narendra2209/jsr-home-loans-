import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Briefcase,
  Calculator,
  CalendarCheck,
  Clock,
  FileX2,
  IndianRupee,
  Percent,
  PhoneOff,
  PieChart,
  ShieldCheck,
  UserRound,
  Wallet,
} from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import SliderField from "@/components/SliderField";
import LeadCapture from "@/components/LeadCapture";
import { asAmount, asRoundedRupees, emiFor, inr, principalFor, rupees } from "@/lib/loan";
import { indicativeRate } from "@/content/company";
import heroImg from "@/assets/eligibility-hero.jpg";
import {
  checkerAssurances,
  checkerSteps,
  employmentOptions,
  foirFor,
  retirementAge,
  tenureFor,
  type CheckerAssuranceIcon,
  type CheckerStepIcon,
  type EmploymentType,
} from "@/content/eligibility";

/** Hero icons, keyed off the content module so that file stays plain data. */
const stepIcons: Record<CheckerStepIcon, React.ComponentType<{ className?: string }>> = {
  person: UserRound,
  work: Briefcase,
  income: IndianRupee,
  estimate: Calculator,
};

const assuranceIcons: Record<CheckerAssuranceIcon, React.ComponentType<{ className?: string }>> = {
  secure: ShieldCheck,
  documents: FileX2,
  phone: PhoneOff,
  instant: Clock,
};


const EligibilityCheckerPage: React.FC = () => {
  const [employment, setEmployment] = useState<EmploymentType>("salaried");
  const [income, setIncome] = useState(80000);
  const [age, setAge] = useState(32);
  const [existingEmi, setExistingEmi] = useState(0);

  const result = useMemo(() => {
    const foir = foirFor(income, employment);
    const tenure = tenureFor(age, employment);
    const capacity = Math.max(0, income * foir - existingEmi);
    const eligible = principalFor(capacity, indicativeRate, tenure * 12);
    const emi = capacity > 0 ? emiFor(eligible, indicativeRate, tenure * 12) : 0;
    const overCommitted = income * foir <= existingEmi;
    return { foir, tenure, capacity, eligible, emi, overCommitted };
  }, [income, age, existingEmi, employment]);

  const estimateRows = [
    { icon: PieChart, label: "Income", value: rupees(income), suffix: "/month" },
    { icon: Percent, label: "Fixed obligations", value: `${Math.round(result.foir * 100)}%` },
    { icon: Wallet, label: "EMI capacity", value: rupees(result.capacity), suffix: "/month" },
    { icon: CalendarCheck, label: "Loan tenure", value: `${result.tenure} years` },
    { icon: BarChart3, label: "Interest rate (p.a.)", value: `${indicativeRate}%` },
  ];

  const summary = `Eligibility check — ${employmentOptions.find((o) => o.id === employment)?.label}, income ₹${inr.format(income)}/month, age ${age}, existing EMIs ₹${inr.format(existingEmi)} → up to ${asAmount(result.eligible)}`;

  return (
    <>
      <SEO
        title="Home Loan Eligibility Checker | How Much Can I Borrow? | JSR"
        description="Check how much home loan you are eligible for in Hyderabad. Enter your income, age, existing EMIs and employment type for an instant estimate, with the calculation shown in full."
        canonicalPath="/eligibility-checker"
      />

      <section className="relative isolate overflow-hidden py-16 text-brand-foreground md:py-20">
        {/* Photograph fills the band; navy holds the left so the copy stays readable */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt=""
            aria-hidden="true"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
          {/* Solid navy on phones; on desktop it holds to 38% then thins so the photo reads */}
          <div className="absolute inset-0 bg-brand/90 md:hidden" />
          <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,hsl(var(--brand))_0%,hsl(var(--brand))_38%,hsl(var(--brand)/0.86)_48%,hsl(var(--brand)/0.45)_62%,hsl(var(--brand)/0.3)_100%)] md:block" />
        </div>

        <div className="container relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
                Eligibility Checker
              </p>
              <h1 className="mt-3 max-w-[20ch] font-heading text-4xl font-bold tracking-tight md:text-5xl">
                How much can you actually borrow?
              </h1>
              <p className="mt-4 max-w-prose text-lg text-brand-foreground/90">
                Four questions, no documents, no phone number. We show you the estimate and the
                arithmetic behind it, so you can see exactly what a lender is looking at.
              </p>

              {/* What the form below asks for, in order */}
              <ol className="mt-8 grid gap-y-8 rounded-xl border border-brand-foreground/15 bg-brand/40 p-6 sm:grid-cols-4 sm:gap-x-0 sm:gap-y-0">
                {checkerSteps.map((step, index) => {
                  const Icon = stepIcons[step.icon];
                  return (
                    <li key={step.title} className="sm:pr-3">
                      <div className="flex items-center">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-foreground/25">
                          <Icon className="h-5 w-5 text-brand-accent" aria-hidden="true" />
                        </span>
                        {index < checkerSteps.length - 1 && (
                          <span
                            aria-hidden="true"
                            className="relative mx-2 hidden h-px flex-1 bg-brand-foreground/25 sm:block"
                          >
                            <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent" />
                          </span>
                        )}
                      </div>
                      <p className="mt-3 flex items-baseline gap-2 text-sm font-semibold">
                        <span
                          aria-hidden="true"
                          className="flex h-5 w-5 shrink-0 translate-y-0.5 items-center justify-center rounded-full bg-brand-accent text-[0.65rem] font-bold text-brand-accent-foreground"
                        >
                          {index + 1}
                        </span>
                        {step.title}
                      </p>
                      <p className="mt-1 text-xs text-brand-foreground/70">{step.desc}</p>
                    </li>
                  );
                })}
              </ol>

              {/* The objections people arrive with */}
              <ul className="mt-8 grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-y-0">
                {checkerAssurances.map((item) => {
                  const Icon = assuranceIcons[item.icon];
                  return (
                    <li
                      key={item.title}
                      className="flex gap-3 sm:border-l sm:border-brand-foreground/20 sm:pl-4 sm:first:border-l-0 sm:first:pl-0"
                    >
                      <Icon className="h-6 w-6 shrink-0 text-brand-accent" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="mt-0.5 text-xs text-brand-foreground/70">{item.desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Live preview of the estimate. Same numbers as the calculator below,
                so it cannot drift — it moves as soon as the sliders do. */}
            <div className="rounded-xl border border-brand-foreground/20 bg-brand/80 p-6 shadow-elegant backdrop-blur-sm">
              <p className="text-xs uppercase tracking-widest text-brand-foreground/70">
                Estimated borrowing
              </p>
              <p className="mt-2 font-heading text-3xl font-bold tracking-tight text-brand-accent tabular-nums">
                {result.overCommitted ? "—" : asRoundedRupees(result.eligible)}
              </p>
              <p className="mt-1 text-sm text-brand-foreground/70">(Approx.)</p>

              <dl className="mt-5 space-y-3 border-t border-brand-foreground/15 pt-4 text-sm">
                {estimateRows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div key={row.label} className="flex items-center gap-3">
                      <Icon className="h-4 w-4 shrink-0 text-brand-foreground/50" aria-hidden="true" />
                      <dt className="text-xs text-brand-foreground/70">{row.label}</dt>
                      <dd className="ml-auto font-semibold tabular-nums">
                        {row.value}
                        {row.suffix && (
                          <span className="ml-1 text-xs font-normal text-brand-foreground/60">
                            {row.suffix}
                          </span>
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>

              <p className="mt-5 border-t border-brand-foreground/15 pt-4 text-xs italic text-brand-foreground/60">
                This is an indicative estimate. Final approval is at the lender's discretion.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-14">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          {/* Inputs */}
          <div className="rounded-xl border bg-card p-6 shadow-elegant">
            <fieldset>
              <legend className="text-sm text-muted-foreground">How do you earn?</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {employmentOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`cursor-pointer rounded-lg border p-4 transition ${
                      employment === option.id
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "hover:border-muted-foreground/40"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="employment"
                        value={option.id}
                        checked={employment === option.id}
                        onChange={() => setEmployment(option.id)}
                        className="h-4 w-4"
                      />
                      <span className="font-semibold">{option.label}</span>
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">{option.blurb}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-7 space-y-6">
              <SliderField
                id="elig-income"
                label="Monthly take-home income"
                value={`₹${inr.format(income)}`}
                min={15000}
                max={500000}
                step={5000}
                sliderValue={income}
                onChange={setIncome}
                hint="After tax and deductions — what actually reaches your account."
              />
              <SliderField
                id="elig-age"
                label="Your age"
                value={`${age} years`}
                min={21}
                max={64}
                step={1}
                sliderValue={age}
                onChange={setAge}
                hint={`Tenure is capped at age ${retirementAge[employment]}, which limits how long you can borrow for.`}
              />
              <SliderField
                id="elig-emi"
                label="Existing EMIs"
                value={`₹${inr.format(existingEmi)}`}
                min={0}
                max={200000}
                step={1000}
                sliderValue={existingEmi}
                onChange={setExistingEmi}
                hint="Car loans, personal loans, credit card EMIs — everything a lender will see."
              />
            </div>
          </div>

          {/* Result */}
          <div>
            <div className="rounded-xl bg-brand p-6 text-brand-foreground shadow-elegant" aria-live="polite">
              <p className="text-sm text-brand-foreground/75">You could be eligible for up to</p>
              <p className="font-heading text-5xl font-bold tracking-tight text-brand-accent tabular-nums">
                {result.overCommitted ? "—" : asAmount(result.eligible)}
              </p>
              <p className="mt-2 text-sm text-brand-foreground/75">
                {result.overCommitted
                  ? "Your existing EMIs already use the income a lender would count. Clearing one of them is the fastest way to change this."
                  : `at about ${rupees(result.emi)} a month over ${result.tenure} years`}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-brand-foreground/15">
                <div className="bg-brand p-4">
                  <dt className="text-xs uppercase tracking-wider text-brand-foreground/60">
                    Monthly EMI capacity
                  </dt>
                  <dd className="mt-1 font-heading text-xl font-bold tabular-nums">
                    {rupees(result.capacity)}
                  </dd>
                </div>
                <div className="bg-brand p-4">
                  <dt className="text-xs uppercase tracking-wider text-brand-foreground/60">
                    Maximum tenure
                  </dt>
                  <dd className="mt-1 font-heading text-xl font-bold tabular-nums">
                    {result.tenure} years
                  </dd>
                </div>
              </dl>
            </div>

            {/* The working */}
            <div className="mt-8 rounded-xl border bg-card p-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                How we got there
              </p>
              <h2 className="mt-2 font-heading text-xl font-semibold">The arithmetic in full</h2>
              <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">
                    A lender allows {Math.round(result.foir * 100)}% of your income toward EMIs.
                  </span>{" "}
                  That share rises with income, and is set slightly lower for self-employed
                  applicants because filed income is assessed more conservatively.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    {Math.round(result.foir * 100)}% of {rupees(income)} is{" "}
                    {rupees(income * result.foir)}.
                  </span>{" "}
                  Your existing EMIs of {rupees(existingEmi)} come off that, leaving{" "}
                  {rupees(result.capacity)} a month.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    You are {age}, so the tenure caps at {result.tenure} years.
                  </span>{" "}
                  Lenders want the loan repaid by age {retirementAge[employment]}.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    {rupees(result.capacity)} a month for {result.tenure} years at {indicativeRate}%
                  </span>{" "}
                  services a loan of about {asAmount(result.eligible)}.
                </li>
              </ol>
              <p className="mt-5 border-t pt-4 text-xs text-muted-foreground">
                One more limit applies: however much your income supports, a lender will not fund
                more than 75–90% of the property value. Your final amount is the lower of the two.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <LeadCapture
            context={summary}
            heading="Get your exact eligibility"
            blurb="This is an estimate from four numbers. Send it to us and we will tell you what our lenders will actually sanction — and which of them will say yes fastest."
          />
          <div className="rounded-xl border bg-muted/40 p-6">
            <h2 className="font-heading text-lg font-semibold">Want to improve the number?</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Clear a small existing loan — it frees EMI capacity immediately.</li>
              <li>Add a co-applicant. A spouse's income is added to yours.</li>
              <li>Choose a longer tenure, if your age allows it.</li>
              <li>Improve your credit score before applying, not after being refused.</li>
            </ul>
            <Button asChild variant="brand" className="mt-5 w-full">
              <Link to="/services/home-loans">See home loan criteria in full</Link>
            </Button>
          </div>
        </div>

        <p className="mt-8 max-w-prose text-xs text-muted-foreground">
          Indicative only, based on {indicativeRate}% p.a. and standard lending ratios. Every lender
          sets its own criteria, and your credit history, employer and the property all affect the
          final figure.
        </p>
      </section>
    </>
  );
};

export default EligibilityCheckerPage;
