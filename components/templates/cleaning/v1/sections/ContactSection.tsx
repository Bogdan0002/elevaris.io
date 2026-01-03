'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Container } from '@/components/site/Container'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Zap
} from 'lucide-react'

interface ContactSectionProps {
  config: {
    business: { name: string; phone: string; city: string; state: string }
    branding: { primaryColor?: string; accentColor?: string }
    hours?: string
  }
}

export function ContactSection({ config }: ContactSectionProps) {
  const primaryColor = config.branding.primaryColor || '#0EA5E9'
  const accentColor = config.branding.accentColor || '#10B981'
  
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: config.business.phone,
      href: `tel:${config.business.phone.replace(/\s/g, '')}`,
      description: 'Call us anytime',
    },
    {
      icon: MapPin,
      label: 'Service Area',
      value: `${config.business.city}, ${config.business.state}`,
      href: null,
      description: 'Proudly serving',
    },
    {
      icon: Clock,
      label: 'Hours',
      value: config.hours || 'Mon-Sat: 8am-6pm',
      href: null,
      description: 'Open for you',
    },
  ]

  const services = [
    'Residential Cleaning',
    'Commercial Cleaning',
    'Deep Cleaning',
    'Move-in/Move-out',
    'Other',
  ]

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, white 0%, ${primaryColor}05 50%, white 100%),
            radial-gradient(ellipse 80% 50% at 20% 80%, ${primaryColor}08 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 20%, ${accentColor}05 0%, transparent 50%)
          `,
        }}
      />

      {/* Animated decorative elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: primaryColor }}
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{ background: accentColor }}
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      <Container className="relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{
              backgroundColor: `${primaryColor}10`,
              color: primaryColor,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <MessageSquare className="w-4 h-4" />
            Get In Touch
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Ready for a
            <span 
              className="block mt-2"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Spotless Space?
            </span>
          </h2>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Get your free quote today. We&apos;ll get back to you within 24 hours 
            with a customized cleaning plan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Contact {config.business.name}
              </h3>
              <p className="text-slate-600">
                We&apos;re here to help with all your cleaning needs.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon
                const content = (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:border-slate-200 transition-all group cursor-pointer"
                    whileHover={{ y: -2 }}
                  >
                    <motion.div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}15, ${accentColor}10)`,
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                      }}
                    >
                      <Icon className="w-6 h-6 group-hover:text-white transition-colors" style={{ color: primaryColor }} />
                    </motion.div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">{item.description}</div>
                      <div className="font-bold text-slate-900">{item.value}</div>
                    </div>
                  </motion.div>
                )

                return item.href ? (
                  <a key={index} href={item.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={index}>{content}</div>
                )
              })}
            </div>

            {/* Quick call CTA */}
            <motion.a
              href={`tel:${config.business.phone.replace(/\s/g, '')}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-white shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                boxShadow: `0 10px 30px ${primaryColor}25`,
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-5 h-5" />
              Call Now for Instant Quote
            </motion.a>

            {/* Response time badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center gap-2 text-sm text-slate-600"
            >
              <Zap className="w-4 h-4" style={{ color: accentColor }} />
              <span>Average response time: <strong>Under 1 hour</strong></span>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div 
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
              style={{
                boxShadow: `0 25px 50px -12px ${primaryColor}10`,
              }}
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                  >
                    <CheckCircle2 className="w-10 h-10" style={{ color: accentColor }} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-slate-600 mb-6">
                    We&apos;ve received your request and will get back to you within 24 hours.
                  </p>
                  <motion.button
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormState({ name: '', phone: '', email: '', service: '', message: '' })
                    }}
                    className="text-sm font-semibold flex items-center gap-2 mx-auto"
                    style={{ color: primaryColor }}
                    whileHover={{ x: 3 }}
                  >
                    Send another message
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-2 mb-6">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}15, ${accentColor}10)`,
                      }}
                    >
                      <Sparkles className="w-5 h-5" style={{ color: primaryColor }} />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Get Your Free Quote</span>
                      <p className="text-xs text-slate-500">No obligation, just results</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3.5 rounded-xl border-2 bg-slate-50 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 outline-none"
                        style={{ 
                          borderColor: focusedField === 'name' ? primaryColor : '#e2e8f0',
                        }}
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3.5 rounded-xl border-2 bg-slate-50 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 outline-none"
                        style={{ 
                          borderColor: focusedField === 'phone' ? primaryColor : '#e2e8f0',
                        }}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3.5 rounded-xl border-2 bg-slate-50 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 outline-none"
                      style={{ 
                        borderColor: focusedField === 'email' ? primaryColor : '#e2e8f0',
                      }}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Service Needed
                    </label>
                    <select
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      onFocus={() => setFocusedField('service')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3.5 rounded-xl border-2 bg-slate-50 focus:bg-white transition-all text-slate-900 outline-none appearance-none cursor-pointer"
                      style={{ 
                        borderColor: focusedField === 'service' ? primaryColor : '#e2e8f0',
                      }}
                    >
                      <option value="">Select a service...</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Tell us about your cleaning needs
                    </label>
                    <textarea
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3.5 rounded-xl border-2 bg-slate-50 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 resize-none outline-none"
                      style={{ 
                        borderColor: focusedField === 'message' ? primaryColor : '#e2e8f0',
                      }}
                      placeholder="Size of space, frequency, special requirements..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                      boxShadow: `0 10px 30px ${primaryColor}25`,
                    }}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Get My Free Quote
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-center text-slate-500">
                    By submitting, you agree to receive communications from {config.business.name}.
                    <br />
                    <span className="text-slate-400 flex items-center justify-center gap-1 mt-1">
                      <Sparkles className="w-3 h-3" />
                      Concept form — final version will be fully functional
                    </span>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
