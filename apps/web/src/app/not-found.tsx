import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="not-found-page">
      <div className="not-found-content">
        <span className="not-found-code">404</span>
        <h1>Page Not Found</h1>
        <p>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="not-found-actions">
          <Link href="/" className="not-found-cta">
            <Home size={18} />
            Back to Home
          </Link>
          <Link href="/contact" className="not-found-secondary">
            <ArrowLeft size={18} />
            Contact
          </Link>
        </div>
      </div>
    </section>
  )
}
