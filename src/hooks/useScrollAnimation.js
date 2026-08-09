import { useCallback, useEffect, useRef, useState } from 'react'

/* ---------------------------------------------------------------
   useScrollAnimation: reveal-on-scroll without a scroll handler.

   One shared IntersectionObserver serves every revealed element on
   the page; elements unobserve themselves once they have appeared,
   so the cost tends to zero as the user scrolls.
   --------------------------------------------------------------- */

const callbacks = new WeakMap()
let observer = null

const getObserver = () => {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        callbacks.get(entry.target)?.()
        observer.unobserve(entry.target)
        callbacks.delete(entry.target)
      })
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
  )
  return observer
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(() => prefersReducedMotion())
  const nodeRef = useRef(null)

  const ref = useCallback((node) => {
    nodeRef.current = node
  }, [])

  useEffect(() => {
    const node = nodeRef.current
    if (!node || prefersReducedMotion()) {
      setIsVisible(true)
      return undefined
    }

    const io = getObserver()
    callbacks.set(node, () => setIsVisible(true))
    io.observe(node)

    return () => {
      io.unobserve(node)
      callbacks.delete(node)
    }
  }, [])

  return { ref, isVisible }
}

export default useScrollAnimation
