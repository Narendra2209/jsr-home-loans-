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
