import React from "react";
import SEO from "@/components/SEO";
import FounderStory from "@/components/about/FounderStory";
import Team from "@/components/about/Team";
import MissionVision from "@/components/about/MissionVision";
import Achievements from "@/components/about/Achievements";
import CompanyDetails from "@/components/about/CompanyDetails";
import { familiesServed, yearsInBusiness } from "@/content/company";
import heroImg from "@/assets/about-hero.jpg";

const About: React.FC = () => {
  return (
    <>
      <SEO
        title="About JSR Home Loan Services | Hyderabad Loan Experts"
        description="Meet the team behind JSR Home Loan Services — our founder's story, our mission, our track record, and our registration details. Home, Mortgage and Personal Loans in LB Nagar, Hyderabad."
        canonicalPath="/about"
      />

      {/* Opening */}
      <section className="relative isolate overflow-hidden bg-brand py-16 text-brand-foreground md:py-24">
        {/* Background photograph with overlay */}
        <div className="absolute inset-0 z-0">
          {/* Full width on phones; on desktop it sits in the right 56% like the reference */}
          <img
            src={heroImg}
            alt=""
            aria-hidden="true"
            decoding="async"
            className="absolute inset-y-0 right-0 h-full w-full object-cover object-[center_32%] md:w-[56%]"
          />
          {/* Solid navy on phones; on desktop it holds to 42% then clears so the photo reads */}
          <div className="absolute inset-0 bg-brand/90 md:hidden" />
          <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,hsl(var(--brand))_0%,hsl(var(--brand))_42%,hsl(var(--brand)/0.72)_50%,hsl(var(--brand)/0.16)_60%,hsl(var(--brand)/0)_70%)] md:block" />
        </div>

        <div className="container relative z-10">
          <div className="md:max-w-[52%]">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
              About JSR Home Loan Services
            </p>
            <h1 className="mt-3 max-w-[20ch] font-heading text-4xl font-bold tracking-tight md:text-5xl">
              We are the people who sit between you and the bank
            </h1>
            <p className="mt-5 max-w-prose text-lg text-brand-foreground/85">
              For {yearsInBusiness} years, from an office in LB Nagar, we have taken the part of a loan
              that most people dread — the paperwork, the follow-ups, the branch visits — and done it
              for them. {familiesServed} families have moved into homes on loans we arranged.
            </p>
          </div>
        </div>
      </section>

      <FounderStory />

      <Team />

      <MissionVision />

      <Achievements />

      <CompanyDetails />
    </>
  );
};

export default About;
