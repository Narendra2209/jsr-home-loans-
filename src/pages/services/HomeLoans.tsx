import React from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import EmiCalculator from "@/components/EmiCalculator";
import LoanFeatures from "@/components/services/LoanFeatures";
import EligibilityAndDocuments from "@/components/services/EligibilityAndDocuments";
import { processSteps } from "@/content/homeLoan";
import { indicativeRate } from "@/content/company";
import hero from "@/assets/home-loan.jpg";

const HomeLoans: React.FC = () => {
  const quickSpecs = [
    { value: `${indicativeRate}%*`, label: "Starting rate p.a." },
    { value: "up to 90%", label: "Of property value" },
    { value: "30 years", label: "Maximum tenure" },
  ];

  return (
    <>
      <SEO
        title="Home Loans in Hyderabad | Low Interest & Quick Approvals"
        description="Home Loans in Hyderabad from JSR Home Loan Services. Eligibility for salaried, self-employed and NRI applicants, document checklists, an EMI calculator, and support to disbursement."
        canonicalPath="/services/home-loans"
      />

      {/* Hero */}
      <section className="bg-brand py-16 text-brand-foreground md:py-20">
        <div className="container grid items-center gap-10 md:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
              Home Loans in Hyderabad
            </p>
            <h1 className="mt-3 max-w-[18ch] font-heading text-4xl font-bold tracking-tight md:text-5xl">
              Buy the house. We will handle the bank.
            </h1>
            <p className="mt-4 max-w-prose text-lg text-brand-foreground/85">
              Compare offers from 20+ lenders, get the rate you actually qualify for, and let us
              carry the paperwork from application to disbursement.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact?service=Home%20Loan">Apply for Home Loan</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#eligibility">Check Eligibility</a>
              </Button>
            </div>

            <dl className="mt-8 grid overflow-hidden rounded-lg border border-brand-foreground/15 sm:grid-cols-3">
              {quickSpecs.map((spec) => (
                <div key={spec.label} className="border-b border-brand-foreground/15 p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                  <dt className="sr-only">{spec.label}</dt>
                  <dd>
                    <span className="block font-heading text-2xl font-bold tracking-tight text-brand-accent">
                      {spec.value}
                    </span>
                    <span className="text-xs text-brand-foreground/70">{spec.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-brand-foreground/60">
              *Rates vary by lender, loan amount and credit profile. T&amp;C apply.
            </p>
          </div>

          <img
            src={hero}
            alt="Couple signing home loan documents in Hyderabad"
            className="w-full rounded-lg shadow-glow"
            loading="lazy"
          />
        </div>
      </section>

      <LoanFeatures />

      {/* EMI calculator */}
      <section className="bg-muted/40 py-16">
        <div className="container grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Plan your EMI
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold">What will it cost a month?</h2>
            <p className="mt-4 max-w-prose text-muted-foreground">
              Move the sliders to see your monthly outgo, the total interest over the life of the
              loan, and what you will have repaid by the end.
            </p>
            <p className="mt-3 max-w-prose text-muted-foreground">
              Most people are surprised by the total interest figure. It is the strongest argument
              for getting the rate right the first time.
            </p>
          </div>
          <EmiCalculator />
        </div>
      </section>

      <EligibilityAndDocuments />

      {/* Process */}
      <section className="bg-muted/40 py-16">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">The process</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold">How your home loan gets done</h2>

          <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand font-heading text-sm font-bold text-brand-foreground">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand py-16 text-brand-foreground">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
            Next step
          </p>
          <h2 className="mt-2 max-w-[22ch] font-heading text-3xl font-semibold">
            Find out what you qualify for, before you commit to anything
          </h2>
          <p className="mt-3 max-w-prose text-brand-foreground/85">
            Tell us the property and your income. We come back with the lenders who will say yes, and
            what each one will charge you.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/contact?service=Home%20Loan">Apply for Home Loan</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="tel:9000781967">Call 9000781967</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeLoans;
