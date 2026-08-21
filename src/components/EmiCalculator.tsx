import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { indicativeRate } from "@/content/company";
import { emiFor, inr, shortAmount } from "@/lib/loan";

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

const EmiCalculator: React.FC = () => {
  const [amount, setAmount] = useState(3000000);
  const [rate, setRate] = useState(indicativeRate);
  const [years, setYears] = useState(20);

  const { emi, totalInterest, totalPayable } = useMemo(() => {
    const months = years * 12;
    const emiValue = emiFor(amount, rate, months);
    const payable = emiValue * months;
    return {
      emi: Math.round(emiValue),
      totalInterest: Math.round(payable - amount),
      totalPayable: Math.round(payable),
    };
  }, [amount, rate, years]);

  return (
    <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-elegant">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-lg font-semibold">EMI Calculator</h2>
        <span className="text-xs text-muted-foreground">Instant estimate</span>
      </div>

      <div className="mt-5 space-y-5">
        <Field
          id="emi-amount"
          label="Loan amount"
          value={shortAmount(amount)}
          min={100000}
          max={50000000}
          step={100000}
          sliderValue={amount}
          onChange={setAmount}
        />
        <Field
          id="emi-rate"
          label="Interest rate"
          value={`${rate.toFixed(2)}% p.a.`}
          min={7}
          max={15}
          step={0.05}
          sliderValue={rate}
          onChange={setRate}
        />
        <Field
          id="emi-tenure"
          label="Tenure"
          value={`${years} ${years === 1 ? "year" : "years"}`}
          min={1}
          max={30}
          step={1}
          sliderValue={years}
          onChange={setYears}
        />
      </div>

      <div className="mt-6 rounded-lg bg-muted/60 p-4">
        <p className="text-sm text-muted-foreground">Your monthly EMI</p>
        <p className="font-heading text-3xl font-bold tabular-nums" aria-live="polite">
          ₹{inr.format(emi)}
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-4 border-t pt-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Total interest</dt>
            <dd className="mt-0.5 font-semibold tabular-nums">₹{inr.format(totalInterest)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Total payable</dt>
            <dd className="mt-0.5 font-semibold tabular-nums">₹{inr.format(totalPayable)}</dd>
          </div>
        </dl>
      </div>

      <Button asChild variant="hero" size="lg" className="mt-5 w-full">
        <Link to="/contact?service=Home%20Loan">Get This Rate</Link>
      </Button>
      <p className="mt-3 text-xs text-muted-foreground">
        Indicative only. Your actual EMI depends on the lender, loan amount and credit profile.
      </p>
    </div>
  );
};

export default EmiCalculator;
