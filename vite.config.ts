import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { PROFILE, WORK, PROJECTS, SKILL_GROUPS, EXPERTISE, LINKS } from './src/data'

// The one place the site's address lives. index.html uses %SITE_URL%; robots.txt and sitemap.xml are generated.
const SITE_URL = 'https://suryanavv.in'
const BUILD_DATE = new Date().toISOString().slice(0, 10)

// A plain-text summary for AI agents and LLM crawlers, built from the same content as the page.
function llmsTxt() {
  const work = WORK.map((j) => `- ${j.role} at ${j.company} (${j.start} – ${j.end ?? 'present'}): ${j.summary}`)
  const projects = PROJECTS.map((p) => `- [${p.title}](${p.live}): ${p.summary}. Source: ${p.repo}`)
  const skills = SKILL_GROUPS.map((g) => `- ${g.area}: ${g.skills.map((k) => k.name).join(', ')}`)
  const links = [`- Email: ${PROFILE.email}`, ...LINKS.map((l) => `- [${l.label}](${l.href})`)]
  return [
    `# ${PROFILE.name}`,
    '',
    `> ${PROFILE.role} in ${PROFILE.place}.${PROFILE.available ? ' Available for work.' : ''}`,
    '',
    ...PROFILE.intro,
    '',
    '## Work',
    ...work,
    '',
    '## Expertise',
    ...EXPERTISE.map((e) => `- ${e.title}`),
    '',
    '## Projects',
    ...projects,
    '',
    '## Skills',
    ...skills,
    '',
    '## Contact',
    ...links,
    '',
  ].join('\n')
}

function site(): Plugin {
  return {
    name: 'site-url',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        html = html.replaceAll('%SITE_URL%', SITE_URL)
        // Inline the (small) stylesheet so it doesn't block the first render with an extra request.
        if (ctx.bundle) {
          html = html.replace(/<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/g, (tag, file) => {
            const asset = ctx.bundle?.[file]
            return asset && asset.type === 'asset' ? `<style>${String(asset.source)}</style>` : tag
          })
        }
        return html
      },
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      })
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llmsTxt() })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${BUILD_DATE}</lastmod>
  </url>
</urlset>
`,
      })
    },
  }
}

export default defineConfig({
  define: {
    // Shown in the footer as "Updated …".
    __BUILD_DATE__: JSON.stringify(BUILD_DATE),
  },
  plugins: [react(), tailwindcss(), site()],
})
