'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import type { PreviewConfig } from '@/lib/previews/types'
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
    
    // Function to adjust chat widget position on mobile
    const adjustChatWidget = () => {
      if (window.innerWidth <= 768) {
        const interval = setInterval(() => {
          // Try multiple selectors to find the chat widget
          const selectors = [
            'iframe[src*="leadconnectorhq"]',
            'iframe[title*="chat"]',
            'div[id*="chat-widget"]',
            '#chat-widget-container',
            'body > div[style*="position: fixed"][style*="bottom"]',
            'body > iframe[style*="position: fixed"][style*="bottom"]'
          ]
          
          let found = false
          selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector)
            elements.forEach((element: Element) => {
              const htmlElement = element as HTMLElement
              if (htmlElement.style.position === 'fixed' || window.getComputedStyle(htmlElement).position === 'fixed') {
                htmlElement.style.bottom = '80px'
                htmlElement.style.setProperty('bottom', '80px', 'important')
                found = true
              }
            })
          })
          
          // Clear interval once widget is found and adjusted
          if (found) {
            clearInterval(interval)
          }
        }, 500)
        
        // Clear interval after 10 seconds to prevent memory leak
        setTimeout(() => clearInterval(interval), 10000)
      }
    }
    
    // Run on mount and after a delay to catch lazy-loaded widgets
    adjustChatWidget()
    setTimeout(adjustChatWidget, 2000)
    setTimeout(adjustChatWidget, 5000)
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
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-xl border-t border-slate-200/50 md:hidden z-50 safe-area-pb">
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
      
      {/* GoHighLevel Live Chat Widget */}
      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="6968f420d66fc3d0a314aa9e"
        strategy="lazyOnload"
      />
      
      {/* Custom CSS to position chat widget above mobile CTA */}
      <style jsx global>{`
        /* Target GoHighLevel chat widget */
        @media (max-width: 768px) {
          #chat-widget-container,
          iframe[src*="leadconnectorhq"],
          iframe[title*="chat"],
          div[id*="chat"],
          div[class*="chat-widget"],
          .chat-widget-container,
          [data-chat-widget],
          body > div[style*="position: fixed"],
          body > iframe[style*="position: fixed"] {
            bottom: 80px !important;
            margin-bottom: 0 !important;
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

