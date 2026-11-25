'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import type { PreviewConfig } from '@/lib/previews/types'
import { resolveCleaningPresentation } from '@/lib/previews/cleaning-presentation'
import { PreviewSalesCta } from './PreviewSalesCta'
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
  config: PreviewConfig
}

export default function CleaningTemplate({ config }: CleaningTemplateProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    let attempts = 0
    const timer = window.setInterval(() => {
      attempts += 1
      const widget = document.querySelector('iframe[src*="6968f420d66fc3d0a314aa9e"], iframe[src*="leadconnectorhq"]') as HTMLElement | null
      if (widget && window.innerWidth <= 768) {
        widget.style.setProperty('bottom', '148px', 'important')
      }
      if (widget || attempts >= 8) window.clearInterval(timer)
    }, 500)
    return () => window.clearInterval(timer)
  }, [])

  // Get theme colors with cleaning-appropriate defaults
  const primaryColor = config.branding.primaryColor || '#0EA5E9'
  const accentColor = config.branding.accentColor || '#10B981'
  const presentation = resolveCleaningPresentation(config)
  const showTemplateChat = config.mode !== 'production' || Boolean(config.features?.enableChat)

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
      {presentation.sections.about && <AboutSection config={config} />}
      <ServicesSection config={config} />
      {presentation.sections.transformation && <TransformationSection config={config} />}
      {presentation.sections.gallery && <GallerySection config={config} />}
      {presentation.sections.whyUs && <WhyUsSection config={config} />}
      {presentation.sections.areas && <AreasSection config={config} />}
      {presentation.sections.reviews && <ReviewsSection config={config} />}
      {presentation.sections.booking && <ContactSection config={config} />}
      <FooterSection config={config} />
      {config.mode !== 'production' && <PreviewSalesCta attributionId={config.attributionId} />}
      
      {showTemplateChat && (
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6968f420d66fc3d0a314aa9e"
          strategy="lazyOnload"
        />
      )}
      <style jsx global>{`
        @media (max-width: 768px) {
          iframe[src*="leadconnectorhq"] {
            bottom: 148px !important;
          }
        }
      `}</style>
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

