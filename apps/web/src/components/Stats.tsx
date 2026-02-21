'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export interface StatsData {
  licenses: number
  averageReview: number
  happyCustomers: number
  projectsDelivered: number
}

const FALLBACK_STATS: StatsData = {
  licenses: 1250,
  averageReview: 4.9,
  happyCustomers: 890,
  projectsDelivered: 450,
}

export function Stats() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // /api/stats proxies to STATS_API_URL (external domain) or returns fallback
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats({
          licenses: data.licenses ?? FALLBACK_STATS.licenses,
          averageReview: data.averageReview ?? FALLBACK_STATS.averageReview,
          happyCustomers: data.happyCustomers ?? FALLBACK_STATS.happyCustomers,
          projectsDelivered: data.projectsDelivered ?? FALLBACK_STATS.projectsDelivered,
        })
      })
      .catch(() => setStats(FALLBACK_STATS))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="stats-section">
        <h2 className="stats-title">Our track record</h2>
        <div className="stats-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="stat-card loading">
              <div className="stat-value skeleton" />
              <div className="stat-label skeleton" style={{ width: '60%' }} />
            </div>
          ))}
        </div>
      </section>
    )
  }

  const data = stats ?? FALLBACK_STATS
  const cards = [
    { value: data.licenses.toLocaleString() + '+', label: 'Licenses Sold' },
    { value: data.averageReview.toFixed(1), label: 'Average Review' },
    { value: data.happyCustomers.toLocaleString() + '+', label: 'Happy Customers' },
    { value: data.projectsDelivered.toLocaleString() + '+', label: 'Projects Delivered' },
  ]

  return (
    <section className="stats-section">
      <h2 className="stats-title">Our track record</h2>
      <div className="stats-grid">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            className="stat-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="stat-value">{card.value}</span>
            <span className="stat-label">{card.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
