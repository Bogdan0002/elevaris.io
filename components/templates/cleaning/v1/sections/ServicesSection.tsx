'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Container } from '@/components/site/Container'
import { 
  Sparkles, 
  Home, 
  Building2, 
  Droplets, 
  Brush, 
  Wind,
  Sofa,
  ArrowRight,
  CheckCircle2,
  Star,
  Clock,
  Zap
} from 'lucide-react'
import { DEFAULT_CLEANING_CONTENT } from '@/lib/previews/defaults'

interface ServicesSectionProps {
  config: {
    services: string[]
    branding: { primaryColor?: string; accentColor?: string }
    business: { name: string }
  }
}

const serviceIconMap: Record<string, typeof Sparkles> = {
  'Residential Cleaning': Home,
  'Commercial Cleaning': Building2,
  'Deep Cleaning': Sparkles,
  'Move-in/Move-out Cleaning': Wind,
  'Post-Construction Cleaning': Brush,
  'Window Cleaning': Droplets,
  'Carpet Cleaning': Sofa,
  'Office Cleaning': Building2,
  'Kitchen Cleaning': Sparkles,
  'Bathroom Cleaning': Droplets,
}

const serviceFeatures: Record<string, string[]> = {
  'Residential Cleaning': ['Weekly/Bi-weekly options', 'All rooms included', 'Eco-friendly products'],
  'Commercial Cleaning': ['After-hours available', 'Custom schedules', 'Professional team'],
  'Deep Cleaning': ['Top to bottom clean', 'Hard-to-reach areas', 'Sanitization included'],
  'Move-in/Move-out Cleaning': ['Full property coverage', 'Appliance cleaning', 'Same-day available'],
  'Post-Construction Cleaning': ['Debris removal', 'Dust elimination', 'Final polish'],
  'Window Cleaning': ['Interior & exterior', 'Streak-free finish', 'Screen cleaning'],
  'Carpet Cleaning': ['Deep extraction', 'Stain removal', 'Fast drying'],
  'Office Cleaning': ['Desk sanitization', 'Common areas', 'Restroom service'],
}

const serviceBadges: Record<string, { text: string; icon: typeof Star }> = {
  'Residential Cleaning': { text: 'Most Popular', icon: Star },
  'Deep Cleaning': { text: 'Best Value', icon: Zap },
  'Commercial Cleaning': { text: 'For Business', icon: Building2 },
}

export function ServicesSection({ config }: ServicesSectionProps) {
  const primaryColor = config.branding.primaryColor || '#0EA5E9'
  const accentColor = config.branding.accentColor || '#10B981'
  const serviceDescriptions = DEFAULT_CLEANING_CONTENT.serviceDescriptions
  
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
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
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, white 0%, #fafafa 50%, white 100%),
            radial-gradient(ellipse 80% 50% at 50% 0%, ${primaryColor}05 0%, transparent 50%)
          `,
        }}
      />
      
      {/* Decorative top line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${primaryColor}30, ${accentColor}30, transparent)`,
        }}
      />
      
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 right-10 w-80 h-80 rounded-full blur-3xl opacity-20"
        style={{ background: primaryColor }}
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-15"
        style={{ background: accentColor }}
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
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
            <Sparkles className="w-4 h-4" />
            Our Services
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-slate-900">
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
              Tailored to Your Needs
            </span>
          </h2>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From routine maintenance to specialized deep cleaning, {config.business.name} offers 
            comprehensive services designed to keep your space immaculate.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {config.services.map((service, index) => {
            const Icon = serviceIconMap[service] || Sparkles
            const description =
              serviceDescriptions[service as keyof typeof serviceDescriptions] ||
              `Professional ${service.toLowerCase()} services tailored to your needs.`
            const features = serviceFeatures[service] || ['Quality guaranteed', 'Professional team', 'Flexible scheduling']
            const badge = serviceBadges[service]
            const isHovered = hoveredIndex === index

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  className="relative h-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 overflow-hidden"
                  style={{
                    boxShadow: isHovered 
                      ? `0 25px 50px -12px ${primaryColor}20, 0 0 0 1px ${primaryColor}20`
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Badge */}
                  {badge && (
                    <motion.div
                      className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                      }}
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                    >
                      <badge.icon className="w-3 h-3" />
                      {badge.text}
                    </motion.div>
                  )}

                  {/* Gradient overlay on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}03, ${accentColor}03)`,
                    }}
                  />

                  {/* Icon */}
                  <motion.div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
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
                  <div className="relative">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-900">
                      {service}
                    </h3>
                    
                    <p className="text-slate-600 mb-5 leading-relaxed text-sm">
                      {description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2.5 mb-6">
                      {features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-center gap-2.5 text-sm"
                          initial={{ opacity: 0.7, x: 0 }}
                          animate={{ 
                            opacity: isHovered ? 1 : 0.7, 
                            x: isHovered ? 4 : 0 
                          }}
                          transition={{ delay: i * 0.05, duration: 0.2 }}
                        >
                          <motion.div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor: isHovered ? `${accentColor}20` : `${accentColor}10`,
                            }}
                          >
                            <CheckCircle2 
                              className="w-3.5 h-3.5" 
                              style={{ color: accentColor }}
                            />
                          </motion.div>
                          <span className="text-slate-600">{feature}</span>
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
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{
                      background: `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
                    }}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Corner decoration */}
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at top right, ${primaryColor}, transparent 70%)`,
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
            className="relative rounded-3xl p-8 sm:p-10 overflow-hidden text-center"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}08, ${accentColor}08)`,
              border: `1px solid ${primaryColor}15`,
            }}
          >
            {/* Background pattern */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(${primaryColor}15 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
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
