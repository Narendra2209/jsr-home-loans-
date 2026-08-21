import React from "react";
import SEO from "@/components/SEO";
import ArticleBody from "@/components/blog/ArticleBody";
import type { LegalDoc } from "@/content/legal";

const LegalPage: React.FC<{ doc: LegalDoc }> = ({ doc }) => (
  <>
    <SEO
      title={`${doc.title} | JSR Home Loan Services`}
      description={doc.summary}
      canonicalPath={`/${doc.slug}`}
    />

    <section className="container py-12 md:py-16">
      <header className="max-w-2xl">
        <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">{doc.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{doc.summary}</p>
        <p className="mt-4 text-sm text-muted-foreground">Last updated {doc.updated}</p>
      </header>

      <div className="mt-10">
        <ArticleBody blocks={doc.body} />
      </div>
    </section>
  </>
);

export default LegalPage;
