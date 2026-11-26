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
  vite: img("vite"),
  tailwindcss: img("tailwindcss"),
  // Backend and data
  fastapi: img("fastapi"),
  sqlalchemy: mask("sqlalchemy", "#D71F00"),
  pydantic: mask("pydantic", "#E92063"),
  postgresql: img("postgresql"),
  pgvector: mask("pgvector"),
  // Cloud and DevOps
  aws: { kind: "themed", light: "/skills/aws-light.svg", dark: "/skills/aws-dark.svg" },
  ec2: img("ec2"),
  ecs: img("ecs"),
  s3: img("s3"),
  lambda: img("lambda"),
  docker: img("docker"),
  cloudflare: img("cloudflare"),
  dokploy: mask("dokploy"),
  // AI
  openai: mask("openai"),
  elevenlabs: mask("elevenlabs"),
  rag: mask("rag"),
  mcp: mask("mcp"),
  // Expertise glyphs
  fullstack: mask("fullstack"),
  cloudinfra: mask("cloudinfra"),
  voiceai: mask("voiceai"),
  ehr: mask("ehr"),
  saas: mask("saas"),
  workflow: mask("workflow"),
  analytics: mask("analytics"),
  dbmigration: mask("dbmigration"),
  backend: mask("backend"),
  reliability: mask("reliability"),
}
