// How each skill's logo is drawn. Files live in public/skills/ (see LICENSES.txt there).
//   img:    full-colour logo, same in both themes
//   mask:   single-colour logo drawn in the text colour, so it follows the theme
//   themed: a light-mode and a dark-mode file (AWS: dark lettering, orange smile)
export type SkillIcon =
  | { kind: "img"; src: string }
  | { kind: "mask"; src: string }
  | { kind: "themed"; light: string; dark: string }

const img = (name: string): SkillIcon => ({ kind: "img", src: `/skills/${name}.svg` })
const mask = (name: string): SkillIcon => ({ kind: "mask", src: `/skills/${name}.svg` })

export const SKILL_ICONS: Record<string, SkillIcon> = {
  typescript: img("typescript"),
  javascript: img("javascript"),
  python: img("python"),
  html: img("html"),
  css: img("css"),
  react: img("react"),
  nextjs: img("nextjs"),
  tailwindcss: img("tailwindcss"),
  fastapi: img("fastapi"),
  postgresql: img("postgresql"),
  supabase: img("supabase"),
  mongodb: img("mongodb"),
  ecs: img("ecs"),
  rds: img("rds"),
  ec2: img("ec2"),
  docker: img("docker"),
  git: img("git"),
  postman: img("postman"),
  figma: img("figma"),
  vscode: img("vscode"),
  aws: { kind: "themed", light: "/skills/aws-light.svg", dark: "/skills/aws-dark.svg" },
  shadcnui: mask("shadcnui"),
  dokploy: mask("dokploy"),
  github: mask("github"),
  cursor: mask("cursor"),
  elevenlabs: mask("elevenlabs"),
  // Concepts without a brand logo get a simple line glyph.
  sql: mask("sql"),
  cicd: mask("cicd"),
  llm: mask("llm"),
  prompt: mask("prompt"),
  workflow: mask("workflow"),
  evals: mask("evals"),
}
