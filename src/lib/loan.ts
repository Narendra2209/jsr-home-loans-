/** Shared loan arithmetic, so the calculators can never disagree with each other. */

export const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** Standard reducing-balance EMI. */
export const emiFor = (principal: number, annualRate: number, months: number) => {
  const monthly = annualRate / 12 / 100;
  if (monthly === 0) return principal / months;
  return (
    (principal * monthly * Math.pow(1 + monthly, months)) / (Math.pow(1 + monthly, months) - 1)
  );
};

/** The principal a given monthly capacity can service. */
export const principalFor = (monthlyCapacity: number, annualRate: number, months: number) => {
  const monthly = annualRate / 12 / 100;
  if (monthly === 0) return monthlyCapacity * months;
  return (monthlyCapacity * (Math.pow(1 + monthly, months) - 1)) / (monthly * Math.pow(1 + monthly, months));
};

/** ₹45,00,000 reads as "₹45 L"; ₹1,20,00,000 as "₹1.2 Cr". */
export const shortAmount = (value: number) => {
  if (value >= 10000000) {
    const cr = value / 10000000;
    return `₹${cr % 1 === 0 ? cr : cr.toFixed(2).replace(/0$/, "")} Cr`;
  }
  return `₹${value / 100000} L`;
};

export const rupees = (value: number) => `₹${inr.format(Math.round(value))}`;

/**
 * "₹25 lakh" below a crore, "₹1.25 Cr" above it.
 *
 * Floors to the whole lakh on purpose: this reads as the estimate it is, where
 * "₹25,43,817" would read as a quote. Distinct from shortAmount above, which
 * abbreviates to "₹25 L" and does not round — the eligibility pages want the
 * long word, the EMI calculators want the short one.
 */
export const asAmount = (value: number) => {
  const lakhs = value / 100000;
  if (lakhs >= 100) return `₹${(lakhs / 100).toFixed(2)} Cr`;
  return `₹${Math.floor(lakhs)} lakh`;
};

/** The same rounding as asAmount, written out in full: "₹25,00,000". */
export const asRoundedRupees = (value: number) => rupees(Math.floor(value / 100000) * 100000);
