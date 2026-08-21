import type { Block } from "@/content/blog";
import { office } from "@/content/company";

/**
 * Privacy policy and terms.
 *
 * These describe what this website genuinely does, which is what a privacy
 * policy is required to do — a generic template that describes cookies you do
 * not set and databases you do not have is worse than none.
 *
 * ⚠ These are careful drafts, not a legal review. Have a lawyer read them before
 * publishing, particularly the fee clause in the terms.
 *
 * TODO: the fee arrangement is bracketed in both documents. It is the one clause
 * that cannot be written from how the site behaves.
 */

export type LegalDoc = {
  title: string;
  slug: string;
  summary: string;
  updated: string;
  body: Block[];
};

export const privacyPolicy: LegalDoc = {
  title: "Privacy Policy",
  slug: "privacy-policy",
  summary:
    "What we collect when you use this website, what we do with it, and how to ask us to delete it.",
  updated: "August 2026",
  body: [
    {
      type: "p",
      text: "JSR Home Loan Services operates this website. This policy explains what personal information we collect through it, why, and what happens to it afterwards. It describes what this website actually does — not what a template says a website might do.",
    },

    { type: "h2", text: "What we collect" },
    {
      type: "p",
      text: "We collect information only when you choose to send it to us. There is no account to create and nothing is collected in the background.",
    },
    {
      type: "ul",
      items: [
        "Your name, and the phone number or email address you give us",
        "The loan type you select, and any message you type",
        "The callback time you prefer, if you request a call",
        "The figures you attach when you send us a calculation",
      ],
    },

    { type: "h2", text: "What we do not collect" },
    {
      type: "ul",
      items: [
        "No accounts, passwords or logins — there are none on this site",
        "No advertising or behavioural tracking, and no third-party analytics profile of you",
        "No documents. We never ask you to upload identity or income papers through this website",
        "Nothing is stored in a database on this website. Your enquiry travels to us as a WhatsApp message or an email and lives in our inbox, not on the site",
      ],
    },

    {
      type: "callout",
      title: "The calculators do not send anything",
      text: "The EMI calculator, eligibility checker and balance transfer calculator all run entirely inside your own browser. The income, loan amount and rate you enter are never transmitted to us, or to anyone else, unless you deliberately press a button to send them.",
    },

    { type: "h2", text: "Why we use it, and who sees it" },
    {
      type: "ul",
      items: [
        "To reply to your enquiry and call you back when you asked us to",
        "To work out what you are likely to qualify for",
        "To approach banks and housing finance companies on your behalf — and only with your consent, because that means passing your details to them so they can assess you",
      ],
    },
    {
      type: "p",
      text: "We do not sell your information, and we do not share it with anyone other than the lenders you have asked us to approach.",
    },

    { type: "h2", text: "Third parties this website touches" },
    {
      type: "table",
      head: ["Service", "When", "What it sees"],
      rows: [
        ["WhatsApp (Meta)", "Only if you press a WhatsApp button", "Your message and phone number, under Meta's own privacy terms"],
        ["Email", "Only if you send an enquiry by email", "Whatever the email contains"],
        ["Google Maps", "Only after you click to load the map on the contact page", "Sets Google's own cookies; the map does not load until you ask"],
        ["Google Fonts", "On every page", "Loads the site's typefaces from Google's servers"],
      ],
    },

    { type: "h2", text: "Cookies" },
    {
      type: "p",
      text: "This website sets no cookies of its own. The only cookies that can appear are Google's, and only after you have clicked to load the map on the contact page.",
    },

    { type: "h2", text: "How long we keep it" },
    {
      type: "p",
      text: "We keep your enquiry for as long as we are working with you, and afterwards for as long as we are required to for our records. You can ask us to delete it at any time and we will, unless we are legally required to retain it.",
    },

    { type: "h2", text: "Your rights" },
    {
      type: "p",
      text: "Under India's Digital Personal Data Protection Act, 2023 you may ask us what information we hold about you, ask us to correct it, ask us to erase it, and withdraw a consent you previously gave. To do any of those, contact us using the details below and we will respond as quickly as we can.",
    },

    { type: "h2", text: "Contact us about your data" },
    {
      type: "ul",
      items: [
        `Email: ${office.email}`,
        `Phone: ${office.phone}`,
        `Post: JSR Home Loan Services, ${office.address}`,
      ],
    },

    {
      type: "p",
      text: "If you are not satisfied with how we have handled a request, you may raise the matter with the Data Protection Board of India.",
    },

    {
      type: "callout",
      title: "Changes to this policy",
      text: "If what we collect or do with it changes, we will update this page and the date at the top of it.",
    },
  ],
};

export const terms: LegalDoc = {
  title: "Terms & Conditions",
  slug: "terms",
  summary:
    "What this website is, what our role is, and the limits of both. Please read before relying on anything here.",
  updated: "August 2026",
  body: [
    {
      type: "p",
      text: "These terms apply to your use of this website. By using it you accept them. If you do not, please do not use the site.",
    },

    { type: "h2", text: "What this website is" },
    {
      type: "p",
      text: "This website provides information about loans and tools to estimate them. It is not an offer to lend, an invitation to borrow, or a commitment of any kind. Nothing on it should be treated as financial, legal or tax advice.",
    },

    { type: "h2", text: "Our role" },
    {
      type: "p",
      text: "JSR Home Loan Services is a loan referral partner — a Direct Selling Agent empanelled with banks and housing finance companies. We are not a bank, an NBFC or a lender, and we are not registered with the Reserve Bank of India. We do not accept deposits, we do not lend money and we do not sanction loans.",
    },
    {
      type: "p",
      text: "We introduce your application to lenders and help you through their process. Every decision about whether to lend, how much, at what rate and on what terms belongs to the lender alone.",
    },

    { type: "h2", text: "Estimates are estimates" },
    {
      type: "p",
      text: "The EMI calculator, eligibility checker, balance transfer calculator and comparison tables produce indicative figures based on the values entered and standard assumptions. They are not quotations, offers or approvals. Interest rates, processing fees and eligibility criteria change without notice, and the figures a lender gives you may differ. Verify everything with the lender before you commit.",
    },

    {
      type: "callout",
      title: "No guarantee of approval",
      text: "We cannot and do not guarantee that any lender will approve your application, or approve it on the terms discussed. An estimate on this website confers no entitlement to a loan.",
    },

    { type: "h2", text: "Information you give us" },
    {
      type: "p",
      text: "You are responsible for the accuracy of what you tell us and what you submit to a lender. Applications are assessed on documents, and an estimate based on figures that turn out to be wrong will not survive that assessment.",
    },

    { type: "h2", text: "Fees" },
    {
      type: "p",
      text: "[Your fee arrangement goes here — what, if anything, a customer pays us, when it becomes payable, and whether it is refundable. This clause must be completed before publishing.]",
    },
    {
      type: "p",
      text: "Processing fees, valuation charges, legal fees and other costs are set by the lender and payable to the lender. We never ask a customer to transfer any amount to a personal account.",
    },

    { type: "h2", text: "Links to other websites" },
    {
      type: "p",
      text: "This site links to lenders, Google and other third parties. We do not control those sites and are not responsible for their content, their terms or how they handle your information.",
    },

    { type: "h2", text: "Our content" },
    {
      type: "p",
      text: "The text, design, guides and tools on this website belong to JSR Home Loan Services. You are welcome to read, print and share them. Please do not republish them as your own.",
    },

    { type: "h2", text: "Limits of our liability" },
    {
      type: "p",
      text: "We take care that the information here is accurate and current, but we do not warrant that it is free from error, and lending terms change constantly. To the extent permitted by law, we are not liable for any loss arising from reliance on this website, from a lender's decision, or from the site being unavailable.",
    },

    { type: "h2", text: "Governing law" },
    {
      type: "p",
      text: "These terms are governed by the laws of India, and the courts at Hyderabad, Telangana have exclusive jurisdiction over any dispute arising from them.",
    },

    { type: "h2", text: "Changes" },
    {
      type: "p",
      text: "We may update these terms. The date at the top of this page shows when they last changed.",
    },

    {
      type: "cta",
      text: "Questions about any of this? Ask us directly — we would rather explain it than have you guess.",
      label: "Contact us",
      to: "/contact",
    },
  ],
};

export const legalDocs = [privacyPolicy, terms];
