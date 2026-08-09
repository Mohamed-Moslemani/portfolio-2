/* ---------------------------------------------------------------
   Icon: one small inline sprite instead of an icon dependency.
   Every glyph is stroke-based so it inherits currentColor and reads
   as linework rather than as UI furniture.
   --------------------------------------------------------------- */

const paths = {
  arrowRight: <path d="M4 10h12M11 5l5 5-5 5" />,
  arrowLeft: <path d="M16 10H4M9 5l-5 5 5 5" />,
  arrowUpRight: <path d="M6 14 14 6M7 6h7v7" />,
  arrowUp: <path d="M10 16V4M5 9l5-5 5 5" />,
  chevronLeft: <path d="M12.5 4 6.5 10l6 6" />,
  chevronRight: <path d="M7.5 4l6 6-6 6" />,
  close: <path d="M5 5l10 10M15 5L5 15" />,
  menu: <path d="M3 6h14M3 10h14M3 14h14" />,
  sun: (
    <>
      <circle cx="10" cy="10" r="3.6" />
      <path d="M10 1.6v2M10 16.4v2M18.4 10h-2M3.6 10h-2M15.9 4.1l-1.4 1.4M5.5 14.5l-1.4 1.4M15.9 15.9l-1.4-1.4M5.5 5.5 4.1 4.1" />
    </>
  ),
  moon: <path d="M16.2 11.6A6.6 6.6 0 0 1 8.4 3.8a6.6 6.6 0 1 0 7.8 7.8Z" />,
  mail: (
    <>
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" />
      <path d="m3 6 7 4.6L17 6" />
    </>
  ),
  linkedin: (
    <>
      <rect x="2.5" y="2.5" width="15" height="15" rx="2" />
      <path d="M6 8.6V14M6 5.7v.2M9.8 14V8.6M9.8 11c0-1.4.9-2.4 2.2-2.4s2 .9 2 2.4V14" />
    </>
  ),
  github: (
    <path d="M7.6 17c-3 .9-3-1.5-4.2-1.8m8.4 3.1v-2.9c0-.8.1-1.2-.4-1.6 2.2-.3 4.3-1.1 4.3-4.8a3.7 3.7 0 0 0-1-2.6 3.5 3.5 0 0 0-.1-2.6s-.8-.3-2.7 1a9.2 9.2 0 0 0-4.8 0c-1.9-1.3-2.7-1-2.7-1a3.5 3.5 0 0 0-.1 2.6 3.7 3.7 0 0 0-1 2.6c0 3.7 2.1 4.5 4.3 4.8-.4.4-.4.8-.4 1.4v3" />
  ),
  externalLink: (
    <>
      <path d="M11 3h6v6" />
      <path d="M17 3 9 11" />
      <path d="M15 12.5V16a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 3 16V7a1.5 1.5 0 0 1 1.5-1.5H8" />
    </>
  ),
  plus: <path d="M10 4v12M4 10h12" />,
  minus: <path d="M4 10h12" />,
  expand: <path d="M7.5 3H3v4.5M12.5 17H17v-4.5M17 7.5V3h-4.5M3 12.5V17h4.5" />,
  pencil: (
    <>
      <path d="M13.6 3.4a1.9 1.9 0 0 1 2.7 2.7L6.6 15.8 2.9 17l1.2-3.7Z" />
      <path d="m12.2 4.8 2.7 2.7" />
    </>
  ),
  star: <path d="m10 2.8 2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L2.8 8.1l5-.7Z" />,
}

export default function Icon({ name, size = 18, strokeWidth = 1.5, className = '', ...rest }) {
  const glyph = paths[name]
  if (!glyph) return null

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {glyph}
    </svg>
  )
}
