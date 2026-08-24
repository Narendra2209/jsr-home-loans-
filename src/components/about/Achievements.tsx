import React from "react";
import { achievements } from "@/content/about";
import { metrics, yearsInBusiness } from "@/content/company";

const Achievements: React.FC = () => (
  <section className="bg-brand py-16 text-brand-foreground">
    <div className="container">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
          The record
        </p>
        <h2 className="mt-2 font-heading text-3xl font-semibold">
          What {yearsInBusiness} years adds up to
        </h2>
      </div>

      <dl className="mt-10 grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
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

      <ul className="mt-12 grid gap-5 border-t border-brand-foreground/15 pt-10 sm:grid-cols-2">
        {achievements.map((item) => (
          <li key={item.title} className="flex gap-3">
            <span className="text-brand-accent" aria-hidden="true">
              ✦
            </span>
            <span>
              <span className="block font-semibold">{item.title}</span>
              <span className="block text-sm text-brand-foreground/70">{item.note}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Achievements;
