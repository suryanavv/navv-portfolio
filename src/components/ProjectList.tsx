import { useEffect, useState } from "react"
import { AnimatePresence, m, useReducedMotion } from "motion/react"
import Lamp from "./Lamp"
import type { Project } from "../data"

const NARROW = "(max-width: 639px)"

// Projects as timetable rows. One line each until opened; opening reveals the screenshot,
// a number, what was built, and links. The open row's slug goes in the URL so it can be shared.
export default function ProjectList({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<Set<string>>(() => {
    const slug = window.location.hash.slice(1)
    return new Set(projects.some((p) => p.slug === slug) ? [slug] : [])
  })

  // Arriving on /#framecaption: scroll the opened row into view.
  useEffect(() => {
    const slug = window.location.hash.slice(1)
    if (projects.some((p) => p.slug === slug)) {
      requestAnimationFrame(() => document.getElementById(`project-${slug}`)?.scrollIntoView({ block: "start" }))
    }
  }, [projects])

  const toggle = (slug: string) => {
    setOpen((prev) => {
      const isOpen = prev.has(slug)
      // On phones, one row at a time keeps the list scannable.
      const next = window.matchMedia(NARROW).matches ? new Set<string>() : new Set(prev)
      if (isOpen) next.delete(slug)
      else next.add(slug)
      const url = window.location.pathname + window.location.search
      window.history.replaceState(null, "", isOpen ? url : `${url}#${slug}`)
      return next
    })
  }

  return (
    <ul className="border-t border-border">
      {projects.map((project) => (
        <ProjectRow key={project.slug} project={project} open={open.has(project.slug)} onToggle={() => toggle(project.slug)} />
      ))}
    </ul>
  )
}

function ProjectRow({ project, open, onToggle }: { project: Project; open: boolean; onToggle: () => void }) {
  const reduceMotion = useReducedMotion()
  const panelId = `project-${project.slug}-details`
  const buttonId = `project-${project.slug}-title`

  return (
    <li className="scroll-mt-10 border-b border-border" id={`project-${project.slug}`}>
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full cursor-pointer items-start gap-3 py-4 text-left sm:items-center"
        >
          <Lamp label="Live site" className="mt-2 sm:mt-0" />
          <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
            <span className="font-medium transition-transform duration-150 ease-out group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
              {project.title}
            </span>
            <span className="text-sm text-muted sm:truncate sm:text-base">{project.summary}</span>
          </span>
          <span className="mt-0.5 text-sm text-muted tabular-nums sm:mt-0">{project.year}</span>
          <PlusMinus open={open} />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className="overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="pb-7 pl-5">
              <m.img
                src={`${project.image}-800.webp`}
                srcSet={`${project.image}-800.webp 800w, ${project.image}-1600.webp 1600w`}
                sizes="(min-width: 640px) 620px, 100vw"
                width={1600}
                height={1000}
                alt={`Screenshot of ${project.title}`}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full rounded-sm border border-border bg-secondary object-cover object-top"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.12, delay: reduceMotion ? 0 : 0.1 }}
              />
              <p className="mt-5">
                {project.metric && <span className="font-medium">{project.metric}. </span>}
                {project.detail}
              </p>
              <p className="mt-2 text-muted">Built with {project.stack}.</p>
              <p className="mt-4 flex gap-6 text-sm">
                <a className="link" href={project.live} target="_blank" rel="noopener noreferrer">
                  Visit site
                </a>
                <a className="link" href={project.repo} target="_blank" rel="noopener noreferrer">
                  Source code
                </a>
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  )
}

function PlusMinus({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className="mt-1.5 size-3 shrink-0 text-muted transition-colors group-hover:text-foreground sm:mt-0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M1.5 6h9" />
      <path
        d="M6 1.5v9"
        className="origin-center transition-transform duration-150 motion-reduce:transition-none"
        style={{ transform: open ? "scaleY(0)" : "scaleY(1)", transformBox: "fill-box" }}
      />
    </svg>
  )
}
