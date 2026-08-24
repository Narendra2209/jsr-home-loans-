/**
 * The five loan products carried over from the older JSR Home Loan Services
 * site. Home loans, loan against property, personal loans and balance transfer
 * have their own hand-built pages; these five share one page component driven
 * by the data below.
 *
 * Rates and fees are bracketed — they are yours to confirm. Everything else is
 * standard Indian lending practice and is safe as written, including the tax
 * notes, which are the details most competitor sites get wrong.
 */

import constructionHero from "@/assets/construction-loan-hero.jpg";
import renovationHero from "@/assets/renovation-loan-hero.jpg";
import plotHero from "@/assets/plot-loan-hero.jpg";
import commercialHero from "@/assets/commercial-loan-hero.jpg";
import businessHero from "@/assets/business-loan-hero.jpg";

export type LoanProduct = {
  slug: string;
  name: string;
  navLabel: string;
  kicker: string;
  headline: string;
  intro: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  /** Three figures for the hero strip. */
  quickSpecs: { value: string; label: string }[];
  features: { title: string; desc: string }[];
  specs: { label: string; value: string; note?: string }[];
  suits: string[];
  documents: { heading: string; items: string[] }[];
  /** The thing competitors leave out. Rendered as a highlighted callout. */
  worthKnowing: { title: string; text: string };
  /** Shows the EMI calculator on the page. Off where an EMI estimate would mislead. */
  showCalculator: boolean;
  /** Optional hero photograph. Without one the hero stays plain navy. */
  heroImage?: string;
  /** Describes heroImage for screen readers. Required whenever heroImage is set. */
  heroAlt?: string;
  /** CSS object-position for heroImage, picking what survives the crop. Defaults to centre. */
  heroFocus?: string;
};

export const products: LoanProduct[] = [
  {
    slug: "construction-loan",
    name: "Construction Loan",
    heroImage: constructionHero,
    heroAlt: "A house under construction at sunset, with a hard hat and rolled plans in the foreground",
    heroFocus: "center bottom",
    navLabel: "Construction Loan",
    kicker: "Building on your own plot",
    headline: "Already own the land? Fund the building.",
    intro:
      "A construction loan pays for building a house on a plot you already own. It works differently from a home loan in one important way — the money comes in stages as the building goes up, and you pay interest only on what has been released.",
    summary: "Build on a plot you already own, funded in stages as the work progresses.",
    seoTitle: "Construction Loan in Hyderabad | Build on Your Own Plot | JSR",
    seoDescription:
      "Construction loans in Hyderabad — stage-wise disbursement, up to 90% of the construction estimate, and support through every bank inspection. JSR Home Loan Services.",
    quickSpecs: [
      { value: "[7%–10%]", label: "Interest range p.a." },
      { value: "up to 90%", label: "Of construction cost" },
      { value: "30 years", label: "Maximum tenure" },
    ],
    features: [
      {
        title: "Money released in stages",
        desc: "Foundation, slab, brickwork, finishing — the bank releases each tranche after its engineer inspects the work.",
      },
      {
        title: "Interest only on what is drawn",
        desc: "Until the house is finished you pay interest on the amount released, not the full sanction.",
      },
      {
        title: "Your plot counts as margin",
        desc: "Land you already own is usually treated as your contribution, which reduces what you have to find in cash.",
      },
      {
        title: "We handle the inspections",
        desc: "Every tranche needs paperwork and a site visit. Chasing that is most of the work, and it is the part we do.",
      },
    ],
    specs: [
      {
        label: "Loan amount",
        value: "Based on the approved cost estimate",
        note: "Not on what the finished house might be worth",
      },
      {
        label: "Funding",
        value: "Up to 90% of the construction estimate",
        note: "Same RBI slabs as a home loan — lower percentage above ₹30 lakh",
      },
      { label: "Tenure", value: "Up to 30 years", note: "Subject to your age at maturity" },
      {
        label: "Disbursement",
        value: "In stages, against completion",
        note: "Typically four to five tranches with an engineer's inspection before each",
      },
      {
        label: "Repayment during build",
        value: "Interest only, on the amount drawn",
        note: "Full EMI starts once the last tranche is released",
      },
      {
        label: "Processing fee",
        value: "[0.5%] of the sanction",
        note: "Varies by lender; often negotiable",
      },
      {
        label: "Tax deduction",
        value: "Claimed after completion",
        note: "Interest paid during construction is claimed in five equal instalments from the year the house is finished — old regime only",
      },
    ],
    suits: [
      "You own a residential plot with clear title and want to build on it",
      "The plot is within municipal or corporation limits, in an approved layout",
      "You have an approved building plan and a costed estimate from an engineer or architect",
      "You can meet the stage-wise timeline — banks release money against progress, not against promises",
    ],
    documents: [
      {
        heading: "About the plot and the build",
        items: [
          "Sale deed and prior title chain for the plot",
          "Encumbrance certificate",
          "Approved building plan from the local authority",
          "Detailed cost estimate signed by an engineer or architect",
          "Latest property tax receipt for the plot",
          "Contractor agreement, where one is appointed",
        ],
      },
      {
        heading: "About you",
        items: [
          "PAN, Aadhaar and photographs",
          "Salaried: 3 months' payslips, Form 16, 6 months' statements",
          "Self-employed: 3 years' ITR with computation, audited financials",
          "6 to 12 months' bank statements",
          "Statements for any existing loans",
        ],
      },
    ],
    worthKnowing: {
      title: "Build slower than the bank expects and the loan can stall",
      text: "Lenders set a completion window, usually two to three years. If construction stops, tranches stop with it, and restarting means fresh valuation and paperwork. Tell us your realistic timeline at the start and we will match you to a lender whose schedule fits it, rather than the one with the lowest headline rate.",
    },
    showCalculator: true,
  },

  {
    slug: "home-renovation-loan",
    name: "Home Renovation Loan",
    heroImage: renovationHero,
    heroAlt: "A room mid-renovation, with a step ladder, paint tins and dust sheets over the floor",
    heroFocus: "center 35%",
    navLabel: "Renovation Loan",
    kicker: "Improving what you already own",
    headline: "Repair, extend or redo the house you already have.",
    intro:
      "A renovation loan funds work on a property you own — rewiring, a new kitchen, an extra room, waterproofing, a full interior redo. It is secured against the same property, which is why it costs far less than a personal loan for the same work.",
    summary: "Fund repairs, extensions and interiors against the property you already own.",
    seoTitle: "Home Renovation Loan in Hyderabad | Repair & Extend | JSR",
    seoDescription:
      "Home renovation loans in Hyderabad — cheaper than a personal loan, secured against your own property, with tax relief on the interest. JSR Home Loan Services.",
    quickSpecs: [
      { value: "[7%–11%]", label: "Interest range p.a." },
      { value: "up to 90%", label: "Of the estimate" },
      { value: "15 years", label: "Maximum tenure" },
    ],
    features: [
      {
        title: "Much cheaper than a personal loan",
        desc: "Because your property secures it, the rate is roughly half what an unsecured loan for the same work would cost.",
      },
      {
        title: "Structural or cosmetic",
        desc: "Extensions, plumbing and rewiring, waterproofing, flooring, a new kitchen, painting — most lenders fund all of it.",
      },
      {
        title: "Top-up on an existing loan",
        desc: "If you already have a home loan with a good record, a top-up is often faster and cheaper than a fresh renovation loan.",
      },
      {
        title: "Tax relief on the interest",
        desc: "Up to ₹30,000 a year is deductible on a self-occupied property — inside the overall ₹2 lakh limit.",
      },
    ],
    specs: [
      {
        label: "Loan amount",
        value: "Typically ₹1 lakh to ₹50 lakh",
        note: "Driven by the estimate and the property's value",
      },
      {
        label: "Funding",
        value: "Up to 80–90% of the renovation estimate",
        note: "You fund the remainder yourself",
      },
      {
        label: "Tenure",
        value: "Up to 15 years",
        note: "Shorter than a home loan; some lenders allow 20 on larger amounts",
      },
      { label: "Processing fee", value: "[0.5%–1%]", note: "Varies by lender" },
      {
        label: "Disbursement",
        value: "Lump sum or in stages",
        note: "Larger structural work is usually staged like a construction loan",
      },
      {
        label: "Tax deduction",
        value: "Up to ₹30,000 on interest",
        note: "Section 24(b), self-occupied property, within the overall ₹2 lakh cap — old regime only",
      },
    ],
    suits: [
      "You own the property outright or have a home loan on it in good standing",
      "The work is on an existing structure, not new construction on empty land",
      "You have a written estimate from a contractor",
      "Structural changes have local authority approval where one is required",
    ],
    documents: [
      {
        heading: "About the property and the work",
        items: [
          "Sale deed and title documents",
          "Latest property tax receipt",
          "Contractor's written estimate, itemised",
          "Approved plan, if the work is structural",
          "Existing home loan statement, if there is one",
        ],
      },
      {
        heading: "About you",
        items: [
          "PAN, Aadhaar and photographs",
          "Salaried: 3 months' payslips, Form 16",
          "Self-employed: 2 to 3 years' ITR",
          "6 months' bank statements",
        ],
      },
    ],
    worthKnowing: {
      title: "Ask about a top-up before you apply for anything new",
      text: "If you already have a home loan and have paid it well for a couple of years, your existing lender can often add a top-up at close to your current rate, with almost no fresh paperwork. It is usually cheaper and always faster than a new renovation loan. We will check that first — even though it earns us less.",
    },
    showCalculator: true,
  },

  {
    slug: "commercial-property-loan",
    name: "Commercial Property Loan",
    heroImage: commercialHero,
    heroAlt: "A row of lit retail and office units at dusk, with a glass office block behind",
    heroFocus: "center 40%",
    navLabel: "Commercial Property",
    kicker: "Shops, offices and showrooms",
    headline: "Buy the premises instead of paying rent on them.",
    intro:
      "A commercial property loan funds the purchase of a shop, office, showroom or clinic. Lenders treat commercial property more cautiously than a home — the funding percentage is lower, the tenure shorter and the title checks harder — but for a business paying rent, the arithmetic often still favours buying.",
    summary: "Buy a shop, office or showroom instead of renting it.",
    seoTitle: "Commercial Property Loan in Hyderabad | Shops & Offices | JSR",
    seoDescription:
      "Commercial property loans in Hyderabad for shops, offices and showrooms. Funding, tenure, documents and the title checks lenders actually make. JSR Home Loan Services.",
    quickSpecs: [
      { value: "[7%–12%]", label: "Interest range p.a." },
      { value: "55%–70%", label: "Of property value" },
      { value: "15 years", label: "Maximum tenure" },
    ],
    features: [
      {
        title: "Rent becomes equity",
        desc: "The EMI buys an asset you keep. Rent buys a receipt.",
      },
      {
        title: "Ready or under construction",
        desc: "Both are fundable, though under-construction commercial units face tighter scrutiny and a lower percentage.",
      },
      {
        title: "Rental income can support it",
        desc: "If the unit is let, or will be, most lenders count a share of that rent toward your repayment capacity.",
      },
      {
        title: "Built for self-employed files",
        desc: "Most applicants here are business owners. We know which lenders read business income generously and which do not.",
      },
    ],
    specs: [
      {
        label: "Loan amount",
        value: "₹10 lakh to ₹10 crore",
        note: "Driven by the lender's valuation, not the asking price",
      },
      {
        label: "Funding",
        value: "55%–70% of property value",
        note: "Lower than a home loan; location and tenancy move it most",
      },
      { label: "Tenure", value: "Up to 15 years", note: "Some lenders stretch to 20 on strong files" },
      { label: "Processing fee", value: "[1%]", note: "Higher than a home loan" },
      {
        label: "Prepayment",
        value: "Nil on floating rate for individuals",
        note: "Loans in a company's name may be charged",
      },
      {
        label: "Tax treatment",
        value: "Interest is a business expense",
        note: "Deductible against business income — different from home loan relief. Confirm with your accountant",
      },
    ],
    suits: [
      "You are buying a shop, office, showroom or clinic — not residential property",
      "The unit has clear title, approved plans and a completion or occupancy certificate",
      "You can show two to three years of business income through filed returns",
      "You can fund 30% to 45% of the value yourself",
    ],
    documents: [
      {
        heading: "About the property",
        items: [
          "Sale agreement and prior title chain",
          "Encumbrance certificate",
          "Approved building plan and commercial-use permission",
          "Occupancy or completion certificate",
          "Property tax receipts",
          "Existing lease or rent agreement, if let",
        ],
      },
      {
        heading: "About the business",
        items: [
          "PAN, Aadhaar and photographs",
          "3 years' ITR with computation of income",
          "Audited profit & loss account and balance sheet",
          "GST returns for the last year",
          "12 months' current and savings account statements",
          "Business registration — GST, Shop & Establishment, or licence",
        ],
      },
    ],
    worthKnowing: {
      title: "Commercial title problems are common and expensive",
      text: "Conversion of land use, missing commercial-use permission, and units built beyond the approved plan are far more common in commercial property than residential — and a lender's legal team will find them. Send us the papers before you pay any advance. We would rather tell you the title will not clear than watch you lose a deposit.",
    },
    showCalculator: true,
  },

  {
    slug: "plot-purchase-loan",
    name: "Open Plot Purchase Loan",
    heroImage: plotHero,
    heroAlt: "An empty plot marked out for sale in an approved layout, with the town skyline behind",
    heroFocus: "center 72%",
    navLabel: "Plot Purchase Loan",
    kicker: "Buying land to build on",
    headline: "Buy the plot now, build when you are ready.",
    intro:
      "A plot loan funds the purchase of residential land in an approved layout. It is not a home loan and the terms are noticeably tighter — less funding, shorter tenure, and no tax relief until you actually build. Worth knowing before you compare the rates.",
    summary: "Buy residential land in an approved layout, with a shorter tenure than a home loan.",
    seoTitle: "Plot Purchase Loan in Hyderabad | Open Plots & Land | JSR",
    seoDescription:
      "Open plot purchase loans in Hyderabad — which layouts qualify, how much funding you get, and why a plot loan carries no tax benefit until you build. JSR Home Loan Services.",
    quickSpecs: [
      { value: "[7%–11%]", label: "Interest range p.a." },
      { value: "up to 75%", label: "Of plot value" },
      { value: "15 years", label: "Maximum tenure" },
    ],
    features: [
      {
        title: "Secure the plot before prices move",
        desc: "Buy the land now on a loan and build when your cash flow allows.",
      },
      {
        title: "Composite loan option",
        desc: "Several lenders will fund the plot and the construction together, which gives you home loan terms and the tax relief with it.",
      },
      {
        title: "Approved layouts only",
        desc: "HMDA or DTCP approved, within municipal limits. We check the layout status before you pay an advance.",
      },
      {
        title: "Convert later",
        desc: "Once you build, the loan can usually be converted or refinanced onto home loan terms.",
      },
    ],
    specs: [
      {
        label: "Loan amount",
        value: "Based on the lender's valuation",
        note: "Registration value and market value often differ — the lower one usually governs",
      },
      {
        label: "Funding",
        value: "Up to 70%–75% of plot value",
        note: "Lower than a home loan, so you need a bigger down payment",
      },
      {
        label: "Tenure",
        value: "Up to 15 years",
        note: "Shorter than a home loan, so the EMI is higher for the same amount",
      },
      {
        label: "Eligible land",
        value: "Residential plots in approved layouts",
        note: "Within municipal or corporation limits",
      },
      {
        label: "Not eligible",
        value: "Agricultural land",
        note: "Also gram panchayat layouts at most lenders, and plots with unclear conversion",
      },
      { label: "Processing fee", value: "[0.5%–1%]", note: "Varies by lender" },
      {
        label: "Tax deduction",
        value: "None on a plot loan alone",
        note: "Relief begins only once construction is complete and the loan becomes a home loan",
      },
    ],
    suits: [
      "The plot is residential, in an HMDA or DTCP approved layout",
      "It sits within municipal or corporation limits",
      "Title is clear and the layout release order is in place",
      "You can fund 25% to 30% of the value yourself",
    ],
    documents: [
      {
        heading: "About the plot",
        items: [
          "Sale agreement and prior title chain",
          "Layout approval and release order",
          "Encumbrance certificate",
          "Land conversion order, where the land was previously agricultural",
          "Latest property tax or land revenue receipt",
        ],
      },
      {
        heading: "About you",
        items: [
          "PAN, Aadhaar and photographs",
          "Salaried: 3 months' payslips, Form 16",
          "Self-employed: 2 to 3 years' ITR",
          "6 months' bank statements",
        ],
      },
    ],
    worthKnowing: {
      title: "A plot loan gives you no tax benefit — a composite loan does",
      text: "This is the detail plot buyers most often discover too late. Interest on a plot loan is not deductible while the land sits empty. If you intend to build within a few years, a composite loan covering the plot and the construction gives you home loan tenure, home loan pricing and the tax relief. Tell us your building plans and we will steer you to the right structure, not just the cheapest rate.",
    },
    showCalculator: true,
  },

  {
    slug: "personal-loans",
    name: "Personal Loan",
    navLabel: "Personal Loan",
    kicker: "Fast money, no collateral",
    headline: "Money in days, and you pay for the speed.",
    intro:
      "A personal loan is unsecured. Nothing is pledged, the paperwork is short, and a complete file can be sanctioned in 24 to 72 hours. That speed is what you are paying for — the rate sits far above anything an asset stands behind. We will put a secured option next to it before you sign, so the cost of the convenience is a number you have seen rather than one you discover later.",
    summary: "Unsecured borrowing for weddings, medical bills and other urgent costs, sanctioned in days.",
    seoTitle: "Personal Loan in Hyderabad | No Collateral | JSR",
    seoDescription:
      "Personal loans in Hyderabad — no collateral, ₹50,000 to ₹40 lakh, often sanctioned in 24 to 72 hours, and honest advice on cheaper options. JSR Home Loan Services.",
    quickSpecs: [
      { value: "[7%–24%]", label: "Interest range p.a." },
      { value: "₹40 lakh", label: "Typical maximum" },
      { value: "6 years", label: "Maximum tenure" },
    ],
    features: [
      {
        title: "Nothing is pledged",
        desc: "No property, no gold, no guarantor in most cases. If things go wrong the bank has no asset to take — which is exactly why it charges what it charges.",
      },
      {
        title: "Sanctioned in days",
        desc: "Approval turns on your salary credits and your credit report, both of which a bank can pull the same afternoon. A complete file often clears in 24 to 72 hours.",
      },
      {
        title: "No end-use restriction",
        desc: "A wedding, a hospital bill, a semester's fees, a flight, or clearing a credit card running at 40% a year. The bank asks what it is for and rarely asks for proof.",
      },
      {
        title: "Your credit record sets the price",
        desc: "A clean repayment history, a strong CIBIL score and a salary account the bank can see are what separate the bottom of the rate range from the top.",
      },
    ],
    specs: [
      {
        label: "Loan amount",
        value: "₹50,000 to ₹40 lakh",
        note: "The upper end is reserved for salaried profiles at large employers",
      },
      {
        label: "Interest rate",
        value: "[7%–24%] p.a.",
        note: "The widest spread in retail lending. Your credit record decides where you land, not negotiation",
      },
      {
        label: "Tenure",
        value: "1 to 6 years",
        note: "Capped low, which is why the instalment feels heavy even on a small loan",
      },
      {
        label: "Processing fee",
        value: "[1%–3%] of the sanction, plus GST",
        note: "Usually deducted before disbursal, so less reaches your account than you signed for",
      },
      {
        label: "Sanction time",
        value: "24 to 72 hours",
        note: "For a complete file. Missing documents are what slow this down, not the bank",
      },
      {
        label: "Foreclosure",
        value: "Lock-in of 6 to 12 EMIs is common",
        note: "RBI bars foreclosure charges on floating-rate loans to individuals, but personal loans are usually fixed rate, so [2%–5%] on the outstanding still applies",
      },
      {
        label: "Tax treatment",
        value: "No deduction, as a rule",
        note: "The exception is money provably spent on a house or a business. Keep the trail and confirm with your accountant",
      },
    ],
    suits: [
      "You need funds quickly and have no property to pledge",
      "The expense is real and dated — a wedding, a hospital bill, a fee deadline",
      "Your salary is credited to a bank account and your repayment record is clean",
      "You are consolidating costlier debt, such as a credit card outstanding at 36% to 42% a year",
      "You can clear it inside the tenure without needing a top-up part-way through",
    ],
    documents: [
      {
        heading: "About you",
        items: [
          "PAN, Aadhaar and passport-size photographs",
          "Address proof — utility bill, rent agreement or passport",
          "Employment proof — ID card, appointment letter or offer letter",
          "Statements for every loan and credit card you are already running",
          "A cancelled cheque for the repayment mandate",
        ],
      },
      {
        heading: "About your income",
        items: [
          "Salaried: last 3 months' payslips and Form 16",
          "Salaried: 6 months' statements for the salary account",
          "Self-employed: 2 to 3 years' ITR with computation of income",
          "Self-employed: 12 months' current account statements",
          "A recent credit report, where you have already pulled one",
        ],
      },
    ],
    worthKnowing: {
      title: "A short tenure is what makes this hurt, not the amount",
      text: "Six years is the ceiling, so even a modest loan takes a real share of your income every month — and that share sits inside your FOIR for the whole term, which is the exact ratio a lender checks when you come back for a home loan next year. The other trap is consolidation. People clear the credit card with a personal loan, let the card fill up again, and end up servicing both. If you are consolidating, close the card. Do not just pay it off.",
    },
    showCalculator: false,
  },

  {
    slug: "education-loan",
    name: "Education Loan",
    navLabel: "Education Loan",
    kicker: "Paying for the course, here or abroad",
    headline: "Study now, start repaying once the course ends.",
    intro:
      "An education loan funds a course of higher study in India or abroad — tuition, hostel and living costs, travel, a laptop, insurance. Repayment does not begin with the loan. A moratorium runs through the course and for six to twelve months after it, so the first EMI falls due once you are out, not while you are studying.",
    summary: "Funds tuition, living costs and travel for higher study in India or abroad, with no EMI until the course is over.",
    seoTitle: "Education Loan in Hyderabad | Study Abroad or India | JSR",
    seoDescription:
      "Education loans in Hyderabad for study in India or abroad — moratorium while you study, Section 80E relief, collateral-free up to ₹7.5 lakh. JSR Home Loan Services.",
    quickSpecs: [
      { value: "[7%–14%]", label: "Interest range p.a." },
      { value: "₹7.5 lakh", label: "Collateral-free limit" },
      { value: "15 years", label: "Tenure after moratorium" },
    ],
    features: [
      {
        title: "No EMI while you study",
        desc: "The moratorium covers the course duration plus six to twelve months. Nothing is due until it ends.",
      },
      {
        title: "Up to ₹7.5 lakh without security",
        desc: "Above that the pledge has to cover the loan, and it does not replace the co-applicant — their income is assessed either way.",
      },
      {
        title: "Section 80E has no upper cap",
        desc: "Under the old regime the full interest paid is deductible, unlike the ₹2 lakh ceiling that applies to a home loan.",
      },
      {
        title: "We build the abroad file",
        desc: "I-20 or CAS letter, cost of attendance, forex margin, remittance paperwork. Assembling that set in the order the lender reads it is most of the work.",
      },
    ],
    specs: [
      {
        label: "Loan amount",
        value: "Based on the institution's cost of attendance",
        note: "Tuition, hostel, exam fees, travel, laptop and insurance can all be counted; you fund a margin of [5%] in India and [15%] abroad",
      },
      {
        label: "Collateral",
        value: "Usually not required up to ₹7.5 lakh",
        note: "Above that, most lenders ask for property, a fixed deposit or an LIC policy",
      },
      {
        label: "Co-applicant",
        value: "Mandatory",
        note: "A parent, guardian or spouse — their income and FOIR are assessed, since the student has none",
      },
      {
        label: "Moratorium",
        value: "Course duration plus 6 to 12 months",
        note: "No EMI is due during it, but interest still accrues",
      },
      {
        label: "Tenure",
        value: "Up to 15 years after the moratorium",
        note: "Counted from the first EMI, not from disbursement",
      },
      {
        label: "Processing fee",
        value: "[Nil to 1%] of the sanction",
        note: "Often waived for study in India; abroad files usually carry one, plus forex and remittance charges",
      },
      {
        label: "Tax deduction",
        value: "Section 80E — interest in full",
        note: "Old regime only, and on interest alone; the principal is not deductible. It runs for 8 assessment years or until the interest is cleared, whichever comes first, and sits with whoever actually repays",
      },
    ],
    suits: [
      "You hold a confirmed admission or offer letter from a recognised institution",
      "A parent, guardian or spouse can sign as co-applicant and show income",
      "The course is a recognised degree or diploma — professional and technical courses clear fastest",
      "For anything above ₹7.5 lakh, the family has property, a deposit or a policy to pledge",
      "You are going abroad and need a sanction letter in hand for the visa interview",
    ],
    documents: [
      {
        heading: "About the course",
        items: [
          "Admission or offer letter from the institution",
          "Fee structure, or the university's cost of attendance statement",
          "Mark sheets from Class 10 onwards and the entrance or qualifying exam score",
          "Studying abroad: I-20 for the US or CAS letter for the UK, with the visa file",
          "Scholarship, assistantship or fee-waiver letter, where you have one",
        ],
      },
      {
        heading: "About you and the co-applicant",
        items: [
          "PAN, Aadhaar and photographs for the student and the co-applicant",
          "Passport for the student, for any course outside India",
          "Co-applicant salaried: 3 months' payslips, Form 16, 6 months' statements",
          "Co-applicant self-employed: 2 to 3 years' ITR with computation",
          "Title documents for the security, where the loan crosses ₹7.5 lakh",
        ],
      },
    ],
    worthKnowing: {
      title: "No EMI during the course is not the same as no interest",
      text: "Interest starts on the day of the first disbursement. Through the moratorium it accrues as simple interest, and if nobody services it the lender adds it to the principal when repayment begins. On ₹20 lakh drawn across a four-year course, at the middle of the range above, that comes to something like ₹6 lakh to ₹7 lakh — so the first EMI is calculated on a debt larger than the one you borrowed, and stays that way for the whole tenure. Pay the simple interest monthly while studying and none of it capitalises. Most lenders cut [0.5%–1%] off the rate for doing it, and almost nobody explains this at sanction.",
    },
    showCalculator: false,
  },

  {
    slug: "car-loan",
    name: "Car Loan",
    navLabel: "Car Loan",
    kicker: "New and used vehicles",
    headline: "Finance the car, without taking the showroom's first offer.",
    intro:
      "A car loan pays for a new or used vehicle, and the car itself is the security. It is hypothecated to the lender, whose name is endorsed on the registration certificate until the last EMI clears. That security is why the rate sits well below a personal loan — and why the car is not fully yours to sell until the loan is closed.",
    summary: "Funding for a new or used car, secured against the vehicle until the loan is closed.",
    seoTitle: "Car Loan in Hyderabad | New and Used Cars | JSR",
    seoDescription:
      "Car loans in Hyderabad — new and used, up to 90% of on-road price, tenures to 7 years, and an honest look at showroom finance. JSR Home Loan Services.",
    quickSpecs: [
      { value: "[7%–15%]", label: "Interest range p.a." },
      { value: "up to 90%", label: "Of on-road price" },
      { value: "7 years", label: "Maximum tenure" },
    ],
    features: [
      {
        title: "The car is the security",
        desc: "Nothing else is pledged. The vehicle is hypothecated to the lender, which is why the rate sits far below an unsecured personal loan.",
      },
      {
        title: "New or used, both are funded",
        desc: "New cars go up to 90% of on-road price over seven years. Used cars are funded against a valuation, usually 70%–80%, over five.",
      },
      {
        title: "Sanction before you walk in",
        desc: "An approved loan in hand makes you a cash buyer at the dealership. The discount conversation goes differently after that.",
      },
      {
        title: "We price the showroom's offer for you",
        desc: "Bring us what the dealer quoted. We will put a bank's number beside it and show you which one actually costs less over the full tenure.",
      },
    ],
    specs: [
      {
        label: "Funding",
        value: "Up to 90% of on-road price for a new car",
        note: "Used cars are funded at 70%–80% of the lender's valuation, not the price you agreed with the seller. Some lenders quote 100% of ex-showroom, which is not the same thing",
      },
      {
        label: "Tenure",
        value: "Up to 7 years new, up to 5 years used",
        note: "Used-car tenure is also capped by the car's age at closure",
      },
      {
        label: "Interest rate",
        value: "[7%–15%] p.a.",
        note: "New cars sit near the bottom of the range, used cars near the top",
      },
      {
        label: "Processing fee",
        value: "[0.5%–1%] of the loan",
        note: "Varies by lender; often negotiable",
      },
      {
        label: "Security",
        value: "Hypothecation of the vehicle",
        note: "The lender's name stays on the RC until you close the loan and file Form 35",
      },
      {
        label: "Foreclosure",
        value: "[3%–6%] of the outstanding",
        note: "Car loans are usually fixed rate, so the nil-charge rule for floating-rate borrowers does not cover them. Most lenders also bar closure in the first six to twelve EMIs",
      },
      {
        label: "Tax treatment",
        value: "No deduction for personal use",
        note: "If the car is a business asset, interest and depreciation may be claimable. Confirm with your accountant",
      },
    ],
    suits: [
      "You have chosen the car and want the loan settled before you negotiate the price",
      "You can put down 10% to 20% of the on-road cost from your own savings",
      "Your existing EMIs still leave room in your FOIR for one more",
      "You are buying a used car that will still be under about ten years old when the tenure ends",
      "You want the registration in your own name from day one, not a lease or a subscription",
    ],
    documents: [
      {
        heading: "About the car",
        items: [
          "Proforma invoice or dealer quotation, for a new car",
          "RC book, valid insurance and pollution certificate, for a used car",
          "Valuation report from the lender's empanelled valuer, for a used car",
          "Form 35 and NOC from the previous lender, if the used car is still hypothecated",
          "Booking receipt or proof of the advance already paid",
        ],
      },
      {
        heading: "About you",
        items: [
          "PAN, Aadhaar and photographs",
          "Valid driving licence",
          "Salaried: 3 months' payslips, Form 16, 6 months' statements",
          "Self-employed: 2 to 3 years' ITR with computation and 12 months' statements",
          "Address proof and statements for any loans already running",
        ],
      },
    ],
    worthKnowing: {
      title: "The showroom's low EMI is a longer loan, not a cheaper one",
      text: "Dealer finance is priced for the convenience — a higher rate, often with insurance or an extended warranty folded into the amount financed. The EMI looks small because the tenure was stretched, not because the loan costs less. Meanwhile the car depreciates faster than the loan amortises, so for the first two or three years you owe more than it would fetch. Bring us the dealer's rate, tenure and total interest, and we will tell you plainly whether it beats the bank.",
    },
    showCalculator: true,
  },

  {
    slug: "business-loan",
    name: "Business Loan",
    heroImage: businessHero,
    heroAlt: "A desk with a business loan application, calculator and charts, against stock, machinery and a city skyline",
    heroFocus: "center 25%",
    navLabel: "Business Loan",
    kicker: "Working capital and expansion",
    headline: "Funding for the business, without pledging the house.",
    intro:
      "An unsecured business loan funds stock, equipment, expansion or a cash-flow gap, with no collateral. It is quick and it is expensive — and if you own property, there is almost always a cheaper way. We will tell you which one applies to you before you apply for either.",
    summary: "Unsecured funding for working capital and expansion, with no collateral.",
    seoTitle: "Business Loan in Hyderabad | Unsecured Funding | JSR",
    seoDescription:
      "Business loans in Hyderabad — unsecured funding for working capital and expansion, and an honest comparison against a loan against property. JSR Home Loan Services.",
    quickSpecs: [
      { value: "[7%–24%]", label: "Interest range p.a." },
      { value: "₹50 lakh", label: "Typical maximum" },
      { value: "5 years", label: "Maximum tenure" },
    ],
    features: [
      {
        title: "No collateral",
        desc: "Nothing is pledged. Your property and your family's security stay out of it entirely.",
      },
      {
        title: "Fast",
        desc: "A complete file can be sanctioned in days rather than weeks, because there is no property to value or verify.",
      },
      {
        title: "Any legitimate business use",
        desc: "Stock, machinery, a new branch, salaries through a slow quarter, or clearing a costlier debt.",
      },
      {
        title: "Judged on your filings",
        desc: "Turnover, filed returns and bank conduct decide it. Presenting those well is most of the outcome.",
      },
    ],
    specs: [
      {
        label: "Loan amount",
        value: "₹1 lakh to ₹50 lakh",
        note: "Higher amounts usually need security",
      },
      {
        label: "Interest rate",
        value: "[7%–24%] p.a.",
        note: "Substantially higher than any secured loan — that is the price of no collateral",
      },
      { label: "Tenure", value: "1 to 5 years", note: "Short, so the EMI is large relative to the amount" },
      {
        label: "Business vintage",
        value: "2 to 3 years minimum",
        note: "Under two years, options are very limited",
      },
      { label: "Processing fee", value: "[2%–3%]", note: "Higher than secured lending" },
      {
        label: "Collateral",
        value: "None",
        note: "But a personal guarantee is standard, so you remain liable",
      },
      {
        label: "Tax treatment",
        value: "Interest is a business expense",
        note: "Deductible against business income. Confirm with your accountant",
      },
    ],
    suits: [
      "Your business has filed returns for at least two to three years",
      "You need funds faster than a secured loan can be arranged",
      "You do not own property, or do not want to pledge what you own",
      "The amount is modest enough that a short tenure is manageable",
    ],
    documents: [
      {
        heading: "About the business",
        items: [
          "Business registration — GST, Shop & Establishment, or licence",
          "2 to 3 years' ITR with computation of income",
          "Audited profit & loss account and balance sheet",
          "GST returns for the last 12 months",
          "12 months' current account statements",
          "Business address proof",
        ],
      },
      {
        heading: "About you",
        items: [
          "PAN, Aadhaar and photographs",
          "Personal bank statements",
          "Partnership deed or MOA and AOA, where applicable",
          "Statements for any existing loans",
        ],
      },
    ],
    worthKnowing: {
      title: "If you own property, this is probably the wrong loan",
      text: "A loan against property costs roughly a third of an unsecured business loan and runs three times as long. On ₹25 lakh the difference in EMI is substantial, every month, for years. An unsecured loan is right when speed matters more than cost, or when there is no property to pledge — not by default. We will show you both sets of numbers before you choose.",
    },
    showCalculator: false,
  },
];

export const findProduct = (slug?: string) => products.find((product) => product.slug === slug);
