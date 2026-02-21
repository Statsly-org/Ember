'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Home, Mail, FileText, FileCheck, LogIn, LogOut, LayoutDashboard, MessageCircle } from 'lucide-react'
import { DashboardLink } from './DashboardLink'
import { authClient } from '@/lib/auth-client'

const ST3IX_DISCORD = process.env.DISCORD_ST3IX_URL || 'https://discord.com/users/1451891299396616206'

const FOOTER_SECTIONS = [
  {
    heading: 'Navigation',
    links: [
      { href: '/', label: 'Home', icon: Home, external: false },
      { href: '/contact', label: 'Contact', icon: Mail, external: false },
      { href: '/rules', label: 'Rules', icon: FileText, external: false },
      { href: '/terms', label: 'Terms', icon: FileCheck, external: false },
    ],
  },
  {
    heading: 'Account',
    links: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, authOnly: true, external: false },
      { href: '/login', label: 'Login', icon: LogIn, external: false },
      { href: '/logout', label: 'Logout', icon: LogOut, authOnly: true, external: false },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { href: '/discord', label: 'Discord', icon: MessageCircle, external: true },
    ],
  },
]

export function Footer() {
  const { data: session } = authClient.useSession()

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" className="footer-brand-link">
            <Image src="/logo.png" alt="" width={32} height={32} className="footer-logo" />
            <span className="footer-title">Ember Studios</span>
          </Link>
          <p className="footer-tagline">
            Trusted Minecraft Developers. Premium plugins, custom development, and expert solutions.
          </p>
        </div>
        <div className="footer-sections">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.heading} className="footer-section">
              <h4 className="footer-heading">{section.heading}</h4>
              {section.links
                .filter((link) => !('authOnly' in link && link.authOnly) || session)
                .map(({ href, label, icon: Icon, external = false }) =>
                href === '/dashboard' ? (
                  <DashboardLink
                    key={href}
                    href={href}
                    className={`footer-link ${external ? 'footer-discord' : ''}`}
                  >
                    <Icon size={16} className="footer-link-icon" />
                    <span>{label}</span>
                  </DashboardLink>
                ) : (
                  <Link
                    key={href}
                    href={href}
                    className={`footer-link ${external ? 'footer-discord' : ''}`}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <Icon size={16} className="footer-link-icon" />
                    <span>{label}</span>
                  </Link>
                )
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-credit">
          Made with <span className="heart">♥</span> by{' '}
          <a
            href={ST3IX_DISCORD}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-st3ix"
          >
            St3ix
          </a>
        </p>
      </div>
    </footer>
  )
}
