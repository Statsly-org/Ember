'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'
import { DashboardLink } from './DashboardLink'
import { authClient } from '@/lib/auth-client'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/contact', label: 'Contact' },
  { href: '/rules', label: 'Rules' },
  { href: '/terms', label: 'Terms' },
  { href: '/dashboard', label: 'Dashboard', authOnly: true },
  { href: '/login', label: 'Login' },
  { href: '/logout', label: 'Logout', authOnly: true },
  { href: '/discord', label: 'Discord', external: true },
] as const

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const { data: session } = authClient.useSession()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = NAV_LINKS.filter(
    (link) => !('authOnly' in link && link.authOnly) || session
  )

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <Link href="/" className="logo-link">
          <Image src="/logo.png" alt="Ember Studios" width={40} height={40} className="logo" />
          <span className="logo-text">Ember Studios</span>
        </Link>
        <nav className="nav">
          {links.map(({ href, label, external }) =>
            href === '/dashboard' ? (
              <DashboardLink
                key={href}
                href={href}
                className={pathname === href ? 'active' : ''}
              >
                {label}
              </DashboardLink>
            ) : (
              <Link
                key={href}
                href={href}
                className={pathname === href ? 'active' : ''}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {label}
              </Link>
            )
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
