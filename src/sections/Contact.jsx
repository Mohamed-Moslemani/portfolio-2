import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import { contactChannels, profile } from '../data/profile'

export default function Contact() {
  return (
    <Section
      id="contact"
      tone="mint"
      number="06"
      label="Contact"
      title="Let's make"
      titleAccent="something"
      lede="Open to work in data, AI and software, and always happy to talk about drawing."
    >
      <div className="contact">
        <Reveal className="contact__primary panel panel--ticks">
          <span className="t-mono-sm contact__label">Email</span>
          <a className="contact__email" href={`mailto:${profile.email}`}>
            {profile.email}
            <Icon name="arrowUpRight" size={20} className="contact__email-arrow" />
          </a>
          <p className="t-small contact__hint">
            Based in {profile.location} · usually replies within a day or two.
          </p>
        </Reveal>

        <Reveal className="contact__channels" delay={80}>
          {contactChannels
            .filter((channel) => channel.id !== 'email')
            .map((channel) => (
              <a
                key={channel.id}
                className="contact__channel panel"
                href={channel.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon name={channel.icon} size={18} />
                <span className="contact__channel-label">{channel.label}</span>
                <Icon name="arrowUpRight" size={15} className="contact__channel-arrow" />
              </a>
            ))}

          <div className="contact__note panel">
            <p className="t-mono-sm">
              More links to come. GitHub and portfolio URLs land here once they exist.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
