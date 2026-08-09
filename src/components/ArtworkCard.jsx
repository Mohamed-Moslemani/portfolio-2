import { Link } from 'react-router-dom'
import ArtPlaceholder from './ArtPlaceholder'
import Icon from './Icon'
import LazyImage from './LazyImage'

/* ---------------------------------------------------------------
   ArtworkCard: a framed piece on the wall.

   `onOpen` renders it as a button (homepage → lightbox);
   without it the card is a link to the artwork's own page.
   --------------------------------------------------------------- */

export default function ArtworkCard({ artwork, onOpen, eager = false, className = '' }) {
  const { slug, title, year, medium, ratio, image, thumbnail, alt, isPlaceholder } = artwork

  const frame = (
    <>
      <span className="artcard__frame" data-ratio={ratio}>
        <LazyImage
          src={thumbnail || image}
          alt={alt || `${title} by Jana Jaffal`}
          eager={eager}
          className="artcard__img"
          fallback={<ArtPlaceholder seed={artwork.id} />}
        />
        <span className="artcard__veil" aria-hidden="true" />
        <span className="artcard__zoom" aria-hidden="true">
          <Icon name="expand" size={15} />
        </span>
      </span>

      <span className="artcard__meta">
        <span className="artcard__title t-h4">
          {title}
          {isPlaceholder && <span className="artcard__flag t-mono-sm">placeholder</span>}
        </span>
        <span className="artcard__sub t-mono-sm">
          {year} · {medium}
        </span>
      </span>
    </>
  )

  const classes = `artcard${className ? ` ${className}` : ''}`

  if (onOpen) {
    return (
      <button
        type="button"
        className={classes}
        onClick={() => onOpen(artwork)}
        aria-label={`View ${title}, ${year}, ${medium}`}
      >
        {frame}
      </button>
    )
  }

  return (
    <Link to={`/art/${slug}`} className={classes} aria-label={`View ${title}, ${year}, ${medium}`}>
      {frame}
    </Link>
  )
}
