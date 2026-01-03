'use client'

import { useEffect, useState } from 'react'
import type { CleaningPreviewConfig } from '@/lib/previews/types'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { ServicesSection } from './sections/ServicesSection'
import { TransformationSection } from './sections/TransformationSection'
import { GallerySection } from './sections/GallerySection'
import { WhyUsSection } from './sections/WhyUsSection'
import { AreasSection } from './sections/AreasSection'
import { ReviewsSection } from './sections/ReviewsSection'
import { ContactSection } from './sections/ContactSection'
import { FooterSection } from './sections/FooterSection'
import { Navbar } from './sections/Navbar'

interface CleaningTemplateProps {
  config: CleaningPreviewConfig
}

export default function CleaningTemplate({ config }: CleaningTemplateProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Get theme colors with cleaning-appropriate defaults
  const primaryColor = config.branding.primaryColor || '#0EA5E9'
  const accentColor = config.branding.accentColor || '#10B981'

  return (
    <div 
      className="min-h-screen bg-white text-slate-900 overflow-x-hidden"
      style={{
        // CSS variables for dynamic theming
        ['--primary-color' as string]: primaryColor,
        ['--accent-color' as string]: accentColor,
        ['--primary-rgb' as string]: hexToRgb(primaryColor),
        ['--accent-rgb' as string]: hexToRgb(accentColor),
      }}
    >
      {/* Subtle animated background pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${primaryColor.slice(1)}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <Navbar config={config} />
      <HeroSection config={config} />
      <AboutSection config={config} />
      <ServicesSection config={config} />
      <TransformationSection config={config} />
      <GallerySection config={config} />
      <WhyUsSection config={config} />
      <AreasSection config={config} />
      <ReviewsSection config={config} />
      <ContactSection config={config} />
      <FooterSection config={config} />
      
      {/* Floating CTA for mobile */}
      {mounted && (
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-xl border-t border-slate-200/50 md:hidden z-40 safe-area-pb">
          <div className="flex gap-2">
            <a
              href={`tel:${config.business.phone.replace(/\s/g, '')}`}
              className="flex-1 py-3.5 rounded-xl font-bold text-white text-center text-sm shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                boxShadow: `0 4px 20px ${primaryColor}40`,
              }}
            >
              📞 Call Now
            </a>
            <a
              href="#contact"
              className="flex-1 py-3.5 rounded-xl font-bold text-center text-sm border-2"
              style={{
                borderColor: primaryColor,
                color: primaryColor,
              }}
            >
              💬 Free Quote
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper to convert hex to RGB values
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (result) {
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
  }
  return '14, 165, 233' // Default sky-500
}
