import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Takes you to the top of a page when you navigate to it.
 *
 * React Router keeps the scroll position between routes, so following a link
 * from halfway down one page drops you halfway down the next — usually into the
 * middle of a section, with the heading already above the fold.
 *
 * An anchor link within a page (#eligibility) still scrolls to its section
 * rather than the top, which is the whole point of those links.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Let the new page render before looking for the target.
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
