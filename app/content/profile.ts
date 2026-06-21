export const profile = {
  name: "Freddie Valone",
  title: "Technical Lead, Senior UI Engineer, Front-end Architect",
  location: "Louisburg, North Carolina",
  email: "freddie.valone@gmail.com",
  linkedIn: "https://www.linkedin.com/in/freddie-valone-73a21a3/",
  resumePdf: "/Freddie-Valone-Resume.pdf",
  linkedInPdf: "/Freddie-Valone-LinkedIn.pdf",
  summary:
    "A senior UI architect with 15+ years building, modernizing, and leading complex web platforms where data density, accessibility, performance, and team velocity all matter.",
  currentFocus:
    "Currently leading front-end architecture for EPA science applications, including platform templates, modernization from Vue 2/Nuxt 2 to Vue 3/Nuxt 3, TailwindCSS, PrimeVue, Vitest, Cypress, and data-intensive UI patterns.",
} as const;

export const metrics = [
  { value: "15+", label: "years in web application engineering" },
  { value: "7+", label: "years leading EPA UI architecture" },
  { value: "3", label: "major EPA science products modernized" },
  { value: "5-7", label: "developer teams mentored and led" },
] as const;

export const specialties = [
  "UI architecture",
  "React Router v7",
  "Vue / Nuxt modernization",
  "TailwindCSS",
  "Vitest / Cypress",
  "WCAG-minded UX",
  "Data grids",
  "REST integrations",
  "Design systems",
  "Technical mentorship",
] as const;

export const journey = [
  {
    period: "2018 - Present",
    company: "U.S. Environmental Protection Agency",
    role: "JavaScript UI Technical Lead / UI Architect",
    signal:
      "Defines front-end architecture for CCTE web applications, leads modernization efforts, maintains UI templates, and mentors teams shipping public science tools.",
    stack: ["Vue", "Nuxt", "TypeScript", "TailwindCSS", "ag-Grid", "Vitest", "Cypress"],
  },
  {
    period: "2018",
    company: "American Kennel Club",
    role: "Senior Software Engineer, Contract",
    signal:
      "Enhanced the Online Competition Management System, documenting local setup and delivering feature improvements across a mixed Java/Spring and AngularJS stack.",
    stack: ["AngularJS", "Spring MVC", "Java", "Oracle", "JIRA"],
  },
  {
    period: "2015 - 2018",
    company: "PeopleFluent",
    role: "Senior Software Engineer",
    signal:
      "Implemented responsive UI architecture for a next-generation SaaS platform, improving browser compatibility and front-end maintainability.",
    stack: ["AngularJS", "Bootstrap", ".NET MVC", "SQL Server", "Bamboo"],
  },
  {
    period: "2001 - 2015",
    company: "American Kennel Club",
    role: "Senior Software Engineer",
    signal:
      "Led UI development for data-intensive systems, migrated legacy interfaces, mentored developers, and contributed across Java, Spring MVC, Oracle, MongoDB, and browser testing.",
    stack: ["JavaScript", "AngularJS", "jQuery", "Spring MVC", "Selenium", "QUnit"],
  },
] as const;

export const portfolioSeeds = [
  {
    name: "Comptox Chemicals Dashboard",
    status: "Live public platform",
    href: "https://comptox.epa.gov/dashboard",
    summary:
      "Data-rich chemical information platform for scientific search, review, and discovery workflows.",
  },
  {
    name: "GenRA",
    status: "Read-across application",
    href: "https://comptox.epa.gov/genra/",
    summary:
      "Modern scientific interface supporting generalized read-across workflows and toxicology decisions.",
  },
  {
    name: "RapidTox",
    status: "EPA application",
    href: "https://comptox.epa.gov/rapidtox",
    summary:
      "Application modernization path from Nuxt 2/Vue 2 toward a newer TypeScript-centered UI foundation.",
  },
  {
    name: "CCTE UI Template",
    status: "Architecture asset",
    href: "/portfolio",
    summary:
      "Reusable application foundation for EPA CCTE teams, built around consistency, testability, and maintainability.",
  },
] as const;
