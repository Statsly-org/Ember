import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <section className="page-section unauthorized-page">
      <h1>Access Denied</h1>
      <p className="unauthorized-message">
        You don&apos;t have permission to access this page.
      </p>
      <div className="unauthorized-actions">
        <Link href="/login" className="unauthorized-link">
          Sign in
        </Link>
        <Link href="/" className="unauthorized-link secondary">
          ← Back to Home
        </Link>
      </div>
    </section>
  )
}
