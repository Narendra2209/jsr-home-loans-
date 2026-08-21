import React, { useMemo, useState } from "react";
import SEO from "@/components/SEO";
import { Slider } from "@/components/ui/slider";
import LeadCapture from "@/components/LeadCapture";
import { emiFor, rupees, shortAmount } from "@/lib/loan";
import { indicativeRate } from "@/content/company";
import heroImg from "@/assets/hero-jsr.jpg";

type FieldProps = {
  id: string;
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  sliderValue: number;
  onChange: (value: number) => void;
};

const Field: React.FC<FieldProps> = ({ id, label, value, min, max, step, sliderValue, onChange }) => (
  <div>
    <div className="flex items-baseline justify-between gap-3">
      <span id={id} className="text-sm text-muted-foreground">{label}</span>
      <span className="font-heading text-sm font-semibold tabular-nums">{value}</span>
    </div>
    <Slider
      className="mt-3"
      value={[sliderValue]}
      min={min}
      max={max}
      step={step}
      onValueChange={([next]) => onChange(next)}
      aria-labelledby={id}
      aria-valuetext={value}
    />
  </div>
);

const EmiCalculatorPage: React.FC = () => {
  const [amount, setAmount] = useState(3000000);
  const [rate, setRate] = useState(indicativeRate);
  const [years, setYears] = useState(20);

  const { emi, interest, payable, principalShare, schedule } = useMemo(() => {
    const months = years * 12;
    const monthlyRate = rate / 12 / 100;
    const emiValue = emiFor(amount, rate, months);
    const total = emiValue * months;

    let balance = amount;
    const rows: { year: number; principal: number; interest: number; balance: number }[] = [];
    for (let year = 1; year <= years; year++) {
      let principalPaid = 0;
      let interestPaid = 0;
      for (let month = 0; month < 12 && balance > 0; month++) {
        const interestPart = balance * monthlyRate;
        const principalPart = Math.min(emiValue - interestPart, balance);
        principalPaid += principalPart;
        interestPaid += interestPart;
        balance -= principalPart;
      }
      rows.push({ year, principal: principalPaid, interest: interestPaid, balance: Math.max(0, balance) });
    }

    return {
      emi: emiValue,
      interest: total - amount,
      payable: total,
      principalShare: (amount / total) * 100,
      schedule: rows,
    };
  }, [amount, rate, years]);

  const summary = `${rupees(amount)} at ${rate.toFixed(2)}% over ${years} years — EMI ${rupees(emi)}`;

  return (
    <>
      <SEO
        title="Home Loan EMI Calculator | JSR Home Loan Services, Hyderabad"
        description="Calculate your home loan EMI, total interest and full repayment schedule. See how much of your total goes to the bank, and what rate you would actually be offered in Hyderabad."
        canonicalPath="/emi-calculator"
      />

      <section className="relative overflow-hidden py-16 text-brand-foreground md:py-24">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="EMI Calculator"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-brand/90 md:bg-brand/0 md:bg-gradient-to-r md:from-brand md:via-brand/90 md:to-transparent" />
        </div>

        <div className="container relative z-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
            EMI Calculator
          </p>
          <h1 className="mt-3 max-w-[20ch] font-heading text-4xl font-bold tracking-tight md:text-5xl">
            What will your loan actually cost?
          </h1>
          <p className="mt-4 max-w-prose text-lg text-brand-foreground/90">
            Your monthly EMI, the total interest over the full term, and a year-by-year repayment
            schedule. No sign-up, no phone number.
          </p>
        </div>
      </section>

      <section className="container py-14">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          {/* Inputs and split */}
          <div className="rounded-xl border bg-card p-6 shadow-elegant">
            <div className="space-y-6">
              <Field
                id="calc-amount"
                label="Loan amount"
                value={shortAmount(amount)}
                min={100000}
                max={50000000}
                step={100000}
                sliderValue={amount}
                onChange={setAmount}
              />
              <Field
                id="calc-rate"
                label="Interest rate"
                value={`${rate.toFixed(2)}% p.a.`}
                min={6}
                max={18}
                step={0.05}
                sliderValue={rate}
                onChange={setRate}
              />
              <Field
                id="calc-years"
                label="Tenure"
                value={`${years} ${years === 1 ? "year" : "years"}`}
                min={1}
                max={30}
                step={1}
                sliderValue={years}
                onChange={setYears}
              />
            </div>

            <div className="mt-8">
              <p className="text-sm text-muted-foreground">
                Where your money goes over the full term
              </p>
              <div
                className="mt-3 flex h-8 gap-0.5"
                role="img"
                aria-label={`Of ${rupees(payable)} repaid, ${rupees(amount)} is principal and ${rupees(interest)} is interest`}
              >
                <span
                  className="h-full rounded-l bg-chart-principal"
                  style={{ width: `${principalShare}%` }}
                />
                <span
                  className="h-full rounded-r bg-chart-interest"
                  style={{ width: `${100 - principalShare}%` }}
                />
              </div>

              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 shrink-0 rounded-sm bg-chart-principal" aria-hidden="true" />
                  <dt className="flex-1">Principal — the house</dt>
                  <dd className="font-semibold tabular-nums">{rupees(amount)}</dd>
                  <dd className="w-12 text-right tabular-nums text-muted-foreground">
                    {Math.round(principalShare)}%
                  </dd>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 shrink-0 rounded-sm bg-chart-interest" aria-hidden="true" />
                  <dt className="flex-1">Interest — the bank</dt>
                  <dd className="font-semibold tabular-nums">{rupees(interest)}</dd>
                  <dd className="w-12 text-right tabular-nums text-muted-foreground">
                    {Math.round(100 - principalShare)}%
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Results and schedule */}
          <div>
            <div className="rounded-xl bg-brand p-6 text-brand-foreground shadow-elegant">
              <p className="text-sm text-brand-foreground/75">Your monthly EMI</p>
              <p className="font-heading text-5xl font-bold tracking-tight text-brand-accent tabular-nums" aria-live="polite">
                {rupees(emi)}
              </p>
              <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-brand-foreground/15">
                <div className="bg-brand p-4">
                  <dt className="text-xs uppercase tracking-wider text-brand-foreground/60">
                    Total interest
                  </dt>
                  <dd className="mt-1 font-heading text-xl font-bold tabular-nums">
                    {rupees(interest)}
                  </dd>
                </div>
                <div className="bg-brand p-4">
                  <dt className="text-xs uppercase tracking-wider text-brand-foreground/60">
                    Total payable
                  </dt>
                  <dd className="mt-1 font-heading text-xl font-bold tabular-nums">
                    {rupees(payable)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Repayment schedule
              </p>
              <div className="mt-3 max-h-72 overflow-auto rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-card">
                    <tr className="border-b text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="px-3 py-2 text-left font-semibold">Year</th>
                      <th className="px-3 py-2 text-left font-semibold">Principal</th>
                      <th className="px-3 py-2 text-left font-semibold">Interest</th>
                      <th className="px-3 py-2 text-left font-semibold">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((row) => (
                      <tr key={row.year} className="border-b last:border-b-0">
                        <td className="px-3 py-2 tabular-nums">{row.year}</td>
                        <td className="px-3 py-2 tabular-nums">{rupees(row.principal)}</td>
                        <td className="px-3 py-2 tabular-nums">{rupees(row.interest)}</td>
                        <td className="px-3 py-2 tabular-nums">{rupees(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-2xl">
          <LeadCapture context={summary} service="Home Loan" />
        </div>

        <p className="mt-6 max-w-prose text-xs text-muted-foreground">
          Indicative only. Your actual EMI depends on the lender, loan amount and credit profile.
        </p>
      </section>
    </>
  );
};

export default EmiCalculatorPage;
