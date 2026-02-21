import Link from 'next/link'
import { MessageSquare, FileText, UserCheck, CheckCircle } from 'lucide-react'

const STEPS = [
  {
    icon: MessageSquare,
    title: 'Join & Create Ticket',
    text: 'Join our Discord and head to the tickets channel. Select the service you need and provide details like description, deadline, and budget.',
  },
  {
    icon: FileText,
    title: 'Add Details',
    text: 'A private channel is created for your order. Add any further information there so our team has everything they need.',
  },
  {
    icon: UserCheck,
    title: 'Proposal & Review',
    text: 'A developer from our Development Team will claim your order and submit a proposal. You can accept or reject it.',
  },
  {
    icon: CheckCircle,
    title: 'Processing & Delivery',
    text: 'Once accepted, the status changes to processing. The developer completes your project within the deadline and keeps you updated throughout.',
  },
]

export function HowItWorksSection() {
  return (
    <section className="how-section">
      <h2 className="how-title">How It Works</h2>
      <p className="how-subtitle">
        From first contact to delivery — a simple, transparent process.
      </p>
      <div className="how-steps">
        {STEPS.map((step, i) => {
          const Icon = step.icon
          return (
          <div key={i} className="how-step">
            <div className="how-step-icon">
              <Icon size={24} strokeWidth={1.5} />
            </div>
            <div className="how-step-content">
              <h3 className="how-step-title">{step.title}</h3>
              <p className="how-step-text">{step.text}</p>
            </div>
            {i < STEPS.length - 1 && <div className="how-step-connector" />}
          </div>
          )
        })}
      </div>
      <p className="how-note">Typical response time: 12–24 hours</p>
      <Link href="/discord" className="how-cta" target="_blank" rel="noopener noreferrer">
        Get Started on Discord
      </Link>
    </section>
  )
}
