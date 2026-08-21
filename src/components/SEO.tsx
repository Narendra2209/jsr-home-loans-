import { Helmet } from "react-helmet-async";
import React from "react";

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SEO: React.FC<SEOProps> = ({ title, description, canonicalPath, jsonLd }) => {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const path = canonicalPath ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  const canonical = origin + path;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
