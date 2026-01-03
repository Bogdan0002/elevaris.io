'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Container } from '@/components/site/Container'
import { 
  Home, 
  Building2, 
  Sparkles, 
  Wind,
  Droplets,
  Sofa,
  ArrowRight,
  CheckCircle2,
  Star,
  Zap,
  Shield,
  Clock
} from 'lucide-react'

interface ServicesSectionProps {
  config: {
    branding: { primaryColor?: string; accentColor?: string }
    business: { name: string }
  }
}

// Static services for all cleaning companies
const CLEANING_SERVICES = [
  {
    name: 'Residential Cleaning',
    icon: Home,
    description: 'Regular maintenance cleaning for homes and apartments. We keep your living space spotless with eco-friendly products and attention to detail.',
    features: ['Weekly/Bi-weekly options', 'All rooms included', 'Eco-friendly products', 'Flexible scheduling'],
    badge: { text: 'Most Popular', icon: Star },
  },
  {
    name: 'Commercial Cleaning',
    icon: Building2,
    description: 'Professional cleaning services for offices, retail spaces, and businesses. After-hours available to minimize disruption.',
    features: ['After-hours available', 'Custom schedules', 'Professional team', 'Commercial-grade equipment'],
    badge: { text: 'For Business', icon: Building2 },
  },
  {
    name: 'Deep Cleaning',
    icon: Sparkles,
    description: 'Intensive top-to-bottom cleaning service. Perfect for move-ins, special occasions, or when you need that extra level of cleanliness.',
    features: ['Top to bottom clean', 'Hard-to-reach areas', 'Sanitization included', 'Appliance cleaning'],
    badge: { text: 'Best Value', icon: Zap },
  },
  {
    name: 'Move-in/Move-out Cleaning',
    icon: Wind,
    description: 'Comprehensive cleaning service for when you\'re moving. We ensure your old or new space is immaculate and ready.',
    features: ['Full property coverage', 'Appliance cleaning', 'Same-day available', 'Carpet & window cleaning'],
  },
  {
    name: 'Window Cleaning',
    icon: Droplets,
    description: 'Crystal-clear windows inside and out. Streak-free finish that lets natural light flood your space beautifully.',
    features: ['Interior & exterior', 'Streak-free finish', 'Screen cleaning', 'Regular maintenance plans'],
  },
  {
    name: 'Carpet & Upholstery Cleaning',
    icon: Sofa,
    description: 'Deep extraction cleaning to remove stains, odors, and allergens. Professional equipment ensures fast drying and lasting results.',
    features: ['Deep extraction', 'Stain removal', 'Fast drying', 'Pet-friendly solutions'],
  },
]

export function ServicesSection({ config }: ServicesSectionProps) {
  const primaryColor = config.branding.primaryColor || '#0EA5E9'
  const accentColor = config.branding.accentColor || '#10B981'
  
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  }

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Premium background with animated gradients */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 100% 60% at 50% 0%, ${primaryColor}08 0%, transparent 60%),
              radial-gradient(ellipse 80% 50% at 0% 100%, ${accentColor}06 0%, transparent 50%),
              radial-gradient(ellipse 80% 50% at 100% 100%, ${primaryColor}06 0%, transparent 50%),
              linear-gradient(180deg, white 0%, #fafafa 50%, white 100%)
            `,
          }}
        />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${primaryColor}12 0%, transparent 70%)` }}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${accentColor}10 0%, transparent 70%)` }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      
      {/* Decorative top accent line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{
          background: `linear-gradient(90deg, transparent, ${primaryColor}40, ${accentColor}40, transparent)`,
        }}
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold mb-6 shadow-sm"
            style={{
              backgroundColor: `${primaryColor}10`,
              color: primaryColor,
              border: `1px solid ${primaryColor}20`,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4" />
            Our Services
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900">
            Professional Cleaning
            <span 
              className="block mt-2"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Services
            </span>
          </h2>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Comprehensive cleaning solutions designed to keep your space immaculate. 
            From routine maintenance to specialized deep cleaning, we&apos;ve got you covered.
          </p>
        </motion.div>

        {/* Premium services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {CLEANING_SERVICES.map((service, index) => {
            const Icon = service.icon
            const isHovered = false // We'll use CSS hover instead

            return (
              <motion.div
                key={service.name}
                variants={cardVariants}
                className="group relative"
              >
                <motion.div
                  className="relative h-full bg-white rounded-3xl p-8 border border-slate-100 overflow-hidden shadow-lg shadow-slate-200/30 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500"
                  style={{
                    borderColor: 'rgba(148, 163, 184, 0.2)',
                  }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  {/* Animated gradient overlay on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}05, ${accentColor}05)`,
                    }}
                  />

                  {/* Badge */}
                  {service.badge && (
                    <motion.div
                      className="absolute top-5 right-5 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-lg z-20"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                        boxShadow: `0 4px 12px ${primaryColor}40`,
                      }}
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05, type: 'spring' }}
                    >
                      <service.badge.icon className="w-3 h-3" />
                      {service.badge.text}
                    </motion.div>
                  )}

                  {/* Icon with animated background */}
                  <motion.div
                    className="relative w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}15, ${accentColor}10)`,
                    }}
                    whileHover={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                    }}
                  >
                    <Icon 
                      className="w-10 h-10 transition-colors duration-300" 
                      style={{ color: primaryColor }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <Icon 
                      className="w-10 h-10 absolute transition-opacity duration-300 opacity-0 group-hover:opacity-100 text-white" 
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-slate-900 transition-colors">
                      {service.name}
                    </h3>
                    
                    <p className="text-slate-600 mb-6 leading-relaxed text-[15px]">
                      {service.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-center gap-3 text-sm text-slate-700"
                          initial={{ opacity: 0.8, x: 0 }}
                          whileHover={{ opacity: 1, x: 4 }}
                          transition={{ delay: i * 0.03, duration: 0.2 }}
                        >
                          <motion.div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor: `${accentColor}15`,
                            }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <CheckCircle2 
                              className="w-3.5 h-3.5" 
                              style={{ color: accentColor }}
                            />
                          </motion.div>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <motion.a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold group/link"
                      style={{ color: primaryColor }}
                      whileHover={{ x: 5 }}
                    >
                      <span>Get Quote</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </motion.a>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
                    style={{
                      background: `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
                    }}
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Corner decoration */}
                  <div 
                    className="absolute top-0 right-0 w-40 h-40 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at top right, ${primaryColor}, transparent 70%)`,
                    }}
                  />

                  {/* Subtle shine effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                    }}
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div 
            className="relative rounded-3xl p-8 sm:p-10 overflow-hidden text-center border"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}08, ${accentColor}08)`,
              borderColor: `${primaryColor}20`,
            }}
          >
            {/* Background pattern */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(${primaryColor}15 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-5 h-5" style={{ color: primaryColor }} />
                <span className="text-sm font-semibold" style={{ color: primaryColor }}>
                  Quick Response Time
                </span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                Need a Custom Cleaning Solution?
              </h3>
              <p className="text-slate-600 mb-6 max-w-xl mx-auto">
                Every space is unique. Tell us about your needs and we&apos;ll create a 
                personalized cleaning plan just for you.
              </p>
              
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                  boxShadow: `0 10px 40px ${primaryColor}30`,
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
