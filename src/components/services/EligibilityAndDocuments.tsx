import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { applicantTypes } from "@/content/homeLoan";

const DocList: React.FC<{ heading: string; items: string[] }> = ({ heading, items }) => (
  <div>
    <p className="text-sm font-semibold uppercase tracking-widest text-primary">{heading}</p>
    <ul className="mt-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 border-b py-2 text-sm">
          <span className="text-primary" aria-hidden="true">
            ▢
          </span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const EligibilityAndDocuments: React.FC = () => (
  <section id="eligibility" className="scroll-mt-20 container py-16">
    <p className="text-sm font-semibold uppercase tracking-widest text-primary">Eligibility</p>
    <h2 className="mt-2 font-heading text-3xl font-semibold">Do you qualify?</h2>
    <p className="mt-3 max-w-prose text-muted-foreground">Pick the one that describes you.</p>

    <Tabs defaultValue={applicantTypes[0].id} className="mt-6">
      <TabsList>
        {applicantTypes.map((type) => (
          <TabsTrigger key={type.id} value={type.id}>
            {type.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {applicantTypes.map((type) => (
        <TabsContent key={type.id} value={type.id} className="mt-8">
          <dl className="max-w-4xl border-t">
            {type.criteria.map((row) => (
              <div key={row.label} className="flex flex-col gap-1 border-b py-3 sm:flex-row sm:gap-6">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground sm:w-48 sm:shrink-0 sm:pt-1">
                  {row.label}
                </dt>
                <dd className="font-medium">{row.value}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-12 font-heading text-2xl font-semibold">What you will need</h3>
          <div className="mt-6 grid gap-10 md:grid-cols-2">
            <DocList heading="Everyone needs" items={type.commonDocs} />
            <div>
              <DocList heading={type.specificDocsLabel} items={type.specificDocs} />
              <p className="mt-4 text-xs text-muted-foreground">{type.docNote}</p>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>

    <p className="mt-10 text-xs text-muted-foreground">
      Indicative criteria. Every lender sets its own, and we will tell you honestly where you stand
      before you apply.
    </p>
  </section>
);

export default EligibilityAndDocuments;
