import React from "react";
import { processSteps } from "@/content/home";

const LoanProcess: React.FC = () => (
  <section className="container py-16">
    <p className="text-sm font-semibold uppercase tracking-widest text-primary">The process</p>
    <h2 className="mt-2 font-heading text-3xl font-semibold">From first call to disbursement</h2>
    <p className="mt-3 max-w-prose text-muted-foreground">
      You do step one. We do the rest, and you hear from us at every stage.
    </p>

    <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((step, index) => (
        <li key={step.title}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand font-heading text-sm font-bold text-brand-foreground">
            {index + 1}
          </span>
          <h3 className="mt-4 font-semibold">{step.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
        </li>
      ))}
    </ol>
  </section>
);

export default LoanProcess;
