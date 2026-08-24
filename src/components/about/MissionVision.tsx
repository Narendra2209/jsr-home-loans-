import React from "react";
import { milestones, mission, values, vision } from "@/content/about";
import { yearsInBusiness } from "@/content/company";

const MissionVision: React.FC = () => (
  <section className="container py-16">
    <div className="grid gap-6 md:grid-cols-2">
      {[
        { eyebrow: "Mission", ...mission },
        { eyebrow: "Vision", ...vision },
      ].map((item) => (
        <div key={item.eyebrow} className="rounded-lg border bg-card p-6 shadow-elegant">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {item.eyebrow}
          </p>
          <h2 className="mt-2 font-heading text-xl font-semibold">{item.title}</h2>
          <p className="mt-2 text-muted-foreground">{item.body}</p>
        </div>
      ))}
    </div>

    <ul className="mt-6 flex flex-wrap gap-3">
      {values.map((value) => (
        <li key={value} className="rounded-full border bg-card px-4 py-2 text-sm font-medium">
          {value}
        </li>
      ))}
    </ul>

    <div className="mt-12 border-t pt-10">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our experience</p>
      <h2 className="mt-2 font-heading text-2xl font-semibold">
        {yearsInBusiness} years, four milestones
      </h2>

      <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {milestones.map((milestone) => (
          <li key={milestone.year} className="border-t-2 border-primary pt-4">
            <p className="font-heading text-xl font-bold">{milestone.year}</p>
            <p className="mt-1 text-sm text-muted-foreground">{milestone.event}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default MissionVision;
