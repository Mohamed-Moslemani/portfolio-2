/* ---------------------------------------------------------------
   MangaPanel: the hero illustration.

   Original artwork, drawn in SVG: a manga page broken into panels,
   with the vocabulary the medium actually uses, converging speed
   lines, screentone halftone, sakura drift, brush strokes. No
   character art is copied from anything; the anime reference is in
   the language, not in the picture.

   Everything is painted from theme tokens, so it recolours with the
   theme and with whatever tone its section carries.
   --------------------------------------------------------------- */

/* Speed lines converging on a focal point, thinning as they go. */
const speedLines = Array.from({ length: 34 }, (_, i) => {
  const angle = (i / 34) * Math.PI * 2
  const fx = 268
  const fy = 96
  const inner = 26 + ((i * 7) % 13)
  const outer = 300
  return {
    key: i,
    x1: fx + Math.cos(angle) * inner,
    y1: fy + Math.sin(angle) * inner,
    x2: fx + Math.cos(angle) * outer,
    y2: fy + Math.sin(angle) * outer,
    w: i % 3 === 0 ? 2.2 : i % 2 === 0 ? 1.3 : 0.7,
  }
})

/* Petals drifting through the bottom panel. */
const petals = [
  { x: 32, y: 372, r: -18, s: 1 },
  { x: 96, y: 402, r: 24, s: 0.75 },
  { x: 158, y: 358, r: 8, s: 0.9 },
  { x: 214, y: 412, r: -32, s: 1.1 },
  { x: 268, y: 366, r: 44, s: 0.8 },
  { x: 330, y: 398, r: -12, s: 1 },
  { x: 368, y: 356, r: 30, s: 0.7 },
]

export default function MangaPanel() {
  return (
    <svg
      className="manga"
      viewBox="0 0 400 460"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* screentone */}
        <pattern id="mp-tone" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="var(--accent)" />
        </pattern>
        <pattern id="mp-tone-fine" width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="1.6" cy="1.6" r="0.9" fill="var(--accent-2)" />
        </pattern>

        {/* density falloff for the tone */}
        <linearGradient id="mp-fade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.05" />
        </linearGradient>
        <mask id="mp-fade-mask">
          <rect x="0" y="214" width="188" height="118" fill="url(#mp-fade)" />
        </mask>
        <linearGradient id="mp-fade-2" x1="1" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.05" />
        </linearGradient>
        <mask id="mp-fade-mask-2">
          <rect x="0" y="340" width="400" height="120" fill="url(#mp-fade-2)" />
        </mask>

        {/* panel clips */}
        <clipPath id="mp-clip-a">
          <rect x="0" y="0" width="400" height="204" rx="5" />
        </clipPath>
        <clipPath id="mp-clip-b">
          <rect x="0" y="214" width="188" height="118" rx="5" />
        </clipPath>
        <clipPath id="mp-clip-c">
          <rect x="198" y="214" width="202" height="118" rx="5" />
        </clipPath>
        <clipPath id="mp-clip-d">
          <rect x="0" y="342" width="400" height="118" rx="5" />
        </clipPath>
      </defs>

      {/* ---- panel A : the impact frame ---- */}
      <g clipPath="url(#mp-clip-a)">
        <rect x="0" y="0" width="400" height="204" fill="var(--bg-inset)" />
        <g stroke="var(--accent)" opacity="0.55">
          {speedLines.map((line) => (
            <line
              key={line.key}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              strokeWidth={line.w}
              strokeLinecap="round"
            />
          ))}
        </g>
        {/* the disc the lines converge on */}
        <circle cx="268" cy="96" r="27" fill="var(--bg-page)" />
        <circle
          cx="268"
          cy="96"
          r="27"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.6"
        />
        <circle cx="268" cy="96" r="17" fill="var(--accent)" opacity="0.16" />
        {/* a horizon, for depth */}
        <path
          d="M0 168h150M176 168h60"
          stroke="var(--line-strong)"
          strokeWidth="1"
          fill="none"
        />
      </g>
      <rect
        x="0.5"
        y="0.5"
        width="399"
        height="203"
        rx="5"
        fill="none"
        stroke="var(--line-strong)"
      />

      {/* ---- panel B : screentone ---- */}
      <g clipPath="url(#mp-clip-b)">
        <rect x="0" y="214" width="188" height="118" fill="var(--bg-inset)" />
        <g mask="url(#mp-fade-mask)">
          <rect x="0" y="214" width="188" height="118" fill="url(#mp-tone)" opacity="0.75" />
        </g>
      </g>
      <rect
        x="0.5"
        y="214.5"
        width="187"
        height="117"
        rx="5"
        fill="none"
        stroke="var(--line-strong)"
      />

      {/* ---- panel C : brush strokes ---- */}
      <g clipPath="url(#mp-clip-c)">
        <rect x="198" y="214" width="202" height="118" fill="var(--bg-inset)" />
        <g fill="none" strokeLinecap="round">
          <path
            d="M210 300c26-44 52 14 78-26s52-30 100-42"
            stroke="var(--accent)"
            strokeWidth="2.4"
            opacity="0.9"
          />
          <path
            d="M206 316c30-24 60 8 92-18s58-16 96-24"
            stroke="var(--accent-2)"
            strokeWidth="1.6"
            opacity="0.8"
          />
          <path
            d="M212 264c24-10 44 12 70 2s60-24 106-18"
            stroke="var(--fg-muted)"
            strokeWidth="1"
            opacity="0.6"
          />
        </g>
      </g>
      <rect
        x="198.5"
        y="214.5"
        width="201"
        height="117"
        rx="5"
        fill="none"
        stroke="var(--line-strong)"
      />

      {/* ---- panel D : petal drift ---- */}
      <g clipPath="url(#mp-clip-d)">
        <rect x="0" y="342" width="400" height="118" fill="var(--bg-inset)" />
        <g mask="url(#mp-fade-mask-2)">
          <rect x="0" y="342" width="400" height="118" fill="url(#mp-tone-fine)" opacity="0.5" />
        </g>
        <g className="manga__petals" fill="var(--accent-2)">
          {/* The <g> holds the placement; CSS only ever animates the
              inner path, so the drift cannot clobber the layout. */}
          {petals.map((p, i) => (
            <g key={p.x} transform={`translate(${p.x} ${p.y}) rotate(${p.r}) scale(${p.s})`}>
              <path
                d="M0 0c5 -3 11 -1 12 5c1 6 -5 11 -12 11c3 -5 3 -11 0 -16Z"
                opacity={0.55 + (i % 3) * 0.15}
                style={{ '--p': i }}
              />
            </g>
          ))}
        </g>
        <path
          d="M0 430c60-12 120 10 180-4s140-18 220-6"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.2"
          opacity="0.5"
        />
      </g>
      <rect
        x="0.5"
        y="342.5"
        width="399"
        height="117"
        rx="5"
        fill="none"
        stroke="var(--line-strong)"
      />
    </svg>
  )
}
