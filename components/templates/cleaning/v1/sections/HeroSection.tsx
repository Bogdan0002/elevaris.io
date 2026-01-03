'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Container } from '@/components/site/Container'
import { getGoogleReviewUrl } from '@/lib/previews/helpers'
import { 
  Star, 
  Phone, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  Shield, 
  Clock, 
  Award,
  Play,
  ArrowRight,
  Zap,
  Users,
  Calendar
} from 'lucide-react'
import { DEFAULT_CLEANING_CONTENT } from '@/lib/previews/defaults'

interface HeroSectionProps {
  config: {
    business: { name: string; city: string; state: string; phone: string }
    offer: { shortText: string }
    branding: { primaryColor?: string; accentColor?: string }
    placeId: string
  }
}

// Animated number counter
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setDisplayValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [value])
  
  return <span ref={ref}>{displayValue}{suffix}</span>
}

// Floating badge component
function FloatingBadge({ 
  children, 
  delay = 0,
  className = '',
  style = {},
}: { 
  children: React.ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      className={`absolute hidden md:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 z-20 ${className}`}
      style={style}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, y: -2 }}
    >
      {children}
    </motion.div>
  )
}

export function HeroSection({ config }: HeroSectionProps) {
  const reviewUrl = getGoogleReviewUrl(config.placeId)
  const primaryColor = config.branding.primaryColor || '#0EA5E9'
  const accentColor = config.branding.accentColor || '#10B981'
  const trustItems = DEFAULT_CLEANING_CONTENT.trustBadges

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.95])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  }

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24"
    >
      {/* Premium gradient background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, ${primaryColor}15 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 100% 50%, ${accentColor}10 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 0% 80%, ${primaryColor}08 0%, transparent 50%),
              linear-gradient(180deg, white 0%, #fafafa 100%)
            `,
          }}
        />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${primaryColor}12 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.8, 0.6],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-60 -left-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${accentColor}10 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.7, 0.5],
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Geometric decorations */}
        <motion.div
          className="absolute top-1/4 right-[12%] w-24 h-24 border-2 rounded-3xl opacity-20 hidden lg:block"
          style={{ borderColor: primaryColor }}
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-1/3 left-[8%] w-16 h-16 rounded-full opacity-20 hidden lg:block"
          style={{ backgroundColor: accentColor }}
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 right-[5%] w-3 h-3 rounded-full hidden lg:block"
          style={{ backgroundColor: primaryColor }}
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Sparkle particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full hidden md:block"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
              left: `${15 + (i * 10)}%`,
              top: `${25 + (i * 6) % 50}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <Container className="relative z-10">
        <motion.div style={{ y, opacity, scale }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-5xl mx-auto"
          >
            {/* Offer Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <motion.div
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold backdrop-blur-sm border shadow-lg"
                style={{
                  backgroundColor: `${primaryColor}10`,
                  borderColor: `${primaryColor}25`,
                  color: primaryColor,
                  boxShadow: `0 4px 20px ${primaryColor}15`,
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                animate={{ 
                  boxShadow: [
                    `0 4px 20px ${primaryColor}15`,
                    `0 4px 30px ${primaryColor}25`,
                    `0 4px 20px ${primaryColor}15`,
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.span>
                <span>{config.offer.shortText}</span>
                <motion.span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: accentColor }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>

            {/* Main headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]"
            >
              <span className="text-slate-900">Sparkling Clean</span>
              <br />
              <span className="text-slate-900">Homes in </span>
              <span 
                className="relative inline-block"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {config.business.city}
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M0 9 Q 50 0, 100 9 T 200 9"
                    fill="none"
                    stroke={`url(#gradient-${config.business.city})`}
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
                  />
                  <defs>
                    <linearGradient id={`gradient-${config.business.city}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={primaryColor} />
                      <stop offset="100%" stopColor={accentColor} />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              {config.business.name} delivers{' '}
              <span className="font-semibold text-slate-800">exceptional cleaning services</span>{' '}
              with meticulous attention to detail. Experience the joy of coming home to a 
              spotless, fresh space.
            </motion.p>

            {/* Trust indicators row */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-10 text-sm"
            >
              {[
                { icon: CheckCircle2, text: 'Licensed & Insured', color: accentColor },
                { icon: Shield, text: 'Background Checked', color: primaryColor },
                { icon: Clock, text: 'Same-Day Available', color: accentColor },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="flex items-center gap-2 text-slate-600"
                  whileHover={{ scale: 1.05 }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
            >
              <motion.a
                href={`tel:${config.business.phone.replace(/\s/g, '')}`}
                className="group relative w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-3 overflow-hidden shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                  boxShadow: `0 10px 40px ${primaryColor}30`,
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}, ${primaryColor})`,
                  }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <Phone className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Call {config.business.phone}</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%', skewX: '-15deg' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.a>
              
              <motion.a
                href="#contact"
                className="group w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 border-2 bg-white transition-all"
                style={{
                  borderColor: `${primaryColor}30`,
                  color: primaryColor,
                }}
                whileHover={{ 
                  scale: 1.02,
                  y: -2,
                  borderColor: primaryColor,
                  backgroundColor: `${primaryColor}05`,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageSquare className="w-5 h-5" />
                <span>Get Free Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>

            {/* Social proof card */}
            <motion.div
              variants={itemVariants}
              className="inline-block w-full max-w-4xl"
            >
              <motion.div
                className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-200/60 border border-slate-100/80"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Rating row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0, rotate: -180 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ delay: 1.4 + i * 0.1, duration: 0.4, type: 'spring' }}
                        >
                          <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                        </motion.div>
                      ))}
                    </div>
                    <div className="text-left">
                      <span className="font-bold text-slate-900 text-lg">5.0</span>
                      <span className="text-slate-500 ml-2">Rating</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-center sm:text-right">
                      <div className="font-bold text-slate-900">Trusted by</div>
                      <div className="text-sm text-slate-500">{config.business.city} families</div>
                    </div>
                    <motion.a
                      href={reviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all"
                      style={{ 
                        backgroundColor: `${primaryColor}10`,
                        color: primaryColor,
                      }}
                      whileHover={{ 
                        backgroundColor: primaryColor,
                        color: 'white',
                        scale: 1.02,
                      }}
                    >
                      <Star className="w-4 h-4" />
                      Leave Review
                    </motion.a>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                  {trustItems.map((item, i) => (
                    <motion.div
                      key={i}
                      className="text-center group cursor-default"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8 + i * 0.1, duration: 0.4 }}
                      whileHover={{ y: -3 }}
                    >
                      <motion.div 
                        className="text-3xl mb-2 inline-block"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {item.icon}
                      </motion.div>
                      <div className="font-semibold text-slate-900 text-sm">{item.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{item.description}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating badges - positioned more sideways to avoid covering H1 */}
        <FloatingBadge
          delay={2}
          className="top-[25%] -left-2 md:left-0 2xl:left-[-2%]"
          style={{ transform: 'rotate(-4deg)' }}
        >
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)` }}
          >
            <Calendar className="w-5 h-5" style={{ color: accentColor }} />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">Book Today</div>
            <div className="text-xs text-slate-500">Same-day slots</div>
          </div>
        </FloatingBadge>

        <FloatingBadge
          delay={2.2}
          className="bottom-[35%] -right-2 md:right-0 2xl:right-[-2%]"
          style={{ transform: 'rotate(4deg)' }}
        >
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${primaryColor}20, ${primaryColor}10)` }}
          >
            <Users className="w-5 h-5" style={{ color: primaryColor }} />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">
              <AnimatedNumber value={500} suffix="+" />
            </div>
            <div className="text-xs text-slate-500">Happy clients</div>
          </div>
        </FloatingBadge>

        <FloatingBadge
          delay={2.4}
          className="top-[40%] -right-2 md:right-0 2xl:right-[-1%]"
          style={{ transform: 'rotate(3deg)' }}
        >
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-xs text-slate-600 font-medium">5-Star Service</span>
        </FloatingBadge>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <span className="text-xs text-slate-400 font-medium tracking-wide">Scroll to explore</span>
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-slate-300 flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: primaryColor }}
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
