// The green "on" light. Used only where something is live or current, so its meaning stays consistent.
export default function Lamp({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <span
      className={`inline-block size-2 shrink-0 rounded-full bg-lamp shadow-[0_0_6px_var(--lamp)] ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  )
}
