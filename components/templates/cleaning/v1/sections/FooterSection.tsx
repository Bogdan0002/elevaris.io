'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Container } from '@/components/site/Container'
import { Phone, Mail, MapPin, Facebook, Instagram, ArrowUp, Star, Shield, Leaf } from 'lucide-react'
import type { CleaningPreviewConfig } from '@/lib/previews/types'
import { DEFAULT_CLEANING_CONTENT } from '@/lib/previews/defaults'
import { getGoogleReviewUrl } from '@/lib/previews/helpers'

interface FooterSectionProps {
  config: CleaningPreviewConfig
}

export function FooterSection({ config }: FooterSectionProps) {
  const primaryColor = config.branding.primaryColor || '#0EA5E9'
  const accentColor = config.branding.accentColor || '#10B981'
  const navLinks = DEFAULT_CLEANING_CONTENT.navItems
  const footerLinks = DEFAULT_CLEANING_CONTENT.footerLinks
  const reviewUrl = getGoogleReviewUrl(config.placeId)
  
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: '-50px' })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // TikTok icon component
  const TikTokIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  )

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: TikTokIcon, href: '#', label: 'TikTok' },
  ]

  const badges = [
    { icon: Star, text: '5-Star Rated' },
    { icon: Shield, text: 'Fully Insured' },
    { icon: Leaf, text: 'Eco-Friendly' },
  ]

  return (
    <footer 
      ref={footerRef}
      className="relative overflow-hidden"
    >
      {/* Top CTA Banner */}
      <div 
        className="py-12 relative"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
        }}
      >
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-white">
            <div className="text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                Ready for a Cleaner Space?
              </h3>
              <p className="text-white/90">
                Get your free quote today — no obligation, just results.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href={`tel:${config.business.phone.replace(/\s/g, '')}`}
                className="px-8 py-4 rounded-xl font-semibold bg-white flex items-center justify-center gap-2"
                style={{ color: primaryColor }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5" />
                Call Now
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-4 rounded-xl font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Free Quote
              </motion.a>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer */}
      <div className="bg-slate-900 text-white py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="flex items-center gap-2 mb-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                  }}
                >
                  <span className="text-white font-bold">
                    {config.business.name.charAt(0)}
                  </span>
                </div>
                <span 
                  className="text-xl font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {config.business.name}
                </span>
              </div>
              
              <p className="text-slate-400 mb-6 leading-relaxed text-sm">
                Professional cleaning services in {config.business.city},{' '}
                {config.business.state}. Your trusted partner for a spotless, 
                healthy space.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3">
                {badges.map((badge, i) => {
                  const Icon = badge.icon
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 text-xs"
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                      <span className="text-slate-300">{badge.text}</span>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.slice(0, 5).map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span 
                        className="w-1 h-1 rounded-full transition-all group-hover:w-2"
                        style={{ backgroundColor: primaryColor }}
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span 
                        className="w-1 h-1 rounded-full transition-all group-hover:w-2"
                        style={{ backgroundColor: accentColor }}
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-4">
                <a
                  href={`tel:${config.business.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-800 group-hover:scale-110 transition-transform"
                  >
                    <Phone className="w-4 h-4" style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Phone</div>
                    <div className="text-sm font-medium text-white">{config.business.phone}</div>
                  </div>
                </a>
                
                <div className="flex items-center gap-3 text-slate-400">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-800"
                  >
                    <MapPin className="w-4 h-4" style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Location</div>
                    <div className="text-sm font-medium text-white">
                      {config.business.city}, {config.business.state}
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-4">
                  <div className="text-xs text-slate-500 mb-3">Follow Us</div>
                  <div className="flex gap-3">
                    {socialLinks.map((social, i) => {
                      const Icon = social.icon
                      return (
                        <motion.a
                          key={i}
                          href={social.href}
                          className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                          whileHover={{ scale: 1.1, backgroundColor: primaryColor }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={social.label}
                        >
                          <Icon className="w-4 h-4" />
                        </motion.a>
                      )
                    })}
                    <motion.a
                      href={reviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1, backgroundColor: '#FBBC05' }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Google Reviews"
                    >
                      <Star className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <p className="text-sm text-slate-500 text-center sm:text-left">
              © {new Date().getFullYear()} {config.business.name}. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <motion.button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* Bottom padding for mobile CTA */}
      <div className="h-24 bg-slate-900 md:hidden" />
    </footer>
  )
}
