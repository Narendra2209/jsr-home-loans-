import { formEndpoint, office, whatsappNumber } from "@/content/company";

export type Enquiry = {
  name: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
  /** Anything the page already knows — a calculation, a property type. */
  context?: string;
};

export const enquiryText = (enquiry: Enquiry) =>
  [
    `Name: ${enquiry.name}`,
    enquiry.phone && `Phone: ${enquiry.phone}`,
    enquiry.email && `Email: ${enquiry.email}`,
    enquiry.service && `Loan type: ${enquiry.service}`,
    enquiry.context && `Details: ${enquiry.context}`,
    enquiry.message && `Message: ${enquiry.message}`,
  ]
    .filter(Boolean)
    .join("\n");

export const whatsappUrl = (enquiry: Enquiry) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello JSR Home Loan Services, I would like to enquire.\n\n${enquiryText(enquiry)}`,
  )}`;

/** A bare WhatsApp link with an opening message — no enquiry attached. */
export const whatsappChatUrl = (message: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

export const mailtoUrl = (enquiry: Enquiry) =>
  `mailto:${office.email}?subject=${encodeURIComponent(
    `Loan enquiry — ${enquiry.name}`,
  )}&body=${encodeURIComponent(enquiryText(enquiry))}`;

export type SendResult =
  /** Delivered to the form service. */
  | { outcome: "sent" }
  /** No endpoint configured — the caller must hand off to WhatsApp or email. */
  | { outcome: "not-configured" }
  /** The endpoint exists but rejected or was unreachable. */
  | { outcome: "failed" };

/**
 * Posts an enquiry to the configured form service.
 *
 * Returns what actually happened. Never claim an enquiry was received unless
 * this resolves to "sent" — the previous version of the contact form told every
 * visitor they would be contacted and then discarded their details.
 */
export const sendEnquiry = async (enquiry: Enquiry): Promise<SendResult> => {
  if (!formEndpoint) return { outcome: "not-configured" };

  try {
    const response = await fetch(formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(enquiry),
    });
    return response.ok ? { outcome: "sent" } : { outcome: "failed" };
  } catch {
    return { outcome: "failed" };
  }
};
