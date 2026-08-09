import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/* ---------------------------------------------------------------
   useSectionNav: one function that behaves correctly whether the
   target section is on the current page or not.

   On '/'      → smooth-scroll and update the hash without a history
                 entry per click.
   Elsewhere   → navigate to '/#id'; Home reads the hash on mount and
                 jumps to the right place.
   --------------------------------------------------------------- */

export function useSectionNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const goToSection = useCallback(
    (id) => {
      if (pathname !== '/') {
        navigate(`/#${id}`)
        return
      }

      const target = document.getElementById(id)
      if (!target) {
        navigate(`/#${id}`)
        return
      }

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
      window.history.replaceState(null, '', `#${id}`)
    },
    [navigate, pathname],
  )

  const goToTop = useCallback(() => {
    if (pathname !== '/') {
      navigate('/')
      return
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
    window.history.replaceState(null, '', window.location.pathname)
  }, [navigate, pathname])

  return { goToSection, goToTop, isHome: pathname === '/' }
}

export default useSectionNav
