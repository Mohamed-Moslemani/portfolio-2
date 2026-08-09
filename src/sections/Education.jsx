import { useState } from 'react'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import { award, education, programs } from '../data/education'

const VISIBLE_COURSES = 5

export default function Education() {
  const [expanded, setExpanded] = useState(false)
  const courses = expanded ? education.coursework : education.coursework.slice(0, VISIBLE_COURSES)
  const hidden = education.coursework.length - VISIBLE_COURSES

  return (
    <Section
      id="education"
      tone="amber"
      number="02"
      label="Education & Recognition"
      title="What I"
      titleAccent="studied"
      lede="Four years of computer science at AUB, one very good award, and a workshop that turned into a mentorship."
    >
      <div className="edu">
        <Reveal className="edu__main panel panel--ticks">
          <div className="edu__top">
            <span className="t-mono">{education.period}</span>
            <span className="chip chip--accent">{education.distinction}</span>
          </div>

          <h3 className="t-h3">{education.degree}</h3>
          <p className="edu__school t-lead">{education.institution}</p>
          <p className="t-mono-sm edu__place">{education.location}</p>

          <div className="edu__gpa">
            <span className="edu__gpa-value">{education.gpa}</span>
            <span className="edu__gpa-scale t-mono-sm">
              CGPA
              <br />/ {education.gpaScale}
            </span>
          </div>

          <div className="edu__courses">
            <span className="t-mono-sm edu__courses-label">Relevant coursework</span>
            <ul className="chip-row" role="list">
              {courses.map((course) => (
                <li key={course} className="chip">
                  {course}
                </li>
              ))}
            </ul>
            {hidden > 0 && (
              <button
                type="button"
                className="edu__more link-arrow"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
              >
                <Icon name={expanded ? 'minus' : 'plus'} size={13} />
                {expanded ? 'Show less' : `${hidden} more`}
              </button>
            )}
          </div>
        </Reveal>

        <div className="edu__side">
          <Reveal className="award panel panel--ticks" delay={60}>
            <span className="award__ribbon t-mono-sm">Award</span>
            <h3 className="award__title t-h4">{award.title}</h3>
            <p className="t-mono-sm award__issuer">
              {award.issuer} · {award.amount}
            </p>
            <ul className="award__points" role="list">
              {award.points.map((point) => (
                <li key={point}>
                  <span className="award__bullet" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {programs.map((program, i) => (
            <Reveal key={program.id} className="program panel" delay={120 + i * 60}>
              <span className="t-mono-sm program__label">Program</span>
              <h3 className="program__title t-h4">{program.title}</h3>
              <ul className="program__points" role="list">
                {program.points.map((point) => (
                  <li key={point}>
                    <span className="award__bullet" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
