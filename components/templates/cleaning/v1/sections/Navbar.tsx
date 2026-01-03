'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, Phone, ChevronRight } from 'lucide-react'
import type { CleaningPreviewConfig } from '@/lib/previews/types'
import { DEFAULT_CLEANING_CONTENT } from '@/lib/previews/defaults'

interface NavbarProps {
  config: CleaningPreviewConfig
}

export function Navbar({ config }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  
  const { scrollY } = useScroll()
  
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() || 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setScrolled(latest > 20)
  })

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const navLinks = DEFAULT_CLEANING_CONTENT.navItems
  const primaryColor = config.branding.primaryColor || '#0EA5E9'
  const accentColor = config.branding.accentColor || '#10B981'

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: hidden ? -100 : 0, 
          opacity: hidden ? 0 : 1 
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className={`rounded-2xl border transition-all duration-300 ${
              scrolled
                ? 'bg-white/95 backdrop-blur-xl border-slate-200/80 shadow-lg shadow-slate-200/30'
                : 'bg-white/80 backdrop-blur-md border-slate-200/50'
            }`}
            layout
          >
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
              {/* Logo/Brand */}
              <motion.a
                href="#"
                className="text-lg sm:text-xl font-bold cursor-pointer flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {/* Logo icon */}
                <div 
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                  }}
                >
                  <span className="text-white font-bold text-sm">
                    {config.business.name.charAt(0)}
                  </span>
                </div>
                <span 
                  className="hidden sm:inline"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {config.business.name}
                </span>
              </motion.a>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {link.label}
                    <motion.span
                      className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full origin-left"
                      style={{
                        background: `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
                      }}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.a>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="hidden lg:flex items-center gap-3">
                <motion.a
                  href="#contact"
                  className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
                  style={{
                    borderColor: `${primaryColor}40`,
                    color: primaryColor,
                  }}
                  whileHover={{ 
                    backgroundColor: `${primaryColor}08`,
                    borderColor: primaryColor,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Quote
                </motion.a>
                <motion.a
                  href={`tel:${config.business.phone.replace(/\s/g, '')}`}
                  className="px-5 py-2.5 rounded-lg font-semibold text-white text-sm flex items-center gap-2 transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="h-4 w-4" />
                  <span className="hidden xl:inline">{config.business.phone}</span>
                  <span className="xl:hidden">Call Now</span>
                </motion.a>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Toggle menu"
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                      }}
                    >
                      <span className="text-white font-bold text-sm">
                        {config.business.name.charAt(0)}
                      </span>
                    </div>
                    <span 
                      className="font-bold"
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
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-4">
                  <nav className="px-4 space-y-1">
                    {navLinks.map((link, index) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors group"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <span className="font-medium">{link.label}</span>
                        <ChevronRight 
                          className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" 
                          style={{ color: primaryColor }}
                        />
                      </motion.a>
                    ))}
                  </nav>
                </div>

                {/* Footer CTAs */}
                <div className="p-4 border-t border-slate-100 space-y-3">
                  <motion.a
                    href={`tel:${config.business.phone.replace(/\s/g, '')}`}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Phone className="h-5 w-5" />
                    Call {config.business.phone}
                  </motion.a>
                  <motion.a
                    href="#contact"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold border-2"
                    style={{
                      borderColor: `${primaryColor}40`,
                      color: primaryColor,
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Free Quote
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
