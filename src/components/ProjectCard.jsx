import Icon from './Icon'
import LazyImage from './LazyImage'

/* ---------------------------------------------------------------
   ProjectCard: a case study, not a tile. Alternates side on desktop
   via the `flip` prop; stacks visual-under-text on small screens.
   --------------------------------------------------------------- */

function ProjectVisual({ project }) {
  if (project.image) {
    return (
      <LazyImage
        src={project.image}
        alt={`${project.name} interface screenshot`}
        className="project__img"
        fallback={<ProjectSchematic project={project} />}
      />
    )
  }
  return <ProjectSchematic project={project} />
}

function ProjectSchematic({ project }) {
  return (
    <div className="project__schematic" aria-hidden="true">
      <span className="project__schematic-index">{project.index}</span>
      <span className="project__schematic-label t-mono-sm">{project.category}</span>
      <svg className="project__schematic-lines" viewBox="0 0 120 80" preserveAspectRatio="none">
        <g stroke="currentColor" strokeWidth="0.5" vectorEffect="non-scaling-stroke" fill="none">
          <path d="M0 20h120M0 40h120M0 60h120" opacity="0.5" />
          <path d="M30 0v80M60 0v80M90 0v80" opacity="0.3" />
        </g>
      </svg>
    </div>
  )
}

export default function ProjectCard({ project, flip = false }) {
  const { index, category, name, subtitle, description, highlights, tech, links } = project
  const hasLinks = Boolean(links.website || links.github)

  return (
    <article className={`project panel panel--ticks${flip ? ' project--flip' : ''}`}>
      <div className="project__visual">
        <ProjectVisual project={project} />
      </div>

      <div className="project__body">
        <div className="project__top">
          <span className="project__index t-mono">{index}</span>
          <span className="project__rule" aria-hidden="true" />
          <span className="project__category t-mono">{category}</span>
        </div>

        <h3 className="project__name t-h3">{name}</h3>
        {subtitle && <p className="project__subtitle t-serif-i">{subtitle}</p>}

        <p className="project__desc t-body">{description}</p>

        {highlights?.length > 0 && (
          <ul className="project__highlights" role="list">
            {highlights.map((item) => (
              <li key={item}>
                <span className="project__bullet" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <ul className="chip-row project__tech" role="list">
          {tech.map((item) => (
            <li key={item} className="chip">
              {item}
            </li>
          ))}
        </ul>

        {hasLinks ? (
          <div className="project__links">
            {links.website && (
              <a
                className="btn btn--ghost"
                href={links.website}
                target="_blank"
                rel="noreferrer noopener"
              >
                Visit site
                <Icon name="arrowUpRight" size={16} className="btn__arrow" />
              </a>
            )}
            {links.github && (
              <a
                className="btn btn--quiet"
                href={links.github}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon name="github" size={16} />
                Source
              </a>
            )}
          </div>
        ) : (
          <p className="project__nolink t-mono-sm">Links coming soon</p>
        )}
      </div>
    </article>
  )
}
