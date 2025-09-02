"use client"

import { useEffect, useState } from "react"

type Theme = "dark" | "light"

export default function ThemeToggle({
  onChange,
  initial = "dark",
}: {
  onChange?: (theme: Theme) => void
  initial?: Theme
}) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return initial
    const stored = window.localStorage.getItem("theme") as Theme | null
    return stored === "light" || stored === "dark" ? stored : initial
  })

  useEffect(() => {
    try {
      window.localStorage.setItem("theme", theme)
    } catch {}
    onChange?.(theme)
  }, [theme, onChange])

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      className="inline-flex items-center justify-center rounded-md border border-border bg-background/70 text-foreground hover:bg-secondary/40 transition-colors h-9 w-9"
    >
      {/* Provided SVG (kept as-is) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4.5"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
        <path d="M12 3l0 18"></path>
        <path d="M12 9l4.65 -4.65"></path>
        <path d="M12 14.3l7.37 -7.37"></path>
        <path d="M12 19.6l8.85 -8.85"></path>
      </svg>
    </button>
  )
}
