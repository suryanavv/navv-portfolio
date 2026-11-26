import type { CSSProperties } from "react"
import type { Skill } from "../../data"
import { SKILL_ICONS } from "./skillIcons"

export function SkillLogo({ id, size = "size-4" }: { id: string; size?: string }) {
  const icon = SKILL_ICONS[id]
  if (!icon) return null
  // No display class here: each branch sets its own, so "hidden" is never overridden.
  const common = `skill-logo ${size} shrink-0`
  if (icon.kind === "mask") {
    const url = `url(${icon.src})`
    return (
      <span
        aria-hidden="true"
        className={`${common} inline-block ${icon.color ? "" : "bg-current"}`}
        style={{ backgroundColor: icon.color, maskImage: url, WebkitMaskImage: url, maskSize: "contain", WebkitMaskSize: "contain", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center" }}
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

// A skill as a small chip: logo + name on a faint background with a hairline border.
// `inline` sits inside a sentence. `index` staggers its switch-on when the section is first seen.
export default function SkillChip({ skill, index = 0, inline = false }: { skill: Skill; index?: number; inline?: boolean }) {
  return (
    <span className={`skill-chip ${inline ? "skill-chip-inline" : ""}`} style={{ "--i": index } as CSSProperties}>
      <SkillLogo id={skill.id} size="size-3.5" />
      <span>{skill.name}</span>
    </span>
  )
}
