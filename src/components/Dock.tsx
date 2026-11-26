import { useEffect, useLayoutEffect, useRef, useState } from "react"
import ThemeToggle from "./ThemeToggle"
import { useActiveSection } from "../hooks/useActiveSection"

type DockItem = { id: string; label: string; key: string }

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))

export default function Dock({ items }: { items: readonly DockItem[] }) {
  // The "reading" line sits a quarter down the screen, so short sections (one job) still get highlighted.
  const active = useActiveSection(items.map((item) => item.id), 0.25)
  const listRef = useRef<HTMLUListElement>(null)
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null)
  const [hidden, setHidden] = useState(false)
  // Scrolls started by the dock itself (clicks, shortcuts) must not hide it.
  const jumpingUntil = useRef(0)
  const markJump = () => {
    jumpingUntil.current = performance.now() + 1200
    setHidden(false)
  }

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
      markJump()
      document.getElementById(item.id)?.scrollIntoView({ block: "start" })
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [items])

  // The active pill slides between items with a CSS transform (no layout animation library).
  useLayoutEffect(() => {
    const measure = () => {
      // Measure the list item (positioned relative to the list), not the link inside it.
      const item = listRef.current?.querySelector<HTMLElement>('a[aria-current="location"]')?.parentElement
      if (item) setPill({ x: item.offsetLeft, w: item.offsetWidth })
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (listRef.current) observer.observe(listRef.current)
    return () => observer.disconnect()
  }, [active])

  // Tuck the dock away while reading downward; bring it back on any upward scroll or at the ends.
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (performance.now() < jumpingUntil.current) {
        lastY = y
        return
      }
      const atEnd = y < 80 || window.innerHeight + y >= document.documentElement.scrollHeight - 80
      if (atEnd) setHidden(false)
      else if (Math.abs(y - lastY) > 6) setHidden(y > lastY)
      lastY = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      aria-label="Sections"
      data-hidden={hidden}
      // Keyboard focus always brings the dock back.
      onFocus={() => setHidden(false)}
      className="group/dock fixed bottom-5 left-1/2 z-50 -translate-x-1/2 transition-[translate,opacity] duration-300 ease-out data-[hidden=true]:translate-y-[calc(100%+1.5rem)] data-[hidden=true]:opacity-0 motion-reduce:transition-none"
    >
      <div className="flex items-center gap-1 rounded-full border border-border bg-background/80 p-1 shadow-lg shadow-black/10 backdrop-blur-md">
        <ul ref={listRef} className="relative flex items-center">
          {pill && (
            <li
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-secondary transition-[translate,width] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"
              style={{ width: pill.w, translate: `${pill.x}px 0` }}
            />
          )}
          {items.map((item) => {
            const isActive = item.id === active
            return (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  aria-keyshortcuts={item.key}
                  onClick={markJump}
                  className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors active:scale-95 motion-reduce:active:scale-100 ${
                    isActive ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {/* Shortcut hint: only while the dock has keyboard focus. */}
                  <kbd className="hidden text-xs text-muted group-has-[:focus-visible]/dock:inline">{item.key}</kbd>
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
