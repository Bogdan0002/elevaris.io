'use client'

import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Container } from '@/components/site/Container'
import { CheckCircle2, Users, Award, Heart, TrendingUp, Shield, Leaf, ArrowRight, Sparkles, Building } from 'lucide-react'
import type { CleaningPreviewConfig } from '@/lib/previews/types'

interface AboutSectionProps {
  config: CleaningPreviewConfig
}

// Animated counter component
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState(0)

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

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  )
}

export function AboutSection({ config }: AboutSectionProps) {
  const primaryColor = config.branding.primaryColor || '#0EA5E9'
  const accentColor = config.branding.accentColor || '#10B981'
  
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)

  const stats = [
    { label: 'Years Experience', value: 3, suffix: '+', icon: Award },
    { label: 'Happy Customers', value: 500, suffix: '+', icon: Users },
    { label: 'Satisfaction Rate', value: 98, suffix: '%', icon: Heart },
    { label: 'Cleanings Done', value: 2500, suffix: '+', icon: TrendingUp },
  ]

  const features = [
    { 
      icon: Shield, 
      title: 'Fully Insured & Bonded',
      description: 'Complete peace of mind with comprehensive coverage'
    },
    { 
      icon: Leaf, 
      title: 'Eco-Friendly Products',
      description: 'Safe for your family, pets, and the environment'
    },
    { 
      icon: Users, 
      title: 'Vetted Professionals',
      description: 'Background-checked and extensively trained team'
    },
    { 
      icon: Award, 
      title: 'Quality Guaranteed',
      description: '100% satisfaction or we\'ll make it right'
    },
  ]

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden bg-white"
    >
      {/* Background elements */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]"
        style={{
          background: `radial-gradient(circle at 80% 20%, ${primaryColor}, transparent 60%)`,
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: accentColor }}
        animate={{ 
          scale: [1, 1.2, 1],
          x: [-30, 30, -30],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{
                backgroundColor: `${primaryColor}10`,
                color: primaryColor,
              }}
              whileHover={{ scale: 1.05 }}
            >
              <Building className="w-4 h-4" />
              About Us
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
              Your Trusted
              <span 
                className="block"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Cleaning Partner
              </span>
            </h2>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              {config.business.name} has been proudly serving{' '}
              <span className="font-semibold text-slate-800">{config.business.city}, {config.business.state}</span>{' '}
              and surrounding communities with exceptional cleaning services. We believe a clean 
              space is the foundation of a healthy, productive life.
            </p>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              Our team of dedicated professionals brings years of experience, attention to detail, 
              and a genuine passion for creating spotless environments. We treat every home and 
              business as if it were our own.
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="group flex items-start gap-3 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all cursor-default"
                    whileHover={{ y: -2 }}
                  >
                    <motion.div 
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}15, ${accentColor}10)`,
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-5 h-5" style={{ color: primaryColor }} />
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA */}
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Get Your Free Quote</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>

          {/* Right: Stats card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative"
          >
            {/* Main stats card */}
            <div 
              className="relative bg-white rounded-3xl p-8 sm:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100"
            >
              {/* Decorative gradient border */}
              <div 
                className="absolute inset-0 rounded-3xl p-[2px] -z-10"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}30, ${accentColor}30)`,
                }}
              >
                <div className="w-full h-full bg-white rounded-3xl" />
              </div>

              <div className="text-center mb-8">
                <motion.div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}15, ${accentColor}15)`,
                    color: primaryColor,
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                  By The Numbers
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Why Choose {config.business.name}?
                </h3>
                <p className="text-slate-600 text-sm">
                  Numbers that speak for themselves
                </p>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  const isHovered = hoveredStat === index
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="text-center p-5 rounded-2xl transition-all cursor-default"
                      style={{
                        backgroundColor: isHovered ? `${primaryColor}10` : '#f8fafc',
                      }}
                      onMouseEnter={() => setHoveredStat(index)}
                      onMouseLeave={() => setHoveredStat(null)}
                      whileHover={{ y: -4 }}
                    >
                      <motion.div
                        className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center"
                        style={{
                          background: isHovered 
                            ? `linear-gradient(135deg, ${primaryColor}, ${accentColor})`
                            : `linear-gradient(135deg, ${primaryColor}15, ${accentColor}10)`,
                        }}
                        animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
                      >
                        <Icon 
                          className="w-7 h-7 transition-colors" 
                          style={{ color: isHovered ? 'white' : primaryColor }} 
                        />
                      </motion.div>
                      <div 
                        className="text-3xl sm:text-4xl font-bold mb-1"
                        style={{
                          background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-sm text-slate-600 font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* CTA inside card */}
              <motion.a
                href="#contact"
                className="mt-8 w-full py-4 rounded-2xl font-bold text-white text-center flex items-center justify-center gap-2 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                  boxShadow: `0 10px 30px ${primaryColor}25`,
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Get Your Free Quote</span>
                <CheckCircle2 className="w-5 h-5" />
              </motion.a>
            </div>

            {/* Floating accent card */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl shadow-slate-200/50 border border-slate-100 hidden lg:flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`,
                }}
              >
                <Leaf className="w-6 h-6" style={{ color: accentColor }} />
              </div>
              <div>
                <div className="font-bold text-slate-900">Eco-Friendly</div>
                <div className="text-xs text-slate-500">Green cleaning products</div>
              </div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-xl shadow-slate-200/50 border border-slate-100 hidden lg:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                      }}
                    >
                      {['A', 'B', 'C'][i]}
                    </div>
                  ))}
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-900">500+</div>
                  <div className="text-slate-500">Happy clients</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
