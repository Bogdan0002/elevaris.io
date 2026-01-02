'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/site/Container'
import { GlowCard } from '@/components/brand/GlowCard'
import { Sparkles, Home, Building2, Droplets, Shirt, Brush, WashingMachine } from 'lucide-react'
import { DEFAULT_CLEANING_CONTENT } from '@/lib/previews/defaults'

interface ServicesSectionProps {
  config: {
    services: string[]
    branding: { primaryColor?: string; accentColor?: string }
  }
}

const serviceIcons = [
  Sparkles,
  Home,
  Building2,
  Droplets,
  Shirt,
  Brush,
  WashingMachine,
  Sparkles,
  Home,
  Building2,
]

export function ServicesSection({ config }: ServicesSectionProps) {
  const primaryColor = config.branding.primaryColor || '#FF6A55'
  const accentColor = config.branding.accentColor || '#7B63FF'
  const serviceDescriptions = DEFAULT_CLEANING_CONTENT.serviceDescriptions

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${primaryColor}40, transparent 70%)`,
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
            Our <span style={{ color: primaryColor }}>Services</span>
          </h2>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
            Comprehensive cleaning solutions tailored to meet your every need. From regular
            maintenance to deep cleaning, we&apos;ve got you covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.services.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length]
            const description =
              serviceDescriptions[service as keyof typeof serviceDescriptions] ||
              `Professional ${service.toLowerCase()} services tailored to your needs.`

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <GlowCard
                  hover={true}
                  className="h-full p-6 group cursor-pointer"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div
                        className="p-4 rounded-xl flex-shrink-0"
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
                      <div className="flex-1">
                        <h3
                          className="text-xl font-semibold mb-2 group-hover:transition-colors"
                          style={{
                            color: 'inherit',
                          }}
                        >
                          {service}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-foreground-secondary leading-relaxed flex-grow">
                      {description}
                    </p>
                    <motion.div
                      className="mt-4 pt-4 border-t border-white/5"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <span
                        className="text-xs font-medium"
                        style={{ color: primaryColor }}
                      >
                        Learn more →
                      </span>
                    </motion.div>
                  </div>
                </GlowCard>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
