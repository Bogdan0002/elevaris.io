'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import type { CleaningPreviewConfig } from '@/lib/previews/types'

interface ServiceAreaMapProps {
  config: CleaningPreviewConfig
}

export function ServiceAreaMap({ config }: ServiceAreaMapProps) {
  const primaryColor = config.branding.primaryColor || '#0EA5E9'
  const accentColor = config.branding.accentColor || '#10B981'
  const areas = config.areasServed || []
  
  // Create a grid of animated pins based on service areas
  const pinPositions = areas.map((_, index) => ({
    // Distribute pins in a circular pattern around center
    x: 50 + Math.cos((index / areas.length) * Math.PI * 2) * (25 + Math.random() * 15),
    y: 50 + Math.sin((index / areas.length) * Math.PI * 2) * (20 + Math.random() * 15),
    delay: index * 0.1,
  }))

  return (
    <div 
      className="w-full h-full relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 50% 50%, ${primaryColor}15 0%, transparent 50%),
          radial-gradient(circle at 30% 30%, ${accentColor}10 0%, transparent 40%),
          radial-gradient(circle at 70% 70%, ${primaryColor}08 0%, transparent 40%),
          linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)
        `,
      }}
    >
      {/* Animated grid background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${primaryColor}15 1px, transparent 1px),
            linear-gradient(to bottom, ${primaryColor}15 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Pulsing center circle */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '60%',
          height: '60%',
          background: `radial-gradient(circle, ${primaryColor}20 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary pulse */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
        style={{
          width: '80%',
          height: '80%',
          borderColor: `${primaryColor}30`,
        }}
        animate={{
          scale: [0.8, 1, 0.8],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {pinPositions.map((pos, i) => (
          <motion.line
            key={`line-${i}`}
            x1="50%"
            y1="50%"
            x2={`${pos.x}%`}
            y2={`${pos.y}%`}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: pos.delay }}
          />
        ))}
      </svg>

      {/* Center pin - main location */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
            boxShadow: `0 4px 20px ${primaryColor}40`,
          }}
        >
          <MapPin className="w-7 h-7 text-white" />
        </div>
        <motion.div
          className="absolute -inset-2 rounded-full border-2"
          style={{ borderColor: primaryColor }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      </motion.div>

      {/* Service area pins */}
      {pinPositions.map((pos, index) => (
        <motion.div
          key={index}
          className="absolute z-10"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: pos.delay + 0.3, type: 'spring' }}
        >
          <motion.div
            className="relative"
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2,
              ease: 'easeInOut',
            }}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center shadow-md"
              style={{
                background: 'white',
                border: `2px solid ${primaryColor}`,
              }}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: primaryColor }}
              />
            </div>
            
            {/* Area label */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 mt-1 px-2 py-1 rounded-lg bg-white shadow-sm border border-slate-100 whitespace-nowrap"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: pos.delay + 0.5 }}
            >
              <span className="text-[10px] font-medium text-slate-700">
                {areas[index]}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}

      {/* City name label */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-white shadow-lg border border-slate-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <span className="text-sm font-semibold text-slate-800">
            {config.business.city}, {config.business.state}
          </span>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        className="absolute top-4 right-4 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-sm shadow-sm border border-slate-100"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
            />
            <span className="text-slate-600">HQ</span>
          </div>
          <div className="flex items-center gap-1">
            <div 
              className="w-3 h-3 rounded-full border-2"
              style={{ borderColor: primaryColor }}
            />
            <span className="text-slate-600">Service Area</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
