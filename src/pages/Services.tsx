import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { products } from "@/content/products";
import homeImg from "@/assets/home-loan.jpg";
import mortgageImg from "@/assets/mortgage-loan.jpg";
import personalImg from "@/assets/personal-loan.jpg";

/** The products given a card of their own at the top of the page. */
const featured = [
  {
    to: "/services/home-loans",
    label: "Home Loans",
    blurb: "Buy your home with the rate you actually qualify for, and the paperwork carried for you.",
    image: homeImg,
    alt: "Home loans in Hyderabad",
  },
  {
    to: "/services/mortgage-loans",
    label: "Loan Against Property",
    blurb: "Raise money against a house, shop or office you already own.",
    image: mortgageImg,
    alt: "Loan against property in Hyderabad",
  },
  {
    to: "/services/personal-loans",
    label: "Personal Loan",
    blurb: "Unsecured money for a wedding, a medical bill or a course — quick, with no collateral.",
    image: personalImg,
    alt: "Personal loans in Hyderabad",
  },
];

/**
 * Products that already have a card above are dropped from the grid below, so
 * nothing appears on this page twice.
 */
const featuredSlugs = new Set(featured.map((item) => item.to.replace("/services/", "")));
const alsoArranged = products.filter((product) => !featuredSlugs.has(product.slug));

const Services: React.FC = () => (
  <>
    <SEO
      title="Loan Services in Hyderabad | Home, Property, Business | JSR"
      description="Every loan JSR Home Loan Services arranges in Hyderabad — home loans, construction, renovation, plot purchase, loan against property, commercial property, balance transfer, personal, education, car and business loans."
      canonicalPath="/services"
    />

    <section className="bg-brand py-14 text-brand-foreground">
      <div className="container">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
          Our services
        </p>
        <h1 className="mt-3 max-w-[20ch] font-heading text-4xl font-bold tracking-tight md:text-5xl">
          Eleven kinds of loan, one place to arrange them
        </h1>
        <p className="mt-4 max-w-prose text-lg text-brand-foreground/85">
          Whatever you are borrowing for, the job is the same — find the lender who will say yes at
          the best rate, and carry the file to disbursement.
        </p>
      </div>
    </section>

    {/* The four with their own pages */}
    <section className="container py-16">
      <h2 className="font-heading text-2xl font-semibold">Most asked for</h2>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {featured.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group rounded-lg border bg-card shadow-sm transition hover:shadow-elegant"
          >
            <img
              src={item.image}
              alt={item.alt}
              className="h-44 w-full rounded-t-lg object-cover"
              loading="lazy"
            />
            <div className="p-5">
              <h3 className="font-semibold group-hover:text-primary">{item.label}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.blurb}</p>
            </div>
          </Link>
        ))}
      </div>

      <Link
        to="/services/balance-transfer"
        className="group mt-8 flex flex-col justify-between gap-4 rounded-lg bg-gradient-brand p-6 text-brand-foreground shadow-elegant sm:flex-row sm:items-center"
      >
        <div>
          <h3 className="font-heading text-xl font-semibold">Balance Transfer</h3>
          <p className="mt-1 max-w-prose text-sm text-brand-foreground/85">
            Already paying a home loan? Move it to a lower rate and see the exact saving, after the
            cost of switching.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand-accent px-5 py-3 text-sm font-semibold text-brand">
          Work out my saving
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </Link>
    </section>

    {/* Everything else, straight from src/content/products.ts */}
    <section className="bg-muted/40 py-16">
      <div className="container">
        <h2 className="font-heading text-2xl font-semibold">Also arranged</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Same process, same lenders — different paperwork.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {alsoArranged.map((product) => (
            <Link
              key={product.slug}
              to={`/services/${product.slug}`}
              className="group flex flex-col rounded-lg border bg-card p-6 shadow-sm transition hover:shadow-elegant"
            >
              <h3 className="font-semibold group-hover:text-primary">{product.name}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{product.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Read more
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="container py-16">
      <div className="rounded-xl bg-brand p-8 text-brand-foreground shadow-elegant md:p-12">
        <h2 className="max-w-[24ch] font-heading text-2xl font-semibold md:text-3xl">
          Not sure which one you need?
        </h2>
        <p className="mt-3 max-w-prose text-brand-foreground/85">
          Tell us what the money is for and what you own. We will tell you which loan fits — including
          when the answer is a cheaper one than you asked about.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">Talk to Us</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/eligibility-checker">Check My Eligibility</Link>
          </Button>
        </div>
      </div>
    </section>
  </>
);

export default Services;
