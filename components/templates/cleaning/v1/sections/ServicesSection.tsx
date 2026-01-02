'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/site/Container'
import { GlowCard } from '@/components/brand/GlowCard'
import { Sparkles, Home, Building2, Droplets, Shirt } from 'lucide-react'

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
  Sparkles,
  Home,
  Building2,
  Droplets,
  Shirt,
]

export function ServicesSection({ config }: ServicesSectionProps) {
  const primaryColor = config.branding.primaryColor || '#FF6A55'
  const accentColor = config.branding.accentColor || '#7B63FF'

  return (
    <section id="services" className="py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-foreground-secondary">
            Comprehensive cleaning solutions for {config.services.length > 0 ? 'your' : ''} every need
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.services.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlowCard
                  hover={true}
                  className="h-full p-6 group cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
                      }}
                    >
                      <Icon
                        className="h-6 w-6"
                        style={{ color: primaryColor }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {service}
                      </h3>
                      <p className="text-sm text-foreground-secondary">
                        Professional {service.toLowerCase()} services tailored to your needs.
                      </p>
                    </div>
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

