import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Check, Info } from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import EmiCalculator from "@/components/EmiCalculator";
import { findProduct } from "@/content/products";

/**
 * One page component for the five data-driven loan products.
 *
 * Home loans, loan against property, personal loans and balance transfer keep
 * their own hand-built pages — they carry product-specific tools that do not
 * generalise. Everything else is the same shape, so it is the same page.
 */
const ProductPage: React.FC = () => {
  const { slug } = useParams();
  const product = findProduct(slug);

  if (!product) return <Navigate to="/services" replace />;

  const enquiryHref = `/contact?service=${encodeURIComponent(product.name)}`;

  return (
    <>
      <SEO
        title={product.seoTitle}
        description={product.seoDescription}
        canonicalPath={`/services/${product.slug}`}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-brand py-16 text-brand-foreground md:py-20">
        {/* Photograph bleeds off the right on the products that carry one */}
        {product.heroImage && (
          <div className="absolute inset-0 z-0">
            <img
              src={product.heroImage}
              alt={product.heroAlt ?? ""}
              decoding="async"
              style={{ objectPosition: product.heroFocus ?? "center" }}
              className="absolute inset-y-0 right-0 h-full w-full object-cover md:w-[56%]"
            />
            {/* Solid navy on phones; on desktop it holds to 42% then clears so the photo reads */}
            <div className="absolute inset-0 bg-brand/90 md:hidden" />
            <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,hsl(var(--brand))_0%,hsl(var(--brand))_42%,hsl(var(--brand)/0.72)_50%,hsl(var(--brand)/0.16)_60%,hsl(var(--brand)/0)_70%)] md:block" />
          </div>
        )}

        <div className="container relative z-10">
          <div className={product.heroImage ? "md:max-w-[56%]" : undefined}>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
              {product.kicker}
            </p>
            <h1 className="mt-3 max-w-[19ch] font-heading text-4xl font-bold tracking-tight md:text-5xl">
              {product.headline}
            </h1>
            <p className="mt-4 max-w-prose text-lg text-brand-foreground/85">{product.intro}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to={enquiryHref}>Apply for {product.name}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:9000781967">Call 9000781967</a>
              </Button>
            </div>

            <dl className="mt-8 grid max-w-2xl overflow-hidden rounded-lg border border-brand-foreground/15 sm:grid-cols-3">
              {product.quickSpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="border-b border-brand-foreground/15 p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
                >
                  <dt className="sr-only">{spec.label}</dt>
                  <dd>
                    <span className="block font-heading text-2xl font-bold tracking-tight text-brand-accent">
                      {spec.value}
                    </span>
                    <span className="text-xs text-brand-foreground/70">{spec.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Why through JSR
        </p>
        <h2 className="mt-2 font-heading text-3xl font-semibold">What you get</h2>

        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {product.features.map((feature) => (
            <li key={feature.title} className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{feature.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Specifications */}
      <section className="bg-muted/40 py-16">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">At a glance</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold">{product.name} details</h2>

          <dl className="mt-8 max-w-3xl border-t">
            {product.specs.map((row) => (
              <div key={row.label} className="flex flex-col gap-1 border-b py-3 sm:flex-row sm:gap-6">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground sm:w-48 sm:shrink-0 sm:pt-1">
                  {row.label}
                </dt>
                <dd>
                  <span className="font-medium">{row.value}</span>
                  {row.note && (
                    <span className="mt-0.5 block text-sm text-muted-foreground">{row.note}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Who it suits + worth knowing */}
      <section className="container py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Is this you?
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold">Who this suits</h2>
            <ul className="mt-6">
              {product.suits.map((item) => (
                <li key={item} className="flex gap-3 border-b py-3 text-sm">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="self-start rounded-xl border-l-4 border-primary bg-muted/50 p-6">
            <div className="flex gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h2 className="font-heading text-lg font-semibold">{product.worthKnowing.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{product.worthKnowing.text}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Documents */}
      <section className="bg-muted/40 py-16">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Documents</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold">What you will need</h2>

          <div className="mt-8 grid gap-10 md:grid-cols-2">
            {product.documents.map((group) => (
              <div key={group.heading}>
                <h3 className="font-semibold">{group.heading}</h3>
                <ul className="mt-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 border-b py-2.5 text-sm">
                      <span className="text-primary" aria-hidden="true">
                        ▢
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            We tell you which of these your lender actually wants before you gather anything.
          </p>
        </div>
      </section>

      {/* Calculator */}
      {product.showCalculator && (
        <section className="container py-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Plan your EMI
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold">
                What would it cost a month?
              </h2>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Move the sliders for an indicative EMI. Your actual rate depends on the lender, the
                property and your credit profile — this is a starting point, not a quotation.
              </p>
            </div>
            <EmiCalculator />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-brand py-16 text-brand-foreground">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
            Next step
          </p>
          <h2 className="mt-2 max-w-[24ch] font-heading text-3xl font-semibold">
            Tell us the situation. We will tell you honestly whether it works.
          </h2>
          <p className="mt-3 max-w-prose text-brand-foreground/85">
            If a different loan would serve you better, we will say so — including when that means we
            place a smaller file.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to={enquiryHref}>Apply for {product.name}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/eligibility-checker">Check My Eligibility</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;
