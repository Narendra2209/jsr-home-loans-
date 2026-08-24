import React from "react";
import { User } from "lucide-react";
import { team } from "@/content/about";

const Team: React.FC = () => (
  <section className="bg-muted/40 py-16">
    <div className="container">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our team</p>
        <h2 className="mt-2 font-heading text-3xl font-semibold">
          The people you will actually deal with
        </h2>
        <p className="mx-auto mt-3 max-w-prose text-muted-foreground">
          A small team, which is why you speak to the same person from application to disbursement.
        </p>
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member) => (
          <li key={member.role} className="overflow-hidden rounded-lg border bg-card shadow-sm">
            {member.photo ? (
              <img
                src={member.photo}
                alt={`${member.name}, ${member.role}`}
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center bg-muted">
                <User className="h-10 w-10 text-muted-foreground/50" aria-hidden="true" />
              </div>
            )}
            <div className="p-5">
              <p className="font-semibold">{member.name}</p>
              <p className="text-sm font-semibold text-primary">{member.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{member.duty}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Team;
