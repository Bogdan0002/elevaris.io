'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { CleaningPreviewConfig } from '@/lib/previews/types'

interface NavbarProps {
  config: CleaningPreviewConfig
}

export function Navbar({ config }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Areas', href: '#areas' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'top-0' : ''
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`rounded-2xl border transition-all duration-300 ${
            scrolled
              ? 'bg-[#0B0B0B]/95 backdrop-blur-md border-white/10 shadow-lg'
              : 'bg-transparent border-white/5'
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <motion.div
              className="text-xl font-bold"
              style={{
                background: `linear-gradient(135deg, ${config.branding.primaryColor}, ${config.branding.accentColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {config.business.name}
            </motion.div>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-foreground-secondary hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href={`tel:${config.business.phone.replace(/\s/g, '')}`}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-[#7b63ff] text-white text-sm font-medium hover:brightness-110 transition-all"
              style={{
                '--primary': config.branding.primaryColor,
              } as React.CSSProperties}
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

