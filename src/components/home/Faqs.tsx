import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/content/home";

const Faqs: React.FC = () => (
  <section className="container py-16">
    <p className="text-sm font-semibold uppercase tracking-widest text-primary">Questions</p>
    <h2 className="mt-2 font-heading text-3xl font-semibold">Everything people ask us first</h2>

    <Accordion type="single" collapsible defaultValue="faq-0" className="mt-8 max-w-3xl">
      {faqs.map((faq, index) => (
        <AccordionItem key={faq.q} value={`faq-${index}`}>
          <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);

export default Faqs;
