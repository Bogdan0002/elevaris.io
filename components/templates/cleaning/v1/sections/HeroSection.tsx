'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/site/Container'
import { getGoogleReviewUrl } from '@/lib/previews/helpers'
import { Star, Phone, MessageSquare } from 'lucide-react'

interface HeroSectionProps {
  config: {
    business: { name: string; city: string; state: string; phone: string }
    offer: { shortText: string }
    branding: { primaryColor?: string; accentColor?: string }
    placeId: string
  }
}

export function HeroSection({ config }: HeroSectionProps) {
  const reviewUrl = getGoogleReviewUrl(config.placeId)
  const primaryColor = config.branding.primaryColor || '#FF6A55'
  const accentColor = config.branding.accentColor || '#7B63FF'

  const trustItems = [
    { label: 'Fast Response', icon: '⚡' },
    { label: 'Vetted Cleaners', icon: '✓' },
    { label: 'Satisfaction Focus', icon: '⭐' },
    { label: 'Insured & Bonded', icon: '🛡️' },
  ]

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${primaryColor}40, transparent 50%), radial-gradient(circle at 70% 70%, ${accentColor}40, transparent 50%)`,
        }}
      />

      <Container>
        <div className="text-center space-y-8">
          {/* Logo/Business Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-5xl md:text-7xl font-bold mb-4"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {config.business.name}
            </h1>
            <p className="text-xl text-foreground-secondary">
              Professional Cleaning Services in {config.business.city},{' '}
              {config.business.state}
            </p>
          </motion.div>

          {/* Offer Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="inline-block px-6 py-3 rounded-full border backdrop-blur-sm"
              style={{
                borderColor: `${primaryColor}40`,
                backgroundColor: `${primaryColor}10`,
              }}
            >
              <span className="text-sm font-semibold" style={{ color: primaryColor }}>
                {config.offer.shortText}
              </span>
            </div>
          </motion.div>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                boxShadow: `0 4px 20px ${primaryColor}40`,
              }}
            >
              Leave a Google Review
            </a>
            <a
              href={`tel:${config.business.phone.replace(/\s/g, '')}`}
              className="px-6 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm text-foreground hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm text-foreground hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Get a Quote
            </a>
          </motion.div>

          {/* Trust Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12"
          >
            <div className="inline-block bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-foreground-secondary">
                  Trusted by {config.business.city} residents
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                {trustItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span className="text-foreground-secondary">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Trust Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="pt-8 border-t border-white/10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              {trustItems.map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-foreground-secondary">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

