import React from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import hero from "@/assets/personal-loan.jpg";

const PersonalLoans: React.FC = () => {
  return (
    <>
      <SEO
        title="Personal Loans in Hyderabad | Quick Approval, Minimal Docs"
        description="Personal Loans in Hyderabad with quick approval and minimal documentation. Flexible amounts and tenure. Apply with JSR Home Loan Services."
        canonicalPath="/services/personal-loans"
      />
      <section className="container py-12 md:py-16">
        <h1 className="font-heading text-3xl font-bold">Personal Loans in Hyderabad</h1>
        <div className="mt-6 grid items-start gap-8 md:grid-cols-2">
          <img src={hero} alt="Young professional receiving personal loan approval" className="w-full rounded-lg border" loading="lazy" />
          <div>
            <h2 className="font-heading text-2xl font-semibold">Key Advantages</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Fast approvals with minimal documentation</li>
              <li>Flexible tenure and repayment options</li>
              <li>Competitive interest rates</li>
              <li>No collateral required</li>
            </ul>
            <div className="mt-6">
              <Button asChild variant="brand" size="lg">
                <Link to="/contact?service=Personal%20Loan">Apply for Personal Loan</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PersonalLoans;