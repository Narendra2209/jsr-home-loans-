import React from "react";
import { Star } from "lucide-react";
import type { Testimonial } from "@/content/testimonials";

const initialOf = (name: string) => {
  const letter = name.replace(/[^A-Za-z]/g, "").charAt(0);
  return letter ? letter.toUpperCase() : "•";
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <figure className="flex h-full flex-col rounded-lg border bg-card p-6 shadow-sm">
    <div className="flex items-center justify-between gap-3">
      <div className="flex gap-0.5" aria-label={`Rated ${testimonial.rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < testimonial.rating ? "fill-primary text-primary" : "text-muted-foreground/30"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
      {testimonial.source === "Google" && (
        <span className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground">
          via Google
        </span>
      )}
    </div>

    <blockquote className="mt-4 flex-1 text-sm">{testimonial.quote}</blockquote>

    <figcaption className="mt-5 flex items-center gap-3 border-t pt-4">
      {testimonial.photo ? (
        <img
          src={testimonial.photo}
          alt={testimonial.name}
          className="h-10 w-10 rounded-full object-cover"
          loading="lazy"
        />
      ) : (
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full bg-brand font-semibold text-brand-accent"
          aria-hidden="true"
        >
          {initialOf(testimonial.name)}
        </span>
      )}
      <span>
        <span className="block text-sm font-semibold">{testimonial.name}</span>
        <span className="block text-xs text-muted-foreground">
          {testimonial.loanType} · {testimonial.area}
        </span>
      </span>
    </figcaption>
  </figure>
);

export default TestimonialCard;
