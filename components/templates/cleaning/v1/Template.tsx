'use client'

import { motion } from 'framer-motion'
import type { CleaningPreviewConfig } from '@/lib/previews/types'
import { HeroSection } from './sections/HeroSection'
import { ServicesSection } from './sections/ServicesSection'
import { WhyUsSection } from './sections/WhyUsSection'
import { AreasSection } from './sections/AreasSection'
import { ReviewsSection } from './sections/ReviewsSection'
import { PricingSection } from './sections/PricingSection'
import { ContactSection } from './sections/ContactSection'
import { FooterSection } from './sections/FooterSection'
import { Navbar } from './sections/Navbar'

interface CleaningTemplateProps {
  config: CleaningPreviewConfig
}

export default function CleaningTemplate({ config }: CleaningTemplateProps) {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-foreground">
      <Navbar config={config} />
      <HeroSection config={config} />
      <ServicesSection config={config} />
      <WhyUsSection config={config} />
      <AreasSection config={config} />
      <ReviewsSection config={config} />
      <PricingSection config={config} />
      <ContactSection config={config} />
      <FooterSection config={config} />
    </div>
  )
}

