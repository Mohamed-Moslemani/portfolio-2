import { Link } from 'react-router-dom'
import Container from '../components/Container'
import Icon from '../components/Icon'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function NotFoundPage() {
  useDocumentTitle('Not found', 'That page does not exist.')

  return (
    <Container size="narrow" className="page-head notfound">
      <span className="eyebrow t-mono">Error 404</span>
      <h1 className="t-h1">
        This page is a <span className="t-serif-i t-accent squiggle">blank canvas</span>
      </h1>
      <p className="t-lead notfound__lede">
        Which is fine for a sketchbook, less useful for a website. Nothing lives at this address,
        but everything else is still where you left it.
      </p>
      <div className="notfound__actions">
        <Link to="/" className="btn btn--primary">
          Back home
          <Icon name="arrowRight" size={15} className="btn__arrow" />
        </Link>
        <Link to="/art" className="btn btn--ghost">
          See the art instead
          <Icon name="arrowRight" size={15} className="btn__arrow" />
        </Link>
      </div>
    </Container>
  )
}
