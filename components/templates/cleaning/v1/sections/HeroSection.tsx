'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/site/Container'
import { getGoogleReviewUrl } from '@/lib/previews/helpers'
import { Star, Phone, MessageSquare, Sparkles } from 'lucide-react'
import { DEFAULT_CLEANING_CONTENT } from '@/lib/previews/defaults'

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
  const trustItems = DEFAULT_CLEANING_CONTENT.trustBadges

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="relative pt-32 pb-24 overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${primaryColor}40, transparent 50%), radial-gradient(circle at 70% 70%, ${accentColor}40, transparent 50%)`,
        }}
        animate={{
          background: [
            `radial-gradient(circle at 30% 30%, ${primaryColor}40, transparent 50%), radial-gradient(circle at 70% 70%, ${accentColor}40, transparent 50%)`,
            `radial-gradient(circle at 40% 40%, ${primaryColor}50, transparent 50%), radial-gradient(circle at 60% 60%, ${accentColor}50, transparent 50%)`,
            `radial-gradient(circle at 30% 30%, ${primaryColor}40, transparent 50%), radial-gradient(circle at 70% 70%, ${accentColor}40, transparent 50%)`,
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => {
          const randomX = 20 + Math.random() * 60 // 20-80%
          const randomY = 20 + Math.random() * 60 // 20-80%
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                opacity: 0.3,
                left: `${randomX}%`,
                top: `${randomY}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 40 - 20, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            />
          )
        })}
      </div>

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-8 relative z-10"
        >
          {/* Logo/Business Name */}
          <motion.div variants={itemVariants}>
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {config.business.name}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-foreground-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Professional Cleaning Services in {config.business.city},{' '}
              {config.business.state}
            </motion.p>
          </motion.div>

          {/* Offer Badge */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border backdrop-blur-sm"
              style={{
                borderColor: `${primaryColor}40`,
                backgroundColor: `${primaryColor}10`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="h-4 w-4" style={{ color: primaryColor }} />
              <span className="text-sm font-semibold" style={{ color: primaryColor }}>
                {config.offer.shortText}
              </span>
            </motion.div>
          </motion.div>

          {/* CTA Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <motion.a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl font-semibold text-white text-base flex items-center gap-2 transition-all"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                boxShadow: `0 4px 20px ${primaryColor}40`,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 6px 30px ${primaryColor}60`,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Star className="h-5 w-5" />
              Leave a Google Review
            </motion.a>
            <motion.a
              href={`tel:${config.business.phone.replace(/\s/g, '')}`}
              className="px-8 py-4 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm text-foreground hover:bg-white/10 transition-all flex items-center gap-2 font-semibold"
              whileHover={{ scale: 1.05, borderColor: primaryColor }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="h-5 w-5" />
              Call Now
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-4 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm text-foreground hover:bg-white/10 transition-all flex items-center gap-2 font-semibold"
              whileHover={{ scale: 1.05, borderColor: accentColor }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare className="h-5 w-5" />
              Get a Quote
            </motion.a>
          </motion.div>

          {/* Trust Card */}
          <motion.div
            variants={itemVariants}
            className="pt-8"
          >
            <motion.div
              className="inline-block bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-white/10 rounded-2xl p-8 backdrop-blur-sm max-w-2xl"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                    >
                      <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-sm text-foreground-secondary">
                  Trusted by {config.business.city} residents
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {trustItems.map((item, i) => (
                  <motion.div
                    key={i}
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div className="text-foreground-secondary font-medium">{item.label}</div>
                    <div className="text-xs text-foreground-muted mt-1">{item.description}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
