import { ArrowLeft, ArrowUpRight, Database, LockKeyhole, Rocket } from "lucide-react";
import type { MetaFunction } from "react-router";
import { Link } from "react-router";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { portfolioSeeds, profile } from "~/content/profile";

export const meta: MetaFunction = () => [
  { title: "Portfolio | Freddie Valone" },
  {
    name: "description",
    content:
      "Future portfolio hub for Freddie Valone's UI architecture, modernization, and front-end leadership case studies.",
  },
];

const roadmap = [
  {
    icon: Rocket,
    title: "Case study detail pages",
    copy: "Add narrative writeups for architecture decisions, migration plans, test strategy, and product outcomes.",
  },
  {
    icon: LockKeyhole,
    title: "Supabase auth",
    copy: "Introduce optional gated content for sensitive project context while keeping public highlights accessible.",
  },
  {
    icon: Database,
    title: "Editable portfolio data",
    copy: "Move project metadata into Supabase tables so future entries can be managed without a deploy.",
  },
] as const;

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-white/8">
        <img
          src="/assets/systems-hero.png"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-background/82" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="-ml-3">
            <Link to="/">
              <ArrowLeft />
              Home
            </Link>
          </Button>

          <div className="grid gap-8 py-16 lg:grid-cols-[1fr_22rem] lg:items-end">
            <div>
              <Badge variant="signal">Future portfolio</Badge>
              <h1 className="mt-5 max-w-4xl text-balance text-5xl font-black sm:text-6xl">
                A case-study system for architecture work that usually stays invisible.
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
                This page is prepared for deeper portfolio stories around public
                science interfaces, modernization leadership, reusable UI
                foundations, testing practice, and accessible data workflows.
              </p>
            </div>

            <Card className="border-primary/25 bg-card/86">
              <CardHeader>
                <CardTitle>Next deployment target</CardTitle>
                <CardDescription>
                  React Router framework mode on Vercel, with Supabase available
                  for auth, project data, and future admin workflows.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {portfolioSeeds.map((project) => (
            <Card key={project.name} className="border-white/10 bg-card/72">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Badge variant="outline">{project.status}</Badge>
                    <CardTitle className="mt-4 text-2xl">{project.name}</CardTitle>
                  </div>
                  <Button asChild variant="ghost" size="icon" aria-label={`Open ${project.name}`}>
                    <a href={project.href} target={project.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                      <ArrowUpRight />
                    </a>
                  </Button>
                </div>
                <CardDescription className="text-pretty leading-6">
                  {project.summary}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-white/8 bg-card/35 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-sm uppercase text-primary">Roadmap</p>
          <h2 className="mt-4 text-3xl font-bold">Ready for the next layer.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {roadmap.map((item) => {
              const Icon = item.icon;

              return (
                <Card key={item.title} className="border-white/10 bg-background/72">
                  <CardHeader>
                    <Icon className="size-5 text-primary" />
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.copy}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild>
              <a href={`mailto:${profile.email}`}>Discuss a case study</a>
            </Button>
            <Button asChild variant="outline">
              <a href={profile.resumePdf} target="_blank" rel="noreferrer">
                Download resume
                <ArrowUpRight />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
