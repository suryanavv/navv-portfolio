import { LazyMotion, MotionConfig } from "motion/react"
import Board from "./components/board/Board"
import Section from "./components/Section"
import Dock from "./components/Dock"
import CopyEmail from "./components/CopyEmail"
import WorkRoute from "./components/WorkRoute"
import ProjectList from "./components/ProjectList"
import Skills from "./components/skills/Skills"
import { PROFILE, WORK, PROJECTS, LINKS } from "./data"
import { NAV_SECTIONS } from "./sections"

const loadMotionFeatures = () => import("./motion-features").then((mod) => mod.default)

const updated = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(
  new Date(__BUILD_DATE__),
)

function App() {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
    <MotionConfig reducedMotion="user">
      <main className="px-4 pb-40 pt-12 sm:px-6 sm:pt-20">
        {/* Home: the board, then the intro */}
        <section id="home" aria-label="Introduction" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-[880px]">
            <Board name={PROFILE.name} role={PROFILE.role} place={PROFILE.place} available={PROFILE.available} />
          </div>

          <div className="mx-auto mt-8 w-full max-w-[640px]">
            <div className="space-y-4 text-lg leading-relaxed">
              {PROFILE.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={`mailto:${PROFILE.email}`}
                className="rounded-sm bg-foreground px-4 py-2 text-sm font-medium text-background transition-[opacity,scale] duration-150 hover:opacity-85 active:scale-[0.97] motion-reduce:active:scale-100"
              >
                Email me
              </a>
              {PROFILE.resume && (
                <a className="link text-sm" href={PROFILE.resume} target="_blank" rel="noopener noreferrer">
                  Résumé
                </a>
              )}
              <CopyEmail email={PROFILE.email} />
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-[640px]">
          <Section id="work" title="Work">
            <WorkRoute jobs={WORK} />
          </Section>

          <Section id="projects" title="Projects">
            <ProjectList projects={PROJECTS} />
          </Section>

          <Section id="skills" title="Skills">
            <Skills />
          </Section>

          <Section id="contact" title="Contact">
            <p className="leading-relaxed">Email is the quickest way to reach me.</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <CopyEmail email={PROFILE.email} className="!text-base !text-foreground" />
              {LINKS.map((link) => (
                <a key={link.href} className="link" href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </Section>

          <footer className="mt-24 flex flex-wrap justify-between gap-2 text-xs text-muted">
            <span>
              © {new Date().getFullYear()} {PROFILE.name}
            </span>
            <span>Updated {updated}</span>
          </footer>
        </div>
      </main>

      {/* Soft fade + blur behind the dock so content doesn't collide with it */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-28 bg-linear-to-t from-background/90 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black_35%,transparent)]"
      />
      <Dock items={NAV_SECTIONS} />
    </MotionConfig>
    </LazyMotion>
  )
}

export default App
