import React from "react";
import { useSearchParams } from "react-router-dom";
import { Mail, MessageCircle, Phone, ShieldCheck, Users, Zap } from "lucide-react";
import SEO from "@/components/SEO";
import CallbackForm from "@/components/contact/CallbackForm";
import OfficeMap from "@/components/contact/OfficeMap";
import { whatsappUrl } from "@/lib/enquiry";
import { office } from "@/content/company";
import heroImg from "@/assets/contact-hero.jpg";

const trustPoints = [
  { icon: Users, label: "Real people" },
  { icon: Zap, label: "Quick response" },
  { icon: ShieldCheck, label: "100% confidential" },
];

const Contact: React.FC = () => {
  const [params] = useSearchParams();
  const defaultService = params.get("service") ?? "";

  const openingMessage = whatsappUrl({
    name: "",
    service: defaultService || undefined,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "JSR Home Loan Services",
    telephone: `+91${office.phone}`,
    email: office.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "11-14-518/1, 103 First Floor, Amrutha Pride, Siri Nagar Colony",
      addressLocality: "LB Nagar",
      addressRegion: "Hyderabad",
      postalCode: "500074",
      addressCountry: "IN",
    },
  };

  const actions = [
    {
      icon: Phone,
      label: "Call us",
      value: office.phone,
      note: office.hours,
      href: `tel:${office.phone}`,
      className: "bg-brand text-brand-foreground",
      valueClass: "text-brand-accent",
      external: false,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Message us now",
      note: "Usually answered within the hour",
      href: openingMessage,
      className: "bg-[#1f9d55] text-white",
      valueClass: "text-white",
      external: true,
    },
    {
      icon: Mail,
      label: "Email",
      value: office.email,
      note: "For documents and detailed questions",
      href: `mailto:${office.email}`,
      className: "border bg-card",
      valueClass: "text-foreground",
      external: false,
    },
  ];

  return (
    <>
      <SEO
        title="Contact JSR Home Loan Services | Call, WhatsApp or Request a Callback"
        description="Reach JSR Home Loan Services in LB Nagar, Hyderabad. Call 9000781967, message us on WhatsApp, or ask us to call you back at a time that suits you."
        canonicalPath="/contact"
        jsonLd={jsonLd}
      />

      <section className="relative isolate overflow-hidden bg-brand py-16 text-brand-foreground md:py-20">
        {/* Photograph bleeds off the right; navy holds the left so the copy stays readable */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="A phone showing a contact screen on a desk, beside a notebook, pen and cup of coffee"
            decoding="async"
            className="absolute inset-y-0 right-0 h-full w-full object-cover object-center md:w-[56%]"
          />
          {/* Solid navy on phones; on desktop it holds to 42% then clears so the photo reads */}
          <div className="absolute inset-0 bg-brand/90 md:hidden" />
          <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,hsl(var(--brand))_0%,hsl(var(--brand))_42%,hsl(var(--brand)/0.72)_50%,hsl(var(--brand)/0.16)_60%,hsl(var(--brand)/0)_70%)] md:block" />
        </div>

        <div className="container relative z-10">
          <div className="md:max-w-[50%]">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
              Contact
            </p>
            <h1 className="mt-3 max-w-[20ch] font-heading text-4xl font-bold tracking-tight md:text-5xl">
              Three ways to reach us. All of them go to a person.
            </h1>
            <p className="mt-4 max-w-prose text-lg text-brand-foreground/85">
              No call centre, no ticket number. Tell us what you need and we will tell you honestly
              whether we can help.
            </p>

            <ul className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-6">
              {trustPoints.map((point, index) => (
                <li
                  key={point.label}
                  className={`flex flex-col gap-3 ${
                    index > 0 ? "border-l border-brand-foreground/20 pl-8" : ""
                  }`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-foreground/10">
                    <point.icon className="h-5 w-5 text-brand-accent" aria-hidden="true" />
                  </span>
                  <span className="text-sm text-brand-foreground/90">{point.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Immediate actions */}
      <section className="container -mt-8 pb-4">
        <ul className="grid gap-4 md:grid-cols-3">
          {actions.map((action) => (
            <li key={action.label}>
              <a
                href={action.href}
                {...(action.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`flex h-full flex-col rounded-xl p-6 shadow-elegant transition hover:brightness-110 ${action.className}`}
              >
                <action.icon className="h-6 w-6" aria-hidden="true" />
                <span className="mt-4 text-sm opacity-80">{action.label}</span>
                <span className={`font-heading text-lg font-bold ${action.valueClass}`}>
                  {action.value}
                </span>
                <span className="mt-1 text-xs opacity-70">{action.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Callback form and office */}
      <section className="container py-14">
        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_1fr]">
          <CallbackForm defaultService={defaultService} />

          <div className="space-y-8">
            <OfficeMap />

            <div className="rounded-xl border bg-muted/40 p-6">
              <h2 className="font-heading text-lg font-semibold">Before you call</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                You do not need any documents to talk to us. It helps if you know roughly:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>· What you earn each month, and whether you are salaried or self-employed</li>
                <li>· What you are buying, or what property you already own</li>
                <li>· Any EMIs you are already paying</li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                That is enough for us to tell you what you would qualify for on the first call.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
