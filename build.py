#!/usr/bin/env python3
"""
Static site builder for JSR Home Loan Services.

Assembles every page in _src/pages/ with the shared partials in
_src/partials/ and writes plain .html files to the project root.
Stdlib only - no dependencies, no node_modules.

    python build.py

Page fragments start with an optional front-matter block:

    <!--meta
    title: Page title
    description: Meta description
    nav: tools emi          # nav keys to mark active
    slug: emi-calculator    # output file name, minus .html
    scripts: tools          # extra js bundles, space separated
    -->

and may contain one <!--head--> ... <!--/head--> block whose contents are
moved into <head> (used for per-page JSON-LD).
"""

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / "_src"
PARTIALS = SRC / "partials"
PAGES = SRC / "pages"

SITE = "https://jsrhomeloanservices.com"

META_RE = re.compile(r"\A\s*<!--meta\s*(.*?)-->\s*", re.S)
HEAD_RE = re.compile(r"<!--head-->(.*?)<!--/head-->\s*", re.S)


def read(path):
    return path.read_text(encoding="utf-8")


def parse_front_matter(text):
    meta, match = {}, META_RE.match(text)
    if match:
        for line in match.group(1).strip().splitlines():
            line = line.strip()
            if not line or ":" not in line:
                continue
            key, value = line.split(":", 1)
            meta[key.strip()] = value.strip()
        text = text[match.end():]
    return meta, text


def extract_head(text):
    head_bits = []

    def take(match):
        head_bits.append(match.group(1).strip())
        return ""

    text = HEAD_RE.sub(take, text)
    return "\n".join(head_bits), text


def fill(template, values):
    for key, value in values.items():
        template = template.replace("{{%s}}" % key, value)
    return re.sub(r"\{\{\w+\}\}", "", template)


def mark_active(header, keys):
    for key in keys:
        header = header.replace(
            'data-nav="%s"' % key, 'data-nav="%s" class="is-active"' % key, 1
        )
    return header


def script_tags(names):
    return "".join(
        '\n<script src="assets/js/%s.js"></script>' % name for name in names if name
    )


def build():
    head = read(PARTIALS / "head.html")
    header = read(PARTIALS / "header.html")
    footer = read(PARTIALS / "footer.html")

    fragments = sorted(PAGES.glob("*.html"))
    if not fragments:
        sys.exit("No page fragments found in %s" % PAGES)

    written = []
    for fragment in fragments:
        meta, body = parse_front_matter(read(fragment))
        head_extra, body = extract_head(body)
        slug = meta.get("slug", fragment.stem)
        values = {
            "title": meta.get("title", "JSR Home Loan Services"),
            "description": meta.get("description", ""),
            "canonical": "%s/%s" % (SITE, "" if slug == "index" else slug + ".html"),
            "image": "%s/assets/img/hero-1.jpg" % SITE,
            "page": slug,
            "head_extra": head_extra,
            "body_class": meta.get("body_class", ""),
        }
        page = (
            fill(head, values)
            + mark_active(header, meta.get("nav", "").split())
            + "\n"
            + body.strip()
            + "\n"
            + fill(footer, {"scripts": script_tags(meta.get("scripts", "").split())})
        )
        page = page.replace('<body data-page="%s" class="">' % slug,
                            '<body data-page="%s">' % slug)
        out = ROOT / (slug + ".html")
        out.write_text(page, encoding="utf-8", newline="\n")
        written.append(out.name)

    write_sitemap(written)
    write_robots()
    print("Built %d pages: %s" % (len(written), ", ".join(written)))
    print("Wrote sitemap.xml and robots.txt")


# Rough crawl priority: the money pages first, then products, then guides.
PRIORITY = {
    "index.html": "1.0",
    "emi-calculator.html": "0.9",
    "eligibility.html": "0.9",
    "home-loan.html": "0.9",
    "balance-transfer.html": "0.9",
    "loan-against-property.html": "0.8",
    "bank-comparison.html": "0.8",
    "services.html": "0.8",
    "contact.html": "0.8",
    "about.html": "0.7",
    "testimonials.html": "0.7",
    "blog.html": "0.7",
    "privacy-policy.html": "0.3",
    "terms.html": "0.3",
    "sitemap.html": "0.3",
}


def write_sitemap(names):
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for name in sorted(names, key=lambda n: (-float(PRIORITY.get(n, "0.6")), n)):
        loc = SITE + "/" + ("" if name == "index.html" else name)
        lines.append("  <url>")
        lines.append("    <loc>%s</loc>" % loc)
        lines.append("    <priority>%s</priority>" % PRIORITY.get(name, "0.6"))
        lines.append("  </url>")
    lines.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(lines) + "\n", encoding="utf-8", newline="\n")


def write_robots():
    (ROOT / "robots.txt").write_text(
        "User-agent: *\n"
        "Allow: /\n"
        "Disallow: /_src/\n"
        "\n"
        "Sitemap: %s/sitemap.xml\n" % SITE,
        encoding="utf-8",
        newline="\n",
    )


if __name__ == "__main__":
    build()
