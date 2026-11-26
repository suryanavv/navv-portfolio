// All site content lives here.

export const PROFILE = {
  name: "Surya Naveen",
  role: "Software engineer",
  place: "Andhra Pradesh, India",
  available: true,
  email: "naveen534245@gmail.com",
  // Add a résumé URL (e.g. "/resume.pdf" in public/) to show the Résumé button.
  resume: "" as string,
  intro: [
    "I'm a software engineer who builds products end to end: React and TypeScript interfaces, FastAPI services and PostgreSQL underneath, and the AWS infrastructure they run on.",
    "At Brightcone.ai I work on AI-powered healthcare software, from EHR integrations and ElevenLabs voice agents to the automated workflows and CI/CD pipelines that keep it shipping.",
  ],
}

export type Job = {
  company: string
  role: string
  url?: string
  start: string // "Jan 2025"
  end?: string // omit for a current role
  summary: string // one specific line
}

// Newest first. One specific line each.
export const WORK: Job[] = [
  {
    company: "Brightcone.ai",
    role: "Software engineer",
    url: "https://www.brightcone.ai/",
    start: "Nov 2025",
    summary:
      "Developing and maintaining AI-powered healthcare solutions, full-stack applications, EHR integrations, cloud infrastructure, CI/CD pipelines and intelligent workflow automation.",
  },
]

export type Project = {
  slug: string // used for the shareable #link when a row is opened
  title: string
  summary: string // what it does, in one line
  year: number
  metric?: string // optional: one true number about it, shown in bold before the detail
  detail: string // what you built, one or two lines
  stack: string // read as a sentence: "Built with …"
  live: string
  repo: string
  image: string // base path; -800.webp and -1600.webp are served from public/projects/
}

// Years come from each repo's creation date on GitHub. Screenshots are from the live sites.
export const PROJECTS: Project[] = [
  {
    slug: "bridgespace",
    title: "BridgeSpace",
    summary: "Share files and text between devices on the same Wi-Fi",
    year: 2025,
    detail:
      "Devices on the same network see each other's shared files and text in real time, with private spaces for sharing with specific people.",
    stack: "TypeScript, React, Supabase and Tailwind CSS",
    live: "https://bridgespace.suryanavv.in/",
    repo: "https://github.com/suryanavv/BridgeSpace",
    image: "/projects/bridgespace",
  },
  {
    slug: "framecaption",
    title: "FrameCaption",
    summary: "Put text behind the subject of a photo",
    year: 2025,
    detail:
      "An editor for text-behind-subject images and thumbnails, with layers, typography controls and a live preview.",
    stack: "TypeScript, Next.js, Tailwind CSS and shadcn/ui",
    live: "https://framecaption.suryanavv.in/",
    repo: "https://github.com/suryanavv/FrameCaption",
    image: "/projects/framecaption",
  },
  {
    slug: "spotlight",
    title: "Spotlight",
    summary: "Build a portfolio and share it with one link",
    year: 2025,
    detail: "People create and customise a portfolio, manage their projects in it, and share it with a profile link.",
    stack: "TypeScript, React, Supabase and shadcn/ui",
    live: "https://spotlight.suryanavv.in/",
    repo: "https://github.com/suryanavv/spotlight",
    image: "/projects/spotlight",
  },
]

export type Skill = { id: string; name: string } // id matches a logo in components/skills/skillIcons.ts

const S = (id: string, name: string): Skill => ({ id, name })

// The everyday stack, read as one sentence with inline logos. Strings are plain text.
export const STACK_SENTENCE: (string | Skill)[] = [
  "Day to day I build interfaces with ",
  S("react", "React"),
  " and ",
  S("typescript", "TypeScript"),
  ", APIs with ",
  S("fastapi", "FastAPI"),
  " on ",
  S("postgresql", "PostgreSQL"),
  ", ship them on ",
  S("aws", "AWS"),
  " with ",
  S("docker", "Docker"),
  ", and build voice agents with ",
  S("elevenlabs", "ElevenLabs"),
  ".",
]

// Technical skills: recognisable tools only. What I do with them lives in EXPERTISE.
export const SKILL_GROUPS: { area: string; skills: Skill[] }[] = [
  {
    area: "Languages",
    skills: [S("python", "Python"), S("typescript", "TypeScript"), S("javascript", "JavaScript"), S("sql", "SQL")],
  },
  {
    area: "Frontend",
    skills: [S("react", "React"), S("nextjs", "Next.js"), S("vite", "Vite"), S("tailwindcss", "Tailwind CSS")],
  },
  {
    area: "Backend and data",
    skills: [S("fastapi", "FastAPI"), S("sqlalchemy", "SQLAlchemy"), S("pydantic", "Pydantic"), S("postgresql", "PostgreSQL"), S("pgvector", "pgvector")],
  },
  {
    area: "Cloud and DevOps",
    skills: [
      S("aws", "AWS"),
      S("ec2", "EC2"),
      S("ecs", "ECS"),
      S("s3", "S3"),
      S("lambda", "Lambda"),
      S("docker", "Docker"),
      S("cloudflare", "Cloudflare"),
      S("dokploy", "Dokploy"),
    ],
  },
  {
    area: "AI",
    skills: [S("openai", "OpenAI"), S("elevenlabs", "ElevenLabs"), S("rag", "RAG"), S("mcp", "MCP")],
  },
]

// What I can build, kept separate from the technology list. `icon` names a glyph in public/skills/.
export const EXPERTISE: { title: string; icon: string }[] = [
  { title: "Full-stack application development", icon: "fullstack" },
  { title: "Cloud infrastructure and deployment", icon: "cloudinfra" },
  { title: "AI-powered applications and voice agents", icon: "voiceai" },
  { title: "Healthcare technology and EHR integrations", icon: "ehr" },
  { title: "SaaS product development", icon: "saas" },
  { title: "Workflow and business process automation", icon: "workflow" },
  { title: "Analytics and dashboard engineering", icon: "analytics" },
  { title: "Database and infrastructure migration", icon: "dbmigration" },
  { title: "Scalable backend systems", icon: "backend" },
  { title: "Production reliability and optimization", icon: "reliability" },
]

export const LINKS = [
  { label: "GitHub", href: "https://github.com/suryanavv" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/surya-naveen-veeravalli-609976257/" },
]
