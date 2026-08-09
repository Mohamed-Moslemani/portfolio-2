import Container from './Container'
import Reveal from './Reveal'

/* ---------------------------------------------------------------
   Section: the numbered section shell that gives the whole page its
   rhythm: hairline, 0X, label, heading, optional lede, optional
   right-hand action.
   --------------------------------------------------------------- */

export default function Section({
  id,
  number,
  label,
  title,
  titleAccent,
  lede,
  action,
  size,
  tone,
  className = '',
  headless = false,
  children,
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={`section${className ? ` ${className}` : ''}`}
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <span className="section__glow" aria-hidden="true" />
      <Container size={size}>
        <div className="section__rule" aria-hidden="true" />

        {!headless && (
          <Reveal className="section__head">
            <span className="section__label t-mono">
              <span className="section__label-num">{number}</span>
              <span className="section__label-dash" aria-hidden="true" />
              <span>{label}</span>
            </span>

            <div className="section__title-row">
              <div>
                <h2 id={id ? `${id}-title` : undefined} className="t-h2">
                  {title}
                  {titleAccent && (
                    <>
                      {' '}
                      <span className="t-serif-i t-accent">{titleAccent}</span>
                    </>
                  )}
                </h2>
                {lede && <p className="t-lead section__lede">{lede}</p>}
              </div>
              {action}
            </div>
          </Reveal>
        )}

        {children}
      </Container>
    </section>
  )
}
