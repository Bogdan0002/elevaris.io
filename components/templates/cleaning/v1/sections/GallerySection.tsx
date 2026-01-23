'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Container } from '@/components/site/Container'
import type { PreviewConfig } from '@/lib/previews/types'
import { getNicheDisplayName } from '@/lib/templates/registry'
import { 
  Image as ImageIcon, 
  Sparkles, 
  ZoomIn, 
  X, 
  Camera,
  Home,
  Building2,
  Bath,
  UtensilsCrossed,
  Sofa,
  Bed,
  ArrowRight
} from 'lucide-react'

interface GallerySectionProps {
  config: PreviewConfig
}

export function GallerySection({ config }: GallerySectionProps) {
  const primaryColor = config.branding.primaryColor || '#0EA5E9'
  const accentColor = config.branding.accentColor || '#10B981'
  const niche = config.niche || 'cleaning'
  const nicheLabel = getNicheDisplayName(niche)
  
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const sizeCycle = ['large', 'small', 'small', 'medium', 'medium', 'tall'] as const
  const iconCycle = [Sofa, UtensilsCrossed, Bath, Building2, Bed, Home, Camera]
  
  // Use services from config instead of hardcoded items
  const serviceNames = (config.services || []).map(service => 
    typeof service === 'string' ? service : service.name
  )
  
  // If no services, use defaults
  const defaultItems = [
    'Signature Refresh',
    'Deep Clean',
    'Move-Out Reset',
    'Office Shine',
    'Kitchen Detail',
    'Full Home Reset',
  ]
  
  const baseItems = serviceNames.length > 0 ? serviceNames : defaultItems

  const galleryItems = baseItems.map((label, index) => ({
    id: index + 1,
    label,
    description: `A premium ${nicheLabel.toLowerCase()} package designed to impress.`,
    icon: iconCycle[index % iconCycle.length],
    size: sizeCycle[index % sizeCycle.length],
  }))

  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden bg-white"
    >
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 100%, ${primaryColor}08 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 0%, ${accentColor}05 0%, transparent 50%),
            white
          `,
        }}
      />

      <Container className="relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              backgroundColor: `${primaryColor}10`,
              color: primaryColor,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Camera className="w-4 h-4" />
            Our Portfolio
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            See the
            <span 
              className="block mt-2"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {config.business.name} Difference
            </span>
          </h2>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Browse through our portfolio of transformations. Every space tells a story of 
            meticulous care and attention to detail.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[180px] md:auto-rows-[200px]">
          {galleryItems.map((item, index) => {
            const Icon = item.icon
            const isHovered = hoveredId === item.id
            
            // Determine grid span based on size
            const gridClass = {
              large: 'col-span-2 row-span-1 md:row-span-2',
              medium: 'col-span-2 md:col-span-2 row-span-1',
              small: 'col-span-1 row-span-1',
              tall: 'col-span-2 md:col-span-1 row-span-1 md:row-span-2',
            }[item.size]
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group relative ${gridClass}`}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <motion.div
                  className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer border border-slate-100"
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedImage(item.id)}
                  style={{
                    boxShadow: isHovered 
                      ? `0 20px 40px ${primaryColor}15`
                      : '0 4px 6px rgba(0, 0, 0, 0.03)',
                  }}
                >
                  {/* Background gradient placeholder */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}25, ${accentColor}25)`,
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      backgroundImage: `radial-gradient(${primaryColor}40 1px, transparent 1px)`,
                      backgroundSize: '26px 26px',
                    }}
                  />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between">
                    {/* Icon */}
                    <motion.div
                      className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300"
                      style={{
                        background: isHovered 
                          ? `linear-gradient(135deg, ${primaryColor}, ${accentColor})`
                          : `linear-gradient(135deg, ${primaryColor}15, ${accentColor}10)`,
                      }}
                      animate={{ 
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? 5 : 0,
                      }}
                    >
                      <Icon
                        className="w-6 h-6 md:w-7 md:h-7 transition-colors duration-300"
                        style={{ color: isHovered ? 'white' : primaryColor }}
                      />
                    </motion.div>
                    
                    {/* Text */}
                    <div>
                      <p className="font-bold text-sm md:text-base text-slate-900">
                        {item.label}
                      </p>
                      {(item.size === 'large' || item.size === 'tall' || item.size === 'medium') && (
                        <p className="text-xs md:text-sm text-slate-600 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}90, ${accentColor}90)`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="flex flex-col items-center gap-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-white text-sm font-medium">View</span>
                    </motion.div>
                  </motion.div>

                  {/* Photo indicator */}
                  <motion.div
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/80 backdrop-blur-sm border border-slate-200/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 0 : 0.8 }}
                  >
                    <Camera className="w-3 h-3 text-slate-500" />
                    <span className="text-[10px] text-slate-600 font-medium hidden sm:inline">Design preview</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Get Your Space Transformed</span>
            <ArrowRight className="w-5 h-5" />
          </motion.a>
          
          <p className="text-sm text-slate-500 mt-4 flex items-center justify-center gap-2">
            <Camera className="w-4 h-4" style={{ color: primaryColor }} />
            Stock photos shown — replace with your real work
          </p>
        </motion.div>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={() => setSelectedImage(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
            
            <motion.div 
              className="max-w-5xl w-full rounded-3xl overflow-hidden bg-white"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const selected = galleryItems.find(i => i.id === selectedImage)
                if (!selected) return null
                return (
                  <div className="relative h-[70vh] w-full">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(600px circle at 20% 20%, ${primaryColor}25, transparent 50%), radial-gradient(600px circle at 80% 80%, ${accentColor}25, transparent 50%)`,
                      }}
                    />
                    <div
                      className="absolute inset-0 opacity-60"
                      style={{
                        backgroundImage: `radial-gradient(${primaryColor}40 1px, transparent 1px)`,
                        backgroundSize: '28px 28px',
                      }}
                    />
                    <div className="relative h-full w-full flex items-center justify-center p-8">
                      <div className="rounded-3xl border border-slate-200 bg-white/80 p-10 text-center shadow-2xl">
                        <div className="mx-auto mb-4 h-14 w-14 rounded-2xl flex items-center justify-center"
                          style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
                        >
                          <ImageIcon className="w-7 h-7 text-white" />
                        </div>
                        <p className="text-xl font-semibold text-slate-900">{selected.label}</p>
                        <p className="text-slate-600 text-sm mt-2">{selected.description}</p>
                        <p className="text-xs text-slate-400 mt-4">Placeholder — replace with real work photos</p>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

