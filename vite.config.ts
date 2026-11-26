import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The one place the site's address lives. index.html uses %SITE_URL%; robots.txt and sitemap.xml are generated.
const SITE_URL = 'https://suryanavv.in'
const BUILD_DATE = new Date().toISOString().slice(0, 10)

function site(): Plugin {
  return {
    name: 'site-url',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', SITE_URL),
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      })
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
