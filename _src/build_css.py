#!/usr/bin/env python3
"""Splice the new CSS blocks into assets/css/style.css.

Idempotent: reruns replace the previously inserted blocks rather than
stacking duplicates. Run from the project root:

    python _src/build_css.py
"""

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "_src"
CSS = ROOT / "assets" / "css" / "style.css"

START = "/* >>> jsr-generated: do not edit here, edit _src/css-*.css <<< */"
END = "/* <<< end jsr-generated >>> */"

HERO_START_MARK = "/* >>> jsr-hero: generated from _src/css-hero.css <<< */"
HERO_END_MARK = "/* <<< end jsr-hero >>> */"
HERO_START = "/* ==========================================================================\n   Hero slider"
SPLIT_START = "/* ==========================================================================\n   Split sections"
RESPONSIVE_START = "/* ==========================================================================\n   Responsive"


def read(path):
    return path.read_text(encoding="utf-8")


def main():
    css = read(CSS)

    # Drop any previously generated block so this script can be re-run.
    css = re.sub(re.escape(START) + r".*?" + re.escape(END) + r"\n?", "", css, flags=re.S)

    # 1. Replace the hero block. On the first run the original "Hero slider"
    #    section is still there; after that the block is delimited by its own
    #    markers so that edits to css-hero.css are picked up on every run.
    hero = HERO_START_MARK + "\n" + read(SRC / "css-hero.css").strip() + "\n" + HERO_END_MARK
    if HERO_START_MARK in css:
        css = re.sub(
            re.escape(HERO_START_MARK) + r".*?" + re.escape(HERO_END_MARK),
            lambda _: hero,
            css,
            flags=re.S,
        )
    elif HERO_START in css:
        head, rest = css.split(HERO_START, 1)
        if SPLIT_START not in rest:
            sys.exit("Could not find the split-sections marker in style.css")
        _, tail = rest.split(SPLIT_START, 1)
        css = head + hero + "\n\n" + SPLIT_START + tail
    else:
        sys.exit("Could not find the hero block (neither markers nor the original heading)")

    # 2. Insert components + responsive additions before the existing responsive block.
    block = (
        START
        + "\n"
        + read(SRC / "css-components.css").strip()
        + "\n\n"
        # After components so the glass fills win the same-specificity ties,
        # before responsive so the breakpoints still get the last word.
        + read(SRC / "css-motion.css").strip()
        + "\n\n"
        # Flip after motion: it neutralises the card fills motion.css sets.
        + read(SRC / "css-flip.css").strip()
        + "\n\n"
        # Effects last of the desktop rules: the header glass and button states
        # deliberately override the base rules they sit on top of.
        + read(SRC / "css-effects.css").strip()
        + "\n\n"
        + read(SRC / "css-responsive.css").strip()
        + "\n\n"
        # Polish last of all: the breakpoint ladder, fluid rhythm and
        # touch targets are deliberate overrides of everything above
        # them, and rely on source order to win same-specificity ties.
        + read(SRC / "css-polish.css").strip()
        + "\n"
        + END
        + "\n\n"
    )
    #    It goes at the END of the file, after the original hand-written
    #    responsive block: same-specificity rules are decided by source order,
    #    and the generated rules are the newer intent, so they must win.
    if RESPONSIVE_START not in css:
        sys.exit("Could not find the responsive marker in style.css")
    css = css.rstrip() + "\n\n" + block.rstrip() + "\n"

    CSS.write_text(css, encoding="utf-8", newline="\n")
    print("style.css rebuilt (%d bytes)" % len(css))


if __name__ == "__main__":
    main()
