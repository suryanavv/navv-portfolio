"use client"

import React from "react"
import DynamicText from "./components/Greeting"
import ThemeToggle from "./components/ThemeToggle"
import PaperPlane from "./components/icons/PaperPlane"
import "./App.css"
import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { SKILLS, PROJECTS, SOCIALS } from "./data"
import IndiaFlag from "./components/india-flag"


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
        style={{ userSelect: 'none' }}
      >
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle
            initial="light"
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
          className="mt-10 w-full text-2xl md:text-3xl text-muted"
        >
          <p>
            I'm <span className="text-primary">Surya Naveen</span>, <br className="block md:hidden" />
            living in Andhra Pradesh,{" "}
            <span className="inline-flex items-center gap-1">
              India
              <span className="align-middle inline-block">
                <IndiaFlag style={{ width: 32, height: 32, verticalAlign: "middle" }} />
              </span>
            </span>.
            <br />I design and build minimal, beautiful web interfaces.
          </p>
        </motion.section>

        {/* Availability + Contact */}
        <motion.section
          className="mt-5 flex flex-col items-start gap-3"
        >
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-foreground cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              borderColor: "var(--primary)"
            }}
          >
            <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
            Available for new opportunities
          </motion.span>
          <motion.a
            href="mailto:naveen534245@gmail.com"
            className="rounded-md border px-3 py-1.5 text-xs font-medium bg-foreground text-background hover:bg-foreground/80 cursor-pointer flex items-center gap-1.5 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <PaperPlane className="w-3 h-3" theme={theme} />
            <span>Contact me</span>
          </motion.a>
        </motion.section>

        {/* Skills */}
        <motion.section
          className="mt-16"
        >
          <h2 className="-mx-6 px-5 p-1 border-y border-border/50 text-lg font-semibold text-foreground">Skills</h2>


          
          {/* Programming Languages */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-muted mb-2">Languages</h3>
            <div className="grid grid-cols-2 gap-3">
              {SKILLS.filter((skill) => skill.category === "Language").map((skill, index) => (
                <motion.div
                  key={index}
                  className="flex w-fit items-center gap-2 group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.div
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                    title={skill.name}
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, -10, 10, 0],
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {React.createElement(skill.logo, {
                      className: "w-full h-full",
                      theme: skill.name === "Cursor" ? theme : undefined,
                    })}
                  </motion.div>
                  <motion.span
                    className="text-xs text-muted group-hover:text-foreground transition-colors"
                    whileHover={{ color: "var(--foreground)" }}
                  >
                    {skill.name}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Frameworks & Libraries */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-muted mb-2">Frameworks & Libraries</h3>
            <div className="grid grid-cols-2 gap-3">
              {SKILLS.filter((skill) => skill.category === "Framework").map((skill, index) => (
                <motion.div
                  key={index}
                  className="flex w-fit items-center gap-2 group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.div
                    className={`w-5 h-5 transition-transform group-hover:scale-110 ${skill.name === "Shadcn UI" && theme === "dark" ? "brightness-0 invert" : ""
                      }`}
                    title={skill.name}
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, -10, 10, 0],
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {React.createElement(skill.logo, {
                      className: "w-full h-full",
                      theme: skill.name === "Cursor" ? theme : undefined,
                    })}
                  </motion.div>
                  <motion.span
                    className="text-xs text-muted group-hover:text-foreground transition-colors"
                    whileHover={{ color: "var(--foreground)" }}
                  >
                    {skill.name}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tools & Software */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-muted mb-2">Tools & Software</h3>
            <div className="grid grid-cols-2 gap-3">
              {SKILLS.filter((skill) =>
                ["Design Tool", "Editor", "DevOps", "Version Control", "API Testing"].includes(skill.category),
              ).map((skill, index) => (
                <motion.div
                  key={index}
                  className="flex w-fit items-center gap-2 group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.div
                    className={`w-5 h-5 transition-transform group-hover:scale-110 ${skill.name === "GitHub" && theme === "dark" ? "brightness-0 invert" : ""
                      }`}
                    title={skill.name}
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, -10, 10, 0],
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {React.createElement(skill.logo, {
                      className: "w-full h-full",
                      theme: skill.name === "Cursor" ? theme : undefined,
                    })}
                  </motion.div>
                  <motion.span
                    className="text-xs text-muted group-hover:text-foreground transition-colors"
                    whileHover={{ color: "var(--foreground)" }}
                  >
                    {skill.name}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Databases */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-muted mb-2">Databases</h3>
            <div className="grid grid-cols-2 gap-3">
              {SKILLS.filter((skill) => skill.category === "Database").map((skill, index) => (
                <motion.div
                  key={index}
                  className="flex w-fit items-center gap-2 group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.div
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                    title={skill.name}
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, -10, 10, 0],
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {React.createElement(skill.logo, {
                      className: "w-full h-full",
                      theme: skill.name === "Cursor" ? theme : undefined,
                    })}
                  </motion.div>
                  <motion.span
                    className="text-xs text-muted group-hover:text-foreground transition-colors"
                    whileHover={{ color: "var(--foreground)" }}
                  >
                    {skill.name}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section
          className="mt-16"
        >
          <h2 className="-mx-6 px-5 p-1 border-y border-border/50 text-lg font-semibold text-foreground">Projects</h2>

          {/* Bento grid */}
          <div className="mt-6 gap-4">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={index}
                className="mt-6 rounded-xl border border-border/60 bg-background/50 p-4 flex flex-col gap-3"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-md text-foreground font-semibold leading-6">{project.title}</h3>
                  <div className="flex items-center gap-2 shrink-0">
                    <motion.a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-2 py-1 rounded-md bg-background/50 border border-border/50 hover:border-violet-500/50 transition-all duration-70 cursor-pointer"
                      whileHover={{ scale: 1.05, y: -1, rotate: -1 }}
                      whileTap={{ scale: 0.96, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 450, damping: 14 }}
                    >
                      <motion.span className="text-foreground" whileHover={{ color: "#8b5cf6" }} transition={{ duration: 0.2 }}>
                        Repo ↗
                      </motion.span>
                    </motion.a>
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-2 py-1 rounded-md bg-background/50 border border-border/50 hover:border-green-500/50 transition-all duration-70 cursor-pointer"
                      whileHover={{ scale: 1.05, y: -1, rotate: 1 }}
                      whileTap={{ scale: 0.96, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 450, damping: 14 }}
                    >
                      <motion.span className="text-foreground" whileHover={{ color: "#22c55e" }} transition={{ duration: 0.2 }}>
                        Live ↗
                      </motion.span>
                    </motion.a>
                  </div>
                </div>

                <p className="text-xs text-muted">{project.desc}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.tech.split(',').map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className="inline-flex items-center px-2 py-1 rounded-md bg-transparent text-xs text-foreground border border-border/80 hover:bg-muted/20 hover:text-foreground transition-colors cursor-default"
                      whileHover={{ scale: 1.05, y: -1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      {tech.trim()}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Socials */}
        <motion.section
          className="mt-16"
        >
          <h2 className="-mx-6 px-5 p-1 border-y border-border/50 text-lg font-semibold text-foreground">Socials</h2>
          <div className="mt-4 space-y-3">
            {SOCIALS.map((social, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-border pb-3 last:border-b-0 last:pb-0"
              >
                <h3 className="text-sm text-foreground font-semibold">{social.name}</h3>
                <motion.a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-md bg-background/50 border border-border/50 hover:border-blue-500/50 transition-all duration-70 cursor-pointer"
                  whileHover={{
                    scale: 1.12,
                    y: -2,
                    rotate: 1,
                    boxShadow: "0 6px 20px -3px rgba(59, 130, 246, 0.15), 0 3px 8px -2px rgba(59, 130, 246, 0.1)"
                  }}
                  whileTap={{
                    scale: 0.92,
                    rotate: 0,
                    boxShadow: "0 2px 6px -2px rgba(59, 130, 246, 0.1)"
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 12,
                    rotate: { duration: 0.25, ease: "easeOut" }
                  }}
                >
                  <motion.span
                    className="text-foreground"
                    whileHover={{ color: "#3b82f6" }}
                    transition={{ duration: 0.2 }}
                  >
                    Follow ↗
                  </motion.span>
                </motion.a>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <motion.div
          className="mt-16 flex items-center justify-between text-xs text-muted"
        >
          <span>© {new Date().getFullYear()} Surya Naveen</span>
          <span className="font-mono">Local Time: {currentTime}</span>
        </motion.div>
      </motion.div>
    </div>



  )
}

export default App
