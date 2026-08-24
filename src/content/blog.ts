/**
 * Blog content.
 *
 * Articles are structured blocks, not HTML strings — nothing is injected into
 * the page, and every block type has a component that knows how to render it.
 * To add an article, add an entry here; the index page and the routes pick it
 * up automatically.
 *
 * These four are written and factually checked for the Indian market as at
 * August 2026. Two things to keep an eye on:
 *   • Tax rules change every Budget. Re-read the tax guide each February.
 *   • No article quotes a specific lender's rate, deliberately — those go stale
 *     within a month. Rate ranges and mechanisms do not.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "cta"; text: string; label: string; to: string };

export type Article = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  /** Shown on the page and used for the article schema. */
  updated: string;
  updatedIso: string;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "home-loan-interest-rates-explained",
    title: "Home loan interest rates: what actually decides yours",
    category: "Rates",
    summary:
      "Two people can walk into the same bank on the same day and be quoted rates half a percent apart. Here is what moves the number, and which parts of it you can change.",
    updated: "August 2026",
    updatedIso: "2026-08-18",
    body: [
      {
        type: "p",
        text: "Every lender advertises a rate 'starting from' some figure. Almost nobody gets it. The advertised rate is the price for the strongest possible borrower — high credit score, salaried at a listed company, borrowing a modest amount against a ready property. Everyone else pays that plus a margin, and the margin is where the real negotiation happens.",
      },
      { type: "h2", text: "How the rate is built" },
      {
        type: "p",
        text: "Since 2019 most floating-rate home loans in India are linked to an external benchmark, usually the RBI's repo rate. Your rate is that benchmark plus a spread the lender sets for you.",
      },
      {
        type: "ul",
        items: [
          "The repo rate is set by the RBI and moves for everyone at once. When it falls, floating-rate loans reprice down — usually within three months.",
          "The spread is the lender's margin, fixed for you at sanction. It reflects your credit score, income type, loan amount and the property.",
          "Your rate is the sum of the two. You cannot argue with the repo rate. The spread is the part that is negotiable, and the part a broker works on.",
        ],
      },
      { type: "h2", text: "What pushes your spread up or down" },
      {
        type: "table",
        head: ["Factor", "Effect on your rate", "Can you change it?"],
        rows: [
          ["Credit score above 750", "Lowest available spread", "Yes — over three to six months"],
          ["Credit score 700–750", "Typically 0.10%–0.50% higher", "Yes"],
          ["Self-employed income", "Usually higher than salaried", "No, but presentation matters"],
          ["Loan above ₹75 lakh", "Often a higher slab", "Sometimes, by borrowing slightly less"],
          ["Loan-to-value above 80%", "Higher spread", "Yes — larger down payment"],
          ["Under-construction property", "Higher until completion", "No"],
          ["Woman as primary applicant", "Small concession at many lenders", "Sometimes"],
        ],
      },
      {
        type: "callout",
        title: "The half-percent that costs you a car",
        text: "On ₹50 lakh over 20 years, the difference between 8.35% and 8.85% is about ₹1,570 a month — and just under ₹3.8 lakh over the life of the loan. It is the single largest number most borrowers never negotiate.",
      },
      { type: "h2", text: "Fixed or floating?" },
      {
        type: "p",
        text: "Almost all home loans in India are taken on floating rates, and for most people that remains right. Floating rates are lower to start, they fall when the repo rate falls, and — importantly — the RBI bars lenders from charging foreclosure or prepayment penalties on floating-rate home loans to individual borrowers. A fixed-rate loan removes that protection and usually costs more from day one.",
      },
      {
        type: "p",
        text: "Fixed rates make sense in a narrow case: you are close to the edge of what you can afford, and a rise of one or two percent would genuinely hurt. Certainty has a price, and that is what you are buying.",
      },
      { type: "h2", text: "Four ways to pay less" },
      {
        type: "ol",
        items: [
          "Fix your credit score before you apply, not after you are refused. A file that has already been rejected is harder to place.",
          "Put down more. Crossing below 80% loan-to-value moves you into a better slab at most lenders.",
          "Compare properly. The gap between the cheapest and dearest lender for the same profile is routinely half a percent.",
          "If you already have a loan, ask your lender to reprice it. It is free, they sometimes say yes, and a transfer is the fallback if they do not.",
        ],
      },
      {
        type: "cta",
        text: "See what your EMI would be at different rates, and what half a percent is worth over your tenure.",
        label: "Open the EMI calculator",
        to: "/emi-calculator",
      },
    ],
  },

  {
    slug: "improve-cibil-score-before-home-loan",
    title: "How to improve your CIBIL score before applying",
    category: "Credit",
    summary:
      "A score above 750 gets you the best rate available. Below 700 the options narrow fast. Here is what actually moves the number, and how long each thing takes.",
    updated: "August 2026",
    updatedIso: "2026-08-18",
    body: [
      {
        type: "p",
        text: "Your credit score is the first thing a lender looks at and the only part of your application you can improve before you apply. It runs from 300 to 900. Above 750 you are offered the lender's best pricing; between 700 and 750 you will still find lenders at a slightly higher rate; below 700 the list of who will consider you gets short.",
      },
      { type: "h2", text: "What the score is actually measuring" },
      {
        type: "table",
        head: ["Factor", "Roughly how much it counts", "What it means"],
        rows: [
          ["Payment history", "About a third", "Have you paid on time, every time"],
          ["Credit utilisation", "About a third", "How much of your available limit you use"],
          ["Age of credit", "Smaller", "How long you have had accounts open"],
          ["Credit mix", "Smaller", "A blend of secured and unsecured borrowing"],
          ["Recent enquiries", "Smaller", "How many lenders have checked you lately"],
        ],
      },
      { type: "h2", text: "Six things that work" },
      {
        type: "h3",
        text: "1. Never miss a payment — this is most of the score",
      },
      {
        type: "p",
        text: "One missed credit card payment can cost more points than months of good behaviour earn back. Put every EMI and card bill on auto-debit. If money is tight, pay the minimum on time rather than the full amount late — the score cares about the date far more than the amount.",
      },
      { type: "h3", text: "2. Keep card usage under 30% of your limit" },
      {
        type: "p",
        text: "Spending ₹90,000 on a ₹1,00,000 limit reads as financial stress even if you clear it in full every month, because the balance is reported on the statement date. Pay part of the bill before the statement generates, or ask for a limit increase and do not spend it.",
      },
      { type: "h3", text: "3. Do not close your oldest credit card" },
      {
        type: "p",
        text: "Closing it shortens your credit history and cuts your total available limit, which pushes your utilisation up. Both hurt. Keep it open, use it occasionally for something small, and pay it off.",
      },
      { type: "h3", text: "4. Stop applying for things" },
      {
        type: "p",
        text: "Every formal application creates a hard enquiry on your report. Several in a short window reads as desperation. This is a good reason to have a broker place your file once with the right lender, rather than applying to five banks yourself and collecting five enquiries.",
      },
      { type: "h3", text: "5. Check your report and dispute errors" },
      {
        type: "p",
        text: "Errors are common: a loan you closed still showing open, an account that is not yours, a payment marked late that was not. You are entitled to a free credit report each year from each bureau. Raising a dispute is free and corrections typically land within 30 days — the cheapest points available to anyone.",
      },
      { type: "h3", text: "6. Never let a loan be marked 'settled'" },
      {
        type: "callout",
        title: "Settled is not the same as closed",
        text: "If you negotiate a lower payoff on a defaulted loan, the account is reported as 'settled' rather than 'closed'. That marker stays on your report for years and tells every future lender you did not repay in full. If you can possibly pay the whole amount, do — and get a no-dues certificate in writing.",
      },
      { type: "h2", text: "How long does it take?" },
      {
        type: "ul",
        items: [
          "Correcting a reporting error: two to four weeks once the dispute is raised.",
          "Bringing utilisation down: one to two statement cycles.",
          "Recovering from a missed payment: three to six months of clean history.",
          "Recovering from a default or settlement: years, not months.",
        ],
      },
      {
        type: "p",
        text: "The practical answer is that if you plan to buy a house this year, start on your score now. Six months of deliberate effort is usually the difference between the best rate available and a rate you will resent for two decades.",
      },
      {
        type: "cta",
        text: "Not sure where you stand? We will tell you honestly whether to apply now or wait three months.",
        label: "Talk to us",
        to: "/contact",
      },
    ],
  },

  {
    slug: "home-loan-tax-benefits",
    title: "Home loan tax benefits, and why many people now get none",
    category: "Tax",
    summary:
      "Section 80C, Section 24(b) and the rest are real — but only under the old tax regime. If you have moved to the new regime, the maths on your home loan changed.",
    updated: "August 2026",
    updatedIso: "2026-08-18",
    body: [
      {
        type: "callout",
        title: "Read this part first",
        text: "The deductions below apply under the OLD tax regime. Under the new regime you cannot claim Section 80C, and you cannot claim Section 24(b) interest on a self-occupied property. A great many borrowers now file under the new regime and receive no home loan tax benefit at all — which does not make the loan a bad idea, but does change the arithmetic people quote at you.",
      },
      { type: "h2", text: "What you can claim under the old regime" },
      {
        type: "table",
        head: ["Section", "What it covers", "Annual limit"],
        rows: [
          ["24(b)", "Interest paid, self-occupied property", "₹2,00,000"],
          ["24(b)", "Interest paid, let-out property", "No cap on interest, but loss set-off capped at ₹2,00,000"],
          ["80C", "Principal repaid", "₹1,50,000, shared with all other 80C items"],
          ["80C", "Stamp duty and registration", "Within the same ₹1,50,000, year of payment only"],
        ],
      },
      {
        type: "p",
        text: "The 80C limit is shared. If your provident fund contributions, insurance premiums and children's tuition already fill ₹1,50,000, your home loan principal adds nothing further.",
      },
      { type: "h2", text: "Four details that catch people out" },
      { type: "h3", text: "Interest paid during construction" },
      {
        type: "p",
        text: "You cannot claim interest while the property is being built. Once construction is complete, the accumulated pre-construction interest is claimed in five equal annual instalments, starting the year of completion — and it still counts within the ₹2,00,000 cap.",
      },
      { type: "h3", text: "A joint loan doubles the limits" },
      {
        type: "p",
        text: "If you and your spouse are both co-owners and co-borrowers, each of you can claim up to ₹2,00,000 of interest and ₹1,50,000 of principal, in proportion to your shares. Both conditions matter: being a co-borrower on the loan is not enough if you are not also a co-owner of the property.",
      },
      { type: "h3", text: "Section 80EEA has closed for new loans" },
      {
        type: "p",
        text: "The additional ₹1,50,000 interest deduction under 80EEA applied to loans sanctioned between April 2019 and March 2022. It is not available on a loan sanctioned today. If you already have one, you continue to claim it for that loan's term. Plenty of websites still list it as though it were current.",
      },
      { type: "h3", text: "Selling within five years reverses your 80C" },
      {
        type: "p",
        text: "If you sell the property within five years of the end of the financial year in which you took possession, every 80C deduction you claimed on principal is added back to your income in the year of sale. It is not a penalty exactly — but it is a bill people do not see coming.",
      },
      { type: "h2", text: "So which regime should you be on?" },
      {
        type: "p",
        text: "There is no general answer, and anyone who gives you one without seeing your numbers is guessing. Broadly: a large home loan interest bill combined with a full 80C and other old-regime deductions can make the old regime worth staying on. A smaller loan, or a mostly-repaid one, usually does not. Work it out both ways for your own income before you decide, and take an accountant's view — this is the one part of a home loan that is genuinely a tax question rather than a lending one.",
      },
      {
        type: "callout",
        title: "We are loan advisers, not tax advisers",
        text: "This guide is accurate as at August 2026 and is here so you know what to ask. Tax rules change with each Budget, and your position depends on your whole return. Confirm anything here with a qualified accountant before you file.",
      },
      {
        type: "cta",
        text: "See what your interest actually comes to each year — the first years are almost entirely interest.",
        label: "Open the EMI calculator",
        to: "/emi-calculator",
      },
    ],
  },

  {
    slug: "home-loan-balance-transfer-guide",
    title: "Balance transfer: when moving your loan is worth it, and when it is not",
    category: "Balance Transfer",
    summary:
      "Switching to a lower rate can save several lakh rupees. It can also cost more than it saves. The deciding number is not the rate gap — it is the break-even.",
    updated: "August 2026",
    updatedIso: "2026-08-18",
    body: [
      {
        type: "p",
        text: "A balance transfer moves your outstanding home loan from your current lender to a new one offering a better rate. Your old loan is closed, the new lender takes over the property as security, and your EMI drops. Nothing about the house changes.",
      },
      {
        type: "p",
        text: "It is worth checking because loan pricing drifts. Lenders compete hard for new customers and rarely volunteer a better rate to existing ones. A loan taken three or four years ago is often sitting well above what the same borrower would be offered today.",
      },
      { type: "h2", text: "What a switch costs" },
      {
        type: "ul",
        items: [
          "Processing fee on the new loan — typically a fraction of a percent of the outstanding amount, sometimes waived on transfers.",
          "Legal and technical valuation charges on the property, paid to the new lender's empanelled professionals.",
          "Stamp duty on the fresh mortgage deed, which varies by state.",
          "Foreclosure charges on the old loan: nil, if it is a floating-rate home loan to an individual. The RBI does not allow lenders to charge these.",
        ],
      },
      { type: "h2", text: "The only number that decides it" },
      {
        type: "p",
        text: "Not the rate gap. The break-even: how many months of your new, lower EMI it takes to recover what the switch cost you. Below roughly a year, a transfer is straightforwardly worth doing. Beyond two years, it usually is not worth the paperwork — and if the break-even runs past your remaining tenure, the switch loses money outright.",
      },
      {
        type: "table",
        head: ["Situation", "Verdict"],
        rows: [
          ["Rate gap above 0.5%, more than 10 years left", "Almost always worth it"],
          ["Rate gap 0.25%–0.5%, long tenure left", "Worth checking — depends on the fees"],
          ["Under five years left on the loan", "Rarely worth it; most interest is already paid"],
          ["Planning to sell within a year or two", "No — you will never reach break-even"],
          ["Credit score has dropped since the original loan", "Check first; the new rate may be worse"],
        ],
      },
      {
        type: "callout",
        title: "Ask your own bank first",
        text: "Before you transfer anything, ask your current lender to reprice your loan. Many will drop your rate rather than lose the account, sometimes for a small conversion fee. It costs you nothing to ask, it takes one letter, and it is faster than a transfer. We will tell you when it is worth trying.",
      },
      { type: "h2", text: "How the switch actually runs" },
      {
        type: "ol",
        items: [
          "We check the maths. If it does not pay for itself, we say so and you owe us nothing.",
          "We request your foreclosure letter, statement of account and list of documents from your current lender.",
          "The new lender appraises the property and runs its own legal check.",
          "On sanction, the new lender pays off the old loan directly and collects your original property documents from them. The papers move bank to bank — they never pass through your hands, or ours.",
        ],
      },
      { type: "h2", text: "Should you take a top-up while you are at it?" },
      {
        type: "p",
        text: "Most lenders will offer additional funds on top of the transferred amount, at close to home loan rates — far cheaper than a personal loan. That is genuinely useful for renovation, education or clearing expensive debt. It is a poor idea for anything that is not an asset or an emergency, because you will be paying it back over twenty years.",
      },
      {
        type: "cta",
        text: "Work out your own saving and break-even, including the switching costs.",
        label: "Open the balance transfer calculator",
        to: "/services/balance-transfer",
      },
    ],
  },
];

export const findArticle = (slug?: string) => articles.find((article) => article.slug === slug);

export const categories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];

/** Rough reading time, from the words actually in the body. */
export const readingMinutes = (article: Article) => {
  const words = article.body.reduce((count, block) => {
    if ("text" in block) return count + block.text.split(/\s+/).length;
    if ("items" in block) return count + block.items.join(" ").split(/\s+/).length;
    if (block.type === "table")
      return count + block.rows.flat().join(" ").split(/\s+/).length + block.head.join(" ").split(/\s+/).length;
    return count;
  }, 0);
  return Math.max(1, Math.round(words / 200));
};
