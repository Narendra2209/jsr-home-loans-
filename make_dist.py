#!/usr/bin/env python3
"""Assemble dist/ - the deployable, flattened site.

Runs the two builders, then copies only what a browser needs into dist/:
pages, the single stylesheet, the JS bundles, images, sitemap and robots.
Source fragments, build scripts and internal notes stay out of it, so the
published site cannot leak them.

    python make_dist.py

Idempotent - dist/ is rebuilt from scratch every run.
"""

import pathlib
import re
import shutil
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent
DIST = ROOT / "dist"

# The generated-block markers name _src/, which does not exist in dist/.
MARKERS = {
    "/* >>> jsr-hero: generated from _src/css-hero.css <<< */":
        "/* --- Hero ------------------------------------------------------------- */",
    "/* <<< end jsr-hero >>> */":
        "/* --- end Hero --------------------------------------------------------- */",
    "/* >>> jsr-generated: do not edit here, edit _src/css-*.css <<< */":
        "/* --- Components, motion, flip cards, effects, breakpoints -------------- */",
    "/* <<< end jsr-generated >>> */":
        "/* --- end Components --------------------------------------------------- */",
}


def run(*args):
    result = subprocess.run([sys.executable, *args], cwd=ROOT)
    if result.returncode:
        sys.exit("%s failed" % " ".join(args))


def main():
    run("_src/build_css.py")
    run("build.py")

    if DIST.exists():
        shutil.rmtree(DIST)
    (DIST / "assets" / "css").mkdir(parents=True)
    (DIST / "assets" / "js").mkdir(parents=True)
    (DIST / "assets" / "img").mkdir(parents=True)

    pages = sorted(ROOT.glob("*.html"))
    for page in pages:
        shutil.copy2(page, DIST / page.name)
    for name in ("sitemap.xml", "robots.txt"):
        shutil.copy2(ROOT / name, DIST / name)

    for js in sorted((ROOT / "assets" / "js").glob("*.js")):
        shutil.copy2(js, DIST / "assets" / "js" / js.name)

    # _original/ holds the pre-compression masters - not for the web.
    images = [p for p in (ROOT / "assets" / "img").iterdir() if p.is_file()]
    for img in sorted(images):
        shutil.copy2(img, DIST / "assets" / "img" / img.name)

    css = (ROOT / "assets" / "css" / "style.css").read_text(encoding="utf-8")
    for old, new in MARKERS.items():
        css = css.replace(old, new)
    (DIST / "assets" / "css" / "style.css").write_text(css, encoding="utf-8", newline="\n")

    check(pages)
    total = sum(1 for p in DIST.rglob("*") if p.is_file())
    size = sum(p.stat().st_size for p in DIST.rglob("*") if p.is_file())
    print("dist/ built: %d pages, %d files, %.1f MB" % (len(pages), total, size / 1e6))


REF_RE = re.compile(r'(?:href|src)\s*=\s*"([^"]+)"')
URL_RE = re.compile(r'url\(\s*["\']?([^"\')]+)["\']?\s*\)')
SKIP = ("http", "//", "#", "mailto:", "tel:", "data:", "javascript:")


def check(pages):
    """Fail loudly rather than deploying a site with dead links."""
    missing = []
    for page in pages:
        text = (DIST / page.name).read_text(encoding="utf-8")
        if "_src/" in text:
            missing.append((page.name, "references _src/"))
        for ref in REF_RE.findall(text):
            if ref.startswith(SKIP):
                continue
            if not (DIST / ref.split("#")[0].split("?")[0]).exists():
                missing.append((page.name, ref))
    css_dir = DIST / "assets" / "css"
    for ref in URL_RE.findall((css_dir / "style.css").read_text(encoding="utf-8")):
        if ref.startswith(SKIP):
            continue
        if not (css_dir / ref).resolve().exists():
            missing.append(("style.css", ref))
    if missing:
        for where, ref in missing:
            print("  MISSING  %s -> %s" % (where, ref))
        sys.exit("%d broken reference(s); dist/ not safe to deploy" % len(missing))
    print("all local references resolve")


if __name__ == "__main__":
    main()
