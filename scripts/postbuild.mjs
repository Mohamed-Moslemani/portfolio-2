/* ---------------------------------------------------------------
   postbuild.mjs

   Runs after `vite build`:

     1. writes dist/sitemap.xml from the real route list, so it can
        never drift from the data
     2. pre-renders every route to static HTML, so the file a crawler
        downloads already contains the page's text instead of an
        empty <div id="root">

   Pre-rendering matters more than it looks. Google will execute the
   JavaScript eventually, but only on a second pass that a brand new
   site waits at the back of the queue for; LinkedIn and several
   other crawlers never run it at all.
   --------------------------------------------------------------- */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { createElement } from 'react'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function readEnv(key) {
  const line = readFileSync(join(root, '.env'), 'utf8')
    .split('\n')
    .find((l) => l.startsWith(`${key}=`))
  if (!line) throw new Error(`${key} is not set in .env`)
  return line.slice(key.length + 1).trim()
}
const dist = join(root, 'dist')
/* Same value Vite injected into index.html, read from .env so there is
   exactly one place to change the domain. */
const SITE = (process.env.VITE_SITE_URL || readEnv('VITE_SITE_URL')).replace(/\/$/, '')

/* ---- 1. sitemap ------------------------------------------------- */

const { artworks } = await import('../src/data/artwork.js')

const routes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/art', priority: '0.8', changefreq: 'monthly' },
  ...artworks.map((a) => ({
    path: `/art/${a.slug}`,
    priority: '0.5',
    changefreq: 'yearly',
  })),
]

const today = new Date().toISOString().slice(0, 10)

writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`,
)
console.log(`sitemap.xml: ${routes.length} routes`)

writeFileSync(
  join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`,
)
console.log('robots.txt written')

/* ---- 2. pre-render ---------------------------------------------- */

const { default: App } = await import('../dist-ssr/entry-server.js')

const template = readFileSync(join(dist, 'index.html'), 'utf8')
let rendered = 0

for (const { path } of routes) {
  const html = renderToString(
    createElement(StaticRouter, { location: path }, createElement(App)),
  )

  const page = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`)

  const out = path === '/' ? join(dist, 'index.html') : join(dist, path)
  if (path !== '/') mkdirSync(out, { recursive: true })

  writeFileSync(path === '/' ? out : join(out, 'index.html'), page)
  rendered += 1
}

console.log(`pre-rendered ${rendered} routes`)
