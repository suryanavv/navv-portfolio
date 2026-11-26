import type { ReactNode } from "react"
import { useSeenOnce } from "../hooks/useSeenOnce"

type SectionProps = {
  id: string
  title: string
  children: ReactNode
  className?: string
}

// Shared wrapper: Doto title (sentence case, no rules) + anchor target for the dock.
// The title switches on like a row of LEDs the first time it scrolls into view.
export default function Section({ id, title, children, className = "" }: SectionProps) {
  const headingId = `${id}-title`
  const [ref, seen] = useSeenOnce<HTMLHeadingElement>(0.9)
  return (
    <section id={id} aria-labelledby={headingId} className={`mt-24 scroll-mt-10 ${className}`}>
      <h2
        ref={ref}
        id={headingId}
        data-lit={seen}
        className="led-title font-display text-2xl leading-none font-black text-foreground"
      >
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}
