/**
 * Facts that appear on more than one page. Edit them here once.
 *
 * The home page and the About page must never show different totals — two
 * numbers for the same thing on one website undoes the trust both were meant
 * to build. That is why these live here and not in either page's own file.
 *
 * TODO: every figure below is a stand-in. Replace before going live.
 */

/** TODO: the one number still outstanding across the whole site. */
export const indicativeRate = 8.35;

export const establishedYear = "[2015]";
export const yearsInBusiness = "[10]";
export const familiesServed = "[1,200]";

export const metrics = [
  { value: "₹250 Cr+", label: "Loans disbursed" },
  { value: "1,200+", label: "Families served" },
  { value: "20+", label: "Partner banks" },
  { value: "4.8/5", label: "Customer rating" },
];

/** Country code + number, digits only. Used to build wa.me links. */
export const whatsappNumber = "919000781967";

/**
 * Where the contact and lead-capture forms POST.
 *
 * TODO: create a free Formspree or Web3Forms account and paste the endpoint URL
 * here. While this is empty the forms hand off to WhatsApp or the visitor's
 * email app instead — they never claim an enquiry was received when it was not.
 */
export const formEndpoint = "";

/**
 * Your Google Business profile. TODO: paste the real URL — open your listing,
 * click Share, and copy the link. The rating and count must match what Google
 * actually shows; a number that disagrees with the profile is worse than none.
 */
export const googleProfileUrl = "https://www.google.com/maps";
export const googleRating = "[4.8]";
export const googleReviewCount = "[180]";

/**
 * Social profiles.
 *
 * TODO: add only profiles that exist and have something on them. An icon
 * linking to an empty page costs more trust than a missing icon, so the footer
 * hides the whole row while this list is empty.
 *
 * Example:
 *   { label: "Facebook", short: "f", href: "https://facebook.com/yourpage" },
 */
export const socialLinks: { label: string; short: string; href: string }[] = [];

export const office = {
  address:
    "11-14-518/1, 103 First Floor, Amrutha Pride, Siri Nagar Colony, LB Nagar, Hyderabad 500074",
  phone: "9000781967",
  email: "jsrhomeloans@gmail.com",
  hours: "Mon–Sat, 9:30am–7pm",
};

/**
 * Map links, built from the address above so there is nothing extra to keep in
 * step. No Google Maps API key is needed for either.
 *
 * TODO: once your Google Business listing is verified, swap `directionsUrl` for
 * the short link from its Share menu — it lands on your actual listing with
 * reviews and photos, rather than on a pin at the address.
 */
const mapQuery = encodeURIComponent(`JSR Home Loan Services, ${office.address}`);

export const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&z=16&output=embed`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

/**
 * Registration rows. Clear a value to drop that row from the page — an empty
 * field looks worse than an absent one.
 *
 * Do NOT add: your PAN, anyone's Aadhaar, or bank DSA codes your agreement
 * with that lender does not let you publish.
 */
export const registration = [
  { label: "Legal name", value: "[JSR Home Loan Services]" },
  { label: "Entity type", value: "[Proprietorship / Partnership / Pvt Ltd]" },
  { label: "Established", value: "[2015]" },
  { label: "Registration no.", value: "[Firm registration or CIN]" },
  { label: "GSTIN", value: "[36XXXXXXXXXXXZX]" },
];
