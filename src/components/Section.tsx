import type { ReactNode } from "react"

type SectionProps = {
  id: string
  title: string
  children: ReactNode
  className?: string
}

// Shared wrapper: Doto title (sentence case, no rules) + anchor target for the dock.
export default function Section({ id, title, children, className = "" }: SectionProps) {
  const headingId = `${id}-title`
  return (
    <section id={id} aria-labelledby={headingId} className={`mt-24 scroll-mt-10 ${className}`}>
      <h2 id={headingId} className="font-display text-2xl leading-none font-black text-foreground">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}
