"use client"

import DynamicText from "./components/Greeting"
import ThemeToggle from "./components/ThemeToggle"
import "./App.css"
import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { SKILLS, PROJECTS, SOCIALS } from "./data"



function App() {
  const [currentTime, setCurrentTime] = useState("")
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark"
    const saved = window.localStorage.getItem("theme")
    return saved === "light" || saved === "dark" ? (saved as "dark" | "light") : "dark"
  })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, "0")
      const minutes = String(now.getMinutes()).padStart(2, "0")
      const seconds = String(now.getSeconds()).padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}:${seconds}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`${theme === "dark" ? "dark" : ""} flex flex-col items-center bg-background`}>

      <motion.div
        className="min-h-screen w-full max-w-3xl border-x px-6 pt-40 pb-6 relative"
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle
            initial="dark"
            onChange={(t) => {
              try {
                window.localStorage.setItem("theme", t)
              } catch { }
              setTheme(t)
            }}
          />
        </div>
        <DynamicText />

        {/* Intro */}
        <motion.section
          className="mt-16 w-full text-2xl md:text-3xl text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          <p>
            I'm <span className="text-primary">Surya Naveen</span>, <br className="block md:hidden" />
            living in Andhra Pradesh, India.
            <br />I design and build minimal, accessible web interfaces.
          </p>
        </motion.section>

        {/* Availability + Contact */}
        <motion.section
          className="mt-5 flex flex-col items-start gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
            Available for new opportunities
          </span>
          <button className="rounded-md border px-3 py-1.5 text-xs font-medium bg-foreground text-background hover:bg-foreground/80 cursor-pointer flex items-center gap-1.5">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>Contact me</span>
          </button>
        </motion.section>

        {/* Skills */}
        <motion.section
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.6 }}
        >
          <h2 className="-mx-6 px-5 p-1 border-y border-border/50 text-lg font-medium text-foreground [background-image:repeating-linear-gradient(135deg,rgba(0,0,0,0.06)_0,rgba(0,0,0,0.06)_1.5px,transparent_1.5px,transparent_7px)] dark:[background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.06)_0,rgba(255,255,255,0.06)_1.5px,transparent_1.5px,transparent_7px)]">Skills</h2>

          {/* Programming Languages */}
          <div className="mt-4">
            <h3 className="text-xs text-muted mb-2">Languages</h3>
            <div className="flex flex-wrap items-center gap-4">
              {SKILLS.filter((skill) => skill.category === "Language").map((skill, index) => (
                <div key={index} className="flex items-center gap-2 group">
                  <img
                    src={skill.logo || "/placeholder.svg"}
                    alt={skill.name}
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                    title={skill.name}
                  />
                  <span className="text-xs text-muted group-hover:text-foreground transition-colors">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Frameworks & Libraries */}
          <div className="mt-6">
            <h3 className="text-xs text-muted mb-2">Frameworks & Libraries</h3>
            <div className="flex flex-wrap items-center gap-4">
              {SKILLS.filter((skill) => skill.category === "Framework").map((skill, index) => (
                <div key={index} className="flex items-center gap-2 group">
                  <img
                    src={skill.logo || "/placeholder.svg"}
                    alt={skill.name}
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                    title={skill.name}
                  />
                  <span className="text-xs text-muted group-hover:text-foreground transition-colors">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Software */}
          <div className="mt-6">
            <h3 className="text-xs text-muted mb-2">Tools & Software</h3>
            <div className="grid grid-cols-2 gap-3">
              {SKILLS.filter((skill) =>
                ["Design Tool", "Editor", "DevOps", "Version Control", "API Testing"].includes(skill.category),
              ).map((skill, index) => (
                <div key={index} className="flex items-center gap-2 group">
                  <img
                    src={skill.logo || "/placeholder.svg"}
                    alt={skill.name}
                    className={`w-5 h-5 transition-transform group-hover:scale-110 ${skill.name === "GitHub" && theme === "dark" ? "brightness-0 invert" : ""
                      }`}
                    title={skill.name}
                  />
                  <span className="text-xs text-muted group-hover:text-foreground transition-colors">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Databases */}
          <div className="mt-6">
            <h3 className="text-xs text-muted mb-2">Databases</h3>
            <div className="flex flex-wrap items-center gap-4">
              {SKILLS.filter((skill) => skill.category === "Database").map((skill, index) => (
                <div key={index} className="flex items-center gap-2 group">
                  <img
                    src={skill.logo || "/placeholder.svg"}
                    alt={skill.name}
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                    title={skill.name}
                  />
                  <span className="text-xs text-muted group-hover:text-foreground transition-colors">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.0 }}
        >
          <h2 className="-mx-6 px-5 p-1 border-y border-border/50 text-lg font-medium text-foreground [background-image:repeating-linear-gradient(135deg,rgba(0,0,0,0.06)_0,rgba(0,0,0,0.06)_1.5px,transparent_1.5px,transparent_7px)] dark:[background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.06)_0,rgba(255,255,255,0.06)_1.5px,transparent_1.5px,transparent_7px)]">Projects</h2>
          <div className="mt-6 space-y-6">
            {PROJECTS.map((project, index) => (
              <div key={index} className="border-b border-border pb-3 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-foreground font-medium">{project.title}</h3>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-foreground hover:text-foreground/80 transition-colors"
                    >
                      Repo ↗
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-foreground hover:text-foreground/80 transition-colors"
                    >
                      Live ↗
                    </a>
                  </div>
                </div>
                <p className="text-xs text-muted mt-1">{project.desc}</p>
                <p className="text-xs text-muted mt-1">Tech: {project.tech}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Socials */}
        <motion.section
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.4 }}
        >
          <h2 className="-mx-6 px-5 p-1 border-y border-border/50 text-lg font-medium text-foreground [background-image:repeating-linear-gradient(135deg,rgba(0,0,0,0.06)_0,rgba(0,0,0,0.06)_1.5px,transparent_1.5px,transparent_7px)] dark:[background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.06)_0,rgba(255,255,255,0.06)_1.5px,transparent_1.5px,transparent_7px)]">Socials</h2>
          <div className="mt-4 space-y-3">
            {SOCIALS.map((social, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-border pb-3 last:border-b-0 last:pb-0"
              >
                <h3 className="text-sm text-foreground font-medium">{social.name}</h3>
                <a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-foreground hover:text-foreground/80 transition-colors"
                >
                  Follow ↗
                </a>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <motion.div
          className="mt-16 flex items-center justify-between text-xs text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.8 }}
        >
          <span>© {new Date().getFullYear()} Surya Naveen</span>
          <span className="font-mono">Local Time: {currentTime}</span>
        </motion.div>
      </motion.div>
    </div>



  )
}

export default App
