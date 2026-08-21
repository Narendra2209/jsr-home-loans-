import React from "react";
import { Link } from "react-router-dom";
import {
  CalendarCheck,
  FileCheck2,
  PiggyBank,
  TrendingDown,
  X,
} from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import SavingsCalculator from "@/components/services/SavingsCalculator";
import {
  dontTransferWhen,
  examples,
  heroHighlights,
  lenderFees,
  processSteps,
  switchingCosts,
  type HighlightIcon,
} from "@/content/balanceTransfer";
import { emiFor, rupees } from "@/lib/loan";
import heroImage from "@/assets/balance-transfer-hero.jpg";

/** Hero strip icons, keyed off the content module so that file stays plain data. */
const highlightIcons: Record<HighlightIcon, React.ComponentType<{ className?: string }>> = {
  rate: TrendingDown,
  tenure: CalendarCheck,
  savings: PiggyBank,
  process: FileCheck2,
};

const BalanceTransfer: React.FC = () => {
  const rows = examples.map((example) => {
    const months = example.years * 12;
    const emiOld = emiFor(example.outstanding, example.oldRate, months);
    const emiNew = emiFor(example.outstanding, example.newRate, months);
    const monthly = emiOld - emiNew;
    const total = monthly * months;
    const cost =
      example.outstanding * switchingCosts.processingFeeRate + switchingCosts.legalAndValuation;
    return { ...example, emiOld, emiNew, monthly, total, worthIt: total > cost * 2 };
  });

  return (
    <>
      <SEO
        title="Home Loan Balance Transfer in Hyderabad | Lower Your EMI"
        description="Transfer your home loan to a lower rate. Calculate your exact saving and break-even, compare processing fees, and see when a transfer is not worth it. JSR Home Loan Services, Hyderabad."
        canonicalPath="/services/balance-transfer"
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-brand py-16 text-brand-foreground md:py-20">
        {/* Photograph bleeds off the right; navy holds the left so the copy stays readable */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="A model house beside a calculator, stacked coins and a loan balance transfer statement"
            decoding="async"
            className="absolute inset-y-0 right-0 h-full w-full object-cover object-[center_55%] md:w-[58%]"
          />
          {/* Solid navy on phones; on desktop it holds to 42% then clears so the photo reads */}
          <div className="absolute inset-0 bg-brand/90 md:hidden" />
          <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,hsl(var(--brand))_0%,hsl(var(--brand))_42%,hsl(var(--brand)/0.72)_50%,hsl(var(--brand)/0.16)_60%,hsl(var(--brand)/0)_70%)] md:block" />
        </div>

        <div className="container relative z-10">
          <div className="md:max-w-[56%]">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
              Home Loan Balance Transfer
            </p>
            <h1 className="mt-3 max-w-[19ch] font-heading text-4xl font-bold tracking-tight md:text-5xl">
              Still paying 9.5%? You are giving the bank money for nothing.
            </h1>
            <p className="mt-4 max-w-prose text-lg text-brand-foreground/85">
              Rates have moved. Most loans taken more than two years ago sit above what the same
              borrower would be offered today — and the lender has no reason to tell you. Move it,
              and the difference stays in your account every month for the rest of the term.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <a href="#savings">Calculate My Savings</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact?service=Balance%20Transfer">Talk to Us</Link>
              </Button>
            </div>

            <ul className="mt-10 grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-y-0">
              {heroHighlights.map((highlight) => {
                const Icon = highlightIcons[highlight.icon];
                return (
                  <li
                    key={highlight.title}
                    className="sm:border-l sm:border-brand-foreground/20 sm:pl-5 sm:first:border-l-0 sm:first:pl-0"
                  >
                    <Icon className="h-7 w-7 text-brand-accent" aria-hidden="true" />
                    <p className="mt-3 text-sm font-semibold">{highlight.title}</p>
                    <p className="mt-1 text-xs text-brand-foreground/70">{highlight.desc}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Savings calculator */}
      <section id="savings" className="scroll-mt-20 bg-muted/40 py-16">
        <div className="container grid items-start gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Your savings
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold">
              What are you leaving on the table?
            </h2>
            <p className="mt-4 max-w-prose text-muted-foreground">
              Enter what you owe now, not what you originally borrowed — the outstanding balance is
              what gets transferred.
            </p>
            <p className="mt-3 max-w-prose text-muted-foreground">
              The calculator subtracts the cost of switching before it tells you anything, so the
              figure you see is the one you actually keep. Drag the tenure down to four or five years
              and watch the verdict change: on a loan that is nearly paid off, a transfer usually is
              not worth it, and we will say so.
            </p>
          </div>
          <SavingsCalculator />
        </div>
      </section>

      {/* Worked examples */}
      <section className="container py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Worked examples
        </p>
        <h2 className="mt-2 font-heading text-3xl font-semibold">
          What a transfer looks like in rupees
        </h2>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="border-b text-xs uppercase tracking-wider text-muted-foreground">
                <th className="whitespace-nowrap px-3 py-3 text-left font-semibold">Outstanding</th>
                <th className="whitespace-nowrap px-3 py-3 text-left font-semibold">Years left</th>
                <th className="whitespace-nowrap px-3 py-3 text-left font-semibold">Rate</th>
                <th className="whitespace-nowrap px-3 py-3 text-left font-semibold">EMI now</th>
                <th className="whitespace-nowrap px-3 py-3 text-left font-semibold">EMI after</th>
                <th className="whitespace-nowrap px-3 py-3 text-left font-semibold">Monthly saving</th>
                <th className="whitespace-nowrap px-3 py-3 text-left font-semibold">Total saved</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.outstanding} className="border-b">
                  <td className="whitespace-nowrap px-3 py-3 tabular-nums">
                    {rupees(row.outstanding)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 tabular-nums">{row.years}</td>
                  <td className="whitespace-nowrap px-3 py-3 tabular-nums">
                    {row.oldRate}% → {row.newRate}%
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 tabular-nums">{rupees(row.emiOld)}</td>
                  <td className="whitespace-nowrap px-3 py-3 tabular-nums">{rupees(row.emiNew)}</td>
                  <td
                    className={`whitespace-nowrap px-3 py-3 font-semibold tabular-nums ${
                      row.worthIt ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"
                    }`}
                  >
                    {rupees(row.monthly)}
                  </td>
                  <td
                    className={`whitespace-nowrap px-3 py-3 font-semibold tabular-nums ${
                      row.worthIt ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"
                    }`}
                  >
                    {rupees(row.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 max-w-prose text-xs text-muted-foreground">
          The last row is the point: a small saving against roughly {rupees(
            examples[3].outstanding * switchingCosts.processingFeeRate +
              switchingCosts.legalAndValuation,
          )}{" "}
          to switch takes over two and a half years to break even. We would tell you not to bother.
        </p>
      </section>

      {/* Lender fees */}
      <section className="bg-muted/40 py-16">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Comparison</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold">
            What lenders charge to take over your loan
          </h2>
          <p className="mt-3 max-w-prose text-muted-foreground">
            Interest rates move every time the repo rate does, so we do not publish them here — we
            check every lender the day you apply and bring you the live numbers. Processing fees move
            far more slowly.
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-3 py-3 text-left font-semibold">Lender</th>
                  <th className="px-3 py-3 text-left font-semibold">Processing fee</th>
                  <th className="px-3 py-3 text-left font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {lenderFees.map((row) => (
                  <tr key={row.lender} className="border-b">
                    <td className="px-3 py-3 font-medium">{row.lender}</td>
                    <td className="px-3 py-3 tabular-nums">{row.fee}</td>
                    <td className="px-3 py-3 text-muted-foreground">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* When not to transfer */}
      <section className="container py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Straight answer
        </p>
        <h2 className="mt-2 font-heading text-3xl font-semibold">
          When we will tell you not to bother
        </h2>

        <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {dontTransferWhen.map((item) => (
            <li key={item.title} className="rounded-lg border bg-card p-6 shadow-sm">
              <X className="h-5 w-5 text-red-600 dark:text-red-400" aria-hidden="true" />
              <h3 className="mt-3 font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-prose text-sm text-muted-foreground">
          Before you transfer anything, ask your current bank to match the rate. They sometimes will,
          it costs you nothing, and we will tell you when it is worth asking.
        </p>
      </section>

      {/* Process */}
      <section className="bg-muted/40 py-16">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">The process</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold">From enquiry to a lower EMI</h2>

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
            Send us your loan statement. We will tell you if it is worth moving.
          </h2>
          <p className="mt-3 max-w-prose text-brand-foreground/85">
            Outstanding balance, current rate, years left. That is all we need to give you the real
            number — and if it does not pay for itself, we will say so.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/contact?service=Balance%20Transfer">Check My Transfer</Link>
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

export default BalanceTransfer;
