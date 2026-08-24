import React from "react";
import { User } from "lucide-react";
import { founder } from "@/content/about";

const FounderStory: React.FC = () => (
  <section className="container py-16">
    <div className="grid items-start gap-10 md:grid-cols-[260px_1fr]">
      {founder.photo ? (
        <img
          src={founder.photo}
          alt={`${founder.name}, founder of JSR Home Loan Services`}
          className="aspect-[4/5] w-full rounded-lg object-cover shadow-elegant"
        />
      ) : (
        <div className="flex aspect-[4/5] w-full items-center justify-center rounded-lg border border-dashed bg-muted/50">
          <User className="h-12 w-12 text-muted-foreground/50" aria-hidden="true" />
        </div>
      )}

      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our founder</p>
        <h2 className="mt-2 font-heading text-3xl font-semibold">Why I started JSR</h2>

        <p className="mt-4 max-w-prose text-muted-foreground">{founder.paragraphs[0]}</p>

        <blockquote className="my-6 border-l-4 border-primary pl-5 font-heading text-xl font-semibold">
          “{founder.pullQuote}”
        </blockquote>

        {founder.paragraphs.slice(1).map((para) => (
          <p key={para} className="max-w-prose text-muted-foreground">
            {para}
          </p>
        ))}

        <div className="mt-6 border-t pt-4">
          <p className="font-semibold">{founder.name}</p>
          <p className="text-sm text-muted-foreground">{founder.role}</p>
        </div>
      </div>
    </div>
  </section>
);

export default FounderStory;
