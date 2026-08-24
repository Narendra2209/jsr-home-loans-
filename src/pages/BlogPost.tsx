import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import ArticleBody from "@/components/blog/ArticleBody";
import { articles, findArticle, readingMinutes } from "@/content/blog";

const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const article = findArticle(slug);

  if (!article) return <Navigate to="/blog" replace />;

  const related = articles.filter((item) => item.slug !== article.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.summary,
    datePublished: article.updatedIso,
    dateModified: article.updatedIso,
    author: { "@type": "Organization", name: "JSR Home Loan Services" },
    publisher: { "@type": "Organization", name: "JSR Home Loan Services" },
  };

  return (
    <>
      <SEO
        title={`${article.title} | JSR Home Loan Services`}
        description={article.summary}
        canonicalPath={`/blog/${article.slug}`}
        jsonLd={jsonLd}
      />

      <article className="container py-12 md:py-16">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All guides
        </Link>

        <header className="mt-6 max-w-2xl">
          <div className="flex items-center gap-3 text-xs">
            <span className="rounded-full bg-muted px-2.5 py-1 font-medium">{article.category}</span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {readingMinutes(article)} min read
            </span>
            <span className="text-muted-foreground">Updated {article.updated}</span>
          </div>

          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight md:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{article.summary}</p>
        </header>

        <div className="mt-10">
          <ArticleBody blocks={article.body} />
        </div>

        <footer className="mt-16 border-t pt-10">
          <h2 className="font-heading text-2xl font-semibold">Keep reading</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug} className="rounded-lg border bg-card p-5 shadow-sm">
                <span className="text-xs font-medium text-muted-foreground">{item.category}</span>
                <h3 className="mt-2 font-semibold">
                  <Link to={`/blog/${item.slug}`} className="hover:text-primary">
                    {item.title}
                  </Link>
                </h3>
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-xl bg-brand p-8 text-brand-foreground shadow-elegant md:p-10">
            <h2 className="max-w-[24ch] font-heading text-2xl font-semibold md:text-3xl">
              Questions this did not answer?
            </h2>
            <p className="mt-3 max-w-prose text-brand-foreground/85">
              Every loan has a detail the guides cannot cover. Tell us your situation and we will
              give you a straight answer — including when the answer is that you should wait.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">Talk to Us</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/eligibility-checker">Check My Eligibility</Link>
              </Button>
            </div>
          </div>
        </footer>
      </article>
    </>
  );
};

export default BlogPost;
