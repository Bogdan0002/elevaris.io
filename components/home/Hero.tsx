"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useState, useRef, useCallback, useEffect } from "react"
import { Container } from "@/components/site/Container"
import { GlowButton } from "@/components/brand/GlowButton"
import { GlowCard } from "@/components/brand/GlowCard"
import { FloatingCard } from "@/components/brand/FloatingCard"
import { SparklesCore } from "@/components/ui/sparkles"
import { 
  CheckCircle2, 
  TrendingUp, 
  Star, 
  Users,
  Zap,
  Code2,
  Palette,
  Search,
  ArrowUpRight,
  MousePointer2,
  Globe,
  Sparkles
} from "lucide-react"

interface HeroProps {
  title: string
  highlight: string
  subtitle: string
  button: string
  floatingCards: Array<{ title: string; text: string }>
  badge: string
}

// Interactive Hero Mockup
function InteractiveHeroMockup() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [activeService, setActiveService] = useState(0)
  const [metrics, setMetrics] = useState({ traffic: 0, leads: 0, conversion: 0 })
  
  // Mouse position for 3D effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig)
  
  // Parallax for floating elements
  const floatX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig)
  const floatY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig)
  const floatXReverse = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, -20]), springConfig)
  const floatYReverse = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), springConfig)
  
  // Glow position
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig)
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }, [mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  // Animate metrics on mount
  useEffect(() => {
    const animateMetrics = () => {
      let traffic = 0
      let leads = 0
      let conversion = 0
      
      const interval = setInterval(() => {
        traffic = Math.min(traffic + 5, 180)
        leads = Math.min(leads + 2, 47)
        conversion = Math.min(conversion + 0.2, 8.4)
        
        setMetrics({ traffic, leads: Math.floor(leads), conversion: parseFloat(conversion.toFixed(1)) })
        
        if (traffic >= 180 && leads >= 47 && conversion >= 8.4) {
          clearInterval(interval)
        }
      }, 30)
      
      return () => clearInterval(interval)
    }
    
    const timeout = setTimeout(animateMetrics, 800)
    return () => clearTimeout(timeout)
  }, [])

  // Auto-rotate services
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService(prev => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const services = [
    { icon: Palette, label: 'UX/UI Design', color: 'from-purple-500 to-pink-500' },
    { icon: Code2, label: 'Web Development', color: 'from-primary to-orange-400' },
    { icon: Search, label: 'SEO Strategies', color: 'from-green-500 to-emerald-400' },
    { icon: TrendingUp, label: 'Advertising', color: 'from-blue-500 to-cyan-400' },
  ]

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto w-full max-w-[520px] cursor-pointer"
      style={{ perspective: 1200 }}
    >
      {/* 3D Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative"
      >
        {/* Dynamic glow effect */}
        <motion.div
          className="absolute -inset-8 rounded-3xl opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${glowX}% ${glowY}%, rgba(255,106,85,0.2), rgba(123,99,255,0.15), transparent 40%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Main dashboard card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-zinc-800/90 to-zinc-900/90 p-1 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6),0_0_80px_rgba(255,106,85,0.15)] transition-shadow duration-300 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7),0_0_100px_rgba(255,106,85,0.25)]">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-zinc-900/80 rounded-t-[22px] border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[11px] text-white/40 font-medium">elevaris.app/dashboard</span>
            </div>
            <div className="flex items-center gap-1.5">
              <motion.div 
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[10px] text-green-400">Live</span>
            </div>
          </div>
          
          {/* Content */}
          <div className="bg-[#0a0809] rounded-b-[22px] p-5 min-h-[320px]">
            {/* Services selector */}
            <div className="flex gap-2 mb-5">
              {services.map((service, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setActiveService(idx)}
                  className={`flex-1 py-2 px-2 rounded-xl text-[9px] font-medium transition-all flex items-center justify-center gap-1 ${
                    activeService === idx 
                      ? 'bg-primary/20 text-primary border border-primary/30' 
                      : 'bg-white/5 text-white/40 border border-white/5 hover:bg-white/10 hover:text-white/60'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <service.icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{service.label.split(' ')[0]}</span>
                </motion.button>
              ))}
            </div>

            {/* Active service display */}
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-5"
            >
              <div className={`rounded-2xl bg-gradient-to-br ${services[activeService].color} p-[1px]`}>
                <div className="rounded-2xl bg-[#0f0b0e] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {(() => {
                        const Icon = services[activeService].icon
                        return <Icon className="w-5 h-5 text-primary" />
                      })()}
                      <span className="text-sm font-semibold text-white">{services[activeService].label}</span>
                    </div>
                    <span className="text-[10px] text-green-400 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      Active
                    </span>
                  </div>
                  <p className="text-[11px] text-white/60 leading-relaxed">
                    {activeService === 0 && "Creating beautiful, conversion-focused designs that users love."}
                    {activeService === 1 && "Building fast, scalable websites with modern technologies."}
                    {activeService === 2 && "Driving organic traffic with data-driven SEO strategies."}
                    {activeService === 3 && "Generating qualified leads through targeted ad campaigns."}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Metrics grid */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <motion.div 
                className="rounded-xl bg-white/5 p-3 border border-white/10 hover:border-primary/30 transition-colors cursor-pointer"
                whileHover={{ scale: 1.03, y: -2 }}
              >
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp className="w-3 h-3 text-primary/60" />
                  <p className="text-[8px] text-white/50">Traffic</p>
                </div>
                <p className="text-lg font-bold text-white">+{metrics.traffic}%</p>
              </motion.div>
              <motion.div 
                className="rounded-xl bg-primary/10 p-3 border border-primary/20 hover:border-primary/40 transition-colors cursor-pointer"
                whileHover={{ scale: 1.03, y: -2 }}
              >
                <div className="flex items-center gap-1 mb-1">
                  <Users className="w-3 h-3 text-primary/60" />
                  <p className="text-[8px] text-white/50">Leads</p>
                </div>
                <p className="text-lg font-bold text-primary">{metrics.leads}</p>
              </motion.div>
              <motion.div 
                className="rounded-xl bg-white/5 p-3 border border-white/10 hover:border-green-500/30 transition-colors cursor-pointer"
                whileHover={{ scale: 1.03, y: -2 }}
              >
                <div className="flex items-center gap-1 mb-1">
                  <Zap className="w-3 h-3 text-green-400/60" />
                  <p className="text-[8px] text-white/50">Conv.</p>
                </div>
                <p className="text-lg font-bold text-green-400">{metrics.conversion}%</p>
              </motion.div>
            </div>

            {/* Performance chart */}
            <div className="rounded-xl bg-white/5 border border-white/10 p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] text-white/50">Growth Trajectory</p>
                <p className="text-[10px] text-green-400">↑ 24% this month</p>
              </div>
              <div className="flex items-end gap-1 h-12">
                {[30, 45, 35, 55, 50, 70, 65, 85, 75, 95, 90, 100].map((height, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-primary to-[#7b63ff] rounded-t cursor-pointer"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
                    whileHover={{ height: `${Math.min(height + 10, 100)}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Floating stats badge - top right */}
      <motion.div
        className="absolute -top-6 -right-2 sm:-right-10 bg-gradient-to-br from-[#181116] to-[#0f0b0e] rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-primary/30 cursor-pointer z-10"
        style={{ x: floatX, y: floatY, transformStyle: 'preserve-3d', transform: 'translateZ(40px)' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.1, borderColor: 'rgba(255,106,85,0.5)' }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-[#7b63ff]/20 flex items-center justify-center"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <TrendingUp className="w-5 h-5 text-primary" />
          </motion.div>
          <div>
            <p className="text-[10px] text-white/50">Avg. Growth</p>
            <p className="text-lg font-bold text-primary">+180%</p>
          </div>
        </div>
      </motion.div>
      
      {/* Floating review card - bottom left */}
      <motion.div
        className="absolute -bottom-4 -left-2 sm:-left-8 bg-white rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-gray-100 cursor-pointer z-10"
        style={{ x: floatXReverse, y: floatYReverse, transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <p className="text-[9px] text-gray-600 max-w-[100px]">&ldquo;Game changer for our business!&rdquo;</p>
        <p className="text-[8px] text-gray-400 mt-1">— Mike&apos;s Cleaning Co.</p>
      </motion.div>

      {/* Interaction hint - mobile optimized */}
      <motion.div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] text-white/30"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <MousePointer2 className="w-3 h-3" />
        <span className="hidden sm:inline">Move mouse to interact</span>
        <span className="sm:hidden">Tap to explore</span>
      </motion.div>
    </motion.div>
  )
}

export function Hero({
  title,
  highlight,
  subtitle,
  button,
  floatingCards,
  badge,
}: HeroProps) {
  const highlightMatch = title.match(new RegExp(`(${highlight})`, "i"))
  const beforeHighlight = highlightMatch ? title.slice(0, highlightMatch.index).trimEnd() : title
  const highlightText = highlightMatch ? highlightMatch[0] : highlight
  const afterHighlight = highlightMatch
    ? title.slice((highlightMatch.index ?? 0) + highlightText.length).trimStart()
    : ""

  return (
    <section className="relative min-h-[110vh] md:min-h-screen flex items-center pt-32 overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(255,106,85,0.08),transparent_40%),radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.4),transparent_50%),linear-gradient(135deg,#0b0809_0%,#090707_60%,#0f0b0c_100%)]">
      {/* Sparkles Background for entire hero section */}
      <div className="absolute inset-0 -z-0 overflow-hidden">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={120}
          className="w-full h-full"
          particleColor="#FF6A55"
          speed={1}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 relative"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground-secondary">{badge}</span>
            </motion.div>

            <div className="relative inline-block">
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-[56px] lg:leading-[1.1]">
                <span className="block">
                  {beforeHighlight}{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-highlight-accent bg-[length:180%_100%] animate-[glint_3s_ease-in-out_infinite] drop-shadow-[0_0_12px_rgba(110,166,255,0.28)]">
                      {highlightText}
                    </span>
                    {/* Soft glow band */}
                    <span className="pointer-events-none absolute inset-x-[-6%] bottom-[-6px] h-[14px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(116,137,255,0.28),rgba(110,166,255,0.08)_60%,transparent_85%)] blur-[7px] opacity-85" />
                  </span>
                </span>
                {afterHighlight && <span className="block">{afterHighlight}</span>}
              </h1>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-foreground-secondary">
              {subtitle}
            </p>
            <div className="flex items-center gap-4">
              <GlowButton
                variant="primary"
                size="lg"
                href="/contact-us"
              >
                {button}
              </GlowButton>
            </div>

            {/* Trust indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap items-center gap-6 pt-4 text-sm text-foreground-secondary"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                No long-term contracts
              </span>
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                Launch in days
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:pl-6"
          >
            <InteractiveHeroMockup />
          </motion.div>
        </div>

        {/* Floating Cards Below Hero - Evenly Spaced */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 gap-3 sm:grid-cols-3 relative sm:h-[200px] sm:flex sm:justify-between sm:items-start sm:gap-0 px-4 sm:px-0">
          {floatingCards.map((card, index) => (
            <FloatingCard
              key={card.title}
              rotation={index === 0 ? -6 : index === 1 ? 4 : -4}
              delay={index * 0.2}
              className="sm:w-[280px] sm:flex-shrink-0 !scale-[0.85] sm:!scale-100"
            >
              <div className="h-full rounded-2xl p-[1px] bg-gradient-to-r from-[#ff6a55]/60 via-[#ff7a59]/40 to-[#7b63ff]/60">
                <GlowCard hover={false} className="h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,106,85,0.12),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(123,99,255,0.12),transparent_40%),linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border-0 shadow-[0_12px_30px_rgba(0,0,0,0.3)]">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {card.title}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {card.text}
                  </p>
                </GlowCard>
              </div>
            </FloatingCard>
          ))}
        </div>
      </Container>

      <style jsx>{`
        @media (max-width: 1024px) {
          .hero-blob {
            transform: scale(0.94);
          }
        }

        @keyframes glint {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  )
}
