import type { CSSProperties } from "react"
import { SkillLogo } from "./SkillItem"
import { useSeenOnce } from "../../hooks/useSeenOnce"
import { EXPERTISE } from "../../data"

// What I can build, as a quiet two-column list. Items switch on in sequence on first view.
export default function Expertise() {
  const [ref, seen] = useSeenOnce<HTMLUListElement>(0.2)
  return (
    <ul ref={ref} data-seen={seen} className="expertise grid border-t border-border sm:grid-cols-2 sm:gap-x-8">
      {EXPERTISE.map((item, i) => (
        <li
          key={item.title}
          className="expertise-item flex items-center gap-3 border-b border-border py-3.5"
          style={{ "--i": i } as CSSProperties}
        >
          <span className="text-muted">
            <SkillLogo id={item.icon} />
          </span>
          <span>{item.title}</span>
        </li>
      ))}
    </ul>
  )
}
