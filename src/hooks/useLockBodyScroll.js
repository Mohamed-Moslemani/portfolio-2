import { useEffect } from 'react'

/* ---------------------------------------------------------------
   useLockBodyScroll: freeze the page behind an open menu or
   lightbox, compensating for the scrollbar so nothing shifts.
   --------------------------------------------------------------- */

export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined

    const { body, documentElement } = document
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const scrollbar = window.innerWidth - documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
    }
  }, [locked])
}

export default useLockBodyScroll
