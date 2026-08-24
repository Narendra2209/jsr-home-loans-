/**
 * Opening mail, and knowing whether it actually opened.
 *
 * A `mailto:` link only does something when the device has an app registered to
 * handle one. On a desktop where email is read at gmail.com in a browser tab —
 * which is most of them — nothing is registered and the click is a silent
 * no-op. The browser fires no error for that, so anything handing a visitor off
 * to email has to infer it and offer another way through. Telling someone "your
 * email app is opening" when it is not loses the enquiry.
 *
 * WhatsApp does not have this problem: `https://wa.me/...` is an ordinary URL.
 */

/** How long to give a mail app to take over before deciding none did. */
const HANDOFF_GRACE_MS = 1200;

/**
 * Navigates to a `mailto:` URL and resolves true if something handled it.
 *
 * The inference is focus: a mail app that opens takes focus off the page, and a
 * mobile mail app hides it outright. If the page still holds focus after the
 * grace period, nothing opened.
 *
 * Must be called during a user gesture — browsers refuse protocol navigation
 * without one.
 */
export const openMail = (url: string): Promise<boolean> =>
  new Promise((resolve) => {
    let handedOff = false;
    const noteHandoff = () => {
      handedOff = true;
    };

    window.addEventListener("blur", noteHandoff);
    document.addEventListener("visibilitychange", noteHandoff);

    window.location.href = url;

    window.setTimeout(() => {
      window.removeEventListener("blur", noteHandoff);
      document.removeEventListener("visibilitychange", noteHandoff);
      resolve(handedOff || document.hidden || !document.hasFocus());
    }, HANDOFF_GRACE_MS);
  });

/**
 * Copies text, reporting whether it landed rather than assuming it did.
 *
 * `navigator.clipboard` is absent outside secure contexts and browsers refuse
 * writes made too long after the click that asked for them, so the caller needs
 * to know — a toast claiming "copied" when nothing was is the same lie in
 * miniature.
 */
export const copyText = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

/**
 * Hands the visitor to email, one way or another.
 *
 * Tries the registered mail app first. When nothing is registered — the usual
 * case on a desktop where mail is read at gmail.com — it opens Gmail's compose
 * window instead, so the click always lands somewhere useful rather than
 * silently doing nothing. Resolves false only when both routes fail, which is
 * the caller's cue to show the address.
 *
 * Must be called during a user gesture.
 */
export const openEmail = async (address: string): Promise<boolean> => {
  if (await openMail(`mailto:${address}`)) return true;

  const compose = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(address)}`;
  return window.open(compose, "_blank", "noopener,noreferrer") !== null;
};
