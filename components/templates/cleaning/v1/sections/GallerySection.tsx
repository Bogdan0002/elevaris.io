'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Container } from '@/components/site/Container'
import type { PreviewConfig } from '@/lib/previews/types'
import { getDefaultImages } from '@/lib/previews/niche-defaults'
import { getNicheDisplayName } from '@/lib/templates/registry'
import Image from 'next/image'
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
  const defaultImages = getDefaultImages(niche)
  
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const gallerySources = Array.isArray(config.gallery?.images) && config.gallery?.images.length
    ? (config.gallery.images as Array<string | { url: string; alt?: string; caption?: string }>)
    : defaultImages.gallery

  const sizeCycle = ['large', 'small', 'small', 'medium', 'medium', 'tall'] as const
  const iconCycle = [Sofa, UtensilsCrossed, Bath, Building2, Bed, Home, Camera]
  const galleryItems = gallerySources.map((item, index) => {
    const isString = typeof item === 'string'
    const url = isString ? item : item.url
    const label = isString
      ? `${nicheLabel} Project ${index + 1}`
      : item.alt || `${nicheLabel} Project ${index + 1}`
    const description = isString
      ? `Showcasing a recent ${nicheLabel.toLowerCase()} transformation.`
      : item.caption || `Showcasing a recent ${nicheLabel.toLowerCase()} transformation.`

    return {
      id: index + 1,
      label,
      description,
      icon: iconCycle[index % iconCycle.length],
      size: sizeCycle[index % sizeCycle.length],
      url,
    }
  })

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
                  {/* Background image */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${item.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.4) 100%)`,
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
                      <p className="font-bold text-sm md:text-base text-white drop-shadow-sm">
                        {item.label}
                      </p>
                      {(item.size === 'large' || item.size === 'tall' || item.size === 'medium') && (
                        <p className="text-xs md:text-sm text-white/80 mt-1 line-clamp-2">
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
                    <span className="text-[10px] text-slate-600 font-medium hidden sm:inline">Stock photo</span>
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
              className="max-w-5xl w-full rounded-3xl overflow-hidden bg-black/30"
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
                    <Image
                      src={selected.url}
                      alt={selected.label}
                      fill
                      unoptimized
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                      <p className="text-white text-xl font-semibold">{selected.label}</p>
                      <p className="text-white/70 text-sm mt-1">{selected.description}</p>
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

