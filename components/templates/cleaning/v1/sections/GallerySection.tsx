'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Container } from '@/components/site/Container'
import { 
  Image as ImageIcon, 
  Sparkles, 
  ZoomIn, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Camera,
  Home,
  Building2,
  Bath,
  UtensilsCrossed,
  Sofa,
  Bed
} from 'lucide-react'

interface GallerySectionProps {
  config: {
    branding: { primaryColor?: string; accentColor?: string }
    business: { name: string }
  }
}

// Placeholder gallery categories with icons
const galleryCategories = [
  { name: 'All', icon: ImageIcon },
  { name: 'Residential', icon: Home },
  { name: 'Commercial', icon: Building2 },
  { name: 'Deep Clean', icon: Sparkles },
]

// Placeholder gallery items with descriptive content
const galleryItems = [
  { 
    id: 1, 
    category: 'Residential', 
    label: 'Living Room Transformation',
    description: 'Complete living room deep clean',
    icon: Sofa,
    aspectRatio: 'aspect-[4/3]',
  },
  { 
    id: 2, 
    category: 'Commercial', 
    label: 'Office Space Cleaning',
    description: 'Professional office maintenance',
    icon: Building2,
    aspectRatio: 'aspect-square',
  },
  { 
    id: 3, 
    category: 'Deep Clean', 
    label: 'Kitchen Deep Clean',
    description: 'Appliances & surfaces spotless',
    icon: UtensilsCrossed,
    aspectRatio: 'aspect-[4/3]',
  },
  { 
    id: 4, 
    category: 'Residential', 
    label: 'Bathroom Restoration',
    description: 'Sanitized & sparkling clean',
    icon: Bath,
    aspectRatio: 'aspect-square',
  },
  { 
    id: 5, 
    category: 'Residential', 
    label: 'Bedroom Refresh',
    description: 'Fresh & dust-free space',
    icon: Bed,
    aspectRatio: 'aspect-[4/3]',
  },
  { 
    id: 6, 
    category: 'Commercial', 
    label: 'Restaurant Cleaning',
    description: 'Health code compliant',
    icon: UtensilsCrossed,
    aspectRatio: 'aspect-square',
  },
]

export function GallerySection({ config }: GallerySectionProps) {
  const primaryColor = config.branding.primaryColor || '#0EA5E9'
  const accentColor = config.branding.accentColor || '#10B981'
  
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
    },
  }

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
      
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20"
        style={{ background: primaryColor }}
        animate={{ 
          scale: [1, 1.2, 1],
          x: [-20, 20, -20],
        }}
        transition={{ duration: 15, repeat: Infinity }}
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

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {galleryCategories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.name
            return (
              <motion.button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                }`}
                style={
                  isActive
                    ? { 
                        background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                        boxShadow: `0 4px 15px ${primaryColor}30`,
                      }
                    : {}
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Gallery grid - Masonry-like layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const Icon = item.icon
              const isHovered = hoveredId === item.id
              
              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  layout
                  className="group relative"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <motion.div
                    className={`relative ${item.aspectRatio} rounded-2xl overflow-hidden cursor-pointer`}
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedImage(item.id)}
                    style={{
                      boxShadow: isHovered 
                        ? `0 20px 40px ${primaryColor}15`
                        : '0 4px 6px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    {/* Placeholder content with gradient background */}
                    <div 
                      className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-300"
                      style={{
                        background: isHovered 
                          ? `linear-gradient(135deg, ${primaryColor}15, ${accentColor}15)`
                          : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                      }}
                    >
                      <motion.div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300"
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
                          className="w-8 h-8 transition-colors duration-300"
                          style={{ color: isHovered ? 'white' : primaryColor }}
                        />
                      </motion.div>
                      
                      <p className={`text-sm font-semibold text-center transition-colors duration-300 ${
                        isHovered ? 'text-slate-800' : 'text-slate-600'
                      }`}>
                        {item.label}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 text-center">
                        {item.description}
                      </p>
                      
                      <motion.span 
                        className="mt-3 text-xs px-3 py-1.5 rounded-full font-medium"
                        style={{
                          backgroundColor: isHovered ? `${primaryColor}20` : `${primaryColor}10`,
                          color: primaryColor,
                        }}
                      >
                        {item.category}
                      </motion.span>

                      {/* Photo placeholder indicator */}
                      <motion.div
                        className="absolute bottom-4 right-4 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/80 backdrop-blur-sm border border-slate-200/50"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isHovered ? 1 : 0.6, y: isHovered ? 0 : 5 }}
                      >
                        <Camera className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] text-slate-500 font-medium">Your photo here</span>
                      </motion.div>
                    </div>

                    {/* Hover overlay with zoom icon */}
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
                        className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        <ZoomIn className="w-6 h-6 text-white" />
                      </motion.div>
                    </motion.div>

                    {/* Border accent */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
                      style={{ borderColor: primaryColor }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                    />
                  </motion.div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Note about gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div 
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl border"
            style={{
              backgroundColor: `${primaryColor}05`,
              borderColor: `${primaryColor}20`,
            }}
          >
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}15)` }}
            >
              <Camera className="w-5 h-5" style={{ color: primaryColor }} />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-800">Gallery Placeholder</p>
              <p className="text-xs text-slate-500">Your actual work photos will be showcased here</p>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Lightbox (placeholder) */}
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
              className="max-w-4xl w-full aspect-[4/3] rounded-3xl overflow-hidden flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center text-white p-8">
                <div 
                  className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
                >
                  <ImageIcon className="w-10 h-10" />
                </div>
                <p className="text-xl font-semibold mb-2">Image Preview</p>
                <p className="text-white/70">
                  {galleryItems.find(i => i.id === selectedImage)?.label}
                </p>
                <p className="text-sm text-white/50 mt-4">
                  Your actual photos will display here in full size
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
