import { Link } from 'react-router-dom'
import Icon from './Icon'
import Container from './Container'
import { links, profile } from '../data/profile'

export default function Footer() {
  const year = new Date().getFullYear()

  const external = [
    links.linkedin && { id: 'linkedin', label: 'LinkedIn', href: links.linkedin },
    links.github && { id: 'github', label: 'GitHub', href: links.github },
  ].filter(Boolean)

  return (
    <footer className="footer">
      <Container>
        <div className="rule" />
        <div className="footer__inner">
          <div className="footer__identity">
            <p className="footer__name t-mono">{profile.name}</p>
            <p className="footer__place t-mono-sm">{profile.locationShort}</p>
          </div>

          <nav className="footer__links" aria-label="Footer">
            {external.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className="footer__link"
              >
                {item.label}
                <Icon name="arrowUpRight" size={13} />
              </a>
            ))}
            <Link to="/art" className="footer__link">
              Art
              <Icon name="arrowRight" size={13} />
            </Link>
            <a href={`mailto:${profile.email}`} className="footer__link">
              Email
              <Icon name="arrowUpRight" size={13} />
            </a>
          </nav>

          <div className="footer__end">
            <p className="t-mono-sm">© {year}</p>
            <p className="footer__tagline t-serif-i">code / art / everything between</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
