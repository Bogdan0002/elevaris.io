'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Container } from '@/components/site/Container'
import { MapPin, CheckCircle2, Phone, Navigation } from 'lucide-react'
import { ServiceAreaMap } from './ServiceAreaMap'
import type { CleaningPreviewConfig } from '@/lib/previews/types'

interface AreasSectionProps {
  config: CleaningPreviewConfig
}

export function AreasSection({ config }: AreasSectionProps) {
  const primaryColor = config.branding.primaryColor || '#0EA5E9'
  const accentColor = config.branding.accentColor || '#10B981'
  
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [hoveredArea, setHoveredArea] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] },
    },
  }

  return (
    <section 
      id="areas" 
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />
      
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-20"
        style={{ background: primaryColor }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              backgroundColor: `${primaryColor}10`,
              color: primaryColor,
            }}
          >
            <MapPin className="w-4 h-4" />
            Service Areas
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Proudly Serving
            <span 
              className="block mt-2"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {config.business.city} & Surrounding Areas
            </span>
          </h2>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We provide professional cleaning services across {config.areasServed.length} locations 
            in and around {config.business.city}, {config.business.state}.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Areas list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}15, ${accentColor}10)`,
                  }}
                >
                  <Navigation className="w-6 h-6" style={{ color: primaryColor }} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Areas We Cover</h3>
                  <p className="text-sm text-slate-500">Click to see on map</p>
                </div>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {config.areasServed.map((area, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group"
                    onMouseEnter={() => setHoveredArea(area)}
                    onMouseLeave={() => setHoveredArea(null)}
                  >
                    <motion.div
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                        hoveredArea === area 
                          ? 'bg-slate-50' 
                          : 'hover:bg-slate-50'
                      }`}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: hoveredArea === area 
                            ? `linear-gradient(135deg, ${primaryColor}, ${accentColor})`
                            : `${primaryColor}15`,
                        }}
                        animate={{
                          scale: hoveredArea === area ? 1.1 : 1,
                        }}
                      >
                        {hoveredArea === area ? (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        ) : (
                          <MapPin className="w-4 h-4" style={{ color: primaryColor }} />
                        )}
                      </motion.div>
                      <span className={`font-medium text-sm ${
                        hoveredArea === area ? 'text-slate-900' : 'text-slate-700'
                      }`}>
                        {area}
                      </span>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-600 mb-4">
                  Don&apos;t see your area? Contact us — we may still be able to help!
                </p>
                <motion.a
                  href={`tel:${config.business.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-4 h-4" />
                  Call to Check Availability
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {/* Map container */}
              <div 
                className="h-[400px] lg:h-[500px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50"
              >
                <ServiceAreaMap config={config} />
              </div>

              {/* Floating info card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:w-64"
              >
                <div 
                  className="bg-white rounded-2xl p-4 shadow-xl shadow-slate-200/50 border border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`,
                      }}
                    >
                      <CheckCircle2 className="w-5 h-5" style={{ color: accentColor }} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">
                        {config.areasServed.length} Areas
                      </div>
                      <div className="text-xs text-slate-500">
                        Covered in {config.business.state}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
