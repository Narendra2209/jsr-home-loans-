import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import SEO from "@/components/SEO";
import { articles, categories, readingMinutes } from "@/content/blog";
// Tighter crop of home-loan.jpg, so the guides hero card does not repeat the home loans page framing.
import heroPhoto from "@/assets/blog-hero.jpg";

const Blog: React.FC = () => {
  const [category, setCategory] = useState("All");

  const shown = useMemo(
    () => (category === "All" ? articles : articles.filter((a) => a.category === category)),
    [category],
  );

  return (
    <>
      <SEO
        title="Home Loan Guides & Advice | JSR Home Loan Services, Hyderabad"
        description="Plain guides to home loan interest rates, improving your CIBIL score, home loan tax benefits and balance transfers — written for borrowers in Hyderabad, without the sales pitch."
        canonicalPath="/blog"
      />

      <section className="bg-brand py-16 text-brand-foreground md:py-20">
        <div className="container grid items-center gap-10 md:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">Guides</p>
            <h1 className="mt-3 max-w-[18ch] font-heading text-4xl font-bold tracking-tight md:text-5xl">
              The things we end up explaining on every call
            </h1>
            <p className="mt-4 max-w-prose text-lg text-brand-foreground/85">
              Written properly, so you can read them before you ring us. No sales pitch, and we say
              plainly where the answer is "it depends" or "ask an accountant".
            </p>
          </div>

          <img
            src={heroPhoto}
            alt="A couple going through home loan paperwork with an adviser"
            className="w-full rounded-lg shadow-glow"
            decoding="async"
          />
        </div>
      </section>

      <section className="container py-14">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter guides by topic">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                category === item
                  ? "border-brand bg-brand text-brand-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {shown.map((article) => (
            <article
              key={article.slug}
              className="group flex flex-col rounded-lg border bg-card p-6 shadow-sm transition hover:shadow-elegant"
            >
              <div className="flex items-center gap-3 text-xs">
                <span className="rounded-full bg-muted px-2.5 py-1 font-medium">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  {readingMinutes(article)} min read
                </span>
              </div>

              <h2 className="mt-4 font-heading text-xl font-semibold">
                <Link to={`/blog/${article.slug}`} className="group-hover:text-primary">
                  {article.title}
                </Link>
              </h2>

              <p className="mt-3 flex-1 text-sm text-muted-foreground">{article.summary}</p>

              <p className="mt-5 flex items-center justify-between border-t pt-4 text-sm">
                <span className="text-muted-foreground">Updated {article.updated}</span>
                <Link
                  to={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-1 font-medium text-primary"
                >
                  Read
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Blog;
