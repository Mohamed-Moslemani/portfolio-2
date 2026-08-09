import Reveal from '../components/Reveal'
import Section from '../components/Section'
import { experience, volunteering } from '../data/experience'

export default function Experience() {
  return (
    <Section
      id="experience"
      tone="mint"
      number="01"
      label="Experience"
      title="Where I've"
      titleAccent="worked"
      lede="Enterprise data and AI engineering: pipelines that have to run tomorrow morning whether or not anyone is watching."
    >
      <ol className="timeline" role="list">
        {experience.map((job) => (
          <Reveal as="li" key={job.id} className="timeline__item">
            <span className="timeline__marker" aria-hidden="true">
              <span className="timeline__dot" />
            </span>

            <article className="timeline__card panel panel--ticks">
              <header className="timeline__head">
                <div>
                  <h3 className="t-h3">{job.company}</h3>
                  <p className="timeline__role t-lead">{job.role}</p>
                </div>
                <div className="timeline__when">
                  <span className="t-mono-sm">{job.period}</span>
                  <span className="t-mono-sm timeline__where">{job.location}</span>
                  {job.current && <span className="chip chip--accent timeline__current">Current</span>}
                </div>
              </header>

              <p className="t-body timeline__summary">{job.summary}</p>

              <ul className="timeline__points" role="list">
                {job.highlights.map((point) => (
                  <li key={point}>
                    <span className="timeline__bullet" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <ul className="chip-row" role="list">
                {job.tech.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </ol>

      <Reveal className="volunteering">
        <span className="t-mono-sm volunteering__label">Volunteering</span>
        <div className="volunteering__body">
          <p className="t-small">
            <strong>{volunteering.organisation}</strong> · {volunteering.location}
          </p>
          <p className="t-small">{volunteering.summary}</p>
        </div>
        <span className="t-mono-sm volunteering__period">{volunteering.period}</span>
      </Reveal>
    </Section>
  )
}
