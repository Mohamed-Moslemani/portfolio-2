/* ---------------------------------------------------------------
   ArtPlaceholder: what sits in an artwork frame before the real
   drawing exists.

   It is deliberately *not* a fake artwork: no signature, no title
   pretending to be Jana's. It is a drawn frame, hatching and a few
   construction curves, the marks that would be underneath a drawing
   rather than the drawing itself.
   --------------------------------------------------------------- */

/* Small deterministic PRNG so a given id always draws the same frame. */
const seeded = (seed) => {
  let s = (seed * 9301 + 49297) % 233280
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

const buildStrokes = (seed) => {
  const rand = seeded(seed + 7)
  return Array.from({ length: 3 }, (_, i) => {
    const y = 18 + i * 26 + rand() * 12
    const c1 = 20 + rand() * 30
    const c2 = 55 + rand() * 35
    const drop = 12 + rand() * 30
    return `M-4 ${y.toFixed(1)} C ${c1.toFixed(1)} ${(y - drop).toFixed(1)}, ${c2.toFixed(1)} ${(y + drop).toFixed(1)}, 104 ${(y + rand() * 10 - 5).toFixed(1)}`
  })
}

export default function ArtPlaceholder({ seed = 1, label = 'Artwork pending', compact = false }) {
  const strokes = buildStrokes(seed)
  const hatchId = `hatch-${seed}`

  return (
    <div className="art-ph" aria-hidden="true">
      <svg
        className="art-ph__svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        role="presentation"
      >
        <defs>
          <pattern
            id={hatchId}
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(38)"
          >
            <line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" strokeWidth="0.6" />
          </pattern>
        </defs>

        <rect width="100" height="100" fill={`url(#${hatchId})`} opacity="0.55" />

        <g fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
          {strokes.map((d, i) => (
            <path key={i} d={d} opacity={0.75 - i * 0.16} />
          ))}
        </g>
      </svg>

      {!compact && (
        <span className="art-ph__tag t-mono-sm">
          <span className="art-ph__dot" />
          {label}
        </span>
      )}
    </div>
  )
}
