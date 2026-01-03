'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/site/Container'
import { Check } from 'lucide-react'

interface PricingSectionProps {
  config: {
    branding: { primaryColor?: string; accentColor?: string }
  }
}

const pricingTiers = [
  {
    name: 'Launch',
    price: '$99',
    setup: '$249',
    features: [
      'Basic website',
      'Contact form',
      'Service listings',
      'Mobile responsive',
      'Email support',
    ],
    popular: false,
  },
  {
    name: 'Growth',
    price: '$149',
    setup: '$549',
    features: [
      'Everything in Launch',
      'Advanced SEO',
      'Review integration',
      'Analytics dashboard',
      'Priority support',
      'Monthly updates',
    ],
    popular: true,
  },
  {
    name: 'Accelerator',
    price: '$299',
    setup: '$999',
    features: [
      'Everything in Growth',
      'Custom features',
      'Dedicated account manager',
      '24/7 support',
      'Advanced automation',
      'White-label options',
    ],
    popular: false,
  },
]

export function PricingSection({ config }: PricingSectionProps) {
  const primaryColor = config.branding.primaryColor || '#00A8E8'
  const accentColor = config.branding.accentColor || '#00C896'

  return (
    <section id="pricing" className="py-20 bg-slate-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Pricing Plans</h2>
          <p className="text-lg text-slate-600">
            Choose the plan that fits your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-2xl border p-8 ${
                tier.popular
                  ? `border-2 scale-105 shadow-xl`
                  : 'border-slate-200 shadow-md'
              } bg-white`}
              style={
                tier.popular
                  ? {
                      borderColor: primaryColor,
                    }
                  : {}
              }
            >
              {tier.popular && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                  }}
                >
                  Most Popular
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-slate-900">{tier.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                  <span className="text-slate-600">/mo</span>
                </div>
                <div className="text-sm text-slate-500">
                  + {tier.setup} setup
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: primaryColor }} />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  tier.popular
                    ? 'text-white hover:scale-105 shadow-lg'
                    : 'border-2 border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
                style={
                  tier.popular
                    ? {
                        background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                      }
                    : {}
                }
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

