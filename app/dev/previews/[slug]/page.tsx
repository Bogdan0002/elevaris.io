/**
 * LOCAL DEV PREVIEW PAGES
 * 
 * Use this folder to create custom preview pages locally.
 * 
 * Structure:
 * - app/dev/previews/[slug]/page.tsx - Your custom preview page
 * - You can copy sections from components/templates/cleaning/v1/sections/
 * - Modify layout, styles, add new sections, etc.
 * 
 * Example usage:
 * - Create: app/dev/previews/my-custom-preview/page.tsx
 * - Access: http://localhost:3000/dev/previews/my-custom-preview
 * 
 * You can import and use the template sections, or create completely custom layouts.
 */

'use client'

import { use } from 'react'
import type { CleaningPreviewConfig } from '@/lib/previews/types'
import { applyDefaults } from '@/lib/previews/helpers'

// All template sections are automatically imported - just use them below!
import { Navbar } from '@/components/templates/cleaning/v1/sections/Navbar'
import { HeroSection } from '@/components/templates/cleaning/v1/sections/HeroSection'
import { AboutSection } from '@/components/templates/cleaning/v1/sections/AboutSection'
import { ServicesSection } from '@/components/templates/cleaning/v1/sections/ServicesSection'
import { WhyUsSection } from '@/components/templates/cleaning/v1/sections/WhyUsSection'
import { AreasSection } from '@/components/templates/cleaning/v1/sections/AreasSection'
import { ReviewsSection } from '@/components/templates/cleaning/v1/sections/ReviewsSection'
import { ContactSection } from '@/components/templates/cleaning/v1/sections/ContactSection'
import { FooterSection } from '@/components/templates/cleaning/v1/sections/FooterSection'
import { GallerySection } from '@/components/templates/cleaning/v1/sections/GallerySection'
import { PricingSection } from '@/components/templates/cleaning/v1/sections/PricingSection'
import { TransformationSection } from '@/components/templates/cleaning/v1/sections/TransformationSection'

interface DevPreviewPageProps {
  params: Promise<{ slug: string }>
}

/**
 * Sample config - EDIT THIS to test different companies
 * You can also fetch from a JSON file or create multiple pages with different configs
 */
const SAMPLE_CONFIG: Partial<CleaningPreviewConfig> = {
  slug: 'dev-preview',
  templateId: 'cleaning-v1',
  business: {
    name: 'Elite Cleaning Services',
    city: 'Los Angeles',
    state: 'CA',
    phone: '+1 555-123-4567',
  },
  placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
  offer: {
    shortText: 'First-time customers get 20% off!',
  },
  branding: {
    primaryColor: '#00A8E8',
    accentColor: '#00C896',
  },
  services: [
    'Residential Cleaning',
    'Commercial Cleaning',
    'Deep Cleaning',
    'Move-in/Move-out Cleaning',
    'Window Cleaning',
    'Carpet Cleaning',
  ],
  areasServed: [
    'Los Angeles',
    'Beverly Hills',
    'Santa Monica',
    'West Hollywood',
    'Pasadena',
  ],
  hours: 'Mon-Fri: 8am-6pm, Sat: 9am-5pm',
  sampleReviews: [
    {
      name: 'Sarah Johnson',
      text: 'Excellent service! They did a thorough job cleaning our office. Very professional and punctual.',
      stars: 5,
    },
    {
      name: 'Michael Chen',
      text: 'Great experience from start to finish. The team was friendly and the results exceeded our expectations.',
      stars: 5,
    },
  ],
}

export default function DevPreviewPage({ params }: DevPreviewPageProps) {
  const { slug } = use(params)
  
  // Apply defaults to ensure all required fields exist
  const config = applyDefaults(SAMPLE_CONFIG)

  // You can customize the layout here!
  // - Reorder sections
  // - Add custom sections
  // - Modify styling
  // - Create completely new layouts

  // CUSTOMIZE YOUR LAYOUT BELOW
  // All sections are already imported - just reorder, add, or modify them!
  
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* 
        ============================================
        CUSTOMIZE YOUR LAYOUT HERE
        ============================================
        
        Available sections (already imported):
        - <Navbar config={config} />
        - <HeroSection config={config} />
        - <AboutSection config={config} />
        - <ServicesSection config={config} />
        - <WhyUsSection config={config} />
        - <AreasSection config={config} />
        - <ReviewsSection config={config} />
        - <ContactSection config={config} />
        - <FooterSection config={config} />
        - <GallerySection config={config} />
        - <PricingSection config={config} />
        - <TransformationSection config={config} />
        
        You can:
        - Reorder sections (move them around)
        - Remove sections you don't want
        - Add custom sections between them
        - Wrap sections in custom containers
        - Add custom styling/animations
        - Create different layouts for different slugs
        ============================================
      */}
      
      <Navbar config={config} />
      <HeroSection config={config} />
      <AboutSection config={config} />
      <ServicesSection config={config} />
      <WhyUsSection config={config} />
      <AreasSection config={config} />
      <ReviewsSection config={config} />
      <ContactSection config={config} />
      <FooterSection config={config} />

      {/* 
        EXAMPLE: Add a custom section
        <div className="py-20 bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-white text-center">
              Your Custom Section Here!
            </h2>
          </div>
        </div>
      */}
    </div>
  )
}

