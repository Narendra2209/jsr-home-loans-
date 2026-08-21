import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { emiFor, rupees, shortAmount } from "@/lib/loan";
import { switchingCosts } from "@/content/balanceTransfer";
import { indicativeRate } from "@/content/company";

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

type Verdict = { tone: "good" | "warn" | "bad"; lead: string; rest: string };

const SavingsCalculator: React.FC = () => {
  const [outstanding, setOutstanding] = useState(3500000);
  const [oldRate, setOldRate] = useState(9.5);
  const [years, setYears] = useState(18);
  const [newRate, setNewRate] = useState(indicativeRate);

  const result = useMemo(() => {
    const months = years * 12;
    const emiOld = emiFor(outstanding, oldRate, months);
    const emiNew = emiFor(outstanding, newRate, months);
    const monthly = emiOld - emiNew;
    const fee = outstanding * switchingCosts.processingFeeRate;
    const cost = fee + switchingCosts.legalAndValuation;
    const net = monthly * months - cost;
    const breakEven = monthly > 0 ? Math.ceil(cost / monthly) : Infinity;

    let verdict: Verdict;
    if (monthly <= 0) {
      verdict = {
        tone: "bad",
        lead: "No saving.",
        rest: "The new rate is not below your current one.",
      };
    } else if (breakEven > months) {
      verdict = {
        tone: "bad",
        lead: "Not worth it.",
        rest: "You would not recover the switching cost before the loan ends.",
      };
    } else if (breakEven <= 12) {
      verdict = {
        tone: "good",
        lead: "Worth doing.",
        rest: `You recover the switching cost in ${breakEven} months, then it is all yours.`,
      };
    } else if (breakEven <= 24) {
      verdict = {
        tone: "warn",
        lead: "Worth it if you are staying.",
        rest: `Break-even takes ${breakEven} months.`,
      };
    } else {
      verdict = {
        tone: "bad",
        lead: "Probably not.",
        rest: `${breakEven} months to break even is too long to be worth the paperwork.`,
      };
    }

    return { emiOld, emiNew, monthly, fee, cost, net, verdict };
  }, [outstanding, oldRate, years, newRate]);

  const verdictClass = {
    good: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
    warn: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
    bad: "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
  }[result.verdict.tone];

  return (
    <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-elegant">
      <div className="space-y-5">
        <Field
          id="bt-amount"
          label="Outstanding loan amount"
          value={shortAmount(outstanding)}
          min={500000}
          max={20000000}
          step={100000}
          sliderValue={outstanding}
          onChange={setOutstanding}
        />
        <Field
          id="bt-old"
          label="Your current rate"
          value={`${oldRate.toFixed(2)}% p.a.`}
          min={7}
          max={15}
          step={0.05}
          sliderValue={oldRate}
          onChange={setOldRate}
        />
        <Field
          id="bt-years"
          label="Years remaining"
          value={`${years} ${years === 1 ? "year" : "years"}`}
          min={2}
          max={30}
          step={1}
          sliderValue={years}
          onChange={setYears}
        />
        <Field
          id="bt-new"
          label="New rate we find you"
          value={`${newRate.toFixed(2)}% p.a.`}
          min={7}
          max={12}
          step={0.05}
          sliderValue={newRate}
          onChange={setNewRate}
        />
      </div>

      <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-lg border" aria-live="polite">
        <div className="border-r p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">EMI now</p>
          <p className="mt-0.5 font-heading text-2xl font-bold tabular-nums">
            {rupees(result.emiOld)}
          </p>
        </div>
        <div className="bg-muted/60 p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">EMI after transfer</p>
          <p className="mt-0.5 font-heading text-2xl font-bold tabular-nums">
            {rupees(result.emiNew)}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-brand p-4 text-brand-foreground">
        <p className="text-sm text-brand-foreground/75">You keep, over the remaining term</p>
        <p className="font-heading text-3xl font-bold tabular-nums text-brand-accent">
          {result.net > 0 ? rupees(result.net) : "Nothing"}
        </p>
        <p className="mt-1 text-sm text-brand-foreground/75">
          {result.monthly > 0
            ? `${rupees(result.monthly)} a month, after switching costs are recovered`
            : "Your new rate is not lower than the one you have."}
        </p>
      </div>

      <dl className="mt-5 border-t pt-4 text-sm">
        <div className="flex justify-between gap-4 py-1">
          <dt className="text-muted-foreground">
            Processing fee ({(switchingCosts.processingFeeRate * 100).toFixed(2)}%)
          </dt>
          <dd className="font-medium tabular-nums">{rupees(result.fee)}</dd>
        </div>
        <div className="flex justify-between gap-4 py-1">
          <dt className="text-muted-foreground">Legal &amp; valuation</dt>
          <dd className="font-medium tabular-nums">{rupees(switchingCosts.legalAndValuation)}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t py-2">
          <dt className="font-medium">Cost to switch</dt>
          <dd className="font-semibold tabular-nums">{rupees(result.cost)}</dd>
        </div>
      </dl>

      <p className={`mt-4 rounded-lg border p-4 text-sm ${verdictClass}`}>
        <strong>{result.verdict.lead}</strong> {result.verdict.rest}
      </p>

      <Button asChild variant="hero" size="lg" className="mt-5 w-full">
        <Link to="/contact?service=Balance%20Transfer">Get My Exact Numbers</Link>
      </Button>

      <p className="mt-3 text-xs text-muted-foreground">
        Indicative. Stamp duty on the mortgage deed may apply depending on the lender and state, so
        treat the break-even as a floor. Foreclosure charges are nil on floating-rate home loans to
        individuals.
      </p>
    </div>
  );
};

export default SavingsCalculator;
