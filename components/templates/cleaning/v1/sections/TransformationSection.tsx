'use client'

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Container } from '@/components/site/Container'
import { 
  ArrowRight, 
  Sparkles, 
  Camera, 
  CheckCircle2,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface TransformationSectionProps {
  config: {
    branding: { primaryColor?: string; accentColor?: string }
    business: { name: string; city: string }
  }
}

// Before/After slider component
function BeforeAfterSlider({ 
  primaryColor, 
  accentColor,
  label 
}: { 
  primaryColor: string
  accentColor: string
  label: string
}) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX)
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Before image placeholder */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          background: `linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)`,
        }}
      >
        <div className="text-center p-6">
          <div 
            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: `${primaryColor}15` }}
          >
            <Camera className="w-8 h-8" style={{ color: primaryColor }} />
          </div>
          <p className="text-slate-500 font-medium">Before Photo</p>
          <p className="text-xs text-slate-400 mt-1">{label}</p>
        </div>
      </div>

      {/* After image placeholder */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          background: `linear-gradient(135deg, ${primaryColor}15 0%, ${accentColor}15 100%)`,
        }}
      >
        <div className="text-center p-6">
          <div 
            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ 
              background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
            }}
          >
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="font-semibold" style={{ color: primaryColor }}>After Photo</p>
          <p className="text-xs text-slate-500 mt-1">Sparkling Clean!</p>
        </div>
      </div>

      {/* Slider handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 -translate-x-1/2 z-10"
        style={{ 
          left: `${sliderPosition}%`,
          background: 'white',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
        }}
      >
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
          }}
        >
          <div className="flex items-center gap-0.5 text-white">
            <ChevronLeft className="w-4 h-4" />
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-slate-900/70 backdrop-blur-sm text-white text-xs font-semibold">
        Before
      </div>
      <div 
        className="absolute top-4 right-4 px-3 py-1.5 rounded-full backdrop-blur-sm text-white text-xs font-semibold"
        style={{ background: `${primaryColor}cc` }}
      >
        After
      </div>
    </motion.div>
  )
}

export function TransformationSection({ config }: TransformationSectionProps) {
  const primaryColor = config.branding.primaryColor || '#0EA5E9'
  const accentColor = config.branding.accentColor || '#10B981'
  
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeSlide, setActiveSlide] = useState(0)

  const transformations = [
    { label: 'Kitchen Deep Clean', room: 'Kitchen' },
    { label: 'Bathroom Restoration', room: 'Bathroom' },
    { label: 'Living Room Refresh', room: 'Living Room' },
    { label: 'Office Space Cleaning', room: 'Office' },
  ]

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % transformations.length)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + transformations.length) % transformations.length)
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
          background: `linear-gradient(180deg, 
            ${primaryColor}05 0%, 
            white 30%, 
            ${accentColor}05 70%, 
            white 100%
          )`,
        }}
      />

      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/4 -left-32 w-64 h-64 rounded-full blur-3xl opacity-30"
        style={{ background: primaryColor }}
        animate={{ 
          x: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              backgroundColor: `${accentColor}15`,
              color: accentColor,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4" />
            See The Magic
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Before & After
            <span 
              className="block mt-2"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Transformations
            </span>
          </h2>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Drag the slider to see the incredible difference {config.business.name} can make. 
            These are the results our {config.business.city} clients love!
          </p>
        </motion.div>

        {/* Main transformation showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          {/* Featured slider */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <BeforeAfterSlider 
              primaryColor={primaryColor} 
              accentColor={accentColor}
              label={transformations[activeSlide].label}
            />
            
            {/* Navigation dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <motion.button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-slate-300 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              
              <div className="flex gap-2 mx-4">
                {transformations.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === activeSlide ? 'w-8' : 'w-2'
                    }`}
                    style={{
                      backgroundColor: i === activeSlide ? primaryColor : `${primaryColor}30`,
                    }}
                  />
                ))}
              </div>
              
              <motion.button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-slate-300 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-6"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}15, ${accentColor}15)`,
                  color: primaryColor,
                }}
              >
                <Camera className="w-3 h-3" />
                {transformations[activeSlide].room} Transformation
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {transformations[activeSlide].label}
              </h3>

              <p className="text-slate-600 mb-6 leading-relaxed">
                Our professional team transformed this space from cluttered and dirty to 
                sparkling clean in just a few hours. This is the quality you can expect 
                from every {config.business.name} cleaning.
              </p>

              {/* Results list */}
              <div className="space-y-3 mb-8">
                {[
                  'Deep cleaned all surfaces',
                  'Sanitized high-touch areas',
                  'Removed stubborn stains',
                  'Eco-friendly products used',
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: accentColor }} />
                    <span className="text-slate-700">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Get This Result</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Mini gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-8">
            <p className="text-slate-600 font-medium">More Transformations</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {transformations.map((item, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                  index === activeSlide 
                    ? 'ring-2 ring-offset-2' 
                    : 'hover:border-slate-300'
                }`}
                style={{
                  borderColor: index === activeSlide ? primaryColor : 'transparent',
                  ['--tw-ring-color' as string]: primaryColor,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: index === activeSlide 
                      ? `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`
                      : 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                  }}
                >
                  <div className="text-center">
                    <Camera 
                      className="w-6 h-6 mx-auto mb-1" 
                      style={{ 
                        color: index === activeSlide ? primaryColor : '#94a3b8' 
                      }} 
                    />
                    <p className="text-xs font-medium text-slate-600">{item.room}</p>
                  </div>
                </div>
                
                {index === activeSlide && (
                  <motion.div
                    className="absolute inset-0 border-2 rounded-xl"
                    style={{ borderColor: primaryColor }}
                    layoutId="activeBorder"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-10"
        >
          <p className="text-sm text-slate-500 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50">
            <Camera className="w-4 h-4" style={{ color: primaryColor }} />
            Your before/after photos will be showcased here
          </p>
        </motion.div>
      </Container>
    </section>
  )
}

