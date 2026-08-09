import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import ArtLightbox from '../components/ArtLightbox'
import ArtworkCard from '../components/ArtworkCard'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import { featuredArtworks } from '../data/artwork'

/* ---------------------------------------------------------------
   Art: the exhibition wall on the homepage. Weighted the same as
   the work section, because it counts for the same amount.
   --------------------------------------------------------------- */

export default function Art() {
  const [openIndex, setOpenIndex] = useState(null)

  const open = useCallback(
    (artwork) => setOpenIndex(featuredArtworks.findIndex((a) => a.id === artwork.id)),
    [],
  )
  const close = useCallback(() => setOpenIndex(null), [])
  const step = useCallback(
    (delta) =>
      setOpenIndex((i) =>
        i === null ? i : (i + delta + featuredArtworks.length) % featuredArtworks.length,
      ),
    [],
  )

  return (
    <Section
      id="art"
      tone="blush"
      number="04"
      label="Art"
      title="Sketchbook &"
      titleAccent="selected art"
      lede="A collection of drawings, studies and things that stayed in my head long enough to end up on paper."
      action={
        <Link to="/art" className="link-arrow art__viewall">
          View all art
          <Icon name="arrowRight" size={14} />
        </Link>
      }
    >
      <div className="art-grid">
        {featuredArtworks.map((artwork, i) => (
          <Reveal key={artwork.id} className="art-grid__cell" delay={(i % 2) * 80}>
            <ArtworkCard artwork={artwork} onOpen={open} eager={i === 0} />
          </Reveal>
        ))}
      </div>

      <Reveal className="art__note">
        <p className="t-mono-sm">
          The frames above are placeholders. Real work goes in <code>public/art/</code> and{' '}
          <code>src/data/artwork.js</code>.
        </p>
      </Reveal>

      <ArtLightbox
        artwork={openIndex === null ? null : featuredArtworks[openIndex]}
        onClose={close}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </Section>
  )
}
