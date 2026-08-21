import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Star } from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import VideoTestimonial from "@/components/testimonials/VideoTestimonial";
import { loanTypeFilters, testimonials } from "@/content/testimonials";
import { googleProfileUrl, googleRating, googleReviewCount, metrics } from "@/content/company";
import heroImg from "@/assets/testimonials-hero.jpg";

/**
 * No Review or AggregateRating structured data on this page, deliberately.
 * Google does not allow a business to mark up reviews of itself on its own site
 * — self-serving review markup is ineligible for rich results and can trigger a
 * manual action. The rating below links out to the Google profile instead,
 * which is where that data is allowed to live.
 */
const Testimonials: React.FC = () => {
  const [filter, setFilter] = useState("All");

  const videos = useMemo(() => testimonials.filter((item) => item.videoId), []);

  const shown = useMemo(
    () => (filter === "All" ? testimonials : testimonials.filter((item) => item.loanType === filter)),
    [filter],
  );

  const families = metrics.find((metric) => metric.label.includes("Families"))?.value;

  return (
    <>
      <SEO
        title="Customer Reviews & Testimonials | JSR Home Loan Services"
        description="What our customers in Hyderabad say about JSR Home Loan Services — home loans, loans against property, personal loans and balance transfers. Read their words and watch their stories."
        canonicalPath="/testimonials"
      />

      {/* Hero */}
      <section className="bg-brand py-16 text-brand-foreground md:py-20">
        <div className="container grid items-center gap-10 md:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
              Customer stories
            </p>
            <h1 className="mt-3 max-w-[18ch] font-heading text-4xl font-bold tracking-tight md:text-5xl">
              The part of the job we are judged on
            </h1>
            <p className="mt-4 max-w-prose text-lg text-brand-foreground/85">
              {families ? `${families} families` : "Families across Hyderabad"} have moved into
              homes on loans we arranged. Here is what some of them said afterwards.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="font-heading text-4xl font-bold tracking-tight text-brand-accent">
                  {googleRating}
                </span>
                <span>
                  <span className="flex gap-0.5" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-brand-accent text-brand-accent" />
                    ))}
                  </span>
                  <span className="mt-1 block text-sm text-brand-foreground/75">
                    {googleReviewCount} Google reviews
                  </span>
                </span>
              </div>
              <Button asChild variant="outline" size="lg">
                <a href={googleProfileUrl} target="_blank" rel="noopener noreferrer">
                  Read them all on Google
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          <img
            src={heroImg}
            alt="House keys and an approved home loan application beside a model house"
            className="w-full rounded-lg shadow-glow"
            decoding="async"
          />
        </div>
      </section>

      {/* Video testimonials — hidden entirely until a real video exists */}
      {videos.length > 0 && (
        <section className="container py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">In person</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold">Hear it from them</h2>
          <p className="mt-3 max-w-prose text-muted-foreground">
            Nothing is scripted. These were recorded after the loan was disbursed.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((item) => (
              <VideoTestimonial key={item.id} testimonial={item} />
            ))}
          </div>
        </section>
      )}

      {/* Written testimonials */}
      <section className="bg-muted/40 py-16">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            In their words
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold">What customers say</h2>

          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by loan type">
            {loanTypeFilters.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilter(type)}
                aria-pressed={filter === type}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  filter === type
                    ? "border-brand bg-brand text-brand-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((item) => (
              <TestimonialCard key={item.id} testimonial={item} />
            ))}
          </div>

          {shown.length === 0 && (
            <p className="mt-8 text-muted-foreground">
              No reviews under that heading yet. Try another loan type.
            </p>
          )}
        </div>
      </section>

      {/* Leave a review + CTA */}
      <section className="container py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-8 shadow-sm">
            <h2 className="font-heading text-2xl font-semibold">Been through it with us?</h2>
            <p className="mt-3 text-muted-foreground">
              A review on Google takes two minutes and is the single most useful thing you can do for
              us. It is also the only place these reviews can be verified, which is exactly why they
              carry weight.
            </p>
            <Button asChild variant="brand" size="lg" className="mt-6">
              <a href={googleProfileUrl} target="_blank" rel="noopener noreferrer">
                Leave a Google review
                <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>

          <div className="rounded-xl bg-brand p-8 text-brand-foreground shadow-elegant">
            <h2 className="font-heading text-2xl font-semibold">Start your own story</h2>
            <p className="mt-3 text-brand-foreground/85">
              Every one of these began with a phone call or a form. Tell us what you need and we will
              tell you honestly whether we can help.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">Apply for Your Loan</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/eligibility-checker">Check Eligibility</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
