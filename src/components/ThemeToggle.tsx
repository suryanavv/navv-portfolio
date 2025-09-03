"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"

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
    } catch { }
    onChange?.(theme)
  }, [theme, onChange])

  return (
    <motion.button
      type="button"
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      className="inline-flex items-center justify-center rounded-md border border-border bg-background/70 text-foreground hover:bg-secondary/40 transition-all duration-70 w-8 h-8 cursor-pointer"
      whileHover={{
        scale: 1.1,
        rotate: [0, -5, 5, 0],
        boxShadow: "0 8px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 10,
        rotate: { duration: 0.4, ease: "easeInOut" }
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
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
    </motion.button>
  )
}
