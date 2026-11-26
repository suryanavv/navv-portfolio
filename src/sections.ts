// Sections reachable from the dock, in page order. `key` is the keyboard shortcut.
export const NAV_SECTIONS = [
  { id: "home", label: "home", key: "h" },
  { id: "work", label: "work", key: "w" },
  { id: "projects", label: "projects", key: "p" },
  { id: "skills", label: "skills", key: "s" },
  { id: "contact", label: "contact", key: "c" },
] as const

export type NavSection = (typeof NAV_SECTIONS)[number]
