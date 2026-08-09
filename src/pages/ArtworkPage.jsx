import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ArtPlaceholder from '../components/ArtPlaceholder'
import Container from '../components/Container'
import Icon from '../components/Icon'
import LazyImage from '../components/LazyImage'
import Reveal from '../components/Reveal'
import { getArtworkBySlug, getArtworkNeighbours } from '../data/artwork'
import useDocumentTitle from '../hooks/useDocumentTitle'
import NotFoundPage from './NotFoundPage'

/* ---------------------------------------------------------------
   ArtworkPage: /art/:slug. One piece, room to breathe, and a door
   at either end of the room.
   --------------------------------------------------------------- */

export default function ArtworkPage() {
  const { slug } = useParams()
  const artwork = getArtworkBySlug(slug)

  useDocumentTitle(
    artwork ? artwork.title : 'Artwork not found',
    artwork
      ? `${artwork.title} (${artwork.year}), ${artwork.medium}, by Jana Jaffal.`
      : undefined,
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!artwork) return <NotFoundPage />

  const { prev, next } = getArtworkNeighbours(slug)

  return (
    <Container className="page-head">
      <Reveal className="artwork__back">
        <Link to="/art" className="link-arrow">
          <Icon name="arrowLeft" size={14} />
          All art
        </Link>
      </Reveal>

      <div className="artwork__layout">
        <Reveal>
          <div className="artwork__stage" data-ratio={artwork.ratio}>
            <LazyImage
              src={artwork.image}
              alt={artwork.alt || `${artwork.title} by Jana Jaffal`}
              eager
              className="artwork__img"
              fallback={<ArtPlaceholder seed={artwork.id} label="Artwork pending" />}
            />
          </div>
        </Reveal>

        <Reveal className="artwork__info" delay={80}>
          <h1 className="artwork__title t-h2">{artwork.title}</h1>

          <dl className="artwork__specs">
            <div className="artwork__spec">
              <dt className="t-mono-sm">Year</dt>
              <dd>{artwork.year}</dd>
            </div>
            <div className="artwork__spec">
              <dt className="t-mono-sm">Medium</dt>
              <dd>{artwork.medium}</dd>
            </div>
            <div className="artwork__spec">
              <dt className="t-mono-sm">Category</dt>
              <dd>{artwork.category}</dd>
            </div>
          </dl>

          {artwork.description && <p className="t-body artwork__desc">{artwork.description}</p>}

          {artwork.isPlaceholder && (
            <p className="artwork__placeholder-note t-mono-sm">
              Placeholder frame: the real piece goes in <code>public/art/</code>.
            </p>
          )}
        </Reveal>
      </div>

      <nav className="artwork__nav" aria-label="Artwork navigation">
        {prev && (
          <Link to={`/art/${prev.slug}`} className="artwork__nav-link">
            <span className="artwork__nav-dir t-mono-sm">
              <Icon name="arrowLeft" size={13} />
              Previous
            </span>
            <span className="artwork__nav-title">{prev.title}</span>
          </Link>
        )}
        {next && (
          <Link to={`/art/${next.slug}`} className="artwork__nav-link artwork__nav-link--next">
            <span className="artwork__nav-dir t-mono-sm">
              Next
              <Icon name="arrowRight" size={13} />
            </span>
            <span className="artwork__nav-title">{next.title}</span>
          </Link>
        )}
      </nav>
    </Container>
  )
}
