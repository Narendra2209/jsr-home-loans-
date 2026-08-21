import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Phone, Mail, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { office } from "@/content/company";

const services = [
  { to: "/services/home-loans", label: "Home Loans" },
  { to: "/services/construction-loan", label: "Construction Loan" },
  { to: "/services/home-renovation-loan", label: "Renovation Loan" },
  { to: "/services/plot-purchase-loan", label: "Plot Purchase Loan" },
  { to: "/services/mortgage-loans", label: "Loan Against Property" },
  { to: "/services/commercial-property-loan", label: "Commercial Property" },
  { to: "/services/balance-transfer", label: "Balance Transfer" },
  { to: "/services/personal-loans", label: "Personal Loans" },
  { to: "/services/business-loan", label: "Business Loan" },
];

const tools = [
  { to: "/emi-calculator", label: "EMI Calculator" },
  { to: "/eligibility-checker", label: "Eligibility Checker" },
  { to: "/bank-comparison", label: "Bank Comparison" },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`;

const Dropdown: React.FC<{
  label: string;
  to: string;
  items: { to: string; label: string }[];
}> = ({ label, to, items }) => (
  <div className="group relative">
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-sm inline-flex items-center gap-1 ${
          isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
        }`
      }
    >
      {label} <ChevronDown className="size-4" />
    </NavLink>
    <div className="invisible absolute right-0 mt-2 w-60 rounded-md border bg-background p-2 opacity-0 shadow-md transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className="block rounded px-3 py-2 text-sm hover:bg-accent"
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  </div>
);

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" aria-label="JSR Home Loan Services — home" className="flex items-center gap-3">
          <img
            src="/brand/logo-header.png"
            alt="JSR Home Loan Services logo with sun and home icon"
            className="h-10 w-auto"
            loading="lazy"
          />
          <span className="font-heading text-base font-semibold text-foreground lg:text-lg">
            JSR Home Loan Services
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <Dropdown label="Services" to="/services" items={services} />
          <Dropdown label="Tools" to="/emi-calculator" items={tools} />
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/testimonials" className={linkClass}>
            Reviews
          </NavLink>
          <NavLink to="/blog" className={linkClass}>
            Guides
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <a href={`tel:${office.phone}`} className="flex items-center gap-2 text-sm text-foreground">
            <Phone className="size-4 text-primary" /> {office.phone}
          </a>
          <Button asChild variant="brand" size="lg">
            <Link to="/contact">Apply for Your Loan</Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <a href={`tel:${office.phone}`} className="flex items-center gap-1 text-sm text-foreground">
            <Phone className="size-4 text-primary" /> Call
          </a>
          <Button asChild variant="brand" size="sm">
            <Link to="/contact">Apply</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 overflow-y-auto">
              <nav className="mt-8 flex flex-col gap-1">
                <p className="px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Services
                </p>
                {services.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={close}
                    className="rounded px-3 py-2 text-sm hover:bg-accent"
                  >
                    {item.label}
                  </NavLink>
                ))}

                <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Tools
                </p>
                {tools.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={close}
                    className="rounded px-3 py-2 text-sm hover:bg-accent"
                  >
                    {item.label}
                  </NavLink>
                ))}

                <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Company
                </p>
                <NavLink to="/about" onClick={close} className="rounded px-3 py-2 text-sm hover:bg-accent">
                  About
                </NavLink>
                <NavLink to="/testimonials" onClick={close} className="rounded px-3 py-2 text-sm hover:bg-accent">
                  Reviews
                </NavLink>
                <NavLink to="/blog" onClick={close} className="rounded px-3 py-2 text-sm hover:bg-accent">
                  Guides
                </NavLink>
                <NavLink to="/contact" onClick={close} className="rounded px-3 py-2 text-sm hover:bg-accent">
                  Contact
                </NavLink>
              </nav>

              <div className="mt-8 border-t pt-6 text-sm">
                <a href={`tel:${office.phone}`} className="flex items-center gap-2">
                  <Phone className="size-4 text-primary" /> {office.phone}
                </a>
                <a href={`mailto:${office.email}`} className="mt-3 flex items-center gap-2 break-all">
                  <Mail className="size-4 shrink-0 text-primary" /> {office.email}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
