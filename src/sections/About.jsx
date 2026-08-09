import { useRef, useState } from 'react'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import SkillChip from '../components/SkillChip'
import { interests } from '../data/interests'
import { profile } from '../data/profile'
import { skillGroups } from '../data/skills'

export default function About() {
  const [active, setActive] = useState(interests[0].id)
  const tabRefs = useRef([])
  const activeIndex = interests.findIndex((item) => item.id === active)
  const activeInterest = interests[activeIndex]

  /* Roving focus: arrow keys move between interests, as a tablist should. */
  const onKeyDown = (event) => {
    const last = interests.length - 1
    let next = null

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = activeIndex === last ? 0 : activeIndex + 1
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = activeIndex === 0 ? last : activeIndex - 1
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = last

    if (next === null) return
    event.preventDefault()
    setActive(interests[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <Section id="about" tone="lilac" number="05" label="About" title="A little" titleAccent="context">
      <div className="about">
        <Reveal className="about__prose">
          <p className="t-lead">
            I&apos;m a computer science graduate from AUB interested in building systems that make
            complex things simpler. Most of my professional work lives somewhere between data
            engineering, software and AI.
          </p>
          <p className="t-lead">Outside a terminal, I draw. A lot.</p>
          <p className="t-lead">
            Art and engineering look unrelated from far away, but both usually start the same way
            for me: staring at an empty space and trying to figure out what belongs there.
          </p>

          <ul className="about__languages" role="list">
            {profile.languages.map((language) => (
              <li key={language.name}>
                <span className="t-small">{language.name}</span>
                <span className="t-mono-sm">{language.level}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="interests" delay={80}>
          <div className="interests__list" role="tablist" aria-label="Interests" aria-orientation="vertical">
            {interests.map((item, i) => (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[i] = node
                }}
                type="button"
                role="tab"
                id={`interest-tab-${item.id}`}
                aria-selected={item.id === active}
                aria-controls={`interest-panel-${item.id}`}
                tabIndex={item.id === active ? 0 : -1}
                className={`interests__item${item.id === active ? ' is-active' : ''}`}
                onClick={() => setActive(item.id)}
                onKeyDown={onKeyDown}
              >
                <span className="interests__index t-mono-sm">{item.index}</span>
                <span className="interests__label">{item.label}</span>
                <span className="interests__mark" aria-hidden="true" />
              </button>
            ))}
          </div>

          <div
            className="interests__panel"
            style={{ '--accent': `var(--tone-${activeInterest.tone})` }}
            role="tabpanel"
            id={`interest-panel-${activeInterest.id}`}
            aria-labelledby={`interest-tab-${activeInterest.id}`}
            tabIndex={0}
          >
            <p className="interests__line t-serif-i">{activeInterest.line}</p>
            <p className="t-body">{activeInterest.body}</p>
          </div>
        </Reveal>
      </div>

      <Reveal className="skills">
        <div className="skills__head">
          <span className="t-mono">Toolkit</span>
          <span className="rule skills__rule" />
        </div>

        <div className="skills__groups">
          {skillGroups.map((group) => (
            <div key={group.id} className="skills__group">
              <h3 className="skills__label t-mono-sm">{group.label}</h3>
              <ul className="chip-row" role="list">
                {group.items.map((item) => (
                  <SkillChip key={item}>{item}</SkillChip>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
