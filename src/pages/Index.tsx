import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import EmiCalculator from "@/components/EmiCalculator";
import PartnerBanks from "@/components/home/PartnerBanks";
import Metrics from "@/components/home/Metrics";
import LoanProcess from "@/components/home/LoanProcess";
import EligibilityCheck from "@/components/home/EligibilityCheck";
import Testimonials from "@/components/home/Testimonials";
import Faqs from "@/components/home/Faqs";
import { faqs } from "@/content/home";
import homeImg from "@/assets/home-loan.jpg";
import mortgageImg from "@/assets/mortgage-loan.jpg";
import personalImg from "@/assets/personal-loan.jpg";

const Index: React.FC = () => {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "JSR Home Loan Services",
    url: typeof window !== 'undefined' ? window.location.origin : undefined,
    telephone: "+91 9000781967",
    email: "jsrhomeloans@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "11-14-518/1, 103 First Floor, Amrutha Pride, Siri Nagar Colony",
      addressLocality: "LB Nagar",
      addressRegion: "Hyderabad",
      postalCode: "500074",
      addressCountry: "IN"
    }
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <SEO
        title="Best Home Loan Rates in Hyderabad | JSR Home Loan Services"
        description="Get the best home loan rates in Hyderabad. Home, Mortgage and Personal Loans with quick approvals and end-to-end support from JSR Home Loan Services."
        canonicalPath="/"
        jsonLd={[organizationLd, faqLd]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative bg-gradient-brand">
          <div className="container relative grid gap-8 py-16 md:grid-cols-2 md:grid-rows-[auto_auto] md:py-24">
            <div className="md:col-start-1 md:row-start-1 md:self-end">
              <h1 className="font-heading text-4xl font-bold tracking-tight text-brand-foreground md:text-5xl">
                Enjoy the <span className="text-brand-accent">Best Home Loan Rates</span> & Make Your Dream Home Yours
              </h1>
              <p className="mt-4 max-w-prose text-lg text-brand-foreground/90">
                Get Home, Mortgage, and Personal Loans with quick approvals, transparent guidance, and support from application to disbursement.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="hero" size="lg">
                  <Link to="/contact">Apply for Your Loan</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#eligibility">Check Eligibility</a>
                </Button>
              </div>
            </div>

            <div className="md:col-start-2 md:row-span-2 md:row-start-1 md:self-center">
              <EmiCalculator />
            </div>

            <div className="md:col-start-1 md:row-start-2 md:self-start">
              <div className="text-sm text-brand-foreground/80">
                Call us today: <a href="tel:9000781967" className="underline">9000781967</a> • Email: <a href="mailto:jsrhomeloans@gmail.com" className="underline">jsrhomeloans@gmail.com</a>
              </div>
              <p className="mt-4 max-w-prose text-xs text-brand-foreground/60">
                *Best rates subject to lender, loan amount and credit profile. T&amp;C apply.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PartnerBanks />

      {/* Why Choose Us */}
      <section className="container py-16">
        <h2 className="font-heading text-3xl font-semibold">Why Choose JSR Home Loan Services</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Quick Approvals", desc: "Streamlined process with leading banks for faster sanctioning." },
            { title: "Low Interest Rates", desc: "We'll help you compare and secure competitive rates." },
            { title: "End-to-End Support", desc: "Documentation, bank coordination, and disbursement assistance." },
            { title: "Trusted in Hyderabad", desc: "Transparent, reliable, and responsive customer service." },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border bg-card p-6 shadow-elegant">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Metrics />

      {/* Services Overview */}
      <section className="bg-muted/40 py-16">
        <div className="container">
          <h2 className="font-heading text-3xl font-semibold">Our Loan Services</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <Link to="/services/home-loans" className="group rounded-lg border bg-card shadow-sm transition hover:shadow-elegant">
              <img src={homeImg} alt="Home Loans in Hyderabad" className="h-44 w-full rounded-t-lg object-cover" loading="lazy" />
              <div className="p-5">
                <h3 className="font-semibold group-hover:text-primary">Home Loans</h3>
                <p className="mt-2 text-sm text-muted-foreground">Buy your dream home with quick approvals and minimal hassle.</p>
              </div>
            </Link>
            <Link to="/services/mortgage-loans" className="group rounded-lg border bg-card shadow-sm transition hover:shadow-elegant">
              <img src={mortgageImg} alt="Mortgage Loans in Hyderabad" className="h-44 w-full rounded-t-lg object-cover" loading="lazy" />
              <div className="p-5">
                <h3 className="font-semibold group-hover:text-primary">Loan Against Property</h3>
                <p className="mt-2 text-sm text-muted-foreground">Raise money against a house, shop or office you already own.</p>
              </div>
            </Link>
            <Link to="/services/personal-loans" className="group rounded-lg border bg-card shadow-sm transition hover:shadow-elegant">
              <img src={personalImg} alt="Personal Loans in Hyderabad" className="h-44 w-full rounded-t-lg object-cover" loading="lazy" />
              <div className="p-5">
                <h3 className="font-semibold group-hover:text-primary">Personal Loans</h3>
                <p className="mt-2 text-sm text-muted-foreground">Quick approvals and minimal documentation for your needs.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <LoanProcess />

      <EligibilityCheck />

      <Testimonials />

      <Faqs />

      {/* CTA */}
      <section className="container py-16">
        <div className="rounded-xl bg-brand p-8 text-brand-foreground shadow-elegant md:p-12">
          <h2 className="font-heading text-2xl font-semibold md:text-3xl">Ready to get started?</h2>
          <p className="mt-2 text-brand-foreground/90">Apply now and our team will contact you within one business day.</p>
          <div className="mt-6">
            <Button asChild variant="hero" size="lg">
              <Link to="/contact">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;