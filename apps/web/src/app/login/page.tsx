'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { useEffect } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (!isPending && session) {
      router.push('/dashboard/licenses')
    }
  }, [session, isPending, router])

  const signInWithDiscord = async () => {
    await authClient.signIn.social({
      provider: 'discord',
      callbackURL: '/dashboard/licenses',
    })
  }

  if (isPending) {
    return (
      <section className="page-section login-page">
        <p>Loading...</p>
      </section>
    )
  }

  if (session) {
    return (
      <section className="page-section login-page">
        <p>Redirecting...</p>
      </section>
    )
  }

  return (
    <section className="page-section login-page">
      <h1>Login</h1>
      <p>Sign in with your Discord account to access Ember Studios.</p>
      <button
        type="button"
        onClick={signInWithDiscord}
        className="login-discord-btn"
      >
        Sign in with Discord
      </button>
    </section>
  )
}
