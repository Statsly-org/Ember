'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'
import { Copy } from 'lucide-react'

export default function SettingsPage() {
  const { data: session } = authClient.useSession()
  const [discordId, setDiscordId] = useState<string | null>(null)

  useEffect(() => {
    if (session) {
      fetch('/api/user/discord-id', { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => setDiscordId(data.discordId ?? null))
        .catch(() => setDiscordId(null))
    }
  }, [session])

  const copyDiscordId = () => {
    if (discordId) {
      navigator.clipboard.writeText(discordId)
      toast.success('Copied to clipboard')
    }
  }

  if (!session?.user) return null

  const user = session.user as { createdAt?: string | Date }
  const joinedAt = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '—'

  return (
    <section className="page-section settings-page">
      <h1>Settings</h1>

      <div className="settings-profile-card">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt=""
            width={80}
            height={80}
            className="settings-avatar"
          />
        )}
        <div className="settings-profile-info">
          <h2 className="settings-profile-name">{session.user.name || 'User'}</h2>
          <p className="settings-profile-email">{session.user.email || '—'}</p>
        </div>
      </div>

      <div className="settings-section">
        <h2>Account Information</h2>
        <dl className="settings-list">
          <div className="settings-row">
            <dt>Discord ID</dt>
            <dd>
              <button
                type="button"
                onClick={copyDiscordId}
                className="settings-copy-btn"
                title="Copy"
              >
                {discordId || '—'}
                {discordId && <Copy size={14} />}
              </button>
            </dd>
          </div>
          <div className="settings-row">
            <dt>Joined</dt>
            <dd>{joinedAt}</dd>
          </div>
          <div className="settings-row">
            <dt>Licenses</dt>
            <dd>
              <span className="settings-placeholder">—</span>
              <span className="settings-note">(API domain coming soon)</span>
            </dd>
          </div>
        </dl>
      </div>

      <div className="settings-coming-soon">
        <p>Configurable settings are coming soon.</p>
      </div>
    </section>
  )
}
