import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import { featuredTestimonials } from "@/content/testimonials";

const Testimonials: React.FC = () => (
  <section className="bg-muted/40 py-16">
    <div className="container">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Testimonials</p>
        <h2 className="mt-2 font-heading text-3xl font-semibold">What our customers say</h2>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {featuredTestimonials.map((item) => (
          <TestimonialCard key={item.id} testimonial={item} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button asChild variant="outline" size="lg">
          <Link to="/testimonials">Read all customer stories</Link>
        </Button>
      </div>
    </div>
  </section>
);

export default Testimonials;
