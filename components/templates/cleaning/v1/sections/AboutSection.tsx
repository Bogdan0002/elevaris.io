'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/site/Container'
import { CheckCircle2, Users, Award, Heart } from 'lucide-react'
import type { CleaningPreviewConfig } from '@/lib/previews/types'
import { DEFAULT_CLEANING_CONTENT } from '@/lib/previews/defaults'

interface AboutSectionProps {
  config: CleaningPreviewConfig
}

export function AboutSection({ config }: AboutSectionProps) {
  const primaryColor = config.branding.primaryColor || '#FF6A55'
  const accentColor = config.branding.accentColor || '#7B63FF'

  const stats = [
    { label: 'Years Experience', value: '10+', icon: Award },
    { label: 'Happy Customers', value: '500+', icon: Users },
    { label: 'Satisfaction Rate', value: '98%', icon: Heart },
  ]

  const whyUsPoints = DEFAULT_CLEANING_CONTENT.whyUsPoints.map((point, index) => ({
    text: point.replace('Team', `${config.business.name} Team`),
    delay: index * 0.1,
  }))

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${primaryColor}40, transparent 70%)`,
        }}
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span style={{ color: primaryColor }}>{config.business.name}</span>
            </h2>
            <p className="text-lg text-foreground-secondary mb-6 leading-relaxed">
              {config.business.name} is a trusted cleaning service provider serving{' '}
              {config.business.city}, {config.business.state} and surrounding areas. We pride
              ourselves on delivering exceptional cleaning services that exceed expectations.
            </p>
            <p className="text-lg text-foreground-secondary mb-8 leading-relaxed">
              Our team of experienced professionals is dedicated to making your space spotless,
              using eco-friendly products and proven techniques to ensure the highest quality
              results every time.
            </p>

            {/* Why Us Points */}
            <div className="space-y-4">
              {whyUsPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: point.delay }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    className="h-6 w-6 flex-shrink-0 mt-0.5"
                    style={{ color: primaryColor }}
                  />
                  <span className="text-foreground-secondary">{point.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] backdrop-blur-sm"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Icon
                    className="h-8 w-8 mx-auto mb-3"
                    style={{ color: primaryColor }}
                  />
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground-secondary">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

