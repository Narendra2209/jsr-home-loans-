import pages from "@/content/pages.json";

/**
 * Typed view of src/content/pages.json.
 *
 * That file is the single list of public pages: this module feeds the sitemap
 * page and the footer, and scripts/generate-sitemap.mjs reads the same JSON to
 * write sitemap.xml and robots.txt. Add a page there and it appears everywhere.
 */

export type SitePage = {
  path: string;
  label: string;
  description: string;
  priority: string;
};

export type SiteSection = {
  title: string;
  pages: SitePage[];
};

export const siteUrl: string = pages.siteUrl;
export const sections: SiteSection[] = pages.sections;

/**
 * The footer shows three link columns in the same order as the header nav —
 * what we sell, then the tools, then the company. Legal lives in the bottom bar.
 */
const footerOrder = ["Loans", "Tools", "Main"];

export const footerColumns = footerOrder
  .map((title) => sections.find((section) => section.title === title))
  .filter((section): section is SiteSection => Boolean(section));
