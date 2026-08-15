/* ---------------------------------------------------------------
   make-og-image.mjs

   Builds public/og.png, the 1200x630 card that WhatsApp, LinkedIn,
   Slack and X render when the site is shared. Run it again after
   changing the name, tagline or background art:

     node scripts/make-og-image.mjs

   It is a build artefact, not something to hand-edit.
   --------------------------------------------------------------- */

import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/* The host printed on the card comes from .env too, so it follows the
   domain rather than being retyped. */
const host = (readFileSync(join(root, '.env'), 'utf8')
  .split('\n')
  .find((l) => l.startsWith('VITE_SITE_URL='))
  ?.split('=')[1] ?? '')
  .trim()
  .replace(/^https?:\/\//, '')
  .replace(/\/$/, '')

/* The vector illustration is inlined rather than linked: resvg renders
   SVG natively but will not decode a WebP, and inlining keeps this
   script dependent on nothing but the repo. */
const artFile = readFileSync(join(root, 'public/scene/coding.svg'), 'utf8')
const art = artFile.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fff" stop-opacity="0"/>
      <stop offset="38%" stop-color="#fff" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0.6"/>
    </linearGradient>
    <mask id="artMask"><rect x="520" y="0" width="680" height="630" fill="url(#fade)"/></mask>
    <radialGradient id="glow" cx="0.2" cy="0.1" r="0.8">
      <stop offset="0%" stop-color="#62D989" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#62D989" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#070A08"/>
  <g mask="url(#artMask)" transform="translate(556 128) scale(0.46)">${art}</g>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <g transform="translate(84 168)">
    <rect x="0" y="-44" width="62" height="52" rx="12" fill="#101611" stroke="#ffffff" stroke-opacity="0.14"/>
    <text x="14" y="-8" font-family="Noto Sans, sans-serif" font-size="26" font-weight="700" fill="#ECF2ED">J<tspan fill="#62D989">J</tspan></text>

    <text x="0" y="128" font-family="Noto Sans, sans-serif" font-size="92" font-weight="700"
          fill="#ECF2ED" letter-spacing="-3">Jana Jaffal</text>
    <text x="0" y="188" font-family="Noto Sans, sans-serif" font-size="40" font-weight="400"
          fill="#62D989">Software, Data &amp; Art</text>
    <text x="0" y="256" font-family="Noto Sans, sans-serif" font-size="25" font-weight="400"
          fill="#A2ADA5">Computer science graduate in Beirut working across</text>
    <text x="0" y="292" font-family="Noto Sans, sans-serif" font-size="25" font-weight="400"
          fill="#A2ADA5">data, AI and software. And an artist, always.</text>

    <rect x="0" y="330" width="52" height="3" fill="#62D989"/>
    <text x="0" y="384" font-family="Noto Sans, sans-serif" font-size="22" font-weight="500"
          fill="#657067" letter-spacing="2">${host}</text>
  </g>
</svg>`

const png = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: { loadSystemFonts: true },
}).render().asPng()

writeFileSync(join(root, 'public/og.png'), png)
console.log(`public/og.png written, ${(png.length / 1024).toFixed(0)} kB`)
