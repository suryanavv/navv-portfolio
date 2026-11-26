import { useEffect, useRef, useState } from "react"
import { AnimatePresence, m } from "motion/react"

// Shows the address; clicking copies it and confirms in place for 1.6s.
export default function CopyEmail({ email, className = "" }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      // Clipboard blocked (insecure context or permissions): fall back to opening the mail app.
      window.location.href = `mailto:${email}`
      return
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={`group inline-flex cursor-pointer items-center gap-2 text-sm text-muted hover:text-foreground ${className}`}
        aria-label={`Copy email address ${email}`}
      >
        <span className="relative inline-grid">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.span
              key={copied ? "copied" : "email"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="tabular-nums"
            >
              {copied ? "Copied to clipboard" : email}
            </m.span>
          </AnimatePresence>
        </span>
        {!copied && (
          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
            <path d="M10.5 3.5v-.5A1.5 1.5 0 0 0 9 1.5H3A1.5 1.5 0 0 0 1.5 3v6A1.5 1.5 0 0 0 3 10.5h.5" />
          </svg>
        )}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </>
  )
}
