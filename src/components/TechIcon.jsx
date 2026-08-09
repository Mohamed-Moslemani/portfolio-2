import { brands, glyphs, iconFor } from '../data/techIcons'

/* ---------------------------------------------------------------
   TechIcon: the mark next to a skill.

   Three cases, in order of preference:
     brand   a vendored Simple Icons path, filled
     glyph   a stroke glyph in the site's own icon language
     letter  a lettered fallback, so an unmapped skill still lines up

   Always decorative: the skill name is right there in text.
   --------------------------------------------------------------- */

export default function TechIcon({ name, size = 14 }) {
  const { kind, value } = iconFor(name)

  if (kind === 'brand') {
    const brand = brands[value]
    if (brand) {
      return (
        <svg
          className="tech-icon"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path d={brand.path} />
        </svg>
      )
    }
  }

  if (kind === 'glyph' && glyphs[value]) {
    return (
      <svg
        className="tech-icon"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d={glyphs[value]} />
      </svg>
    )
  }

  return (
    <span className="tech-icon tech-icon--letter" aria-hidden="true">
      {value}
    </span>
  )
}
