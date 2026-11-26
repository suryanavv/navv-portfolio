import { useEffect, useRef, useState } from "react"

/** True from the first time the element is at least `threshold` visible. Never flips back. */
export function useSeenOnce<T extends Element>(threshold = 0.4) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    if (!("IntersectionObserver" in window)) {
      setSeen(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [seen, threshold])

  return [ref, seen] as const
}
