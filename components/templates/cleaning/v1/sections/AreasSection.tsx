'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/site/Container'
import { MapPin } from 'lucide-react'
import { ServiceAreaMap } from './ServiceAreaMap'
import type { CleaningPreviewConfig } from '@/lib/previews/types'

interface AreasSectionProps {
  config: CleaningPreviewConfig
}

export function AreasSection({ config }: AreasSectionProps) {
  const primaryColor = config.branding.primaryColor || '#FF6A55'
  const accentColor = config.branding.accentColor || '#7B63FF'

  return (
    <section id="areas" className="py-20 relative overflow-hidden">
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
            Service <span style={{ color: primaryColor }}>Areas</span>
          </h2>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
            We proudly serve {config.areasServed.length} areas in and around{' '}
            {config.business.city}, {config.business.state}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Areas List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {config.areasServed.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group"
                >
                  <motion.div
                    className="flex items-center gap-3 p-4 rounded-xl bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-white/10 hover:border-white/20 transition-all"
                    whileHover={{ scale: 1.02, x: 5 }}
                    style={{
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    }}
                  >
                    <MapPin
                      className="h-5 w-5 flex-shrink-0"
                      style={{ color: primaryColor }}
                    />
                    <span className="text-foreground font-medium">{area}</span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <ServiceAreaMap config={config} />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
