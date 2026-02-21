'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'
import { authClient } from '@/lib/auth-client'
import { DashboardSidebar } from '@/components/DashboardSidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("You're not logged in")
      router.push('/login')
    }
  }, [session, isPending, router])

  if (!isPending && !session) {
    return (
      <div className="dashboard-shell">
        <div className="dashboard-loading">Redirecting...</div>
      </div>
    )
  }

  return (
    <div className="dashboard-layout">
        <DashboardSidebar />
        <div className="dashboard-content">{children}</div>
      </div>
  )
}
