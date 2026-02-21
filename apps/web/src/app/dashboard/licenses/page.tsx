'use client'

import { useEffect, useRef, useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { X, Copy, Key, Info } from 'lucide-react'

type License = {
  licenseKey?: string
  productID?: string
  maxServers?: number
  user_id?: string
  expiryDate?: string | null
}

export default function LicensesPage() {
  const { data: session } = authClient.useSession()
  const [licenses, setLicenses] = useState<License[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null)
  const licensesFetchedRef = useRef(false)

  useEffect(() => {
    if (!session) {
      licensesFetchedRef.current = false
      return
    }
    if (licensesFetchedRef.current) return
    licensesFetchedRef.current = true
    setLoading(true)
    setError(null)
    fetch('/api/user/licenses', { credentials: 'include' })
      .then((res) => res.json().then((data) => ({ data, ok: res.ok })))
      .then(({ data, ok }) => {
        const list = Array.isArray(data?.licenses) ? data.licenses : Array.isArray(data) ? data : []
        setLicenses(list)
        if (data?.error) {
          setError(data.error)
        } else if (!ok && list.length === 0) {
          setError('Failed to load licenses')
        }
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load licenses'))
      .finally(() => setLoading(false))
  }, [session])

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedLicense(null)
    }
    if (selectedLicense) {
      document.addEventListener('keydown', onEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onEscape)
      document.body.style.overflow = ''
    }
  }, [selectedLicense])

  if (!session?.user) return null

  const isExpired = (date: string | null | undefined) => {
    if (date === null || date === undefined || date === '') return false
    try {
      return new Date(date).getTime() < Date.now()
    } catch {
      return false
    }
  }

  const formatExpiry = (date: string | null | undefined) => {
    if (date === null || date === undefined || date === '') return 'Never'
    try {
      const d = new Date(date)
      const hasTime = typeof date === 'string' && (date.includes('T') || date.includes(' '))
      return hasTime
        ? d.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
    } catch {
      return date
    }
  }

  const formatProductId = (id: string | undefined) => {
    if (!id) return '—'
    return id.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  }

  const truncateKey = (key: string | undefined) => {
    if (!key) return '—'
    if (key.length <= 16) return key
    return `${key.slice(0, 8)}…${key.slice(-8)}`
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  return (
    <section className="page-section licenses-page">
      <div className="licenses-header">
        <h1>Licenses</h1>
        <p className="licenses-intro">Manage your active licenses and products.</p>
      </div>

      {!loading && !error && licenses.length > 0 && (
        <div className="licenses-info-cards">
          <div className="licenses-info-card">
            <Key size={20} className="licenses-info-icon" />
            <div>
              <span className="licenses-info-value">{licenses.length}</span>
              <span className="licenses-info-label">Active Licenses</span>
            </div>
          </div>
          <div className="licenses-info-card licenses-info-tip">
            <Info size={20} className="licenses-info-icon" />
            <p>Click any license card to view details and copy the key.</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="licenses-loading-state">
          <div className="licenses-loading-spinner" />
          <p>Loading licenses...</p>
        </div>
      ) : error ? (
        <div className="licenses-error">
          <p>{error}</p>
        </div>
      ) : licenses.length === 0 ? (
        <div className="licenses-empty">
          <p>No licenses found.</p>
        </div>
      ) : (
        <ul className="licenses-grid">
          {licenses.map((license, i) => {
            const expired = isExpired(license.expiryDate)
            return (
              <li key={license.licenseKey ?? i}>
                <button
                  type="button"
                  className={`licenses-card ${expired ? 'licenses-card-expired' : ''}`}
                  onClick={() => setSelectedLicense(license)}
                >
                  <div className="licenses-card-header">
                    <span className="licenses-card-product">
                      {formatProductId(license.productID)}
                    </span>
                    {expired && <span className="licenses-badge licenses-badge-expired">Expired</span>}
                  </div>
                  <span className="licenses-card-key">{truncateKey(license.licenseKey)}</span>
                  <span className={`licenses-card-expiry ${expired ? 'licenses-card-expiry-expired' : ''}`}>
                    {expired ? 'Expired' : formatExpiry(license.expiryDate)}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {selectedLicense && (
        <div
          className="licenses-modal-overlay"
          onClick={() => setSelectedLicense(null)}
          role="presentation"
        >
          <div
            className="licenses-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="license-modal-title"
          >
            <div className="licenses-modal-header">
              <h2 id="license-modal-title" className="licenses-modal-title">
                {formatProductId(selectedLicense.productID)}
              </h2>
              <button
                type="button"
                className="licenses-modal-close"
                onClick={() => setSelectedLicense(null)}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <div className="licenses-modal-body">
              <div className="licenses-modal-section">
                <span className="licenses-modal-section-label">License Key</span>
                <div className="licenses-modal-codeblock">
                  <code>{selectedLicense.licenseKey ?? '—'}</code>
                  {selectedLicense.licenseKey && (
                    <button
                      type="button"
                      className="licenses-modal-copy"
                      onClick={() => copyToClipboard(selectedLicense.licenseKey!, 'License key')}
                      aria-label="Copy license key"
                    >
                      <Copy size={16} />
                      <span>Copy</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="licenses-modal-details">
                <div className="licenses-modal-detail">
                  <span className="licenses-modal-detail-label">Product</span>
                  <span className="licenses-modal-detail-value">
                    {formatProductId(selectedLicense.productID)}
                  </span>
                </div>
                <div className="licenses-modal-detail">
                  <span className="licenses-modal-detail-label">Max Servers</span>
                  <span className="licenses-modal-detail-value">
                    {selectedLicense.maxServers ?? '—'}
                  </span>
                </div>
                <div className="licenses-modal-detail">
                  <span className="licenses-modal-detail-label">Expires</span>
                  <span className={`licenses-modal-detail-value ${isExpired(selectedLicense.expiryDate) ? 'licenses-modal-expired' : ''}`}>
                    {isExpired(selectedLicense.expiryDate)
                      ? 'Expired'
                      : formatExpiry(selectedLicense.expiryDate)}
                  </span>
                </div>
                {selectedLicense.user_id && (
                  <div className="licenses-modal-detail licenses-modal-detail-copyable">
                    <span className="licenses-modal-detail-label">User ID</span>
                    <div className="licenses-modal-userid-row">
                      <span className="licenses-modal-detail-value licenses-modal-userid">
                        {selectedLicense.user_id}
                      </span>
                      <button
                        type="button"
                        className="licenses-modal-copy-btn"
                        onClick={() => copyToClipboard(selectedLicense.user_id!, 'User ID')}
                        aria-label="Copy User ID"
                        title="Copy User ID"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
