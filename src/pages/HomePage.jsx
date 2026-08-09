import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import About from '../sections/About'
import Art from '../sections/Art'
import Contact from '../sections/Contact'
import Education from '../sections/Education'
import Experience from '../sections/Experience'
import Home from '../sections/Home'
import Work from '../sections/Work'

/* ---------------------------------------------------------------
   HomePage: the single-page portfolio, plus the hash handoff that
   makes "/#experience" work when arriving from another route.
   --------------------------------------------------------------- */

export default function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)

    // One frame, so the section exists before we try to reach it.
    const raf = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    })

    return () => cancelAnimationFrame(raf)
  }, [hash])

  return (
    <>
      <Home />
      <Experience />
      <Education />
      <Work />
      <Art />
      <About />
      <Contact />
    </>
  )
}
