import { useEffect, useState } from 'react'

/* ---------------------------------------------------------------
   useActiveSection: which numbered section is currently in view.

   IntersectionObserver only; no scroll listener. A band across the
   upper-middle of the viewport acts as the "reading line": whichever
   section occupies it wins. The last section wins outright once the
   page is scrolled to the bottom, which it otherwise never would be
   tall enough to do.
   --------------------------------------------------------------- */

export function useActiveSection(ids, { enabled = true } = {}) {
  const [activeId, setActiveId] = useState(null)
  const key = ids.join('|')

  useEffect(() => {
    if (!enabled) {
      setActiveId(null)
      return undefined
    }

    const sectionIds = key.split('|').filter(Boolean)
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node) => node !== null)

    if (nodes.length === 0) return undefined

    const visible = new Map()

    const resolve = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2

      if (atBottom) {
        setActiveId(sectionIds[sectionIds.length - 1])
        return
      }

      const inView = nodes.filter((node) => visible.get(node.id))
      setActiveId(inView.length > 0 ? inView[0].id : null)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting))
        resolve()
      },
      {
        // The band sits just under the navbar and covers the top half.
        rootMargin: '-72px 0px -52% 0px',
        threshold: 0,
      },
    )

    nodes.forEach((node) => observer.observe(node))
    window.addEventListener('scroll', resolve, { passive: true })
    resolve()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', resolve)
    }
  }, [key, enabled])

  return activeId
}

export default useActiveSection
