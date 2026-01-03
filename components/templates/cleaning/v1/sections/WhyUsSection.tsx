'use client'

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Container } from '@/components/site/Container'
import { 
  CheckCircle2, 
  Shield, 
  Leaf, 
  Clock, 
  Award, 
  Users,
  Sparkles,
  BadgeCheck,
  HeartHandshake,
  Zap,
  Phone,
  ArrowRight,
  Star
} from 'lucide-react'
import type { CleaningPreviewConfig } from '@/lib/previews/types'

interface WhyUsSectionProps {
  config: CleaningPreviewConfig
}

// Animated number component
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: 'easeOut',
        onUpdate: (v) => setDisplayValue(Math.round(v)),
      })
      return () => controls.stop()
    }
  }, [isInView, value])
  
  return <span ref={ref}>{displayValue}{suffix}</span>
}

export function WhyUsSection({ config }: WhyUsSectionProps) {
  const primaryColor = config.branding.primaryColor || '#0EA5E9'
  const accentColor = config.branding.accentColor || '#10B981'
  
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const whyUsReasons = [
    {
      icon: Award,
      title: 'Experienced Team',
      description: `${config.business.name}'s professionals bring years of expertise to every cleaning job.`,
      highlight: '3+ Years',
      stat: 10,
      statSuffix: '+',
    },
    {
      icon: Shield,
      title: 'Fully Insured',
      description: 'Complete peace of mind with comprehensive insurance coverage protecting your property.',
      highlight: '100% Coverage',
      stat: 100,
      statSuffix: '%',
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'We use environmentally responsible products safe for your family and pets.',
      highlight: 'Green Certified',
      stat: null,
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Book at your convenience with same-day availability and flexible appointment times.',
      highlight: 'Same-Day',
      stat: null,
    },
    {
      icon: BadgeCheck,
      title: 'Background Checked',
      description: 'Every team member undergoes thorough background checks and professional training.',
      highlight: 'Verified Staff',
      stat: null,
    },
    {
      icon: HeartHandshake,
      title: 'Satisfaction Guaranteed',
      description: "Not happy? We'll re-clean for free. Your satisfaction is our top priority.",
      highlight: '100% Guarantee',
      stat: 100,
      statSuffix: '%',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
    },
  }

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, white 0%, ${primaryColor}03 30%, ${accentColor}03 70%, white 100%),
            radial-gradient(ellipse 100% 50% at 50% 100%, ${primaryColor}08 0%, transparent 50%)
          `,
        }}
      />

      {/* Animated decorative elements */}
      <motion.div
        className="absolute top-1/4 -left-32 w-64 h-64 rounded-full blur-3xl opacity-25"
        style={{ background: primaryColor }}
        animate={{ 
          x: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-3xl opacity-20"
        style={{ background: accentColor }}
        animate={{ 
          x: [0, -50, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
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
              backgroundColor: `${accentColor}15`,
              color: accentColor,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Star className="w-4 h-4" />
            Why Choose Us
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            The {config.business.name}
            <span 
              className="block mt-2"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Difference
            </span>
          </h2>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We&apos;re not just another cleaning company. Here&apos;s why {config.business.city} 
            residents trust us with their homes and businesses.
          </p>
        </motion.div>

        {/* Reasons grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {whyUsReasons.map((reason, index) => {
            const Icon = reason.icon
            const isHovered = hoveredIndex === index
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  className="relative h-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 overflow-hidden"
                  style={{
                    boxShadow: isHovered 
                      ? `0 25px 50px -12px ${primaryColor}15, 0 0 0 1px ${primaryColor}15`
                      : '0 4px 20px rgba(0, 0, 0, 0.03)',
                  }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Highlight badge */}
                  <motion.div
                    className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{
                      background: isHovered 
                        ? `linear-gradient(135deg, ${primaryColor}, ${accentColor})`
                        : `linear-gradient(135deg, ${primaryColor}15, ${accentColor}15)`,
                      color: isHovered ? 'white' : primaryColor,
                    }}
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                  >
                    {reason.highlight}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                    style={{
                      background: isHovered 
                        ? `linear-gradient(135deg, ${primaryColor}, ${accentColor})`
                        : `linear-gradient(135deg, ${primaryColor}15, ${accentColor}10)`,
                    }}
                    animate={{
                      scale: isHovered ? 1.1 : 1,
                      rotate: isHovered ? 5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon 
                      className="w-8 h-8 transition-colors duration-300" 
                      style={{ color: isHovered ? 'white' : primaryColor }} 
                    />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm mb-4">
                    {reason.description}
                  </p>

                  {/* Animated stat (if available) */}
                  {reason.stat && (
                    <div 
                      className="text-3xl font-bold"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      <AnimatedNumber value={reason.stat} suffix={reason.statSuffix} />
                    </div>
                  )}

                  {/* Bottom accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{
                      background: `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
                    }}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Corner glow */}
                  <motion.div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${primaryColor}15, transparent 70%)`,
                    }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Trust banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <div 
            className="relative rounded-3xl p-8 sm:p-12 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
            }}
          >
            {/* Background pattern */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            {/* Floating elements */}
            <motion.div
              className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10"
              animate={{ 
                y: [0, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-white/10"
              animate={{ 
                y: [0, 15, 0],
                scale: [1.1, 1, 1.1],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />

            <div className="relative z-10 text-center text-white">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-white/20 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
              >
                <Zap className="w-4 h-4" />
                Limited Time Offer
              </motion.div>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Ready for a Spotless Space?
              </h3>
              <p className="text-white/90 max-w-xl mx-auto mb-8 text-lg">
                Join hundreds of satisfied customers in {config.business.city}. 
                Book your first cleaning today and see the difference.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  href={`tel:${config.business.phone.replace(/\s/g, '')}`}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold bg-white flex items-center justify-center gap-2 shadow-xl"
                  style={{ color: primaryColor }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-5 h-5" />
                  Call {config.business.phone}
                </motion.a>
                <motion.a
                  href="#contact"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Get Free Quote
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
