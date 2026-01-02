'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/site/Container'
import { GlowCard } from '@/components/brand/GlowCard'
import { Star, Quote } from 'lucide-react'

interface ReviewsSectionProps {
  config: {
    sampleReviews?: { name: string; text: string; stars: number }[]
  }
}

export function ReviewsSection({ config }: ReviewsSectionProps) {
  const reviews = config.sampleReviews || []

  return (
    <section id="reviews" className="py-20 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Clients Say</h2>
          <p className="text-lg text-foreground-secondary">
            Sample reviews from satisfied customers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlowCard hover={true} className="h-full p-6">
                <Quote className="h-8 w-8 text-primary mb-4 opacity-50" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-foreground-secondary mb-4 leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="text-sm font-semibold text-foreground">
                  — {review.name}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

