import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SliderField from "@/components/SliderField";
import { eligibilityIncomeRatio } from "@/content/home";
import { indicativeRate } from "@/content/company";
import { asAmount, inr, principalFor } from "@/lib/loan";

const EligibilityCheck: React.FC = () => {
  const [income, setIncome] = useState(80000);
  const [existingEmi, setExistingEmi] = useState(0);
  const [years, setYears] = useState(20);

  const { capacity, eligible } = useMemo(() => {
    const monthlyCapacity = Math.max(0, income * eligibilityIncomeRatio - existingEmi);
    const principal = principalFor(monthlyCapacity, indicativeRate, years * 12);
    return { capacity: Math.round(monthlyCapacity), eligible: principal };
  }, [income, existingEmi, years]);

  return (
    <section id="eligibility" className="scroll-mt-20 bg-brand py-16 text-brand-foreground">
      <div className="container grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
            Two minutes, no documents
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold">Find out what you can borrow</h2>
          <p className="mt-3 max-w-prose text-brand-foreground/80">
            Move the sliders. No form, no phone number, no obligation — see the number first and talk
            to us after.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-elegant">
          <div className="space-y-5">
            <SliderField
              id="elig-income"
              label="Monthly take-home income"
              value={`₹${inr.format(income)}`}
              min={20000}
              max={500000}
              step={5000}
              sliderValue={income}
              onChange={setIncome}
            />
            <SliderField
              id="elig-emi"
              label="Existing EMIs"
              value={`₹${inr.format(existingEmi)}`}
              min={0}
              max={150000}
              step={1000}
              sliderValue={existingEmi}
              onChange={setExistingEmi}
            />
            <SliderField
              id="elig-tenure"
              label="Tenure you want"
              value={`${years} years`}
              min={5}
              max={30}
              step={1}
              sliderValue={years}
              onChange={setYears}
            />
          </div>

          <div className="mt-6 rounded-lg bg-muted/60 p-4" aria-live="polite">
            <p className="text-sm text-muted-foreground">You could be eligible for up to</p>
            <p className="font-heading text-3xl font-bold tabular-nums">{asAmount(eligible)}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {capacity > 0
                ? `at about ₹${inr.format(capacity)} a month for ${years} years`
                : "Your existing EMIs already use the income a lender would count."}
            </p>
          </div>

          <Button asChild variant="hero" size="lg" className="mt-5 w-full">
            <Link to="/eligibility-checker">Check My Exact Eligibility</Link>
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            Indicative, based on {indicativeRate}% p.a. and{" "}
            {Math.round(eligibilityIncomeRatio * 100)}% of your income going to EMIs. Your real limit
            depends on the lender, your credit score and the property.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EligibilityCheck;
