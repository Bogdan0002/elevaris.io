'use client'

import { motion } from 'framer-motion'
import { MapPin, Navigation2 } from 'lucide-react'
import type { CleaningPreviewConfig } from '@/lib/previews/types'

interface ServiceAreaMapProps {
  config: CleaningPreviewConfig
}

export function ServiceAreaMap({ config }: ServiceAreaMapProps) {
  const primaryColor = config.branding.primaryColor || '#0EA5E9'
  const accentColor = config.branding.accentColor || '#10B981'
  const areas = config.areasServed || []
  
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

  const pinPositions = areas.slice(0, 8).map((_, index) => getPosition(index, Math.min(areas.length, 8)))

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

      {/* Outer ring - pulsing with improved visibility */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
        style={{
          width: '88%',
          height: '88%',
          borderColor: `${primaryColor}30`,
        }}
        animate={{
          scale: [0.96, 1.02, 0.96],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Middle ring with enhanced gradient */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '65%',
          height: '65%',
          background: `radial-gradient(circle, ${primaryColor}20 0%, ${accentColor}10 40%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Inner ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
        style={{
          width: '35%',
          height: '35%',
          borderColor: `${accentColor}30`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Animated connection lines from center to pins */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradientMap" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.2" />
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
            strokeWidth="1.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
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
            
            {/* Area label - positioned based on quadrant to avoid overlap with better z-index */}
            <motion.div
              className="absolute whitespace-nowrap z-30"
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

      {/* Legend - bottom left */}
      <motion.div
        className="absolute bottom-4 left-4 z-40"
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

      {/* Area count badge - bottom right */}
      <motion.div
        className="absolute bottom-4 right-4 z-40"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div 
          className="px-3 py-2 rounded-xl shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
          }}
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-white" />
            <span className="text-white text-xs font-bold">
              {areas.length} Areas
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
