'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { LogOut, Settings, Home, Copy, Key, Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const [discordId, setDiscordId] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const discordIdFetchedRef = useRef(false)

  useEffect(() => {
    if (!session) {
      discordIdFetchedRef.current = false
      return
    }
    if (discordIdFetchedRef.current) return
    discordIdFetchedRef.current = true
    fetch('/api/user/discord-id', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setDiscordId(data.discordId ?? null))
      .catch(() => setDiscordId(null))
  }, [session])

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login')
    }
  }, [session, isPending, router])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const copyUserId = () => {
    if (discordId) {
      navigator.clipboard.writeText(discordId)
      toast.success('Copied to clipboard')
    }
  }

  const sidebarContent = (
    <>
      <div className="dashboard-sidebar-brand">
        <Link href="/dashboard" className="dashboard-sidebar-logo-link">
          <Image src="/logo.png" alt="" width={44} height={44} className="dashboard-sidebar-logo" />
          <span className="dashboard-sidebar-brand-name">Ember Studios</span>
        </Link>
      </div>
      <nav className="dashboard-sidebar-nav">
        <Link href="/" className="dashboard-sidebar-link">
          <Home size={20} />
          <span>Back to Home</span>
        </Link>
        <Link
          href="/dashboard/licenses"
          className={`dashboard-sidebar-link ${pathname === '/dashboard/licenses' ? 'active' : ''}`}
        >
          <Key size={20} />
          <span>Licenses</span>
        </Link>
      </nav>

      <div className="dashboard-sidebar-profile">
        <Link href="/logout" className="dashboard-sidebar-logout">
          <LogOut size={18} />
          <span>Logout</span>
        </Link>
        <div className="dashboard-sidebar-profile-main">
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt=""
              width={40}
              height={40}
              className="dashboard-sidebar-avatar"
            />
          )}
          <div className="dashboard-sidebar-profile-info">
            <p className="dashboard-sidebar-name">{session?.user?.name || 'User'}</p>
            <button
              type="button"
              onClick={copyUserId}
              className="dashboard-sidebar-id"
              title={discordId ? `Copy: ${discordId}` : undefined}
              disabled={!discordId}
            >
              <span className="dashboard-sidebar-id-text">{discordId || '—'}</span>
              {discordId && <Copy size={12} className="dashboard-sidebar-id-copy" />}
            </button>
          </div>
          <div className="dashboard-sidebar-actions">
            <div className="dashboard-sidebar-theme">
              <ThemeToggle />
            </div>
            <Link
              href="/dashboard/settings"
              className={`dashboard-sidebar-icon-btn ${pathname === '/dashboard/settings' ? 'active' : ''}`}
              aria-label="Settings"
              title="Settings"
            >
              <Settings size={20} />
            </Link>
          </div>
        </div>
      </div>
    </>
  )

  if (isPending || !session) {
    return (
      <div className="dashboard-nav-wrapper">
        <aside className="dashboard-sidebar">
          <div className="dashboard-sidebar-loading">
            <p>Loading...</p>
          </div>
        </aside>
      </div>
    )
  }

  return (
    <div className="dashboard-nav-wrapper">
      <button
        type="button"
        className="dashboard-burger"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>
      <div
        className={`dashboard-sidebar-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />
      <aside className={`dashboard-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        <button
          type="button"
          className="dashboard-sidebar-close"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        {sidebarContent}
      </aside>
    </div>
  )
}
