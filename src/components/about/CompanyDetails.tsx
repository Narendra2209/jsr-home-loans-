import React from "react";
import { office, registration } from "@/content/company";

const CompanyDetails: React.FC = () => {
  const rows = [
    ...registration.filter((row) => row.value),
    { label: "Registered office", value: office.address },
    { label: "Phone", value: office.phone },
    { label: "Email", value: office.email },
    { label: "Office hours", value: office.hours },
  ].filter((row) => row.value);

  return (
    <section className="bg-muted/40 py-16">
      <div className="container">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Company details
        </p>
        <h2 className="mt-2 font-heading text-3xl font-semibold">Registered and accountable</h2>

        <dl className="mt-8 max-w-3xl border-t">
          {rows.map((row) => (
            <div key={row.label} className="flex flex-col gap-1 border-b py-3 sm:flex-row sm:gap-6">
              <dt className="text-xs uppercase tracking-wider text-muted-foreground sm:w-44 sm:shrink-0 sm:pt-1">
                {row.label}
              </dt>
              <dd className="font-medium">
                {row.label === "Phone" ? (
                  <a href={`tel:${row.value}`} className="underline">
                    {row.value}
                  </a>
                ) : row.label === "Email" ? (
                  <a href={`mailto:${row.value}`} className="underline">
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default CompanyDetails;
