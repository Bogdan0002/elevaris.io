'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/site/Container'
import { Image as ImageIcon } from 'lucide-react'

interface GallerySectionProps {
  config: {
    branding: { primaryColor?: string; accentColor?: string }
  }
}

export function GallerySection({ config }: GallerySectionProps) {
  const primaryColor = config.branding.primaryColor || '#FF6A55'
  const accentColor = config.branding.accentColor || '#7B63FF'

  // Placeholder gallery items (6 items)
  const galleryItems = Array.from({ length: 6 }, (_, i) => i)

  return (
    <section id="gallery" className="py-20 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Work</h2>
          <p className="text-lg text-foreground-secondary">
            See the quality and attention to detail in every project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] group cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              {/* Placeholder content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon
                    className="h-12 w-12 mx-auto mb-3 opacity-30"
                    style={{ color: primaryColor }}
                  />
                  <p className="text-sm text-foreground-muted">Gallery Image</p>
                </div>
              </div>

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-foreground-muted">
            Gallery images will be added when available
          </p>
        </motion.div>
      </Container>
    </section>
  )
}

