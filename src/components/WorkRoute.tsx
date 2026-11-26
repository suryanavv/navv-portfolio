import Lamp from "./Lamp"
import { useSeenOnce } from "../hooks/useSeenOnce"
import type { Job } from "../data"

// Work history as a vertical route. The current role's stop is the lit one.
// The route line draws itself down from the top stop the first time the list is seen.
export default function WorkRoute({ jobs }: { jobs: Job[] }) {
  const [ref, seen] = useSeenOnce<HTMLOListElement>(0.3)
  return (
    <ol ref={ref}>
      {jobs.map((job, i) => {
        const current = !job.end
        const last = i === jobs.length - 1
        return (
          <li key={`${job.company}-${i}`} className="relative grid grid-cols-[0.5rem_1fr] gap-x-5 pb-9 last:pb-0">
            <div className="relative flex justify-center pt-[0.5rem]">
              {!last && (
                <span
                  aria-hidden="true"
                  className="absolute top-[1.1rem] -bottom-[0.6rem] w-px origin-top bg-border transition-transform duration-700 ease-out motion-reduce:transition-none"
                  style={{ transform: `scaleY(${seen ? 1 : 0})`, transitionDelay: `${i * 160}ms` }}
                />
              )}
              {current ? (
                <Lamp label="Current role" breathe className="relative" />
              ) : (
                <span aria-hidden="true" className="relative size-2 rounded-full border border-muted bg-background" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                <h3 className="font-medium">
                  {job.url ? (
                    <a className="link" href={job.url} target="_blank" rel="noopener noreferrer">
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                  <span className="ml-2 font-normal text-muted">{job.role}</span>
                </h3>
                <p className="text-sm text-muted tabular-nums">
                  {job.start} – {job.end ?? "now"}
                </p>
              </div>
              <p className="mt-1.5 text-muted">{job.summary}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
