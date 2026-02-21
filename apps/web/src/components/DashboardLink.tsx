'use client'

import Link from 'next/link'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'

export function DashboardLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const { data: session, isPending } = authClient.useSession()

  const handleClick = (e: React.MouseEvent) => {
    if (!isPending && !session) {
      e.preventDefault()
      toast.error("You're not logged in")
    }
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
