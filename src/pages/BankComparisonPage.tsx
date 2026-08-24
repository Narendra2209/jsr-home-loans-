import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUp, Info } from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import heroImg from "@/assets/bank-comparison-hero.jpg";
import {
  comparison,
  lastReviewed,
  loanTypes,
  type LenderRow,
  type LoanType,
} from "@/content/bankComparison";

type SortKey = "lender" | "rateFrom" | "maxTenureYears";

const BankComparisonPage: React.FC = () => {
  const [loanType, setLoanType] = useState<LoanType>("Home Loan");
  const [sortKey, setSortKey] = useState<SortKey>("rateFrom");
  const [ascending, setAscending] = useState(true);

  const rows = useMemo(() => {
    const list = [...comparison[loanType]];
    list.sort((a, b) => {
      const left = a[sortKey];
      const right = b[sortKey];

      // Unknown values sort last, whichever direction is chosen.
      if (left === null) return 1;
      if (right === null) return -1;

      const order =
        typeof left === "string" && typeof right === "string"
          ? left.localeCompare(right)
          : Number(left) - Number(right);
      return ascending ? order : -order;
    });
    return list;
  }, [loanType, sortKey, ascending]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setAscending((previous) => !previous);
      return;
    }
    setSortKey(key);
    setAscending(true);
  };

  const sortState = (key: SortKey): "ascending" | "descending" | "none" =>
    sortKey === key ? (ascending ? "ascending" : "descending") : "none";

  const SortButton: React.FC<{ column: SortKey; children: React.ReactNode }> = ({
    column,
    children,
  }) => (
    <button
      type="button"
      onClick={() => toggleSort(column)}
      className="inline-flex items-center gap-1 font-semibold uppercase tracking-wider hover:text-foreground"
    >
      {children}
      {sortKey === column &&
        (ascending ? (
          <ArrowUp className="h-3 w-3" aria-hidden="true" />
        ) : (
          <ArrowDown className="h-3 w-3" aria-hidden="true" />
        ))}
    </button>
  );

  const formatRate = (row: LenderRow) =>
    row.rateFrom === null ? "On request" : `${row.rateFrom.toFixed(2)}%`;

  return (
    <>
      <SEO
        title="Compare Bank Loan Rates & Fees in Hyderabad | JSR Home Loans"
        description="Compare interest rates, processing fees, tenure and funding across leading banks and housing finance companies for home loans, loan against property, personal loans and balance transfers."
        canonicalPath="/bank-comparison"
      />

      <section className="relative isolate overflow-hidden bg-brand py-16 text-brand-foreground md:py-24">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Full width on phones; on desktop it sits in the right 56% like the reference */}
          <img
            src={heroImg}
            alt=""
            aria-hidden="true"
            decoding="async"
            className="absolute inset-y-0 right-0 h-full w-full object-cover object-[center_38%] md:w-[56%]"
          />
          {/* Solid navy on phones; on desktop it holds to 42% then clears so the photo reads */}
          <div className="absolute inset-0 bg-brand/90 md:hidden" />
          <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,hsl(var(--brand))_0%,hsl(var(--brand))_42%,hsl(var(--brand)/0.72)_50%,hsl(var(--brand)/0.16)_60%,hsl(var(--brand)/0)_70%)] md:block" />
        </div>

        <div className="container relative z-10">
          <div className="md:max-w-[52%]">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
              Bank Comparison
            </p>
            <h1 className="mt-3 max-w-[22ch] font-heading text-4xl font-bold tracking-tight md:text-5xl">
              Every lender, side by side
            </h1>
            <p className="mt-4 max-w-prose text-lg text-brand-foreground/90">
              Rates, processing fees, tenure and funding across the banks and housing finance companies
              we work with. Sort by whichever matters most to you.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-14">
        <Tabs value={loanType} onValueChange={(value) => setLoanType(value as LoanType)}>
          <TabsList className="flex-wrap">
            {loanTypes.map((type) => (
              <TabsTrigger key={type} value={type}>
                {type}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="mt-8 overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[760px] text-sm">
            <caption className="sr-only">
              {loanType} rates, fees and tenure by lender. Rates are indicative and last reviewed{" "}
              {lastReviewed}.
            </caption>
            <thead>
              <tr className="border-b bg-muted/50 text-xs text-muted-foreground">
                <th scope="col" className="px-4 py-3 text-left" aria-sort={sortState("lender")}>
                  <SortButton column="lender">Lender</SortButton>
                </th>
                <th scope="col" className="px-4 py-3 text-left" aria-sort={sortState("rateFrom")}>
                  <SortButton column="rateFrom">Rate from</SortButton>
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wider">
                  Processing fee
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left"
                  aria-sort={sortState("maxTenureYears")}
                >
                  <SortButton column="maxTenureYears">Max tenure</SortButton>
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wider">
                  Funding
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.lender} className="border-b last:border-b-0 hover:bg-muted/30">
                  <th scope="row" className="px-4 py-3 text-left font-semibold">
                    {row.lender}
                  </th>
                  <td className="px-4 py-3 font-semibold tabular-nums">{formatRate(row)}</td>
                  <td className="px-4 py-3 tabular-nums">{row.processingFee}</td>
                  <td className="px-4 py-3 tabular-nums">
                    {row.maxTenureYears === null ? "—" : `${row.maxTenureYears} years`}
                  </td>
                  <td className="px-4 py-3">{row.funding}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex gap-3 rounded-lg border bg-muted/40 p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <div className="text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">
                Indicative rates, last reviewed {lastReviewed}.
              </span>{" "}
              Lenders change rates with the repo rate and with their own promotions, and the rate you
              are offered depends on your credit score, income and the property.
            </p>
            <p className="mt-2">
              We check every lender on the day you apply and bring you the live numbers. Treat this
              table as a starting point, not a quotation.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-xl bg-brand p-8 text-brand-foreground shadow-elegant md:p-10">
          <h2 className="max-w-[26ch] font-heading text-2xl font-semibold md:text-3xl">
            The lowest rate in this table is not always the one you will get
          </h2>
          <p className="mt-3 max-w-prose text-brand-foreground/85">
            Advertised rates are for the strongest profiles. Which lender says yes — and at what rate
            — depends on whether you are salaried or self-employed, your credit history, and the
            property itself. That is the part we do.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/contact">Find My Best Rate</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/eligibility-checker">Check My Eligibility</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BankComparisonPage;
