# Jana Jaffal / portfolio

Personal portfolio and art site. React + Vite, plain CSS, React Router. No UI
framework, no CSS framework, three runtime dependencies.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # client bundle, SSR bundle, then sitemap + pre-render
npm run preview  # serve the build
npm run og       # regenerate public/og.png, the social share card
npm run lint
```

`?theme=light` or `?theme=dark` on any URL forces a theme for that page view
without persisting it, useful for screenshots.

---

## Where the content lives

Nothing is hardcoded in a component. To change what the site says, edit a file
in `src/data/`:

| File            | Holds                                                        |
| --------------- | ------------------------------------------------------------ |
| `profile.js`    | name, email, location, links, nav items, hero facts, languages |
| `experience.js` | jobs and volunteering                                          |
| `education.js`  | degree, award, programs                                        |
| `projects.js`   | the five case studies                                          |
| `artwork.js`    | the sketchbook                                                 |
| `skills.js`     | hero stack rail + the grouped toolkit                          |
| `interests.js`  | the interest selector in About                                 |
| `techIcons.js`  | logo / glyph for each toolkit entry                            |
| `scene.js`      | the background illustration and how strongly it shows          |

### Adding real artwork

1. Put the file in `public/art/` (webp preferred).
2. In `src/data/artwork.js`, set `image: '/art/your-file.webp'`, write a real
   `title`, `medium`, `year` and `alt`, and set `isPlaceholder: false`.
3. Set `featured: true` for the pieces that should appear on the homepage
   (the wall is designed around five).
4. `ratio` controls the frame shape: `portrait | tall | square | landscape | wide`.

While `image` is null the card draws a framed placeholder instead of a broken
image, so the layout is real before the art arrives.

### Adding links

Unknown URLs are `null` in `src/data/profile.js` and `src/data/projects.js`.
Every button checks for null and hides itself, so filling one in is all that is
needed to make it appear. Currently missing: GitHub profile, CV PDF, and the
per-project website/repo links.

---

## How it is put together

```
src/
├── components/   reusable UI (Navbar, cards, lightbox, artwork, icons)
├── sections/     the seven homepage sections
├── pages/        routed pages (home, /art, /art/:slug, 404)
├── data/         all content
├── hooks/        theme, active section, scroll reveal, scroll lock, titles
└── styles/       reset → theme → typography → globals → per-section → responsive
```

**Design tokens.** `styles/theme.css` is the only file that declares a colour.
Everything else reads a variable. Because of that, setting `--accent` inside any
scope re-tints everything below it, which is how each numbered section gets its
own hue (`<Section tone="amber">`), and how each artwork frame and toolkit group
gets its own.

**Themes.** Dark is primary. The theme is resolved by an inline script in
`index.html` before first paint (no flash), stored in `localStorage` under
`jj-theme`, and defaults to `prefers-color-scheme` on a first visit.

**Motion.** CSS animations only, driven by `IntersectionObserver` rather than
scroll handlers. Everything nonessential is disabled under
`prefers-reduced-motion`.

**Artwork.** All of it is original. `MangaPanel` (the hero) and
`ArtPlaceholder` are inline SVG drawn from theme tokens, so they recolour with
the theme. The background illustration is a standalone file,
`public/scene/coding.svg`, configured in `src/data/scene.js` and editable in any
vector tool. No stock or licensed imagery ships with the site.

**Toolkit logos.** Brand marks come from Simple Icons (CC0); only the twenty
actually used are vendored into `src/data/techIcons.js`, so there is no runtime
dependency. Anything that is not a brand (SQL, algorithms, linear algebra) gets
a stroke glyph from the same file. `iconFor(name)` falls back to a lettered chip
for anything unmapped, so adding a skill never breaks the layout.

**Routes.** Every route is pre-rendered to a static file at build time, so
`/art` is a real `dist/art/index.html`. Vercel serves those directly; the
catch-all rewrite in `vercel.json` only handles URLs that do not exist, which
the SPA turns into the 404 page.

---

---

## SEO

`npm run build` runs three steps: the client bundle, an SSR bundle, then
`scripts/postbuild.mjs`, which:

- writes `dist/sitemap.xml` from the actual route list, so it cannot drift
- **pre-renders every route** with `renderToString`, replacing the empty
  `<div id="root">` with the real markup

That last one matters. Before it, the shipped HTML contained zero words: every
crawler had to execute JavaScript to see anything, and a new site waits at the
back of that queue. Now the HTML carries ~7.5k characters of text on first
byte, and `main.jsx` hydrates it rather than throwing it away.

Two consequences worth knowing:

- Scroll reveals and the intro loader are gated on an `html.js` class set by the
  boot script. Without it, `.reveal` never gets `.is-visible` and the page would
  render invisible. Anything new that hides itself until JavaScript moves it
  must be gated the same way.
- The art routes are no longer `React.lazy`. They were ~6 kB combined, not worth
  a Suspense fallback flashing over pre-rendered content.

Also in place: `<link rel="canonical">`, Open Graph and Twitter tags pointing at
`public/og.png`, a generated `robots.txt`, and a JSON-LD `Person` block in
`index.html` with `sameAs` pointing at LinkedIn. That block mirrors
`src/data/profile.js` by hand, so change both together.

### The domain lives in one place

`.env` holds `VITE_SITE_URL`, and everything absolute derives from it:

- Vite substitutes `%VITE_SITE_URL%` into `index.html` (canonical, `og:url`,
  `og:image`, `twitter:image`, JSON-LD)
- `scripts/postbuild.mjs` reads it for `sitemap.xml` and writes `robots.txt`
- `scripts/make-og-image.mjs` reads it for the host printed on the share card

Changing domains is one line in `.env`, then `npm run og && npm run build`.
`robots.txt` is generated rather than kept in `public/`, because files in
`public/` are copied verbatim and would not get the substitution.

Regenerate the share card after editing the name, tagline or artwork:

```bash
npm run og
```

## Accessibility notes

Semantic landmarks, a skip link, visible focus rings, keyboard-navigable mobile
menu and lightbox (Escape closes, focus is trapped and restored), the interests
selector is a proper tablist with arrow-key roving focus, and no state is
signalled by colour alone.

## One deliberate omission

Jana's phone number is stored in `src/data/profile.js` but is **not rendered
anywhere**. Flip `phonePublic` to `true` and add the markup only if she asks for
it.
