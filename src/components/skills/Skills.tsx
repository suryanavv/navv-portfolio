import SkillItem from "./SkillItem"
import { useSeenOnce } from "../../hooks/useSeenOnce"
import { SKILL_GROUPS, STACK_SENTENCE } from "../../data"

// The everyday stack as a sentence with inline logos, then every skill grouped by where it
// sits in the stack, as a clean grid of logo + name. Items switch on in sequence on first view.
export default function Skills() {
  const [ref, seen] = useSeenOnce<HTMLDivElement>(0.15)
  let n = 0
  return (
    <div ref={ref} data-seen={seen} className="skills">
      <p className="text-lg leading-relaxed text-muted">
        {STACK_SENTENCE.map((part, i) =>
          typeof part === "string" ? <span key={i}>{part}</span> : <SkillItem key={i} skill={part} index={n++} inline />,
        )}
      </p>

      <dl className="mt-10 divide-y divide-border border-y border-border">
        {SKILL_GROUPS.map((group) => (
          <div key={group.area} className="py-5">
            <dt className="text-sm text-muted">{group.area}</dt>
            <dd className="mt-3">
              <ul className="skill-row grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3" aria-label={group.area}>
                {group.skills.map((skill) => (
                  <li key={skill.id}>
                    <SkillItem skill={skill} index={n++} />
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
