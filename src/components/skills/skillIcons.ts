// How each skill's logo is drawn. Files live in public/skills/ (see LICENSES.txt there).
//   img:    full-colour logo, same in both themes
//   mask:   single-colour logo or line glyph, painted in `color` (the brand colour) or,
//           without one, in the text colour so it follows the theme
//   themed: separate light- and dark-mode files (AWS: dark lettering, orange smile)
export type SkillIcon =
  | { kind: "img"; src: string }
  | { kind: "mask"; src: string; color?: string }
  | { kind: "themed"; light: string; dark: string }

const img = (name: string): SkillIcon => ({ kind: "img", src: `/skills/${name}.svg` })
const mask = (name: string, color?: string): SkillIcon => ({ kind: "mask", src: `/skills/${name}.svg`, color })

export const SKILL_ICONS: Record<string, SkillIcon> = {
  // Languages
  python: img("python"),
  typescript: img("typescript"),
  javascript: img("javascript"),
  sql: mask("sql"),
  // Frontend
  react: img("react"),
  nextjs: img("nextjs"),
  tanstack: mask("tanstack"),
  tailwindcss: img("tailwindcss"),
  shadcnui: mask("shadcnui"),
  motion: mask("motion"),
  // Backend and databases
  fastapi: img("fastapi"),
  sqlalchemy: mask("sqlalchemy", "#D71F00"),
  pydantic: mask("pydantic", "#E92063"),
  zod: mask("zod", "#408AFF"),
  drizzle: mask("drizzle"),
  postgresql: img("postgresql"),
  supabase: img("supabase"),
  // Cloud
  aws: { kind: "themed", light: "/skills/aws-light.svg", dark: "/skills/aws-dark.svg" },
  ec2: img("ec2"),
  ecs: img("ecs"),
  s3: img("s3"),
  lambda: img("lambda"),
  vercel: mask("vercel"),
  cloudflare: img("cloudflare"),
  // DevOps
  docker: mask("docker"), // Docker's current mark, drawn in the text colour as on docker.com
  cicd: mask("cicd"),
  git: img("git"),
  github: mask("github"),
  // Architecture
  systemdesign: mask("systemdesign"),
  microservices: mask("microservices"),
  jobs: mask("jobs"),
  integrations: mask("integrations"),
  auth: mask("auth"),
  // AI
  openai: mask("openai"),
  elevenlabs: mask("elevenlabs"),
  mcp: mask("mcp"),
  // Tools
  vscode: img("vscode"),
  cursor: mask("cursor"),
  postman: img("postman"),
  figma: img("figma"),
  // Expertise glyphs
  fullstack: mask("fullstack"),
  cloudinfra: mask("cloudinfra"),
  voiceai: mask("voiceai"),
  saas: mask("saas"),
  workflow: mask("workflow"),
  backend: mask("backend"),
}
