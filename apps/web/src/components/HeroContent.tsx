'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function HeroContent() {
  return (
    <motion.div
      className="hero-content"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hero-logo">
        <Image
          src="/logo.png"
          alt="Ember Studios"
          width={120}
          height={120}
          priority
        />
      </div>
      <h1 className="hero-title">
        Trusted Minecraft
        <br />
        <span className="hero-title-accent">Developers</span>
      </h1>
      <p className="hero-subtitle">
        A studio founded by multiple Trusted Minecraft Developers.
        Premium plugins, custom development, and expert solutions.
      </p>
      <Link
        href="/discord"
        className="hero-cta"
        target="_blank"
        rel="noopener noreferrer"
      >
        Join Discord
      </Link>
    </motion.div>
  )
}
