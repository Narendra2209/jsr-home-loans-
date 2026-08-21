import React from "react";
import { BadgeCheck, Clock, ShieldCheck, Star } from "lucide-react";
import { partnerBanks, trustBadges, type BadgeIcon } from "@/content/home";

const icons: Record<BadgeIcon, React.ComponentType<{ className?: string }>> = {
  star: Star,
  shield: ShieldCheck,
  check: BadgeCheck,
  clock: Clock,
};

const PartnerBanks: React.FC = () => (
  <section className="border-b bg-background py-14">
    <div className="container text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our lending partners</p>
      <h2 className="mt-2 font-heading text-3xl font-semibold">We compare offers from 20+ banks</h2>
      <p className="mx-auto mt-3 max-w-prose text-muted-foreground">
        One application, every lender — so you never take the first rate you are offered.
      </p>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {partnerBanks.map((bank) => (
          <li
            key={bank}
            className="rounded-lg border bg-card px-3 py-4 font-semibold text-muted-foreground"
          >
            {bank}
          </li>
        ))}
      </ul>

      <ul className="mt-8 flex flex-wrap justify-center gap-3 border-t pt-6">
        {trustBadges.map((badge) => {
          const Icon = icons[badge.icon];
          return (
            <li
              key={badge.label}
              className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm"
            >
              <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
              {badge.label}
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default PartnerBanks;
