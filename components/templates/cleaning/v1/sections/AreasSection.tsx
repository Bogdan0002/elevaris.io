'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/site/Container'
import { ServiceAreaMap } from './ServiceAreaMap'

interface AreasSectionProps {
  config: {
    areasServed: string[]
    map?: { lat?: number; lng?: number; radiusMiles?: number }
  }
}

export function AreasSection({ config }: AreasSectionProps) {
  return (
    <section id="areas" className="py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Service Areas</h2>
          <p className="text-lg text-foreground-secondary">
            We proudly serve the following areas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Areas List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              {config.areasServed.map((area, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-white/10 hover:border-primary/30 transition-all"
                >
                  <span className="text-foreground">{area}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-[400px] rounded-2xl overflow-hidden"
          >
            <ServiceAreaMap config={config} />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

