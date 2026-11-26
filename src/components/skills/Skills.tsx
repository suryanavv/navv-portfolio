import SkillChip from "./SkillChip"
import { useSeenOnce } from "../../hooks/useSeenOnce"
import { SKILL_GROUPS, STACK_SENTENCE } from "../../data"

// The everyday stack as a sentence with inline logos, then every skill grouped by kind of work.
// Chips switch on in sequence the first time the section is seen.
export default function Skills() {
  const [ref, seen] = useSeenOnce<HTMLDivElement>(0.15)
  let n = 0
  return (
    <div ref={ref} data-seen={seen} className="skills">
      <p className="leading-[2.1]">
        {STACK_SENTENCE.map((part, i) =>
          typeof part === "string" ? <span key={i}>{part}</span> : <SkillChip key={i} skill={part} index={n++} inline />,
        )}
      </p>

      <dl className="mt-8 divide-y divide-border border-y border-border">
        {SKILL_GROUPS.map((group) => (
          <div key={group.area} className="grid gap-2.5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="pt-0.5 font-medium">{group.area}</dt>
            <dd>
              <ul className="skill-row flex flex-wrap gap-1.5" aria-label={group.area}>
                {group.skills.map((skill) => (
                  <li key={skill.id}>
                    <SkillChip skill={skill} index={n++} />
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
