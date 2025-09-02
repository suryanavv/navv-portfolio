import DynamicText from './components/Greeting'
import './App.css'
import { useState, useEffect } from 'react'

export const SKILLS = [
  // Programming Languages
  {
    name: 'JavaScript',
    category: 'Language',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg'
  },
  {
    name: 'HTML',
    category: 'Language',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg'
  },
  {
    name: 'CSS',
    category: 'Language',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg'
  },
  {
    name: 'Python',
    category: 'Language',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg'
  },
  {
    name: 'SQL',
    category: 'Language',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg'
  },

  // Frameworks & Libraries
  {
    name: 'React',
    category: 'Framework',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg'
  },
  {
    name: 'Next.js',
    category: 'Framework',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg'
  },
  {
    name: 'Tailwind CSS',
    category: 'Framework',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg'
  },

  // Tools & Software
  {
    name: 'Figma',
    category: 'Design Tool',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg'
  },
  {
    name: 'Canva',
    category: 'Design Tool',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg'
  },
  {
    name: 'VS Code',
    category: 'Editor',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg'
  },
  {
    name: 'Cursor',
    category: 'Editor',
    logo: 'https://cursor.com/assets/images/logo.svg'
  },
  {
    name: 'Docker',
    category: 'DevOps',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-plain.svg'
  },
  {
    name: 'Git',
    category: 'Version Control',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg'
  },
  {
    name: 'GitHub',
    category: 'Version Control',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg'
  },
  {
    name: 'Postman',
    category: 'API Testing',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg'
  },

  // Databases
  {
    name: 'MongoDB',
    category: 'Database',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg'
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg'
  }
]

export const PROJECTS = [
  {
    title: 'Portfolio Website',
    desc: 'A portfolio with subtle animation visual appealing interface',
    tech: 'Next.js, Tailwind CSS',
    link: 'https://portfolio-demo.vercel.app',
  },
  {
    title: 'Task Manager App',
    desc: 'Minimal todo tracker with real-time sync',
    tech: 'React, Firebase',
    link: 'https://taskmanager-app.vercel.app',
  },
  {
    title: 'Landing Page',
    desc: 'SaaS landing page with modern design',
    tech: 'HTML, Alpine.js',
    link: 'https://saas-landing-demo.netlify.app',
  },
]

export const SOCIALS = [
  {
    name: 'Instagram',
    link: 'https://instagram.com/surya_naveen'
  },
  {
    name: 'Twitter',
    link: 'https://twitter.com/surya_naveen'
  },
  {
    name: 'GitHub',
    link: 'https://github.com/surya-naveen'
  },
  {
    name: 'LinkedIn',
    link: 'https://linkedin.com/in/surya-naveen'
  }
]

function App() {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}:${seconds}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='dark flex flex-col items-center bg-background'>
      <div className='min-h-screen w-full max-w-3xl border-x px-5 pt-40 pb-6'>

        <DynamicText />

        {/* Intro */}
        <section className="pt-6 w-full text-2xl md:text-3xl text-muted">
          <p>
            I'm <span className="text-primary">Surya Naveen</span>, <br className='block md:hidden' />
            living in Andhra Pradesh, India.
            <br />
            I design and build minimal, accessible web interfaces.
          </p>
        </section>

        {/* Availability + Contact */}
        <section className="mt-5 flex flex-col items-start gap-3">
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
        </section>

        {/* Skills */}
        <section className="mt-10">
          <h2 className="text-md text-foreground">Skills</h2>

          {/* Programming Languages */}
          <div className="mt-4">
            <h3 className="text-xs text-muted mb-2">Languages</h3>
            <div className="flex flex-wrap items-center gap-4">
              {SKILLS.filter(skill => skill.category === 'Language').map((skill, index) => (
                <div key={index} className="flex items-center gap-2 group">
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    className="w-6 h-6 transition-transform group-hover:scale-110"
                    title={skill.name}
                  />
                  <span className="text-xs text-muted group-hover:text-foreground transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Frameworks & Libraries */}
          <div className="mt-6">
            <h3 className="text-xs text-muted mb-2">Frameworks & Libraries</h3>
            <div className="flex flex-wrap items-center gap-4">
              {SKILLS.filter(skill => skill.category === 'Framework').map((skill, index) => (
                <div key={index} className="flex items-center gap-2 group">
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    className="w-6 h-6 transition-transform group-hover:scale-110"
                    title={skill.name}
                  />
                  <span className="text-xs text-muted group-hover:text-foreground transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Software */}
          <div className="mt-6">
            <h3 className="text-xs text-muted mb-2">Tools & Software</h3>
            <div className="grid grid-cols-2 gap-3">
              {SKILLS.filter(skill => ['Design Tool', 'Editor', 'DevOps', 'Version Control', 'API Testing'].includes(skill.category)).map((skill, index) => (
                <div key={index} className="flex items-center gap-2 group">
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    className={`w-5 h-5 transition-transform group-hover:scale-110 ${skill.name === 'GitHub' ? 'brightness-0 invert' : ''
                      }`}
                    title={skill.name}
                  />
                  <span className="text-xs text-muted group-hover:text-foreground transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Databases */}
          <div className="mt-6">
            <h3 className="text-xs text-muted mb-2">Databases</h3>
            <div className="flex flex-wrap items-center gap-4">
              {SKILLS.filter(skill => skill.category === 'Database').map((skill, index) => (
                <div key={index} className="flex items-center gap-2 group">
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    className="w-6 h-6 transition-transform group-hover:scale-110"
                    title={skill.name}
                  />
                  <span className="text-xs text-muted group-hover:text-foreground transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Projects */}
        <section className="mt-10">
          <h2 className="text-md text-foreground">Projects</h2>
          <div className="mt-4 space-y-3">
            {PROJECTS.map((project, index) => (
              <div key={index} className="border-b border-border pb-3 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-foreground font-medium">{project.title}</h3>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-foreground hover:text-foreground/80 transition-colors"
                  >
                    Live ↗
                  </a>
                </div>
                <p className="text-xs text-muted mt-1">{project.desc}</p>
                <p className="text-xs text-muted mt-1">Tech: {project.tech}</p>
              </div>
            ))}
          </div>
        </section>



        {/* Where to find me */}
        {/* <section className="mt-10">
          <h2 className="text-sm text-foreground">Where</h2>
          <div className="mt-3 divide-y divide-border rounded-lg border text-sm">
            <a className="flex items-center justify-between px-3 py-2 hover:bg-secondary/20" href="#">
              <span className="text-muted">Instagram</span>
              <span className="text-xs text-foreground">Follow</span>
            </a>
            <a className="flex items-center justify-between px-3 py-2 hover:bg-secondary/20" href="#">
              <span className="text-muted">Twitter</span>
              <span className="text-xs text-foreground">Follow</span>
            </a>
          </div>
        </section> */}

        {/* Socials */}
        <section className="mt-10">
          <h2 className="text-md text-foreground">Socials</h2>
          <div className="mt-4 space-y-3">
            {SOCIALS.map((social, index) => (
              <div key={index} className="flex items-center justify-between border-b border-border pb-3 last:border-b-0 last:pb-0">
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
        </section>


        {/* Footer */}
        <div className="mt-12 flex items-center justify-between text-xs text-muted">
          <span>© {new Date().getFullYear()} Surya Naveen</span>
          <span className="font-mono">Local Time: {currentTime}</span>
        </div>
      </div>
    </div>
  )
}

export default App
