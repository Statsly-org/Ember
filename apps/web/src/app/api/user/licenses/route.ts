import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

const LICENSES_API_URL = process.env.LICENSES_API_URL || 'http://45.131.115.18:20002/user-licenses'

export async function GET() {
  try {
    const accounts = await auth.api.listUserAccounts({
      headers: await headers(),
    })
    const discordAccount = Array.isArray(accounts)
      ? accounts.find((a) => a.providerId === 'discord')
      : null
    const discordId = discordAccount?.accountId ?? null

    if (!discordId) {
      return NextResponse.json({ licenses: [], error: 'No Discord account linked' }, { status: 400 })
    }

    const token = process.env.X_EMBER_TOKEN
    if (!token) {
      return NextResponse.json(
        { licenses: [], error: 'Licenses API not configured' },
        { status: 500 }
      )
    }

    const res = await fetch(`${LICENSES_API_URL}?id=${encodeURIComponent(discordId)}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Ember-Token': token,
      },
    })

    if (!res.ok) {
      let detail = ''
      try {
        const text = await res.text()
        if (text) {
          try {
            const json = JSON.parse(text)
            detail = typeof json.message === 'string' ? json.message
              : typeof json.error === 'string' ? json.error
              : JSON.stringify(json)
          } catch {
            detail = text
          }
        }
      } catch {
        // ignore
      }
      const fullError = detail
        ? `Licenses API error: ${res.status} - ${detail}`
        : `Licenses API error: ${res.status} ${res.statusText || ''}`.trim()
      return NextResponse.json(
        { licenses: [], error: fullError },
        { status: res.status }
      )
    }

    let data: unknown = {}
    try {
      const text = await res.text()
      if (text) data = JSON.parse(text)
    } catch {
      // ignore parse errors
    }
    const licenses = Array.isArray(data)
      ? data
      : Array.isArray(data?.licenses)
        ? data.licenses
        : Array.isArray(data?.data)
          ? data.data
          : []
    return NextResponse.json({ licenses })
  } catch (err) {
    console.error('Licenses fetch error:', err)
    return NextResponse.json(
      { licenses: [], error: 'Failed to fetch licenses' },
      { status: 500 }
    )
  }
}
