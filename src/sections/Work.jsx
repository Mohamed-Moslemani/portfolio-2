import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import { projects } from '../data/projects'

export default function Work() {
  return (
    <Section
      id="work"
      tone="sky"
      number="03"
      label="Selected Work"
      title="Things I've"
      titleAccent="built"
      lede="Coursework, competition projects and production systems: the ones where the problem was interesting enough to keep going after the deadline."
    >
      <div className="work__list">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={i === 0 ? 0 : 60}>
            <ProjectCard project={project} flip={i % 2 === 1} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
