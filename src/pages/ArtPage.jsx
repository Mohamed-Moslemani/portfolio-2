import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ArtworkCard from '../components/ArtworkCard'
import Container from '../components/Container'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import { artworks, availableCategories } from '../data/artwork'
import useDocumentTitle from '../hooks/useDocumentTitle'

/* ---------------------------------------------------------------
   ArtPage: /art. The whole wall, in a masonry that lets portrait,
   landscape and square pieces all keep their own shape.
   --------------------------------------------------------------- */

export default function ArtPage() {
  const [category, setCategory] = useState('All')

  useDocumentTitle(
    'Art',
    'Drawings, studies and digital pieces by Jana Jaffal: the full collection.',
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const shown = useMemo(
    () => (category === 'All' ? artworks : artworks.filter((a) => a.category === category)),
    [category],
  )

  const showFilters = availableCategories.length > 2

  return (
    <div className="gallery">
      <Container className="page-head">
        <Reveal>
          <p className="gallery__eyebrow t-mono">
            Art <span className="t-accent">/</span>
          </p>
          <h1 className="gallery__title t-h1">
            <span>Jana</span>
            <span className="t-serif-i">Jaffal</span>
          </h1>
          <p className="t-lead gallery__lede">
            Everything in one place: sketches, character work, studies, and the occasional
            digital piece. Some finished, most of them not, all of them mine.{' '}
            <span className="sparkle sparkle--pink" aria-hidden="true" />
          </p>
        </Reveal>
      </Container>

      <Container>
        <div className="rule" />

        <Reveal className="gallery__toolbar">
          {showFilters ? (
            <>
              <span className="visually-hidden" id="filter-label">
                Filter artwork by category
              </span>
              <div className="gallery__filters" role="group" aria-labelledby="filter-label">
                {availableCategories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`gallery__filter${c === category ? ' is-active' : ''}`}
                    aria-pressed={c === category}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <span />
          )}

          <span className="gallery__count t-mono-sm" aria-live="polite">
            {shown.length} {shown.length === 1 ? 'piece' : 'pieces'}
          </span>
        </Reveal>

        {shown.length > 0 ? (
          <div className="gallery__grid">
            {shown.map((artwork, i) => (
              <Reveal key={artwork.id} className="gallery__cell" delay={(i % 3) * 60}>
                <ArtworkCard artwork={artwork} eager={i < 3} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="gallery__empty t-lead">Nothing in this category yet. Check back soon.</p>
        )}

        <div className="gallery__foot">
          <Link to="/" className="link-arrow">
            <Icon name="arrowLeft" size={14} />
            Back to the portfolio
          </Link>
        </div>
      </Container>
    </div>
  )
}
