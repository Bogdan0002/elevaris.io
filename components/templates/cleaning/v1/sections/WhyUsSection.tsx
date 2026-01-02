'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/site/Container'
import { CheckCircle2, Shield, Leaf, Clock, Award, Users } from 'lucide-react'
import type { CleaningPreviewConfig } from '@/lib/previews/types'
import { DEFAULT_CLEANING_CONTENT } from '@/lib/previews/defaults'

interface WhyUsSectionProps {
  config: CleaningPreviewConfig
}

const whyUsIcons = [Award, Shield, Leaf, Clock, Users, CheckCircle2]

export function WhyUsSection({ config }: WhyUsSectionProps) {
  const primaryColor = config.branding.primaryColor || '#FF6A55'
  const accentColor = config.branding.accentColor || '#7B63FF'
  
  // Personalize points with business name/city
  const whyUsPoints = DEFAULT_CLEANING_CONTENT.whyUsPoints.map((point, index) => {
    let personalized = point
    if (index === 0) {
      personalized = `Experienced ${config.business.name} Team`
    } else if (index === 1) {
      personalized = `Trusted by ${config.business.city} Residents`
    }
    return {
      text: personalized,
      icon: whyUsIcons[index % whyUsIcons.length],
    }
  })

  return (
    <section className="py-20 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentColor}40, transparent 70%)`,
        }}
      />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span style={{ color: primaryColor }}>{config.business.name}</span>
          </h2>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
            What sets us apart from the competition and makes us the trusted choice in{' '}
            {config.business.city}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyUsPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <motion.div
                  className="flex flex-col items-start gap-4 p-6 rounded-2xl bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-white/10 hover:border-white/20 transition-all h-full"
                  whileHover={{ scale: 1.02, y: -5 }}
                  style={{
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                >
                  <motion.div
                    className="p-3 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: primaryColor }}
                    />
                  </motion.div>
                  <p className="text-foreground font-medium leading-relaxed flex-grow">
                    {point.text}
                  </p>
                  <motion.div
                    className="w-full h-1 rounded-full overflow-hidden"
                    style={{ backgroundColor: `${primaryColor}10` }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
