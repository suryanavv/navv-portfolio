import { useEffect } from "react"
import { m } from "motion/react"
import ThemeToggle from "./ThemeToggle"
import { useActiveSection } from "../hooks/useActiveSection"

type DockItem = { id: string; label: string; key: string }

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))

export default function Dock({ items }: { items: readonly DockItem[] }) {
  const active = useActiveSection(items.map((item) => item.id))

  // Single-letter shortcuts: section keys jump, "t" toggles the theme.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.repeat || isTyping(event.target)) return
      const key = event.key.toLowerCase()
      if (key === "t") {
        document.querySelector<HTMLButtonElement>('nav[aria-label="Sections"] button[aria-label="Toggle theme"]')?.click()
        return
      }
      const item = items.find((i) => i.key === key)
      if (!item) return
      document.getElementById(item.id)?.scrollIntoView({ block: "start" })
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [items])

  return (
    <nav aria-label="Sections" className="group/dock fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-border bg-background/80 p-1 shadow-lg shadow-black/10 backdrop-blur-md">
        <ul className="flex items-center">
          {items.map((item) => {
            const isActive = item.id === active
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  aria-keyshortcuts={item.key}
                  className={`relative flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors ${
                    isActive ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <m.span
                      layoutId="dock-active"
                      className="absolute inset-0 rounded-full bg-secondary"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                  {/* Shortcut hint: only while the dock has keyboard focus. */}
                  <kbd className="relative hidden text-xs text-muted group-has-[:focus-visible]/dock:inline">{item.key}</kbd>
                </a>
              </li>
            )
          })}
        </ul>
        <span aria-hidden="true" className="mx-0.5 h-4 w-px bg-border" />
        <ThemeToggle />
      </div>
    </nav>
  )
}
