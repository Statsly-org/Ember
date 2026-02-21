'use client'

import { useEffect, useState } from 'react'

export function PageLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="page-loader" aria-hidden>
      <div className="page-loader-bar" />
    </div>
  )
}
