import React from "react";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/mortgage-loan-hero.jpg";
import {
  acceptedProperty,
  applicantDocuments,
  fundingByType,
  propertyDocuments,
  rejectedProperty,
  specifications,
} from "@/content/loanAgainstProperty";

const quickSpecs = [
  { value: "[9%–12%]", label: "Interest range p.a." },
  { value: "50%–70%", label: "Of property value" },
  { value: "15 years", label: "Maximum tenure" },
];

const MortgageLoans: React.FC = () => (
  <>
    <SEO
      title="Loan Against Property in Hyderabad | Mortgage Loan | JSR"
      description="Loan against property in Hyderabad — which properties qualify, how much you can raise, interest rates and the documents you need. Mortgage loans arranged by JSR Home Loan Services."
      canonicalPath="/services/mortgage-loans"
    />

    {/* Hero */}
    <section className="relative isolate overflow-hidden bg-brand py-16 text-brand-foreground md:py-20">
      {/* Photograph bleeds off the right; navy holds the left so the copy stays readable */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="A model house at dusk beside a loan against property form, house keys and stacked coins"
          decoding="async"
          className="absolute inset-y-0 right-0 h-full w-full object-cover object-[center_40%] md:w-[56%]"
        />
        {/* Solid navy on phones; on desktop it holds to 42% then clears so the photo reads */}
        <div className="absolute inset-0 bg-brand/90 md:hidden" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,hsl(var(--brand))_0%,hsl(var(--brand))_42%,hsl(var(--brand)/0.72)_50%,hsl(var(--brand)/0.16)_60%,hsl(var(--brand)/0)_70%)] md:block" />
      </div>

      <div className="container relative z-10">
        <div className="md:max-w-[56%]">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
            Loan Against Property · Mortgage Loan
          </p>
          <h1 className="mt-3 max-w-[19ch] font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Your property is worth more than it is doing.
          </h1>
          <p className="mt-4 max-w-prose text-lg text-brand-foreground/85">
            Borrow against a house, shop or office you already own — for business, education, medical
            costs or consolidating expensive debt. Lower rates than a personal loan, longer to repay,
            and you keep the property.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/contact?service=Loan%20Against%20Property">
                Check What My Property Qualifies For
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="tel:9000781967">Call 9000781967</a>
            </Button>
          </div>

          <dl className="mt-8 grid max-w-2xl overflow-hidden rounded-lg border border-brand-foreground/15 sm:grid-cols-3">
            {quickSpecs.map((spec) => (
              <div
                key={spec.label}
                className="border-b border-brand-foreground/15 p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
              >
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
        </div>
      </div>
    </section>

    {/* Property eligibility */}
    <section className="container py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        Property eligibility
      </p>
      <h2 className="mt-2 font-heading text-3xl font-semibold">What we can lend against</h2>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="font-semibold">Usually accepted</h3>
          <ul className="mt-3">
            {acceptedProperty.map((item) => (
              <li key={item} className="flex gap-3 border-b py-2.5 text-sm">
                <Check className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Usually not accepted</h3>
          <ul className="mt-3">
            {rejectedProperty.map((item) => (
              <li key={item} className="flex gap-3 border-b py-2.5 text-sm">
                <X className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t pt-8">
        <h3 className="font-heading text-xl font-semibold">Whatever the property, it must have</h3>
        <p className="mt-2 max-w-prose text-muted-foreground">
          A clear and marketable title, an approved building plan, property tax paid up to date, and
          an encumbrance certificate showing no existing charge. If any of those is missing we will
          tell you before you spend anything on valuation.
        </p>
      </div>
    </section>

    {/* Funding percentage */}
    <section className="bg-muted/40 py-16">
      <div className="container">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          How much you can raise
        </p>
        <h2 className="mt-2 font-heading text-3xl font-semibold">Funding by property type</h2>
        <p className="mt-3 max-w-prose text-muted-foreground">
          A percentage of the lender's valuation — not of what you paid, and not of what you think it
          is worth.
        </p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-3 py-3 text-left font-semibold">Property type</th>
                <th className="px-3 py-3 text-left font-semibold">Funding</th>
                <th className="px-3 py-3 text-left font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {fundingByType.map((row) => (
                <tr key={row.type} className="border-b">
                  <td className="px-3 py-3 font-medium">{row.type}</td>
                  <td className="px-3 py-3 font-semibold tabular-nums">{row.funding}</td>
                  <td className="px-3 py-3 text-muted-foreground">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 max-w-prose text-sm text-muted-foreground">
          The valuation is the lender's, done by their empanelled valuer. We will give you a
          realistic estimate before you apply so there are no surprises.
        </p>
      </div>
    </section>

    {/* Rates, charges, documents */}
    <section className="container py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">At a glance</p>
      <h2 className="mt-2 font-heading text-3xl font-semibold">Rates and charges</h2>

      <dl className="mt-8 max-w-3xl border-t">
        {specifications.map((row) => (
          <div key={row.label} className="flex flex-col gap-1 border-b py-3 sm:flex-row sm:gap-6">
            <dt className="text-xs uppercase tracking-wider text-muted-foreground sm:w-48 sm:shrink-0 sm:pt-1">
              {row.label}
            </dt>
            <dd>
              <span className="font-medium">{row.value}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground">{row.note}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 border-t pt-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Documents</p>
        <h2 className="mt-2 font-heading text-2xl font-semibold">
          Property papers do the heavy lifting
        </h2>

        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-semibold">About the property</h3>
            <ul className="mt-3">
              {propertyDocuments.map((item) => (
                <li key={item} className="flex gap-3 border-b py-2.5 text-sm">
                  <span className="text-primary" aria-hidden="true">▢</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">About you</h3>
            <ul className="mt-3">
              {applicantDocuments.map((item) => (
                <li key={item} className="flex gap-3 border-b py-2.5 text-sm">
                  <span className="text-primary" aria-hidden="true">▢</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default MortgageLoans;
