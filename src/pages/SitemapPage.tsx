import React from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { sections } from "@/content/siteMap";

const SitemapPage: React.FC = () => (
  <>
    <SEO
      title="Sitemap | JSR Home Loan Services"
      description="Every page on the JSR Home Loan Services website — loans, calculators, guides and company information."
      canonicalPath="/sitemap"
    />

    <section className="container py-12 md:py-16">
      <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">Sitemap</h1>
      <p className="mt-3 max-w-prose text-muted-foreground">
        Every page on this website. If you cannot find what you are looking for, ring us on 9000781967
        and we will point you at it.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <nav key={section.title} aria-labelledby={`sitemap-${section.title}`}>
            <h2
              id={`sitemap-${section.title}`}
              className="text-sm font-semibold uppercase tracking-widest text-primary"
            >
              {section.title}
            </h2>
            <ul className="mt-4 space-y-4">
              {section.pages.map((page) => (
                <li key={page.path}>
                  <Link to={page.path} className="font-medium hover:text-primary">
                    {page.label}
                  </Link>
                  <p className="mt-0.5 text-sm text-muted-foreground">{page.description}</p>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </section>
  </>
);

export default SitemapPage;
