import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const accounts = await auth.api.listUserAccounts({
      headers: await headers(),
    })
    const discordAccount = Array.isArray(accounts)
      ? accounts.find((a) => a.providerId === 'discord')
      : null
    const discordId = discordAccount?.accountId ?? null
    return NextResponse.json({ discordId })
  } catch {
    return NextResponse.json({ discordId: null })
  }
}
