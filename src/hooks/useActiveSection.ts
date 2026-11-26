import { useEffect, useState } from "react"

/**
 * Returns the id of the section currently being read: the last section whose top
 * has passed a line at `lineRatio` of the viewport height. At the very bottom of
 * the page the last section wins, since short final sections never reach the line.
 */
export function useActiveSection(ids: readonly string[], lineRatio = 0.4) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join(",")

  useEffect(() => {
    const list = key.split(",")

    // Runs directly on scroll: it only reads a handful of rects, and rAF batching
    // can lag behind in throttled/background tabs.
    const update = () => {
      const root = document.documentElement
      if (window.innerHeight + window.scrollY >= root.scrollHeight - 2) {
        setActive(list[list.length - 1])
        return
      }
      const line = window.innerHeight * lineRatio
      let current = list[0]
      for (const id of list) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [key, lineRatio])

  return active
}
