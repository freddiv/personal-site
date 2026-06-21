import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  Code2,
  Contact,
  FileDown,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { MetaFunction } from "react-router";
import { Link } from "react-router";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import {
  journey,
  metrics,
  portfolioSeeds,
  profile,
  specialties,
} from "~/content/profile";

export const meta: MetaFunction = () => [
  { title: "Freddie Valone | UI Architect" },
  {
    name: "description",
    content:
      "Senior UI engineer and front-end architect specializing in enterprise web platforms, scientific data applications, modernization, and technical leadership.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <About />
      <CareerJourney />
      <PortfolioPreview />
      <ContactBand />
    </main>
  );
}

function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/78 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
        <a href="#top" className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-md border border-primary/35 bg-primary/12 font-mono text-sm font-semibold text-primary">
            FV
          </span>
          <span className="hidden text-sm font-semibold tracking-wide text-foreground sm:inline">
            Freddie Valone
          </span>
        </a>

        <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a className="transition hover:text-foreground" href="#about">
            About
          </a>
          <a className="transition hover:text-foreground" href="#journey">
            Journey
          </a>
          <a className="transition hover:text-foreground" href="#portfolio">
            Portfolio
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" aria-label="LinkedIn profile">
            <a href={profile.linkedIn} target="_blank" rel="noreferrer">
              <Contact />
            </a>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={`mailto:${profile.email}`}>
              <Mail />
              Contact
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[88svh] overflow-hidden pt-16">
      <img
        src="/assets/systems-hero.png"
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.095_0.01_248)_0%,oklch(0.095_0.01_248/0.9)_36%,oklch(0.095_0.01_248/0.45)_68%,oklch(0.095_0.01_248/0.18)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_68%,var(--color-background)_100%)]" />

      <div className="relative mx-auto grid min-h-[calc(88svh-4rem)] max-w-7xl content-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <Badge variant="signal" className="mb-6 gap-2">
            <BadgeCheck className="size-3.5" />
            Senior UI leadership for complex web systems
          </Badge>
          <h1 className="max-w-5xl text-balance text-5xl font-black tracking-normal text-foreground sm:text-6xl lg:text-7xl">
            Enterprise-grade front ends with an edge.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={profile.resumePdf} target="_blank" rel="noreferrer">
                <FileDown />
                Resume
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/portfolio">
                Future portfolio
                <ArrowRight />
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="min-h-28 rounded-lg border border-white/12 bg-black/32 p-4 backdrop-blur-md"
              >
                <p className="font-mono text-2xl font-semibold text-primary">
                  {metric.value}
                </p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-y border-white/8 bg-background py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="font-mono text-sm uppercase text-primary">About</p>
          <h2 className="mt-4 text-balance text-3xl font-bold sm:text-4xl">
            A builder-leader for serious product surfaces.
          </h2>
          <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
            {profile.currentFocus}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-white/10 bg-card/82">
            <CardHeader>
              <Boxes className="size-5 text-primary" />
              <CardTitle>Architecture that teams can use</CardTitle>
              <CardDescription>
                Application templates, ADRs, linting standards, test strategy,
                and modernization paths that reduce ambiguity for engineers.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-white/10 bg-card/82">
            <CardHeader>
              <ShieldCheck className="size-5 text-[var(--color-edge-foreground)]" />
              <CardTitle>UX for consequential data</CardTitle>
              <CardDescription>
                Data grids, REST workflows, accessibility awareness, and
                interfaces built for scientists, analysts, QA, and stakeholders.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty) => (
            <Badge key={specialty} variant="secondary" className="px-3 py-1">
              {specialty}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

function CareerJourney() {
  return (
    <section id="journey" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-sm uppercase text-primary">Career journey</p>
            <h2 className="mt-4 text-balance text-3xl font-bold sm:text-4xl">
              From legacy rewrites to public science platforms.
            </h2>
          </div>
          <Button asChild variant="outline">
            <a href={profile.linkedInPdf} target="_blank" rel="noreferrer">
              LinkedIn PDF
              <ArrowUpRight />
            </a>
          </Button>
        </div>

        <div className="mt-10 grid gap-4">
          {journey.map((item) => (
            <Card key={`${item.company}-${item.period}`} className="border-white/10 bg-card/78">
              <CardContent className="grid gap-6 pt-0 md:grid-cols-[10rem_1fr_18rem] md:items-start">
                <p className="font-mono text-sm text-[var(--color-amber-signal)]">
                  {item.period}
                </p>
                <div>
                  <h3 className="text-xl font-semibold">{item.role}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.company}</p>
                  <p className="mt-4 max-w-3xl text-pretty leading-7 text-muted-foreground">
                    {item.signal}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.stack.map((stackItem) => (
                    <Badge key={stackItem} variant="outline">
                      {stackItem}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioPreview() {
  return (
    <section id="portfolio" className="border-y border-white/8 bg-card/35 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-sm uppercase text-primary">Portfolio runway</p>
            <h2 className="mt-4 text-balance text-3xl font-bold sm:text-4xl">
              Case studies are ready to plug in.
            </h2>
            <p className="mt-4 max-w-2xl text-pretty leading-7 text-muted-foreground">
              The site already reserves space for deeper writeups around architecture,
              modernization, mentoring, testing, and product outcomes.
            </p>
          </div>
          <Button asChild>
            <Link to="/portfolio">
              Open portfolio
              <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {portfolioSeeds.map((project) => (
            <Card key={project.name} className="border-white/10 bg-background/72">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Badge variant="signal">{project.status}</Badge>
                    <CardTitle className="mt-4 text-xl">{project.name}</CardTitle>
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
      </div>
    </section>
  );
}

function ContactBand() {
  return (
    <footer className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Badge variant="outline" className="mb-4 gap-2">
              <Sparkles className="size-3.5 text-primary" />
              Vercel-ready direction, Supabase-ready roadmap
            </Badge>
            <h2 className="text-balance text-3xl font-bold">
              Built for the next version of Freddie’s professional platform.
            </h2>
            <p className="mt-4 max-w-2xl text-pretty leading-7 text-muted-foreground">
              The current site is static and fast. Future iterations can add
              Supabase-backed authentication, gated case studies, and editable
              portfolio data without changing the brand direction.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href={`mailto:${profile.email}`}>
                <Mail />
                Email Freddie
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={profile.linkedIn} target="_blank" rel="noreferrer">
                <Contact />
                LinkedIn
              </a>
            </Button>
            <Button variant="ghost" disabled>
              <Code2 />
              GitHub soon
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="font-mono text-xs text-muted-foreground">
          {profile.location} / {profile.title}
        </p>
      </div>
    </footer>
  );
}
