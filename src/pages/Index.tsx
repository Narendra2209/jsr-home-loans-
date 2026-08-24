import React from "react";
import { Link } from "react-router-dom";
import { Award, Headset, IndianRupee, Mail, Phone, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import CtaArrow from "@/components/CtaArrow";
import SEO from "@/components/SEO";
import EmiCalculator from "@/components/EmiCalculator";
import PartnerBanks from "@/components/home/PartnerBanks";
import Metrics from "@/components/home/Metrics";
import LoanProcess from "@/components/home/LoanProcess";
import EligibilityCheck from "@/components/home/EligibilityCheck";
import Testimonials from "@/components/home/Testimonials";
import Faqs from "@/components/home/Faqs";
import { faqs } from "@/content/home";
import { metrics, office } from "@/content/company";
import { openEmail } from "@/lib/mailto";
import homeImg from "@/assets/home-loan.jpg";
import mortgageImg from "@/assets/mortgage-loan.jpg";
import personalImg from "@/assets/personal-loan.jpg";
// The hero backdrop. Replacing this one file is the whole job — no code change needed.
import heroPhoto from "@/assets/home-hero.jpg";

/** The four reassurances that sit under the hero buttons. */
const heroPoints = [
  {
    icon: ShieldCheck,
    title: "Lowest Interest Rates",
    note: "Competitive & affordable",
    tint: "border-amber-400/45 bg-amber-400/10 text-amber-400",
  },
  {
    icon: Zap,
    title: "Quick Approvals",
    note: "Minimal docs, faster process",
    tint: "border-blue-400/45 bg-blue-400/10 text-blue-400",
  },
  {
    icon: IndianRupee,
    title: "Flexible Tenure",
    note: "Options that suit you",
    tint: "border-emerald-400/45 bg-emerald-400/10 text-emerald-400",
  },
  {
    icon: Headset,
    title: "Expert Support",
    note: "Guidance at every step",
    tint: "border-violet-400/45 bg-violet-400/10 text-violet-400",
  },
];

const Index: React.FC = () => {
  const families = metrics.find((metric) => metric.label.includes("Families"))?.value;

  /** Mail app if there is one, Gmail compose if there is not — never a dead click. */
  const onEmailClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    await openEmail(office.email);
  };

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
      <section className="relative isolate overflow-hidden bg-brand text-brand-foreground">
        {/* Photograph fills the right of the band; navy carries the left for the copy */}
        <img
          src={heroPhoto}
          alt=""
          aria-hidden="true"
          className="absolute inset-y-0 right-0 -z-20 h-full w-full object-cover object-[46%_center] md:w-[62%]"
        />
        <div className="absolute inset-0 -z-10 bg-brand/90 md:hidden" />
        <div className="absolute inset-0 -z-10 hidden bg-[linear-gradient(95deg,hsl(var(--brand))_0%,hsl(var(--brand))_33%,hsl(var(--brand)/0.88)_41%,hsl(var(--brand)/0.48)_51%,hsl(var(--brand)/0.22)_62%,hsl(var(--brand)/0.30)_100%)] md:block" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-[linear-gradient(to_top,hsl(var(--brand)/0.8),transparent)]" />
        {/* The dot rule down the left edge, as in the reference */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-28 -z-10 hidden h-[480px] w-9 bg-[radial-gradient(circle,hsl(var(--brand-foreground)/0.3)_1px,transparent_1px)] [background-size:9px_9px] md:block"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 py-14 md:px-10 md:py-16 lg:px-12 lg:py-[72px]">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div className="md:w-[46%]">
              <h1 className="font-heading text-4xl font-bold leading-[1.12] tracking-tight md:text-[2.9rem] lg:text-[3.25rem]">
                Enjoy the <span className="text-brand-accent">Best Home Loan Rates</span> &amp; Make
                Your Dream Home Yours
              </h1>
              <div className="mt-7 h-1 w-[90px] rounded-full bg-brand-accent" />
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild variant="cta" size="cta">
                  <Link to="/contact">
                    Apply for Your Loan
                    <CtaArrow />
                  </Link>
                </Button>
                <Button asChild variant="ctaWhite" size="cta">
                  <a href="#eligibility">
                    Check Eligibility
                    <CtaArrow tone="onWhite" />
                  </a>
                </Button>
              </div>

              <ul className="mt-9 grid grid-cols-2 overflow-hidden rounded-2xl border border-brand-foreground/10 bg-brand-foreground/[0.055] backdrop-blur-sm sm:grid-cols-4">
                {heroPoints.map((point) => (
                  <li
                    key={point.title}
                    className="border-brand-foreground/10 px-3 py-6 text-center even:border-l [&:nth-child(n+3)]:border-t sm:border-l sm:border-t-0 sm:first:border-l-0"
                  >
                    <span
                      className={`mx-auto grid h-12 w-12 place-items-center rounded-full border ${point.tint}`}
                    >
                      <point.icon className="h-[22px] w-[22px]" aria-hidden="true" />
                    </span>
                    <span className="mt-4 block font-heading text-[15px] font-semibold leading-snug">
                      {point.title}
                    </span>
                    <span className="mt-1.5 block text-[13px] leading-snug text-brand-foreground/60">
                      {point.note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:w-[35%]">
              <EmiCalculator />
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-5 md:flex-row md:justify-between">
            <div className="grid rounded-2xl border border-brand-foreground/10 bg-brand-foreground/[0.055] backdrop-blur-sm sm:grid-cols-2 md:w-[38%]">
              <a
                href={`tel:${office.phone}`}
                className="flex items-center gap-3.5 px-5 py-4 transition hover:bg-brand-foreground/[0.04]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brand-accent/45 bg-brand-accent/10 text-brand-accent">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] text-brand-foreground/60">Call us today</span>
                  <span className="block font-heading text-[15px] font-semibold">{office.phone}</span>
                </span>
              </a>
              <a
                href={`mailto:${office.email}`}
                onClick={onEmailClick}
                className="flex items-center gap-3.5 border-brand-foreground/10 px-5 py-4 transition hover:bg-brand-foreground/[0.04] sm:border-l"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brand-accent/45 bg-brand-accent/10 text-brand-accent">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] text-brand-foreground/60">Email us</span>
                  <span className="block break-all font-heading text-[15px] font-semibold">
                    {office.email}
                  </span>
                </span>
              </a>
            </div>

            <div className="grid rounded-2xl border border-brand-foreground/10 bg-brand-foreground/[0.055] backdrop-blur-sm sm:grid-cols-2 md:w-[36%]">
              <div className="flex items-center gap-3.5 px-5 py-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brand-accent/45 bg-brand-accent/10 text-brand-accent">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[13px] text-brand-foreground/60">Trusted by</span>
                  <span className="block font-heading text-[15px] font-semibold">
                    {families ? `${families} families` : "families across Hyderabad"}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-3.5 border-brand-foreground/10 px-5 py-4 sm:border-l">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brand-accent/45 bg-brand-accent/10 text-brand-accent">
                  <Award className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[13px] text-brand-foreground/60">Best rates</span>
                  <span className="block font-heading text-[15px] font-semibold">
                    from 20+ partner banks
                  </span>
                </span>
              </div>
            </div>
          </div>

          <p className="mt-5 text-xs text-brand-foreground/55">
            *Best rates subject to lender, loan amount and credit profile. T&amp;C apply.
          </p>
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