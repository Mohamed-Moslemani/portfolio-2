import { useEffect, useState } from 'react'

/* ---------------------------------------------------------------
   LoadingAnimation: a single pencil stroke under the monogram, then
   out of the way. Skipped entirely under reduced-motion, and never
   shown for longer than it takes the fonts to settle.
   --------------------------------------------------------------- */

export default function LoadingAnimation({ onDone }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hold = reduced ? 0 : 760

    const leaveTimer = setTimeout(() => setLeaving(true), hold)
    const doneTimer = setTimeout(() => onDone?.(), hold + (reduced ? 0 : 420))

    return () => {
      clearTimeout(leaveTimer)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  return (
    <div className={`loader${leaving ? ' is-leaving' : ''}`} role="status" aria-live="polite">
      <span className="visually-hidden">Loading</span>
      <div className="loader__mark" aria-hidden="true">
        <span className="loader__j">J</span>
        <span className="loader__slash">/</span>
      </div>
      <svg className="loader__stroke" viewBox="0 0 200 8" preserveAspectRatio="none" aria-hidden="true">
        <path d="M2 5C40 2 70 7 110 4s60-3 88 1" />
      </svg>
    </div>
  )
}
