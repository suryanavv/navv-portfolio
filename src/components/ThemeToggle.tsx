import { useRef, useState } from "react"
import { flushSync } from "react-dom"
import { m } from "motion/react"

type Theme = "dark" | "light"

// The inline script in index.html sets the initial class before first paint,
// so <html> is the single source of truth for the current theme.
const readTheme = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light"

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle("dark", theme === "dark")
  root.style.colorScheme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#131518" : "#ecedea")
  try {
    window.localStorage.setItem("theme", theme)
  } catch {
    // Storage can be unavailable (private mode, blocked cookies); the theme still applies.
  }
}

export default function ThemeToggle() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [theme, setTheme] = useState<Theme>(readTheme)

  const handleThemeChange = async () => {
    const next: Theme = theme === "dark" ? "light" : "dark"
    const update = () => {
      applyTheme(next)
      setTheme(next)
    }

    const button = buttonRef.current
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!button || reduceMotion || !("startViewTransition" in document)) {
      update()
      return
    }

    await document.startViewTransition(() => {
      flushSync(update)
    }).ready

    const { top, left, width, height } = button.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top),
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    )
  }

  return (
    <m.button
      ref={buttonRef}
      type="button"
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={handleThemeChange}
      className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-secondary hover:text-foreground"
      whileTap={{ scale: 0.9 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
        aria-hidden="true"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
        <path d="M12 3l0 18"></path>
        <path d="M12 9l4.65 -4.65"></path>
        <path d="M12 14.3l7.37 -7.37"></path>
        <path d="M12 19.6l8.85 -8.85"></path>
      </svg>
    </m.button>
  )
}
