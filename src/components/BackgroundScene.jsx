/* ---------------------------------------------------------------
   BackgroundScene: the ambient layer behind the whole site.

   Three parts, all decorative and all pointer-events:none:

     1. slow drifting colour fields (mint / blush / lilac)
     2. an original line drawing: someone at a desk, laptop open,
        headphones on, mug going cold next to them
     3. a few sparkles and rising steam, for signs of life

   The drawing is hand-authored SVG rather than a photo: stock anime
   art is copyrighted, and line work sits under text far better than
   a photograph does. It is painted in currentColor from theme
   tokens, so it follows the theme.

   Everything here is disabled under prefers-reduced-motion.
   --------------------------------------------------------------- */

const sparkles = [
  { x: 96, y: 96, s: 1.15, d: 0 },
  { x: 470, y: 74, s: 0.8, d: 1.4 },
  { x: 540, y: 190, s: 1, d: 2.6 },
  { x: 62, y: 250, s: 0.7, d: 3.4 },
  { x: 392, y: 132, s: 0.6, d: 4.2 },
]

export default function BackgroundScene() {
  return (
    <div className="scene" aria-hidden="true">
      <span className="scene__field scene__field--a" />
      <span className="scene__field scene__field--b" />
      <span className="scene__field scene__field--c" />

      <svg
        className="scene__art"
        viewBox="0 0 620 520"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <g className="scene__float">
          {/* ---- desk ---- */}
          <path d="M40 402h540" strokeWidth="2.4" />
          <path d="M96 402v92M556 402v92" opacity="0.5" />

          {/* ---- chair back, behind the figure ---- */}
          <path
            d="M150 386V268c0-16 11-26 26-26h22c15 0 26 10 26 26v22"
            opacity="0.45"
          />

          {/* ---- long hair, the big shape ---- */}
          <path
            className="scene__hair"
            d="M286 122c-30-22-72-16-88 12-14 24-10 46-14 74-5 34-16 60-16 96 0 26 10 44 30 52 14 6 30 5 42-2-16-18-22-40-20-66 3-32 14-52 20-84 4-22 14-38 46-46Z"
            fill="currentColor"
            fillOpacity="0.1"
          />
          {/* strands */}
          <path d="M196 214c-6 34-14 56-14 88 0 22 6 38 18 50" opacity="0.5" strokeWidth="1.4" />
          <path d="M214 226c-5 30-12 50-12 78 0 18 4 32 12 44" opacity="0.35" strokeWidth="1.2" />

          {/* ---- head, seen in profile, facing the screen ---- */}
          <path d="M286 122c20 6 32 22 32 42 0 10-2 18-2 26 0 6 5 8 5 13s-6 6-6 6c0 8 1 16-4 20-6 5-16 4-24 1" />
          {/* jaw + neck */}
          <path d="M287 230c0 12 0 18-2 24l-10 12" />
          {/* bangs */}
          <path d="M300 128c-14 6-24 16-28 30" opacity="0.65" strokeWidth="1.5" />
          <path d="M312 138c-10 6-16 14-18 24" opacity="0.45" strokeWidth="1.3" />

          {/* ---- headphones ---- */}
          <path d="M243 158a48 46 0 0 1 84 6" strokeWidth="2.6" />
          <rect x="232" y="160" width="22" height="34" rx="10" strokeWidth="2.4" />

          {/* ---- torso and arm reaching to the keyboard ---- */}
          <path d="M275 266c-18 6-30 22-32 42l-6 94" />
          <path d="M287 272c22 6 34 20 38 40 3 14 2 24 2 34" opacity="0.8" />
          <path d="M325 318c14 12 30 24 46 32 8 4 16 6 24 6" />

          {/* ---- laptop ---- */}
          <path d="M396 356h96l-8-78h-72Z" strokeWidth="2.2" />
          <path
            className="scene__screen"
            d="M400 350h86l-7-66h-64Z"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="none"
          />
          <path d="M386 356h120l6 14H380Z" strokeWidth="2.2" />

          {/* ---- mug, with steam ---- */}
          <path d="M534 370v-26h30v26z" />
          <path d="M564 350h8a7 7 0 0 1 0 14h-8" strokeWidth="1.6" />
          <g className="scene__steam" strokeWidth="1.4" opacity="0.7">
            <path d="M542 332c-5-7 5-11 0-18" style={{ '--s': 0 }} />
            <path d="M552 330c-5-8 5-12 0-19" style={{ '--s': 1 }} />
            <path d="M562 334c-4-6 4-10 0-16" style={{ '--s': 2 }} />
          </g>

          {/* ---- sketchbook on the desk ---- */}
          <path d="M228 372h100l6 12H222Z" opacity="0.6" strokeWidth="1.6" />
          <path d="M252 378h48" opacity="0.4" strokeWidth="1.2" />

          {/* ---- plant ---- */}
          <path d="M60 402v-24h34v24z" opacity="0.7" strokeWidth="1.6" />
          <path
            d="M77 378c0-16-8-26-18-30 10-2 18 4 18 14 0-12 8-20 18-20-6 6-8 14-8 22"
            opacity="0.6"
            strokeWidth="1.5"
          />
        </g>

        {/* ---- sparkles ---- */}
        <g className="scene__sparkles" fill="currentColor" stroke="none">
          {sparkles.map((sp) => (
            <path
              key={`${sp.x}-${sp.y}`}
              d="M0-9C1.4-3 3-1.4 9 0 3 1.4 1.4 3 0 9-1.4 3-3 1.4-9 0-3-1.4-1.4-3 0-9Z"
              transform={`translate(${sp.x} ${sp.y}) scale(${sp.s})`}
              style={{ '--d': `${sp.d}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
