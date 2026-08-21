import React from "react";
import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Block } from "@/content/blog";

/**
 * Renders an article from typed blocks.
 *
 * Nothing here uses dangerouslySetInnerHTML — an article is data, and every
 * block type has to be handled explicitly before it can appear on the page.
 */
const ArticleBody: React.FC<{ blocks: Block[] }> = ({ blocks }) => (
  <div className="max-w-2xl">
    {blocks.map((block, index) => {
      switch (block.type) {
        case "h2":
          return (
            <h2 key={index} className="mt-12 font-heading text-2xl font-semibold">
              {block.text}
            </h2>
          );

        case "h3":
          return (
            <h3 key={index} className="mt-8 font-heading text-lg font-semibold">
              {block.text}
            </h3>
          );

        case "p":
          return (
            <p key={index} className="mt-4 leading-relaxed text-muted-foreground">
              {block.text}
            </p>
          );

        case "ul":
          return (
            <ul key={index} className="mt-4 space-y-2">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          );

        case "ol":
          return (
            <ol key={index} className="mt-4 space-y-3">
              {block.items.map((item, position) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
                    {position + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          );

        case "callout":
          return (
            <aside key={index} className="mt-8 flex gap-4 rounded-lg border-l-4 border-primary bg-muted/50 p-5">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-semibold">{block.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{block.text}</p>
              </div>
            </aside>
          );

        case "table":
          return (
            <div key={index} className="mt-8 overflow-x-auto rounded-lg border">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                    {block.head.map((heading) => (
                      <th key={heading} scope="col" className="px-4 py-3 text-left font-semibold">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row) => (
                    <tr key={row.join("|")} className="border-b last:border-b-0">
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cell + cellIndex}
                          className={`px-4 py-3 ${cellIndex === 0 ? "font-medium" : "text-muted-foreground"}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );

        case "cta":
          return (
            <div key={index} className="mt-10 rounded-xl bg-brand p-6 text-brand-foreground">
              <p className="text-brand-foreground/90">{block.text}</p>
              <Button asChild variant="hero" className="mt-4">
                <Link to={block.to}>{block.label}</Link>
              </Button>
            </div>
          );

        default:
          return null;
      }
    })}
  </div>
);

export default ArticleBody;
