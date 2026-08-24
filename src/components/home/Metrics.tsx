import React from "react";
import { metrics } from "@/content/company";

const Metrics: React.FC = () => (
  <section className="bg-brand py-16 text-brand-foreground">
    <div className="container text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
        JSR by the numbers
      </p>
      <h2 className="mt-2 font-heading text-3xl font-semibold">Built on loans that actually closed</h2>

      <dl className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <dt className="sr-only">{metric.label}</dt>
            <dd>
              <span className="block font-heading text-4xl font-bold tracking-tight text-brand-accent">
                {metric.value}
              </span>
              <span className="mt-1 block text-sm text-brand-foreground/80">{metric.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default Metrics;
