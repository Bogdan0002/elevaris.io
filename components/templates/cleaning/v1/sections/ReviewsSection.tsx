'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Container } from '@/components/site/Container'
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquare, ExternalLink, User } from 'lucide-react'
import { getGoogleReviewUrl } from '@/lib/previews/helpers'

interface ReviewsSectionProps {
  config: {
    sampleReviews?: { name: string; text: string; stars: number }[]
    placeId: string
    business: { name: string; city: string }
    branding: { primaryColor?: string; accentColor?: string }
  }
}

export function ReviewsSection({ config }: ReviewsSectionProps) {
  const primaryColor = config.branding.primaryColor || '#0EA5E9'
  const accentColor = config.branding.accentColor || '#10B981'
  const reviews = config.sampleReviews || []
  const reviewUrl = getGoogleReviewUrl(config.placeId)
  
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || reviews.length <= 1) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, reviews.length])

  const nextReview = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  if (reviews.length === 0) return null

  return (
    <section 
      id="reviews" 
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, white 0%, #fafafa 50%, white 100%),
            radial-gradient(ellipse 80% 50% at 80% 20%, ${primaryColor}05 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 20% 80%, ${accentColor}05 0%, transparent 50%)
          `,
        }}
      />
      
      {/* Animated decorative elements */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ background: primaryColor }}
        animate={{ 
          scale: [1, 1.2, 1],
          x: [-20, 20, -20],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{ background: accentColor }}
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [20, -20, 20],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <Container className="relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{
              backgroundColor: `${primaryColor}10`,
              color: primaryColor,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <MessageSquare className="w-4 h-4" />
            Customer Reviews
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            What Our Clients
            <span 
              className="block mt-2"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Are Saying
            </span>
          </h2>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what {config.business.city}{' '}
            residents have to say about {config.business.name}.
          </p>

          {/* Overall rating display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-4 mt-8 px-6 py-3 rounded-2xl bg-white shadow-lg shadow-slate-200/50 border border-slate-100"
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div className="text-left">
              <div className="font-bold text-slate-900">5.0 Rating</div>
              <div className="text-xs text-slate-500">Based on Google Reviews</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Reviews carousel for mobile */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
              >
                {/* Quote icon */}
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}15, ${accentColor}10)`,
                  }}
                >
                  <Quote className="w-7 h-7" style={{ color: primaryColor }} />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(reviews[activeIndex]?.stars || 5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Review text */}
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  &ldquo;{reviews[activeIndex]?.text}&rdquo;
                </p>

                {/* Reviewer */}
                <div className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                    }}
                  >
                    {reviews[activeIndex]?.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-lg">
                      {reviews[activeIndex]?.name}
                    </div>
                    <div className="text-sm text-slate-500 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      Verified Customer
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {reviews.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <motion.button
                  onClick={prevReview}
                  className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-slate-300 transition-colors shadow-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <div className="flex gap-2">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setIsAutoPlaying(false)
                        setActiveIndex(i)
                      }}
                      className={`h-2 rounded-full transition-all ${
                        i === activeIndex ? 'w-8' : 'w-2'
                      }`}
                      style={{
                        backgroundColor: i === activeIndex ? primaryColor : `${primaryColor}30`,
                      }}
                    />
                  ))}
                </div>
                <motion.button
                  onClick={nextReview}
                  className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-slate-300 transition-colors shadow-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Reviews grid for desktop */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="group"
            >
              <motion.div
                className="h-full bg-white rounded-3xl p-8 border border-slate-100 relative overflow-hidden"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                }}
                whileHover={{ 
                  y: -8,
                  boxShadow: `0 20px 40px ${primaryColor}10`,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Quote icon */}
                <motion.div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}15, ${accentColor}10)`,
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Quote className="w-7 h-7" style={{ color: primaryColor }} />
                </motion.div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.stars)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 + i * 0.05, type: 'spring' }}
                    >
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Review text */}
                <p className="text-slate-700 leading-relaxed mb-6 flex-grow">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Reviewer */}
                <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                    }}
                  >
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{review.name}</div>
                    <div className="text-sm text-slate-500 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      Verified Customer
                    </div>
                  </div>
                </div>

                {/* Hover accent */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{
                    background: `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
                  }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Corner glow */}
                <div 
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle, ${primaryColor}10, transparent 70%)`,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA to leave review */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div 
            className="inline-flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 rounded-3xl border"
            style={{
              backgroundColor: `${primaryColor}05`,
              borderColor: `${primaryColor}15`,
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}15)`,
                }}
              >
                <User className="w-7 h-7" style={{ color: primaryColor }} />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 text-lg">Had a great experience?</p>
                <p className="text-sm text-slate-500">We&apos;d love to hear from you!</p>
              </div>
            </div>
            <motion.a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl font-bold text-white flex items-center gap-2 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                boxShadow: `0 4px 20px ${primaryColor}30`,
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Star className="w-5 h-5" />
              Leave a Google Review
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
