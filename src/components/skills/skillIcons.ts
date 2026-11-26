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
  bash: mask("bash", "#4EAA25"),
  html: img("html"),
  css: img("css"),
  // Frontend
  react: img("react"),
  nextjs: img("nextjs"),
  vite: img("vite"),
  tailwindcss: img("tailwindcss"),
  designsystems: mask("designsystems"),
  responsive: mask("responsive"),
  uiux: mask("uiux"),
  // Backend
  fastapi: img("fastapi"),
  rest: mask("rest"),
  sqlalchemy: mask("sqlalchemy", "#D71F00"),
  pydantic: mask("pydantic", "#E92063"),
  microservices: mask("microservices"),
  workers: mask("workers"),
  webhooks: mask("webhooks"),
  // Databases
  postgresql: img("postgresql"),
  rds: img("rds"),
  pgvector: mask("pgvector"),
  dbdesign: mask("dbdesign"),
  dbmigration: mask("dbmigration"),
  backup: mask("backup"),
  // Cloud and DevOps
  aws: { kind: "themed", light: "/skills/aws-light.svg", dark: "/skills/aws-dark.svg" },
  ec2: img("ec2"),
  ecs: img("ecs"),
  ecr: img("ecr"),
  s3: img("s3"),
  lambda: img("lambda"),
  cloudfront: img("cloudfront"),
  docker: img("docker"),
  dokploy: mask("dokploy"),
  railway: mask("railway"),
  cloudflare: img("cloudflare"),
  cicd: mask("cicd"),
  linux: img("linux"),
  github: mask("github"),
  // AI and automation
  openai: mask("openai"),
  elevenlabs: mask("elevenlabs"),
  llm: mask("llm"),
  voiceai: mask("voiceai"),
  conversational: mask("conversational"),
  prompt: mask("prompt"),
  rag: mask("rag"),
  mcp: mask("mcp"),
  functions: mask("functions"),
  evals: mask("evals"),
  // Integrations and analytics
  googleanalytics: mask("googleanalytics", "#E37400"),
  searchconsole: mask("searchconsole", "#458CF5"),
  meta: mask("meta", "#0467DF"),
  umami: mask("umami"),
  ehr: mask("ehr"),
  oauth: mask("oauth"),
  thirdparty: mask("thirdparty"),
  // Security and engineering
  iam: img("iam"),
  jwt: mask("jwt"),
  jwks: mask("jwks"),
  rbac: mask("rbac"),
  secrets: mask("secrets"),
  systemdesign: mask("systemdesign"),
  apitesting: mask("apitesting"),
  debugging: mask("debugging"),
  // Expertise glyphs
  fullstack: mask("fullstack"),
  cloudinfra: mask("cloudinfra"),
  saas: mask("saas"),
  workflow: mask("workflow"),
  analytics: mask("analytics"),
  backend: mask("backend"),
  reliability: mask("reliability"),
}
