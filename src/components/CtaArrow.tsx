import React from "react";
import { ArrowRight } from "lucide-react";

/**
 * The circled arrow inside a hero call-to-action button.
 *
 * The disc sits against two different button fills, so the tone names the
 * button it is placed in. Both discs are navy tinted; the white button needs
 * the lighter of the two to stay soft against its own fill.
 */
const CtaArrow: React.FC<{ tone?: "onAmber" | "onWhite" }> = ({ tone = "onAmber" }) => (
  <span
    className={
      tone === "onAmber"
        ? "grid h-7 w-7 place-items-center rounded-full bg-brand/20"
        : "grid h-7 w-7 place-items-center rounded-full bg-brand/10"
    }
  >
    <ArrowRight className="h-4 w-4" aria-hidden="true" />
  </span>
);

export default CtaArrow;
