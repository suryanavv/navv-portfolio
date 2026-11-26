// The green "on" light. Used only where something is live or current, so its meaning stays consistent.
// `breathe` marks the single most "live" thing (the current role) with a slow status-LED pulse.
export default function Lamp({ label, breathe = false, className = "" }: { label?: string; breathe?: boolean; className?: string }) {
  return (
    <span
      className={`inline-block size-2 shrink-0 rounded-full bg-lamp shadow-[0_0_6px_var(--lamp)] ${breathe ? "lamp-breathe" : ""} ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  )
}
