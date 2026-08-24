/**
 * About page content.
 *
 * Almost everything here is a fact about JSR that only you can supply. Bracketed
 * text is a stand-in, deliberately visible so this page cannot be published by
 * accident. See also src/content/company.ts for the shared numbers.
 */

/**
 * TODO: replace with the founder's own words.
 *
 * Five questions to answer, from the proposal:
 *   1. Your name, and what you did before JSR.
 *   2. The year you started, and what made you start.
 *   3. One customer you still remember — no names needed.
 *   4. What you do differently from the broker down the road.
 *   5. A photograph. A plain portrait against a wall is fine.
 */
export const founder = {
  name: "[Founder name]",
  role: "Founder, JSR Home Loan Services",
  /** Drop a portrait in src/assets and import it here. */
  photo: null as string | null,
  paragraphs: [
    "[Founder name] spent [X] years at [bank or company] watching good applications get rejected for bad reasons — a missing document, a form filled in wrong, a file that sat on the wrong desk for three weeks.",
    "In [year] he left to build the thing that had been missing. JSR Home Loan Services started with [one desk], and has since arranged loans for [11,000] families across Hyderabad — many of whom had already been turned down somewhere else.",
  ],
  pullQuote: "The bank was not the problem. Nobody was on the customer's side of the table.",
};

/**
 * TODO: real names, real roles, real photos — and each person's consent before
 * their face and name go on a public site. Show however many there really are.
 * Two honest cards beat four invented ones.
 */
export const team = [
  {
    name: "[Name]",
    role: "Founder",
    duty: "Handles bank relationships and the files nobody else will touch.",
    photo: null as string | null,
  },
  {
    name: "[Name]",
    role: "Loan Operations",
    duty: "Matches your profile to lenders and tracks every sanction to the day.",
    photo: null as string | null,
  },
  {
    name: "[Name]",
    role: "Documentation",
    duty: "Prepares your file so the bank has no reason to send it back.",
    photo: null as string | null,
  },
  {
    name: "[Name]",
    role: "Customer Relations",
    duty: "The person who picks up when you call, and calls you before you have to.",
    photo: null as string | null,
  },
];

export const mission = {
  title: "Make finance simple to reach",
  body: "Clear guidance, fair options, and quick support — so a loan is a decision, not an ordeal.",
};

export const vision = {
  title: "Hyderabad's most reliable loan partner",
  body: "To be the first name a family thinks of for a Home, Mortgage or Personal Loan in this city.",
};

export const values = ["Transparency", "Trust", "Speed", "Customer first"];

/** TODO: four dates that actually happened. A real small milestone beats a rounded-up one. */
export const milestones = [
  { year: "[2009]", event: "JSR Home Loan Services opens in LB Nagar." },
  { year: "[2018]", event: "[100th] loan sanctioned; the team grows to [four]." },
  { year: "[2021]", event: "Partnerships cross [15] banks and housing finance companies." },
  { year: "[2025]", event: "[₹250 Cr] arranged for [11,000] families across Hyderabad." },
];

/** TODO: only what you can evidence. Bank recognitions carry the most weight. */
export const achievements = [
  { title: "[Top DSA — bank name, year]", note: "Recognition from a lending partner." },
  { title: "[4.8 stars across 180 Google reviews]", note: "Public, verifiable, and worth linking to." },
  { title: "[500th home loan sanctioned, year]", note: "A milestone only you can confirm." },
  { title: "[Empanelled with X housing finance companies]", note: "Formal standing with lenders." },
];
