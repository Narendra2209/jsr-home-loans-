import React from "react";
import {
  Building2,
  Clock,
  FileCheck,
  IndianRupee,
  PiggyBank,
  RefreshCw,
} from "lucide-react";
import { features, specifications, type FeatureIcon } from "@/content/homeLoan";
import { indicativeRate } from "@/content/company";

const icons: Record<FeatureIcon, React.ComponentType<{ className?: string }>> = {
  banks: Building2,
  clock: Clock,
  funding: PiggyBank,
  documents: FileCheck,
  transfer: RefreshCw,
  tax: IndianRupee,
};

const LoanFeatures: React.FC = () => {
  const rows = [
    { label: "Interest rate", value: `From ${indicativeRate}% p.a.`, note: "Floating, linked to the lender's repo-based rate" },
    ...specifications,
  ];

  return (
    <section className="container py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        Why a home loan through JSR
      </p>
      <h2 className="mt-2 font-heading text-3xl font-semibold">What you get</h2>

      <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = icons[feature.icon];
          return (
            <li key={feature.title} className="rounded-lg border bg-card p-6 shadow-sm">
              <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-semibold">{feature.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{feature.desc}</p>
            </li>
          );
        })}
      </ul>

      <div className="mt-12 border-t pt-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">At a glance</p>
        <h3 className="mt-2 font-heading text-2xl font-semibold">Home loan specifications</h3>

        <dl className="mt-6 max-w-3xl border-t">
          {rows.map((row) => (
            <div key={row.label} className="flex flex-col gap-1 border-b py-3 sm:flex-row sm:gap-6">
              <dt className="text-xs uppercase tracking-wider text-muted-foreground sm:w-48 sm:shrink-0 sm:pt-1">
                {row.label}
              </dt>
              <dd>
                <span className="font-medium">{row.value}</span>
                {row.note && (
                  <span className="mt-0.5 block text-sm text-muted-foreground">{row.note}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default LoanFeatures;
