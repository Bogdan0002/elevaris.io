"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { useState, useRef, useCallback, useEffect } from "react"
import { Container } from "@/components/site/Container"
import { SectionHeading } from "@/components/site/SectionHeading"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Footer } from "@/components/site/Footer"
import { 
  Search, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Users, 
  Zap, 
  Globe, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  MousePointer2,
  Sparkles,
  ArrowUpRight,
  Eye,
  ChevronRight,
  Play,
  RefreshCw,
  MapPin
} from "lucide-react"

const benefits = [
  {
    icon: Search,
    title: "Local Search Dominance",
    description: "Show up when nearby customers search for your services. Dominate local map results and organic rankings.",
    gradient: "from-[#ff6a55]/20 to-[#7b63ff]/10",
  },
  {
    icon: TrendingUp,
    title: "Sustainable Growth",
    description: "Unlike ads that stop when you stop paying, SEO builds long-term visibility that compounds over time.",
    gradient: "from-[#7b63ff]/20 to-[#3d52d5]/10",
  },
  {
    icon: Target,
    title: "Intent-Based Traffic",
    description: "Attract visitors actively looking for your services—not just random clicks. Higher intent means better conversions.",
    gradient: "from-[#3d52d5]/20 to-[#ff6a55]/10",
  },
]

const allBenefits = [
  {
    icon: Search,
    title: "Local Search Dominance",
    description: "Show up when nearby customers search for your services. Dominate local map results and organic rankings."
  },
  {
    icon: TrendingUp,
    title: "Sustainable Growth",
    description: "Unlike ads that stop when you stop paying, SEO builds long-term visibility that compounds over time."
  },
  {
    icon: Target,
    title: "Intent-Based Traffic",
    description: "Attract visitors actively looking for your services—not just random clicks. Higher intent means better conversions."
  },
  {
    icon: BarChart3,
    title: "Data-Driven Strategy",
    description: "Every decision backed by real search data, competitor analysis, and proven ranking factors."
  },
  {
    icon: Users,
    title: "Authority Building",
    description: "Establish your business as the go-to authority in your market through strategic content and backlinks."
  },
  {
    icon: Zap,
    title: "Technical Excellence",
    description: "Fast-loading, mobile-optimized websites that search engines love and users enjoy."
  }
]

const process = [
  {
    num: "01",
    title: "Audit & Analysis",
    text: "Deep dive into your current rankings, competitors, and opportunities. Identify quick wins and long-term strategy."
  },
  {
    num: "02",
    title: "On-Page Optimization",
    text: "Optimize your website structure, content, meta tags, and technical elements for maximum search visibility."
  },
  {
    num: "03",
    title: "Content Strategy",
    text: "Create and optimize content that answers your customers' questions and ranks for valuable keywords."
  },
  {
    num: "04",
    title: "Monitor & Scale",
    text: "Track rankings, traffic, and conversions. Continuously refine strategy based on real performance data."
  }
]

const stats = [
  { value: "2-5x", label: "Traffic Increase" },
  { value: "90%", label: "Client Retention" },
  { value: "Page 1", label: "Results Focus" },
  { value: "24/7", label: "Monitoring" },
]

const faqs = [
  {
    q: "How long does it take to see SEO results?",
    a: "Most clients see initial improvements within 4-8 weeks, with significant results by 3-6 months. SEO is a long-term strategy that builds momentum over time."
  },
  {
    q: "What's the difference between local SEO and regular SEO?",
    a: "Local SEO focuses on appearing in local map packs and \"near me\" searches, while general SEO targets broader organic rankings. We optimize for both."
  },
  {
    q: "Do I need to keep paying for SEO to maintain rankings?",
    a: "Unlike ads, SEO results persist even if you pause. However, ongoing optimization is recommended to stay ahead of competitors and algorithm updates."
  },
  {
    q: "Can you guarantee #1 rankings?",
    a: "No reputable SEO professional can guarantee specific rankings. We focus on sustainable growth, increased visibility, and qualified traffic that converts."
  },
  {
    q: "What if I'm in a competitive industry?",
    a: "We specialize in competitive markets. Our data-driven approach identifies opportunities others miss and builds authority systematically."
  },
  {
    q: "Do you use black hat SEO tactics?",
    a: "Never. We use only white-hat, Google-approved strategies that build sustainable rankings without risk of penalties."
  }
]

const footerData = {
  aboutText: "Elevaris Web Solutions helps small businesses grow online with modern, personalized websites. Our team combines design, technology, and strategy to create user-friendly solutions backed by ongoing support.",
  quickLinks: [
    { label: "Home", href: "/home" },
    { label: "UX/UI Design", href: "/ux-ui-design" },
    { label: "Web Development", href: "/web-development" },
    { label: "SEO Strategies", href: "/seo-strategies" },
    { label: "Advertising", href: "/advertising" },
    { label: "Ongoing Support", href: "/ongoing-support" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Schedule a Call", href: "/schedule-a-call" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms and Conditions", href: "/terms-and-conditions" },
  ],
  contactTitle: "Contact US",
  email: "info@elevaris.app",
  phone: "+1 855-532-7511",
  copyright: "Copyright, Elevaris Web Solutions, 2025. All rights reserved.",
  credit: "Developed by ELEVARIS",
}

// Map Pin Marker Component with breathing animation
function MapPinMarker({ pin, idx }: { pin: { x: number; y: number; color: string; label: string; ranking: string }, idx: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isTapped, setIsTapped] = useState(false)
  
  const handleTap = () => {
    setIsTapped(!isTapped)
  }
  
  return (
    <motion.div
      className="absolute group cursor-pointer"
      style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%, -100%)' }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: idx * 0.15, duration: 0.4 }}
      whileHover={{ scale: 1.15, zIndex: 20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTap={handleTap}
    >
      {/* Breathing pin marker */}
      <motion.div
        className="relative z-10"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2 + idx * 0.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <MapPin 
          className={`w-6 h-6 ${
            pin.color === 'primary' ? 'text-primary' : 'text-[#7b63ff]'
          } drop-shadow-lg`}
          style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }}
        />
      </motion.div>
      
      {/* Label card - visible on hover (desktop) or tap (mobile) */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-zinc-800 rounded-lg px-2 py-1 shadow-lg border border-white/10 pointer-events-none z-20"
        animate={{ 
          opacity: isHovered || isTapped ? 1 : 0, 
          y: isHovered || isTapped ? 0 : -5 
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-semibold text-white">{pin.label}</span>
          <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-medium ${
            pin.color === 'primary' ? 'bg-primary/20 text-primary' : 'bg-[#7b63ff]/20 text-[#7b63ff]'
          }`}>
            {pin.ranking}
          </span>
        </div>
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-800 border-l border-t border-white/10 rotate-45" />
      </motion.div>
    </motion.div>
  )
}

// SEO Dashboard Mockup Component
// Interactive SEO Dashboard Mockup with 3D Mouse Tracking
function InteractiveSEOMockup() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [activeView, setActiveView] = useState<'rankings' | 'analytics' | 'map'>('rankings')
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [rankingPosition, setRankingPosition] = useState(15)
  const [impressions, setImpressions] = useState(124)
  const [clicks, setClicks] = useState(0)
  
  // Mouse position for 3D effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig)
  
  // Parallax for floating elements
  const floatX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)
  const floatY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig)
  const floatXReverse = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, -15]), springConfig)
  const floatYReverse = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig)
  
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

  // Simulate SEO optimization
  const handleOptimize = useCallback(() => {
    if (isOptimizing) return
    setIsOptimizing(true)
    
    // Animate ranking improvement
    let currentRank = rankingPosition
    const interval = setInterval(() => {
      currentRank = Math.max(1, currentRank - 1)
      setRankingPosition(currentRank)
      if (currentRank <= 1) clearInterval(interval)
    }, 100)
    
    // Animate impressions
    let currentImpressions = impressions
    const impInterval = setInterval(() => {
      currentImpressions += Math.floor(Math.random() * 15) + 5
      setImpressions(Math.min(currentImpressions, 247))
      if (currentImpressions >= 247) clearInterval(impInterval)
    }, 80)
    
    // Animate clicks
    setTimeout(() => {
      let currentClicks = 0
      const clickInterval = setInterval(() => {
        currentClicks += Math.floor(Math.random() * 500) + 200
        setClicks(Math.min(currentClicks, 8542))
        if (currentClicks >= 8542) {
          clearInterval(clickInterval)
          setIsOptimizing(false)
        }
      }, 100)
    }, 500)
  }, [isOptimizing, rankingPosition, impressions])

  // Auto-optimize on mount
  useEffect(() => {
    const timeout = setTimeout(() => handleOptimize(), 1500)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto w-full max-w-[360px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[520px] cursor-pointer"
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
          className="absolute -inset-4 rounded-3xl opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${glowX}% ${glowY}%, rgba(255,106,85,0.15), rgba(123,99,255,0.1), transparent 40%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Browser frame */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-900 p-1 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_60px_rgba(123,99,255,0.15)] transition-shadow duration-300 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6),0_0_80px_rgba(255,106,85,0.2)]">
          {/* Browser header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/80 rounded-t-xl border-b border-white/5">
            <div className="flex gap-1.5">
              <motion.div 
                className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer"
                whileHover={{ scale: 1.2, backgroundColor: 'rgb(239 68 68)' }}
                whileTap={{ scale: 0.9 }}
              />
              <motion.div 
                className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer"
                whileHover={{ scale: 1.2, backgroundColor: 'rgb(234 179 8)' }}
                whileTap={{ scale: 0.9 }}
              />
              <motion.div 
                className="w-3 h-3 rounded-full bg-green-500/80 cursor-pointer"
                whileHover={{ scale: 1.2, backgroundColor: 'rgb(34 197 94)' }}
                whileTap={{ scale: 0.9 }}
              />
            </div>
            
            {/* View tabs */}
            <div className="flex-1 flex items-center justify-center gap-1">
              {(['rankings', 'analytics', 'map'] as const).map((view) => (
                <motion.button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-medium transition-all capitalize ${
                    activeView === view 
                      ? 'bg-primary/20 text-primary border border-primary/30' 
                      : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {view}
                </motion.button>
              ))}
            </div>

            {/* Optimize button */}
            <motion.button
              onClick={handleOptimize}
              disabled={isOptimizing}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-1.5 transition-all ${
                isOptimizing 
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                  : rankingPosition === 1
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30'
              }`}
              whileHover={!isOptimizing ? { scale: 1.05 } : {}}
              whileTap={!isOptimizing ? { scale: 0.95 } : {}}
            >
              {isOptimizing ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  Optimizing...
                </>
              ) : rankingPosition === 1 ? (
                <>
                  <CheckCircle2 className="w-3 h-3" />
                  #1 Rank!
                </>
              ) : (
                <>
                  <Zap className="w-3 h-3" />
                  Optimize
                </>
              )}
            </motion.button>
          </div>
          
          {/* Content area */}
          <div className="bg-[#0f0b0e] rounded-b-xl min-h-[340px] overflow-hidden">
            {/* Rankings View */}
            {activeView === 'rankings' && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[10px] text-white/50">Google Search Results</p>
                    <p className="text-sm font-semibold text-white">Your Business Rankings</p>
                  </div>
                  <motion.span 
                    className="text-[10px] text-green-400 flex items-center gap-1"
                    animate={rankingPosition < 15 ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight className="w-3 h-3" />
                    +{15 - rankingPosition} positions
                  </motion.span>
                </div>
                
                {/* Your Business Result */}
                <motion.div
                  className={`rounded-xl p-3 mb-3 transition-all ${
                    rankingPosition === 1 
                      ? 'bg-gradient-to-r from-primary/20 to-transparent border-2 border-primary/40'
                      : 'bg-gradient-to-r from-primary/10 to-transparent border border-primary/20'
                  }`}
                  animate={rankingPosition === 1 ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 0.5, repeat: rankingPosition === 1 ? 3 : 0 }}
                >
                  <div className="flex items-start gap-3">
                    <motion.div 
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-[#ff8a75] flex items-center justify-center shrink-0"
                      animate={{ rotate: rankingPosition === 1 ? [0, 10, -10, 0] : 0 }}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                      <Award className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-semibold text-white">Your Business</span>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <div className="text-[9px] text-white/40 mb-1">yourwebsite.com</div>
                      <div className="text-[10px] text-white/70">Top-rated service provider...</div>
                    </div>
                    <motion.span 
                      className="text-[9px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium"
                      key={rankingPosition}
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      #{rankingPosition}
                    </motion.span>
                  </div>
                </motion.div>

                {/* Competitors */}
                {[2, 3].map((num) => (
                  <motion.div
                    key={num}
                    className="rounded-xl bg-white/5 border border-white/5 p-3 mb-2 opacity-40 hover:opacity-60 transition-opacity cursor-pointer"
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-700/50 shrink-0" />
                      <div className="flex-1">
                        <div className="h-2.5 bg-zinc-700/50 rounded w-2/3 mb-2" />
                        <div className="h-2 bg-zinc-700/30 rounded w-1/2 mb-1" />
                        <div className="h-2 bg-zinc-700/30 rounded w-full" />
                      </div>
                      <span className="text-[9px] text-white/30 bg-white/5 px-2 py-0.5 rounded-full">#{num + rankingPosition - 1}</span>
                    </div>
                  </motion.div>
                ))}
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <motion.div 
                    className="rounded-xl bg-white/5 p-2.5 border border-white/10 cursor-pointer"
                    whileHover={{ scale: 1.05, borderColor: 'rgba(255,106,85,0.3)' }}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <Eye className="w-3 h-3 text-primary/60" />
                      <p className="text-[8px] text-white/50">Views</p>
                    </div>
                    <p className="text-base font-bold text-white">{impressions}K</p>
                  </motion.div>
                  <motion.div 
                    className="rounded-xl bg-primary/10 p-2.5 border border-primary/20 cursor-pointer"
                    whileHover={{ scale: 1.05, borderColor: 'rgba(255,106,85,0.4)' }}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <MousePointer2 className="w-3 h-3 text-primary/60" />
                      <p className="text-[8px] text-white/50">Clicks</p>
                    </div>
                    <p className="text-base font-bold text-primary">{clicks.toLocaleString()}</p>
                  </motion.div>
                  <motion.div 
                    className="rounded-xl bg-white/5 p-2.5 border border-white/10 cursor-pointer"
                    whileHover={{ scale: 1.05, borderColor: 'rgba(34,197,94,0.3)' }}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <TrendingUp className="w-3 h-3 text-green-400/60" />
                      <p className="text-[8px] text-white/50">CTR</p>
                    </div>
                    <p className="text-base font-bold text-green-400">3.4%</p>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Analytics View */}
            {activeView === 'analytics' && (
              <div className="p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  <p className="text-sm font-semibold text-white mb-3">Performance Analytics</p>
                  
                  {/* Chart-like visualization */}
                  <div className="space-y-2">
                    {[85, 92, 78, 95, 88].map((value, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-[9px] text-white/40 w-8">Week {idx + 1}</span>
                        <div className="flex-1 h-6 bg-white/5 rounded-lg overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary to-[#7b63ff]"
                            initial={{ width: 0 }}
                            animate={{ width: `${value}%` }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                          />
                        </div>
                        <span className="text-[9px] text-white/60 w-8">{value}%</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="rounded-xl bg-white/5 p-3 border border-white/10">
                      <p className="text-[9px] text-white/50 mb-1">Avg. Position</p>
                      <p className="text-xl font-bold text-primary">2.3</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3 border border-white/10">
                      <p className="text-[9px] text-white/50 mb-1">Page 1 Keywords</p>
                      <p className="text-xl font-bold text-green-400">127</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Map View */}
            {activeView === 'map' && (
              <div className="p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-sm font-semibold text-white mb-3">Local Search Coverage</p>
                  
                  {/* Dark styled map */}
                  <div className="rounded-xl border border-white/10 p-0 h-[240px] relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
                    {/* Map background pattern - roads and areas */}
                    <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 400 240" preserveAspectRatio="none">
                      {/* Roads */}
                      <path d="M 0 80 Q 100 60, 200 80 T 400 80" stroke="#475569" strokeWidth="2" fill="none" />
                      <path d="M 0 120 Q 150 100, 300 120 T 400 120" stroke="#475569" strokeWidth="2" fill="none" />
                      <path d="M 0 160 Q 120 140, 240 160 T 400 160" stroke="#475569" strokeWidth="2" fill="none" />
                      <path d="M 80 0 Q 80 50, 80 100 T 80 240" stroke="#475569" strokeWidth="2" fill="none" />
                      <path d="M 200 0 Q 200 60, 200 120 T 200 240" stroke="#475569" strokeWidth="2" fill="none" />
                      <path d="M 320 0 Q 320 70, 320 140 T 320 240" stroke="#475569" strokeWidth="2" fill="none" />
                      
                      {/* Area blocks */}
                      <rect x="20" y="20" width="80" height="60" fill="#334155" opacity="0.5" rx="4" />
                      <rect x="120" y="100" width="100" height="80" fill="#334155" opacity="0.5" rx="4" />
                      <rect x="240" y="40" width="90" height="70" fill="#334155" opacity="0.5" rx="4" />
                      <rect x="280" y="140" width="100" height="60" fill="#334155" opacity="0.5" rx="4" />
                    </svg>
                    
                    {/* Map pins with breathing animation */}
                    {[
                      { x: 40, y: 25, color: 'primary', label: 'Downtown', ranking: '#1' },
                      { x: 25, y: 40, color: 'primary', label: 'North Side', ranking: '#3' },
                      { x: 60, y: 35, color: 'primary', label: 'East District', ranking: '#2' },
                      { x: 45, y: 50, color: 'secondary', label: 'West End', ranking: '#5' },
                      { x: 70, y: 20, color: 'secondary', label: 'South Park', ranking: '#7' },
                    ].map((pin, idx) => (
                      <MapPinMarker key={idx} pin={pin} idx={idx} />
                    ))}
                    
                    {/* Map controls overlay */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-10">
                      <button className="w-7 h-7 bg-zinc-800/90 hover:bg-zinc-700 rounded-md shadow-lg flex items-center justify-center text-white text-xs font-semibold border border-white/10 backdrop-blur-sm">
                        +
                      </button>
                      <button className="w-7 h-7 bg-zinc-800/90 hover:bg-zinc-700 rounded-md shadow-lg flex items-center justify-center text-white text-xs font-semibold border border-white/10 backdrop-blur-sm">
                        −
                      </button>
                    </div>
                    
                    {/* Location info card */}
                    <div className="absolute bottom-3 left-3 right-3 bg-zinc-900/95 backdrop-blur-sm rounded-lg p-2.5 border border-white/10 shadow-lg z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-[#7b63ff]/20 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <span className="text-[10px] font-semibold text-white block">5 locations ranking</span>
                            <span className="text-[9px] text-white/60">Local SEO coverage</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 bg-green-500/20 px-2 py-1 rounded-md border border-green-500/30">
                          <TrendingUp className="w-3 h-3 text-green-400" />
                          <span className="text-[10px] font-semibold text-green-400">+2 this week</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Floating Ranking badge */}
      <motion.div
        className="absolute -top-8 right-0 sm:-top-12 sm:-right-6 bg-gradient-to-br from-[#181116] to-[#0f0b0e] rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-primary/30 cursor-pointer z-10"
        style={{ x: floatX, y: floatY, transformStyle: 'preserve-3d', transform: 'translateZ(40px)' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{ scale: 1.1, borderColor: 'rgba(255,106,85,0.5)' }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-[#7b63ff]/20 flex items-center justify-center"
            animate={{ rotate: rankingPosition === 1 ? [0, 5, -5, 0] : 0 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <TrendingUp className="w-5 h-5 text-primary" />
          </motion.div>
          <div>
            <p className="text-[10px] text-white/50">Position</p>
            <motion.p 
              className="text-lg font-bold text-primary"
              key={rankingPosition}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
            >
              #{rankingPosition}
            </motion.p>
          </div>
        </div>
      </motion.div>
      
      {/* Floating traffic notification */}
      <motion.div
        className="absolute -bottom-2 -left-4 sm:-bottom-2 sm:-left-8 bg-white rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-gray-100 cursor-pointer z-10"
        style={{ x: floatXReverse, y: floatYReverse, transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center"
            animate={clicks >= 8542 ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <Users className="w-4 h-4 text-green-500" />
          </motion.div>
          <div>
            <p className="text-[10px] font-medium text-gray-900">+247% Traffic</p>
            <p className="text-[9px] text-gray-500">Last 90 days</p>
          </div>
        </div>
      </motion.div>

      {/* Interaction hint */}
      <motion.div
        className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[11px] text-white/40"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        <MousePointer2 className="w-3 h-3" />
        <span>Move mouse • Switch tabs • Click Optimize</span>
      </motion.div>
    </motion.div>
  )
}

// Animated counter component
function AnimatedCounter({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-[#7b63ff] bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-sm text-foreground-secondary mt-1">{label}</div>
    </motion.div>
  )
}

export default function SEOStrategiesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,106,85,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(123,99,255,0.08),transparent_50%)] pointer-events-none" />
        
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-8 items-center justify-items-center lg:justify-items-start w-full">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground-secondary">SEO Strategies</span>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Rank Higher.{" "}
                <span className="bg-gradient-to-r from-primary via-[#ff7a59] to-[#7b63ff] bg-clip-text text-transparent">
                  Get Found. Grow.
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-foreground-secondary mb-8 leading-relaxed">
                Strategic SEO that gets your business found by customers actively searching for what you offer. More visibility, more traffic, more revenue.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                <Link
                  href="/schedule-a-call"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-primary text-white font-semibold rounded-xl transition-all duration-200 hover:brightness-110 shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(255,106,85,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] active:scale-[0.98]"
                >
                  Get a Free SEO Audit
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#process"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-white/[0.03] border border-white/[0.08] text-foreground font-semibold rounded-xl transition-all duration-200 hover:bg-white/[0.06] hover:border-white/[0.15] backdrop-blur-sm active:scale-[0.98]"
                >
                  <Play className="w-4 h-4" />
                  Our Process
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10">
                {stats.map((stat, index) => (
                  <AnimatedCounter key={index} value={stat.value} label={stat.label} />
                ))}
              </div>
            </motion.div>

            {/* Right - Interactive Dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full flex justify-center"
            >
              <InteractiveSEOMockup />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 relative">
        <Container>
          <SectionHeading
            overline="WHY SEO MATTERS"
            title="More Than Just Rankings"
            highlightWord="Rankings"
            subtitle="Strategic SEO drives sustainable growth by connecting you with customers actively searching for your services."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <GlowingEffect
                    spread={30}
                    glow={true}
                    disabled={false}
                    proximity={50}
                    inactiveZone={0.01}
                    borderWidth={1}
                    className="rounded-2xl"
                  />
                </div>
                
                <div className="relative h-full rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] p-6 transition-all duration-300 hover:border-white/20">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-[#7b63ff]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                  
                  {/* Description */}
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* All Benefits Grid */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,99,255,0.05),transparent_60%)] pointer-events-none" />
        
        <Container>
          <SectionHeading
            overline="FULL BENEFITS"
            title="Everything You Get With Our SEO"
            highlightWord="SEO"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {allBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <GlowingEffect
                    spread={30}
                    glow={true}
                    disabled={false}
                    proximity={50}
                    inactiveZone={0.01}
                    borderWidth={1}
                    className="rounded-2xl"
                  />
                </div>
                
                <div className="relative rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] p-6 text-center transition-all duration-300 hover:border-white/20">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-[#7b63ff]/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,106,85,0.05),transparent_60%)] pointer-events-none" />
        
        <Container>
          <SectionHeading
            overline="OUR PROCESS"
            title="From Audit to Rankings"
            highlightWord="Rankings"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {process.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="relative rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] p-6 h-full transition-all duration-300 hover:border-white/20 group">
                  {/* Step number */}
                  <span className="text-4xl font-bold bg-gradient-to-br from-primary/40 to-[#7b63ff]/40 bg-clip-text text-transparent mb-4 block group-hover:from-primary group-hover:to-[#7b63ff] transition-all duration-300">
                    {step.num}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">{step.text}</p>
                </div>
                
                {/* Connector line (hidden on last item and mobile) */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6">
                    <ChevronRight className="w-5 h-5 text-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative">
        <Container>
          <SectionHeading
            overline="FAQ"
            title="Common Questions"
            highlightWord="Questions"
            subtitle="Everything you need to know about SEO and how we help businesses grow."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="relative group"
              >
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <GlowingEffect
                    spread={30}
                    glow={true}
                    disabled={false}
                    proximity={50}
                    inactiveZone={0.01}
                    borderWidth={1}
                    className="rounded-2xl"
                  />
                </div>
                <div className="relative p-6 rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] h-full">
                  <h3 className="text-base font-semibold text-foreground mb-3 leading-snug">{faq.q}</h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,106,85,0.08),transparent_50%)] pointer-events-none" />
        
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 z-10 pointer-events-none">
              <GlowingEffect
                spread={30}
                glow={true}
                disabled={false}
                proximity={50}
                inactiveZone={0.01}
                borderWidth={1}
                className="rounded-3xl"
              />
            </div>
            
            <div className="relative rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,106,85,0.12),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(123,99,255,0.12),transparent_40%),linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Ready to Dominate{" "}
                <span className="bg-gradient-to-r from-primary to-[#7b63ff] bg-clip-text text-transparent">
                  Search Results?
                </span>
              </h2>
              <p className="text-foreground-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
                Book a free SEO audit. We&apos;ll analyze your website, identify opportunities, and show you exactly how to outrank your competitors.
              </p>
              <Link
                href="/schedule-a-call"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-primary text-white font-semibold rounded-xl transition-all duration-200 hover:brightness-110 shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(255,106,85,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] active:scale-[0.98]"
              >
                <span className="hidden sm:inline">Schedule Your Free SEO Audit</span>
                <span className="inline sm:hidden">Schedule Call</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-xs text-foreground-secondary mt-4">
                No commitment required • 15-minute call • Custom strategy
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      <Footer {...footerData} />
    </>
  )
}
