import type { CSSProperties } from "react"
import type { Skill } from "../../data"
import { SKILL_ICONS } from "./skillIcons"

// Single-colour brand marks, used where a logo should take the text colour (the stack sentence).
const MONO = new Set(["react", "typescript", "fastapi", "postgresql", "aws", "docker", "elevenlabs"])

export function SkillLogo({ id, mono = false }: { id: string; mono?: boolean }) {
  const icon = mono && MONO.has(id) ? ({ kind: "mask", src: `/skills/mono/${id}.svg` } as const) : SKILL_ICONS[id]
  if (!icon) return null
  // No display class here: each branch sets its own, so "hidden" is never overridden.
  const common = "skill-logo size-4 shrink-0"
  if (icon.kind === "mask") {
    const url = `url(${icon.src})`
    return (
      <span
        aria-hidden="true"
        className={`${common} inline-block ${"color" in icon && icon.color ? "" : "bg-current"}`}
        style={{ backgroundColor: "color" in icon ? icon.color : undefined, maskImage: url, WebkitMaskImage: url, maskSize: "contain", WebkitMaskSize: "contain", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center" }}
      />
    )
  }
  const imgProps = { alt: "", width: 16, height: 16, loading: "lazy" as const, decoding: "async" as const, draggable: false }
  if (icon.kind === "themed") {
    return (
      <>
        <img {...imgProps} src={icon.light} className={`${common} inline-block dark:hidden`} />
        <img {...imgProps} src={icon.dark} className={`${common} hidden dark:inline-block`} />
      </>
    )
  }
  return <img {...imgProps} src={icon.src} className={`${common} inline-block`} />
}

// A skill as logo + name, with no box around it. `inline` is for use inside a sentence, where
// the logo is the brand's single-colour mark in the text colour.
// `index` staggers its switch-on when the section is first seen.
export default function SkillItem({ skill, index = 0, inline = false }: { skill: Skill; index?: number; inline?: boolean }) {
  return (
    <span className={inline ? "skill-inline" : "skill-item"} style={{ "--i": index } as CSSProperties}>
      <SkillLogo id={skill.id} mono={inline} />
      <span>{skill.name}</span>
    </span>
  )
}
