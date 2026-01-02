'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/site/Container'
import { Phone, Mail, MapPin } from 'lucide-react'
import type { CleaningPreviewConfig } from '@/lib/previews/types'
import { DEFAULT_CLEANING_CONTENT } from '@/lib/previews/defaults'

interface FooterSectionProps {
  config: CleaningPreviewConfig
}

export function FooterSection({ config }: FooterSectionProps) {
  const primaryColor = config.branding.primaryColor || '#FF6A55'
  const accentColor = config.branding.accentColor || '#7B63FF'
  const navLinks = DEFAULT_CLEANING_CONTENT.navItems
  const footerLinks = DEFAULT_CLEANING_CONTENT.footerLinks

  return (
    <footer className="py-16 border-t border-white/10 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {config.business.name}
            </h3>
            <p className="text-foreground-secondary mb-4 leading-relaxed">
              Professional cleaning services in {config.business.city},{' '}
              {config.business.state}. Your trusted partner for a spotless space.
            </p>
            <div className="flex flex-col gap-2 text-sm text-foreground-secondary">
              <a
                href={`tel:${config.business.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" style={{ color: primaryColor }} />
                {config.business.phone}
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" style={{ color: primaryColor }} />
                {config.business.city}, {config.business.state}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-foreground-secondary hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-foreground">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-foreground-secondary hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-foreground-secondary hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-white/10 text-center"
        >
          <p className="text-sm text-foreground-secondary">
            © {new Date().getFullYear()} {config.business.name}. All rights reserved.
          </p>
        </motion.div>
      </Container>
    </footer>
  )
}
