import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from './Icon'
import Monogram from './Monogram'
import ThemeToggle from './ThemeToggle'
import { navItems, profile } from '../data/profile'
import useActiveSection from '../hooks/useActiveSection'
import useLockBodyScroll from '../hooks/useLockBodyScroll'
import useSectionNav from '../hooks/useSectionNav'

const SECTION_IDS = navItems.map((item) => item.id)
const EASTER_EGG_CLICKS = 5

export default function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const { goToSection, goToTop } = useSectionNav()

  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [strokeKey, setStrokeKey] = useState(0)

  const clickCount = useRef(0)
  const clickTimer = useRef(null)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)

  const activeSection = useActiveSection(SECTION_IDS, { enabled: isHome })
  const currentId = isHome ? activeSection : pathname.startsWith('/art') ? 'art' : null

  useLockBodyScroll(menuOpen)

  /* Navbar gains a background once the hero starts scrolling away. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => () => clearTimeout(clickTimer.current), [])

  /* Escape closes the menu; Tab is trapped inside it while open. */
  useEffect(() => {
    if (!menuOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuOpen(false)
        toggleRef.current?.focus()
        return
      }

      if (event.key !== 'Tab' || !menuRef.current) return

      const focusable = menuRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const firstLink = menuRef.current?.querySelector('a, button')
    firstLink?.focus()

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const handleNavClick = useCallback(
    (id) => {
      setMenuOpen(false)
      goToSection(id)
    },
    [goToSection],
  )

  /* Five clicks on the monogram draws a pencil stroke across the bar. */
  const handleLogoClick = useCallback(
    (event) => {
      event.preventDefault()
      clickCount.current += 1

      clearTimeout(clickTimer.current)
      clickTimer.current = setTimeout(() => {
        clickCount.current = 0
      }, 900)

      if (clickCount.current >= EASTER_EGG_CLICKS) {
        clickCount.current = 0
        setStrokeKey((k) => k + 1)
        return
      }

      goToTop()
    },
    [goToTop],
  )

  return (
    <header className={`navbar${scrolled ? ' is-scrolled' : ''}`}>
      <nav className="navbar__inner" aria-label="Primary">
        <button type="button" className="navbar__logo" onClick={handleLogoClick}>
          <Monogram />
          <span className="visually-hidden">{profile.name}, back to top</span>
        </button>

        <ul className="navbar__links" role="list">
          {navItems.map((item) => (
            <li key={item.id}>
              {item.id === 'art' && !isHome ? (
                <Link
                  to="/art"
                  className={`navbar__link${currentId === 'art' ? ' is-active' : ''}`}
                  aria-current={currentId === 'art' ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  type="button"
                  className={`navbar__link${currentId === item.id ? ' is-active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={currentId === item.id ? 'true' : undefined}
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className="navbar__burger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </nav>

      {strokeKey > 0 && (
        <svg
          key={strokeKey}
          className="navbar__stroke"
          viewBox="0 0 1200 12"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M2 8C160 3 300 10 460 6s280-7 430-2 250 8 308 4" />
        </svg>
      )}

      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' is-open' : ''}`}
        ref={menuRef}
        hidden={!menuOpen}
      >
        <ul className="mobile-menu__list" role="list">
          {navItems.map((item, i) => (
            <li key={item.id} style={{ '--i': i }}>
              <button
                type="button"
                className={`mobile-menu__link${currentId === item.id ? ' is-active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <span className="mobile-menu__index t-mono-sm">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mobile-menu__foot">
          <span className="t-mono-sm">{profile.locationShort}</span>
          <Link to="/art" className="link-arrow" onClick={() => setMenuOpen(false)}>
            Full gallery
            <Icon name="arrowRight" size={14} />
          </Link>
        </div>
      </div>
    </header>
  )
}
