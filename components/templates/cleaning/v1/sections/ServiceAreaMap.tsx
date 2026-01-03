'use client'

import { motion } from 'framer-motion'
import { MapPin, Navigation2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { CleaningPreviewConfig } from '@/lib/previews/types'

interface ServiceAreaMapProps {
  config: CleaningPreviewConfig
}

export function ServiceAreaMap({ config }: ServiceAreaMapProps) {
  const primaryColor = config.branding.primaryColor || '#0EA5E9'
  const accentColor = config.branding.accentColor || '#10B981'
  const areas = config.areasServed || []
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Create positions for pins - distributed around the center
  // Using a more spread out pattern to avoid label overlaps
  const getPosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2 // Start from top
    const radiusX = 32 // Horizontal spread
    const radiusY = 28 // Vertical spread (slightly less for better fit)
    return {
      x: 50 + Math.cos(angle) * radiusX,
      y: 50 + Math.sin(angle) * radiusY,
      delay: index * 0.12,
    }
  }

  // Show fewer pins on mobile to reduce crowding
  const maxPins = isMobile ? 4 : 8
  const pinPositions = areas.slice(0, maxPins).map((_, index) => getPosition(index, Math.min(areas.length, maxPins)))

  return (
    <div 
      className="w-full h-full relative overflow-hidden rounded-3xl"
      style={{
        background: `
          radial-gradient(circle at 50% 50%, ${primaryColor}12 0%, transparent 40%),
          radial-gradient(circle at 20% 30%, ${accentColor}08 0%, transparent 35%),
          radial-gradient(circle at 80% 70%, ${primaryColor}06 0%, transparent 35%),
          linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)
        `,
      }}
    >
      {/* Animated grid background with improved visibility */}
      <motion.div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${primaryColor}25 1px, transparent 1px),
            linear-gradient(to bottom, ${primaryColor}25 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Additional subtle pattern overlay */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${accentColor}40 1px, transparent 0)`,
          backgroundSize: '20px 20px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '20px 20px'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Map-like road network pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-20" style={{ zIndex: 1 }}>
        <defs>
          <pattern id="roadPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M0 50 L100 50" stroke={primaryColor} strokeWidth="1" opacity="0.3" />
            <path d="M50 0 L50 100" stroke={primaryColor} strokeWidth="1" opacity="0.3" />
            <path d="M0 0 L100 100" stroke={accentColor} strokeWidth="0.5" opacity="0.2" />
            <path d="M100 0 L0 100" stroke={accentColor} strokeWidth="0.5" opacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#roadPattern)" />
      </svg>

      {/* Subtle map-like terrain areas */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `
            radial-gradient(ellipse 40% 30% at 20% 30%, ${primaryColor}40 0%, transparent 50%),
            radial-gradient(ellipse 35% 25% at 80% 70%, ${accentColor}30 0%, transparent 50%),
            radial-gradient(ellipse 30% 20% at 50% 50%, ${primaryColor}20 0%, transparent 40%)
          `,
        }}
      />

      {/* Animated connection lines from center to pins - hidden on mobile */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" style={{ zIndex: 2 }}>
        <defs>
          <linearGradient id="lineGradientMap" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {pinPositions.map((pos, i) => (
          <motion.line
            key={`line-${i}`}
            x1="50%"
            y1="50%"
            x2={`${pos.x}%`}
            y2={`${pos.y}%`}
            stroke="url(#lineGradientMap)"
            strokeWidth="1"
            strokeDasharray="3 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 0.8, delay: pos.delay + 0.3 }}
          />
        ))}
      </svg>

      {/* Center pin - main HQ location */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', delay: 0.2 }}
      >
        {/* Pulse rings */}
        <motion.div
          className="absolute -inset-4 rounded-full"
          style={{ backgroundColor: `${primaryColor}20` }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
        <motion.div
          className="absolute -inset-2 rounded-full"
          style={{ backgroundColor: `${primaryColor}30` }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 0.3,
          }}
        />
        
        {/* Main HQ pin */}
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl relative z-10"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
            boxShadow: `0 8px 32px ${primaryColor}50`,
          }}
        >
          <Navigation2 className="w-7 h-7 text-white" />
        </div>
      </motion.div>

      {/* Service area pins */}
      {pinPositions.map((pos, index) => (
        <motion.div
          key={index}
          className="absolute z-20"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: pos.delay + 0.5, type: 'spring' }}
        >
          <motion.div
            className="relative"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: index * 0.15,
              ease: 'easeInOut',
            }}
          >
            {/* Pin */}
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 bg-white"
              style={{
                borderColor: primaryColor,
                boxShadow: `0 4px 12px ${primaryColor}25`,
              }}
            >
              <div 
                className="w-4 h-4 rounded-full"
                style={{ 
                  background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                }}
              />
            </div>
            
            {/* Area label - hidden on mobile to reduce crowding */}
            <motion.div
              className="absolute whitespace-nowrap z-30 hidden md:block"
              style={{
                // Position label based on which side of center the pin is
                left: pos.x > 50 ? 'auto' : '50%',
                right: pos.x > 50 ? '50%' : 'auto',
                top: pos.y > 50 ? 'auto' : '100%',
                bottom: pos.y > 50 ? '100%' : 'auto',
                transform: `translate(${pos.x > 50 ? '60%' : '-60%'}, ${pos.y > 50 ? '-10px' : '10px'})`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: pos.delay + 0.8 }}
            >
              <span 
                className="px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md border backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderColor: `${primaryColor}30`,
                  color: '#1e293b',
                }}
              >
                {areas[index]}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}

      {/* City/HQ label - positioned at top center with higher z-index and better visibility */}
      <motion.div
        className="absolute top-6 left-1/2 -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div 
          className="px-5 py-3 rounded-xl shadow-xl border-2 backdrop-blur-md"
          style={{
            background: 'rgba(255, 255, 255, 0.98)',
            borderColor: `${primaryColor}40`,
            boxShadow: `0 8px 24px ${primaryColor}20`,
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded-full shadow-sm"
              style={{ 
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                boxShadow: `0 2px 8px ${primaryColor}40`,
              }}
            />
            <span className="text-base font-bold text-slate-900">
              {config.business.city}, {config.business.state}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Legend - bottom left - hidden on mobile */}
      <motion.div
        className="absolute bottom-4 left-4 z-40 hidden md:block"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4 }}
      >
        <div 
          className="px-3 py-2 rounded-xl shadow-sm border backdrop-blur-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderColor: `${primaryColor}15`,
          }}
        >
          <div className="flex flex-col gap-1.5 text-[10px]">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
              />
              <span className="text-slate-600 font-medium">Headquarters</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full border-2 bg-white"
                style={{ borderColor: primaryColor }}
              />
              <span className="text-slate-600 font-medium">Service Area</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Area count badge - bottom right - smaller on mobile */}
      <motion.div
        className="absolute bottom-2 md:bottom-4 right-2 md:right-4 z-40"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div 
          className="px-2 py-1.5 md:px-3 md:py-2 rounded-lg md:rounded-xl shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
          }}
        >
          <div className="flex items-center gap-1.5 md:gap-2">
            <MapPin className="w-3 h-3 md:w-4 md:h-4 text-white" />
            <span className="text-white text-[10px] md:text-xs font-bold">
              {areas.length} Areas
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
