import { useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ArtPlaceholder from './ArtPlaceholder'
import Icon from './Icon'
import LazyImage from './LazyImage'
import useLockBodyScroll from '../hooks/useLockBodyScroll'

/* ---------------------------------------------------------------
   ArtLightbox: a quick look without leaving the page.
   Escape closes, arrow keys move, focus is trapped, and the trigger
   gets focus back on close.
   --------------------------------------------------------------- */

export default function ArtLightbox({ artwork, onClose, onPrev, onNext }) {
  const dialogRef = useRef(null)
  const restoreFocusTo = useRef(null)

  useLockBodyScroll(Boolean(artwork))

  const handleClose = useCallback(() => {
    onClose()
    restoreFocusTo.current?.focus?.()
  }, [onClose])

  useEffect(() => {
    if (!artwork) return undefined
    restoreFocusTo.current = document.activeElement

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        handleClose()
        return
      }
      if (event.key === 'ArrowLeft') onPrev?.()
      if (event.key === 'ArrowRight') onNext?.()

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled])',
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
    }

    document.addEventListener('keydown', onKeyDown)
    dialogRef.current?.querySelector('button')?.focus()

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [artwork, handleClose, onNext, onPrev])

  if (!artwork) return null

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${artwork.title}, ${artwork.year}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) handleClose()
      }}
    >
      <div className="lightbox__inner" ref={dialogRef}>
        <div className="lightbox__bar">
          <span className="t-mono-sm">
            {artwork.year} · {artwork.medium}
            {artwork.isPlaceholder ? ' · placeholder' : ''}
          </span>
          <button type="button" className="lightbox__close" onClick={handleClose} aria-label="Close">
            <Icon name="close" size={18} />
          </button>
        </div>

        <figure className="lightbox__figure">
          <div className="lightbox__stage" data-ratio={artwork.ratio}>
            <LazyImage
              src={artwork.image}
              alt={artwork.alt || `${artwork.title} by Jana Jaffal`}
              eager
              className="lightbox__img"
              fallback={<ArtPlaceholder seed={artwork.id} label="Artwork pending" />}
            />
          </div>
          <figcaption className="lightbox__caption">
            <h2 className="t-h3">{artwork.title}</h2>
            {artwork.description && <p className="t-body">{artwork.description}</p>}
          </figcaption>
        </figure>

        <div className="lightbox__nav">
          <button type="button" className="btn btn--quiet" onClick={onPrev} aria-label="Previous artwork">
            <Icon name="chevronLeft" size={16} />
            Prev
          </button>
          <Link to={`/art/${artwork.slug}`} className="link-arrow" onClick={handleClose}>
            Open full page
            <Icon name="arrowRight" size={14} />
          </Link>
          <button type="button" className="btn btn--quiet" onClick={onNext} aria-label="Next artwork">
            Next
            <Icon name="chevronRight" size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
