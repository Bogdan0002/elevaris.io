'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/site/Container'
import { CheckCircle2 } from 'lucide-react'

interface WhyUsSectionProps {
  config: {
    business: { name: string; city: string }
  }
}

const whyUsPoints = [
  'Experienced & Trusted Team',
  'Eco-Friendly Cleaning Products',
  '100% Satisfaction Guarantee',
  'Flexible Scheduling',
  'Fully Insured & Bonded',
  'Same-Day Service Available',
]

export function WhyUsSection({ config }: WhyUsSectionProps) {
  // Personalize at least 2 points with business name/city
  const personalizedPoints = [
    `${config.business.name} has been serving ${config.business.city} for years`,
    `Trusted by ${config.business.city} residents and businesses`,
    ...whyUsPoints.slice(2),
  ]

  return (
    <section className="py-20 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-lg text-foreground-secondary">
            What sets {config.business.name} apart from the rest
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalizedPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-start gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all"
            >
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-foreground">{point}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

