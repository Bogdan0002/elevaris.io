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
    
    // Aggressive chat widget position fixer for mobile
    const adjustChatWidget = () => {
      if (typeof window === 'undefined') return
      
      const isMobile = window.innerWidth <= 768
      if (!isMobile) return
      
      // Get ALL elements on the page
      const allElements = document.querySelectorAll('*')
      
      allElements.forEach((element: Element) => {
        const htmlElement = element as HTMLElement
        const computedStyle = window.getComputedStyle(htmlElement)
        
        // Check if element is fixed position and near the bottom
        if (computedStyle.position === 'fixed') {
          const bottom = computedStyle.bottom
          const zIndex = computedStyle.zIndex
          
          // Target elements that are:
          // 1. Fixed position
          // 2. Have a bottom value between 0-50px
          // 3. Have high z-index (typical for chat widgets)
          // 4. Are iframes or divs
          const tagName = htmlElement.tagName.toLowerCase()
          const isWidget = (tagName === 'iframe' || tagName === 'div')
          const hasHighZIndex = parseInt(zIndex) > 1000 || zIndex === 'auto'
          const bottomValue = parseInt(bottom)
          const isAtBottom = !isNaN(bottomValue) && bottomValue >= 0 && bottomValue <= 50
          
          if (isWidget && hasHighZIndex && (isAtBottom || bottom === 'auto' || bottom === '0px')) {
            // Check if it's likely a chat widget (contains chat-related attributes or is from leadconnectorhq)
            const src = htmlElement.getAttribute('src') || ''
            const id = htmlElement.getAttribute('id') || ''
            const className = htmlElement.getAttribute('class') || ''
            
            const isChatWidget = 
              src.includes('leadconnectorhq') ||
              src.includes('chat') ||
              id.includes('chat') ||
              className.includes('chat') ||
              (hasHighZIndex && isAtBottom && tagName === 'iframe')
            
            if (isChatWidget) {
              htmlElement.style.setProperty('bottom', '80px', 'important')
              console.log('Chat widget repositioned:', htmlElement)
            }
          }
        }
      })
    }
    
    // Use MutationObserver to watch for dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          adjustChatWidget()
        }
      })
    })
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
    
    // Run immediately and repeatedly
    adjustChatWidget()
    const interval = setInterval(adjustChatWidget, 1000)
    
    // Cleanup
    return () => {
      clearInterval(interval)
      observer.disconnect()
    }
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
        /* Aggressive targeting for all fixed position elements at bottom */
        @media (max-width: 768px) {
          /* Generic chat widget selectors */
          iframe[src*="leadconnectorhq"],
          iframe[src*="chat"],
          iframe[title*="chat"],
          div[id*="chat"],
          div[class*="chat"],
          #chat-widget-container,
          .chat-widget-container,
          [data-chat-widget] {
            bottom: 80px !important;
          }
          
          /* Target all high z-index fixed elements at bottom */
          body > iframe[style*="position: fixed"],
          body > div[style*="position: fixed"] {
            bottom: 80px !important;
          }
        }
      `}</style>
      
      {/* Additional inline script for immediate execution */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              if (typeof window === 'undefined' || window.innerWidth > 768) return;
              
              function adjustWidget() {
                const elements = document.querySelectorAll('iframe, div');
                elements.forEach(function(el) {
                  const style = window.getComputedStyle(el);
                  if (style.position === 'fixed') {
                    const src = el.getAttribute('src') || '';
                    if (src.includes('leadconnectorhq') || src.includes('chat')) {
                      el.style.setProperty('bottom', '80px', 'important');
                    }
                  }
                });
              }
              
              // Run repeatedly
              setInterval(adjustWidget, 500);
              
              // Watch for new elements
              new MutationObserver(adjustWidget).observe(document.body, {
                childList: true,
                subtree: true
              });
            })();
          `
        }}
      />
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

