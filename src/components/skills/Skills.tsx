import SkillChip from "./SkillChip"
import { useSeenOnce } from "../../hooks/useSeenOnce"
import { SKILL_GROUPS, STACK_SENTENCE } from "../../data"

// The everyday stack as a sentence with inline chips, then each group as a <tag/> label over
// a wrapping row of chips. Chips switch on in sequence the first time the section is seen.
export default function Skills() {
  const [ref, seen] = useSeenOnce<HTMLDivElement>(0.15)
  let n = 0
  return (
    <div ref={ref} data-seen={seen} className="skills">
      <p className="text-[15px] leading-9 text-muted">
        {STACK_SENTENCE.map((part, i) =>
          typeof part === "string" ? <span key={i}>{part}</span> : <SkillChip key={i} skill={part} index={n++} inline />,
        )}
      </p>

      <div className="mt-8 space-y-6">
        {SKILL_GROUPS.map((group) => (
          <section key={group.tag} aria-label={group.area}>
            <p className="skill-label" aria-hidden="true">
              &lt;{group.tag}/&gt;
            </p>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill.id}>
                  <SkillChip skill={skill} index={n++} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
