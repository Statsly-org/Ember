import { Code2, Handshake, Users } from 'lucide-react'

const VALUES = [
  { icon: Code2, label: 'Quality Code' },
  { icon: Handshake, label: 'Transparent Process' },
  { icon: Users, label: 'Experienced Team' },
]

const SERVICES = ['Plugin Development', 'Server Setup', 'Optimization']

export function AboutSection() {
  return (
    <section className="about-section">
      <h2 className="about-title">About Us</h2>
      <p className="about-text">
        Ember Studios is a studio founded by multiple Trusted Minecraft Developers.
        We only work with developers who have worked or are working at well-known servers
        and can demonstrate proven code quality.
      </p>
      <ul className="about-values">
        {VALUES.map((v) => {
          const Icon = v.icon
          return (
            <li key={v.label}>
              <Icon size={18} strokeWidth={1.5} />
              <span>{v.label}</span>
            </li>
          )
        })}
      </ul>
      <div className="about-services">
        <span className="about-services-label">Services:</span>
        <span>{SERVICES.join(' • ')}</span>
      </div>
      <p className="about-trust">
        Trusted by Minecraft server owners worldwide.
      </p>
    </section>
  )
}
