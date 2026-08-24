import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { office, socialLinks } from "@/content/company";
import { footerColumns } from "@/content/siteMap";

const Footer: React.FC = () => (
  <footer className="mt-16 bg-brand text-brand-foreground">
    <div className="container pt-14">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/brand/logo-header.png"
              alt=""
              aria-hidden="true"
              className="h-9 w-auto"
              loading="lazy"
            />
            <span className="font-heading text-lg font-semibold">JSR Home Loan Services</span>
          </div>

          <p className="mt-4 max-w-sm text-sm text-brand-foreground/75">
            Loan referral partner for banks and housing finance companies across Hyderabad. Home
            loans, loans against property, personal loans and balance transfers.
          </p>

          <address className="mt-5 space-y-2 text-sm not-italic">
            <a href={`tel:${office.phone}`} className="flex items-center gap-2 hover:text-brand-accent">
              <Phone className="size-4 shrink-0 text-brand-accent" aria-hidden="true" />
              {office.phone}
            </a>
            <a href={`mailto:${office.email}`} className="flex items-center gap-2 break-all hover:text-brand-accent">
              <Mail className="size-4 shrink-0 text-brand-accent" aria-hidden="true" />
              {office.email}
            </a>
            <span className="flex items-start gap-2 text-brand-foreground/75">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-accent" aria-hidden="true" />
              {office.address}
            </span>
          </address>

          {/* Rendered only when there is a real profile to link to — an icon
              pointing at an empty page costs more trust than a missing one. */}
          {socialLinks.length > 0 && (
            <ul className="mt-5 flex gap-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`JSR Home Loan Services on ${social.label}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-foreground/25 text-sm transition hover:border-brand-accent hover:text-brand-accent"
                  >
                    {social.short}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
              {column.title}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {column.pages.map((page) => (
                <li key={page.path}>
                  <Link to={page.path} className="text-brand-foreground/75 hover:text-brand-accent">
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* RBI / regulatory disclaimer */}
      <section
        aria-label="Important disclaimer"
        className="mt-12 border-t border-brand-foreground/15 py-7"
      >
        <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
          Important disclaimer
        </h2>
        <div className="mt-3 space-y-2.5 text-xs leading-relaxed text-brand-foreground/60">
          <p>
            JSR Home Loan Services is a loan referral partner (Direct Selling Agent) empanelled
            with banks and housing finance companies. We are not a bank, an NBFC or a lender, and we
            are not registered with the Reserve Bank of India. We do not accept deposits, do not lend
            money and do not sanction loans. All lending decisions, interest rates and terms are
            determined solely by the lender.
          </p>
          <p>
            Interest rates, fees, eligibility figures and calculator results shown on this website
            are indicative, subject to change without notice, and do not constitute an offer or a
            commitment to lend. Please verify all terms directly with the lender before signing
            anything.
          </p>
          <p>
            We never ask customers to transfer any fee to a personal account. All charges are payable
            directly to the lender unless separately agreed with us in writing.
          </p>
        </div>
      </section>
    </div>

    <div className="border-t border-brand-foreground/15">
      <div className="container flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-brand-foreground/70">
        <p>© {new Date().getFullYear()} JSR Home Loan Services. All rights reserved.</p>
        <nav aria-label="Legal" className="flex flex-wrap gap-5">
          <Link to="/privacy-policy" className="hover:text-brand-accent">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-brand-accent">
            Terms &amp; Conditions
          </Link>
          <Link to="/sitemap" className="hover:text-brand-accent">
            Sitemap
          </Link>
        </nav>
      </div>
    </div>
  </footer>
);

export default Footer;
