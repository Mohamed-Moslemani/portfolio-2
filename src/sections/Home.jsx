import Container from '../components/Container'
import Icon from '../components/Icon'
import MangaPanel from '../components/MangaPanel'
import { heroStack } from '../data/skills'
import { links, profile } from '../data/profile'
import useSectionNav from '../hooks/useSectionNav'

/* ---------------------------------------------------------------
   Home: the hero. Two halves of one person, side by side:
   the sentence on the left, the drawn panel on the right.
   --------------------------------------------------------------- */

export default function Home() {
  const { goToSection } = useSectionNav()

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <Container className="hero__container">
        <div className="hero__text">
          <p className="hero__hello t-mono">
            <span className="eyebrow" />
            Hello / I&apos;m Jana
            <span className="sparkle sparkle--pink hero__sparkle" aria-hidden="true" />
          </p>

          <h1 id="hero-title" className="hero__title t-display">
            <span className="hero__line">I build systems.</span>
            <span className="hero__line hero__line--art t-serif-i">I draw worlds.</span>
          </h1>

          <p className="hero__lede t-lead">
            Computer Science graduate working across data, AI and software, and an artist
            whenever there&apos;s a pencil nearby. Two very different kinds of blank page, same
            stubbornness about filling them.
          </p>

          <dl className="hero__facts">
            {profile.facts.map((fact) => (
              <div key={fact.label} className="hero__fact">
                <dt className="t-mono-sm">{fact.label}</dt>
                <dd className="t-small">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="hero__actions">
            <button type="button" className="btn btn--primary" onClick={() => goToSection('work')}>
              View work
              <Icon name="arrowRight" size={16} className="btn__arrow" />
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => goToSection('art')}>
              Explore art
              <Icon name="arrowRight" size={16} className="btn__arrow" />
            </button>
            {links.cv && (
              <a className="btn btn--quiet" href={links.cv} download>
                <Icon name="arrowUpRight" size={15} />
                CV
              </a>
            )}
          </div>

          <ul className="hero__stack" role="list" aria-label="Core stack">
            {heroStack.map((item, i) => (
              <li key={item} className="hero__stack-item t-mono-sm">
                {item}
                {i < heroStack.length - 1 && (
                  <span className="hero__stack-sep" aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__visual" aria-hidden="true">
          {/* Original manga-style artwork. If a portrait of Jana is ever
              supplied, it belongs in this frame, drop it in and keep
              MangaPanel as the backdrop. */}
          <div className="hero__panel">
            <MangaPanel />
            <span className="hero__panel-corner hero__panel-corner--tl" />
            <span className="hero__panel-corner hero__panel-corner--br" />
          </div>

          <div className="hero__status panel">
            <span className="hero__status-label t-mono-sm">{profile.status.label}</span>
            <span className="hero__status-value t-mono">
              <span className="hero__status-dot" />
              {profile.status.value}
            </span>
          </div>
        </div>
      </Container>

      <Container>
        <button
          type="button"
          className="hero__scroll t-mono-sm"
          onClick={() => goToSection('work')}
          aria-label="Scroll to selected work"
        >
          <span className="hero__scroll-line" aria-hidden="true" />
          scroll
        </button>
      </Container>
    </section>
  )
}
