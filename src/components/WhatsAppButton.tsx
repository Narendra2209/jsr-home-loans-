import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { whatsappChatUrl } from "@/lib/enquiry";

/**
 * Floating WhatsApp button, on every page except /contact — that page already
 * carries a full-width WhatsApp action card, and two of them a thumb apart is
 * clutter rather than emphasis.
 *
 * A plain wa.me link, not a third-party chat widget: nothing is loaded from
 * another company and nothing tracks your visitors.
 */

/** Longest matching prefix wins, so /blog/some-guide falls back to /blog. */
const openers: { prefix: string; message: string }[] = [
  {
    prefix: "/services/home-loans",
    message: "Hello JSR Home Loan Services, I would like to know about a home loan.",
  },
  {
    prefix: "/services/mortgage-loans",
    message: "Hello JSR Home Loan Services, I would like to know about a loan against property.",
  },
  {
    prefix: "/services/loan-against-property",
    message: "Hello JSR Home Loan Services, I would like to know about a loan against property.",
  },
  {
    prefix: "/services/personal-loans",
    message: "Hello JSR Home Loan Services, I would like to know about a personal loan.",
  },
  {
    prefix: "/services/balance-transfer",
    message:
      "Hello JSR Home Loan Services, I would like to know about transferring my existing home loan.",
  },
  {
    prefix: "/services/construction-loan",
    message: "Hello JSR Home Loan Services, I would like to know about a construction loan.",
  },
  {
    prefix: "/services/home-renovation-loan",
    message: "Hello JSR Home Loan Services, I would like to know about a home renovation loan.",
  },
  {
    prefix: "/services/plot-purchase-loan",
    message: "Hello JSR Home Loan Services, I would like to know about a loan to buy a plot.",
  },
  {
    prefix: "/services/commercial-property-loan",
    message: "Hello JSR Home Loan Services, I would like to know about a commercial property loan.",
  },
  {
    prefix: "/services/business-loan",
    message: "Hello JSR Home Loan Services, I would like to know about a business loan.",
  },
  {
    prefix: "/services",
    message: "Hello JSR Home Loan Services, I would like to know about your loan services.",
  },
  {
    prefix: "/emi-calculator",
    message:
      "Hello JSR Home Loan Services, I used your EMI calculator and would like to know what rate I would actually get.",
  },
  {
    prefix: "/eligibility-checker",
    message:
      "Hello JSR Home Loan Services, I checked my eligibility on your website and would like to discuss it.",
  },
  {
    prefix: "/bank-comparison",
    message: "Hello JSR Home Loan Services, I would like help comparing lenders.",
  },
  {
    prefix: "/testimonials",
    message: "Hello JSR Home Loan Services, I would like to discuss a loan.",
  },
  {
    prefix: "/blog",
    message: "Hello JSR Home Loan Services, I read one of your guides and have a question.",
  },
];

const defaultMessage =
  "Hello JSR Home Loan Services, I would like to know about a loan.";

const messageFor = (pathname: string) =>
  openers
    .filter((opener) => pathname.startsWith(opener.prefix))
    .sort((a, b) => b.prefix.length - a.prefix.length)[0]?.message ?? defaultMessage;

const WhatsAppButton: React.FC = () => {
  const { pathname } = useLocation();
  const [labelShown, setLabelShown] = useState(true);

  // The label introduces the button, then gets out of the way.
  useEffect(() => {
    const timer = window.setTimeout(() => setLabelShown(false), 5000);
    return () => window.clearTimeout(timer);
  }, []);

  if (pathname === "/contact") return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 print:hidden">
      <span
        aria-hidden="true"
        className={`rounded-full border bg-card px-3.5 py-2 text-xs font-semibold shadow-elegant transition-all duration-300 motion-reduce:transition-none ${
          labelShown ? "opacity-100" : "pointer-events-none translate-x-2 opacity-0"
        }`}
      >
        Chat with us
      </span>

      <a
        href={whatsappChatUrl(messageFor(pathname))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setLabelShown(true)}
        onFocus={() => setLabelShown(true)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1f9d55] text-white shadow-lg shadow-[#1f9d55]/40 transition hover:bg-[#1b8a4a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f9d55] focus-visible:ring-offset-2 motion-reduce:transition-none"
      >
        <MessageCircle className="h-7 w-7" aria-hidden="true" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
