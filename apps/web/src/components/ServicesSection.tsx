import Link from 'next/link'
import { Server, Code2, Gauge, Bot } from 'lucide-react'

const SERVICES = [
  {
    icon: Server,
    title: 'Server Setup',
    description: 'Professional Minecraft server configuration and deployment.',
  },
  {
    icon: Code2,
    title: 'Plugin Development',
    description: 'Custom plugins tailored to your server needs.',
  },
  {
    icon: Gauge,
    title: 'Optimization',
    description: 'Performance tuning and server optimization.',
  },
  {
    icon: Bot,
    title: 'Discord Bot Development',
    description: 'Custom Discord bots for your community.',
  },
]

export function ServicesSection() {
  return (
    <section className="services-section">
      <h2 className="services-title">What We Offer</h2>
      <p className="services-subtitle">
        Professional development services for Minecraft and Discord.
      </p>
      <div className="services-grid">
        {SERVICES.map((service) => {
          const Icon = service.icon
          return (
            <div key={service.title} className="service-card">
              <div className="service-icon">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
            </div>
          )
        })}
      </div>
      <Link href="/discord" className="services-cta" target="_blank" rel="noopener noreferrer">
        Request a Quote
      </Link>
    </section>
  )
}
