'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/site/Container'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface ContactSectionProps {
  config: {
    business: { name: string; phone: string }
  }
}

export function ContactSection({ config }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-foreground-secondary">
            Ready to get started? Contact {config.business.name} today
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-white/10 rounded-2xl p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground-secondary mb-2">
                  Name
                </label>
                <Input required placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-secondary mb-2">
                  Phone
                </label>
                <Input required type="tel" placeholder={config.business.phone} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-secondary mb-2">
                  Message
                </label>
                <Textarea required rows={6} placeholder="Tell us about your cleaning needs..." />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Send Message
              </Button>
              <p className="text-xs text-center text-foreground-muted">
                Concept form—final version will send to your inbox
              </p>
            </form>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

