'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const signOut = async () => {
      await authClient.signOut()
      router.replace('/')
    }
    signOut()
  }, [router])

  return (
    <section className="page-section logout-page">
      <p>Signing out...</p>
    </section>
  )
}
