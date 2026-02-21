import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export default function ContactPage() {
  return (
    <section className="page-section contact-page">
      <div className="contact-card">
        <div className="contact-icon">
          <MessageCircle size={48} strokeWidth={1.5} />
        </div>
        <h1>Get in Touch</h1>
        <p className="contact-lead">
          We&apos;re available exclusively through our Discord community.
        </p>
        <p className="contact-desc">
          Join our server to discuss your project, get quotes, or connect with our team.
          Our staff typically responds within 24–48 hours.
        </p>
        <Link
          href="/discord"
          className="contact-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join Discord
        </Link>
      </div>
    </section>
  )
}
