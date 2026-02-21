import { NextResponse } from 'next/server'

const FALLBACK = {
  licenses: 1250,
  averageReview: 4.9,
  happyCustomers: 890,
  projectsDelivered: 450,
}

export async function GET() {
  const apiUrl = process.env.STATS_API_URL
  if (!apiUrl) {
    return NextResponse.json(FALLBACK)
  }

  try {
    const res = await fetch(apiUrl, { next: { revalidate: 60 } })
    const data = await res.json()
    return NextResponse.json({
      licenses: data.licenses ?? FALLBACK.licenses,
      averageReview: data.averageReview ?? FALLBACK.averageReview,
      happyCustomers: data.happyCustomers ?? FALLBACK.happyCustomers,
      projectsDelivered: data.projectsDelivered ?? FALLBACK.projectsDelivered,
    })
  } catch {
    return NextResponse.json(FALLBACK)
  }
}
