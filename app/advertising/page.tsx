"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { useState, useRef, useCallback, useEffect } from "react"
import { Container } from "@/components/site/Container"
import { SectionHeading } from "@/components/site/SectionHeading"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Footer } from "@/components/site/Footer"
import { 
  Target, 
  TrendingUp, 
  BarChart3, 
  Zap, 
  Users, 
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MousePointer2,
  Eye,
  ShoppingCart,
  ChevronRight,
  Play,
  ArrowUpRight,
  RefreshCw,
  AlertCircle,
  ThumbsUp,
  Facebook,
  Search,
  Video
} from "lucide-react"

const adChannels = [
  {
    title: "Meta Ads",
    subtitle: "Facebook & Instagram",
    icon: Users,
    description: "Reach your ideal customers where they spend their time. We create scroll-stopping ads that convert browsers into buyers.",
    bullets: [
      "Hyper-targeted audience building",
      "Retargeting campaigns that convert",
      "Creative angles tailored to your market",
      "A/B testing for maximum ROI",
    ],
    gradient: "from-[#ff6a55]/20 to-[#7b63ff]/10",
  },
  {
    title: "TikTok Ads",
    subtitle: "Short-Form That Sells",
    icon: Zap,
    description: "Tap into the fastest-growing platform with authentic, engaging content that drives action.",
    bullets: [
      "Trend-driven creative hooks",
      "Mobile-first conversion funnels",
      "Fast creative testing cycles",
      "Lower CPL than traditional platforms",
    ],
    gradient: "from-[#7b63ff]/20 to-[#3d52d5]/10",
  },
  {
    title: "Google Ads",
    subtitle: "Search & Display",
    icon: Target,
    description: "Capture high-intent customers actively searching for your services. Be there when they need you most.",
    bullets: [
      "High-intent keyword targeting",
      "Conversion & call tracking setup",
      "Negative keyword optimization",
      "Landing page integration",
    ],
    gradient: "from-[#3d52d5]/20 to-[#ff6a55]/10",
  },
]

const benefits = [
  {
    icon: TrendingUp,
    title: "Predictable Growth",
    text: "Turn ad spend into predictable revenue with campaigns optimized for your specific goals.",
  },
  {
    icon: BarChart3,
    title: "Full Transparency",
    text: "Real-time dashboards and regular reports so you always know where your money goes.",
  },
  {
    icon: DollarSign,
    title: "ROI Focused",
    text: "Every dollar is tracked. We optimize for conversions, not vanity metrics.",
  },
]

const process = [
  {
    num: "01",
    title: "Discovery & Strategy",
    text: "We analyze your business, audience, and goals to build a custom advertising strategy.",
  },
  {
    num: "02",
    title: "Funnel & Creative",
    text: "We design landing pages, write copy, and create ads that convert.",
  },
  {
    num: "03",
    title: "Launch & Optimize",
    text: "Campaigns go live with full tracking. We optimize daily for better results.",
  },
  {
    num: "04",
    title: "Scale & Report",
    text: "Once we find winners, we scale. You get clear reports on performance.",
  },
]

const stats = [
  { value: "3.2x", label: "Avg. ROAS" },
  { value: "$12", label: "Avg. Cost Per Lead" },
  { value: "48hr", label: "Campaign Launch" },
  { value: "24/7", label: "Optimization" },
]

const footerData = {
  aboutText:
    "Elevaris Web Solutions helps small businesses grow online with modern, personalized websites. Our team combines design, technology, and strategy to create user-friendly solutions backed by ongoing support.",
  quickLinks: [
    { label: "Home", href: "/home" },
    { label: "UX/UI Design", href: "/ux-ui-design" },
    { label: "Web Development", href: "/web-development" },
    { label: "SEO Strategies", href: "/seo-strategies" },
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

// Ads Dashboard Mockup Component
// Interactive Ads Dashboard Mockup with 3D Mouse Tracking
function InteractiveAdsMockup() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [activePlatform, setActivePlatform] = useState<'meta' | 'google' | 'tiktok'>('meta')
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [roas, setRoas] = useState(1.2)
  const [impressions, setImpressions] = useState(0)
  const [clicks, setClicks] = useState(0)
  const [conversions, setConversions] = useState(0)
  const [revenue, setRevenue] = useState(0)
  
  // Platform-specific data
  const platformData = {
    meta: {
      impressions: 124000,
      clicks: 3847,
      conversions: 287,
      revenue: 18420,
      roas: 3.2,
      color: 'blue',
      cost: '$2.40 per lead'
    },
    google: {
      impressions: 89000,
      clicks: 4521,
      conversions: 342,
      revenue: 22150,
      roas: 4.1,
      color: 'red',
      cost: '$1.85 per lead'
    },
    tiktok: {
      impressions: 156000,
      clicks: 2134,
      conversions: 198,
      revenue: 12890,
      roas: 2.8,
      color: 'purple',
      cost: '$3.10 per lead'
    }
  }
  
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

  // Simulate campaign optimization
  const handleOptimize = useCallback(() => {
    if (isOptimizing) return
    setIsOptimizing(true)
    
    const targetData = platformData[activePlatform]
    
    // Animate metrics
    let currentImp = impressions
    const impInterval = setInterval(() => {
      currentImp += Math.floor(Math.random() * 5000) + 2000
      setImpressions(Math.min(currentImp, targetData.impressions))
      if (currentImp >= targetData.impressions) clearInterval(impInterval)
    }, 80)
    
    let currentClicks = clicks
    const clicksInterval = setInterval(() => {
      currentClicks += Math.floor(Math.random() * 200) + 100
      setClicks(Math.min(currentClicks, targetData.clicks))
      if (currentClicks >= targetData.clicks) clearInterval(clicksInterval)
    }, 100)
    
    let currentConv = conversions
    const convInterval = setInterval(() => {
      currentConv += Math.floor(Math.random() * 15) + 10
      setConversions(Math.min(currentConv, targetData.conversions))
      if (currentConv >= targetData.conversions) clearInterval(convInterval)
    }, 120)
    
    let currentRev = revenue
    const revInterval = setInterval(() => {
      currentRev += Math.floor(Math.random() * 1000) + 500
      setRevenue(Math.min(currentRev, targetData.revenue))
      if (currentRev >= targetData.revenue) clearInterval(revInterval)
    }, 100)
    
    // Animate ROAS
    let currentRoas = roas
    const roasInterval = setInterval(() => {
      currentRoas += 0.1
      setRoas(Math.min(currentRoas, targetData.roas))
      if (currentRoas >= targetData.roas) {
        clearInterval(roasInterval)
        setIsOptimizing(false)
      }
    }, 150)
  }, [isOptimizing, impressions, clicks, conversions, revenue, roas, activePlatform, platformData])

  // Auto-optimize on mount
  useEffect(() => {
    const timeout = setTimeout(() => handleOptimize(), 1500)
    return () => clearTimeout(timeout)
  }, [])

  // Reset metrics when switching platforms
  useEffect(() => {
    setImpressions(0)
    setClicks(0)
    setConversions(0)
    setRevenue(0)
    setRoas(1.2)
    setIsOptimizing(false)
    const timeout = setTimeout(() => handleOptimize(), 500)
    return () => clearTimeout(timeout)
  }, [activePlatform])

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
          className="absolute -inset-4 rounded-3xl opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${glowX}% ${glowY}%, rgba(255,106,85,0.15), rgba(123,99,255,0.1), transparent 40%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Browser frame */}
        <div className="relative rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-900 p-1 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_60px_rgba(123,99,255,0.15)] transition-shadow duration-300 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6),0_0_80px_rgba(255,106,85,0.2)]">
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
            
            {/* Platform tabs */}
            <div className="flex-1 flex items-center justify-center gap-1">
              {([
                { key: 'meta', label: 'Meta Ads', icon: Facebook },
                { key: 'google', label: 'Google Ads', icon: Search },
                { key: 'tiktok', label: 'TikTok Ads', icon: Video }
              ] as const).map((platform) => (
                <motion.button
                  key={platform.key}
                  onClick={() => setActivePlatform(platform.key)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-medium transition-all flex items-center gap-1 ${
                    activePlatform === platform.key 
                      ? 'bg-primary/20 text-primary border border-primary/30' 
                      : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <platform.icon className="w-3 h-3" />
                  {platform.label}
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
                  : roas >= platformData[activePlatform].roas
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
              ) : roas >= platformData[activePlatform].roas ? (
                <>
                  <ThumbsUp className="w-3 h-3" />
                  Optimized!
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
            <motion.div 
              className="relative p-4"
              key={activePlatform}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] text-white/50">
                    {activePlatform === 'meta' ? 'Meta Ads' : activePlatform === 'google' ? 'Google Ads' : 'TikTok Ads'} Performance
                  </p>
                  <p className="text-sm font-semibold text-white">This Month</p>
                </div>
                <motion.span 
                  className="text-[10px] text-green-400 flex items-center gap-1"
                  animate={roas >= platformData[activePlatform].roas - 1 ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight className="w-3 h-3" />
                  +{Math.round((roas - 1) * 10)}%
                </motion.span>
              </div>
              
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { icon: Eye, label: 'Impressions', value: impressions, format: (v: number) => `${Math.floor(v / 1000)}K`, color: 'white' },
                  { icon: MousePointer2, label: 'Clicks', value: clicks, format: (v: number) => v.toLocaleString(), color: 'primary' },
                  { icon: ShoppingCart, label: 'Conversions', value: conversions, format: (v: number) => v.toString(), color: 'green' },
                ].map((stat, idx) => (
                  <motion.div 
                    key={idx}
                    className={`rounded-xl p-3 border cursor-pointer transition-all ${
                      stat.color === 'primary' 
                        ? 'bg-primary/10 border-primary/20 hover:border-primary/40' 
                        : stat.color === 'green'
                        ? 'bg-green-500/10 border-green-500/20 hover:border-green-500/40'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <stat.icon className="w-3 h-3 text-primary/60" />
                      <p className="text-[9px] text-white/50">{stat.label}</p>
                    </div>
                    <p className={`text-lg font-bold ${
                      stat.color === 'primary' 
                        ? 'text-primary' 
                        : stat.color === 'green'
                        ? 'text-green-400'
                        : 'text-white'
                    }`}>
                      {stat.format(stat.value)}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              {/* Chart area */}
              <motion.div 
                className="rounded-xl bg-white/5 border border-white/10 p-3 mb-4 hover:border-white/20 transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] text-white/50">Revenue Generated</p>
                  <motion.p 
                    className="text-sm font-bold text-white"
                    key={revenue}
                    initial={{ scale: 1.2, color: '#ff6a55' }}
                    animate={{ scale: 1, color: '#ffffff' }}
                  >
                    ${revenue.toLocaleString()}
                  </motion.p>
                </div>
                {/* Chart bars */}
                <div className="flex items-end gap-1 h-16">
                  {[40, 65, 45, 80, 60, 90, 75, 95, 70, 85, 100, 88].map((height, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-primary to-[#7b63ff] rounded-t cursor-pointer"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.5, delay: 0.8 + i * 0.05 }}
                      whileHover={{ height: `${Math.min(height + 10, 100)}%`, backgroundColor: '#ff8a75' }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[8px] text-white/30">Jan</span>
                  <span className="text-[8px] text-white/30">Dec</span>
                </div>
              </motion.div>
              
              {/* Active campaigns */}
              <div className="space-y-2">
                <p className="text-[10px] text-white/50">Active Campaigns</p>
                
                {/* Primary campaign - active platform */}
                <motion.div 
                  className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-2.5 cursor-pointer hover:border-white/20 transition-colors"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activePlatform === 'meta' ? 'bg-blue-500/20' :
                    activePlatform === 'google' ? 'bg-red-500/20' :
                    'bg-purple-500/20'
                  }`}>
                    {activePlatform === 'meta' && <Facebook className="w-4 h-4 text-blue-400" />}
                    {activePlatform === 'google' && <Search className="w-4 h-4 text-red-400" />}
                    {activePlatform === 'tiktok' && <Video className="w-4 h-4 text-purple-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-white truncate">
                      {activePlatform === 'meta' ? 'Meta - Lead Gen' :
                       activePlatform === 'google' ? 'Google - Search' :
                       'TikTok - Video Ads'}
                    </p>
                    <p className="text-[9px] text-white/50">{platformData[activePlatform].cost}</p>
                  </div>
                  <motion.span 
                    className="text-[9px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    Active
                  </motion.span>
                </motion.div>
                
                {/* Secondary campaign - showing ROAS */}
                <motion.div 
                  className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-2.5 cursor-pointer hover:border-white/20 transition-colors"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Target className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-white truncate">
                      {activePlatform === 'meta' ? 'Meta - Retargeting' :
                       activePlatform === 'google' ? 'Google - Display' :
                       'TikTok - Spark Ads'}
                    </p>
                    <p className="text-[9px] text-white/50">{roas.toFixed(1)}x ROAS</p>
                  </div>
                  <motion.span 
                    className="text-[9px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 0.5 }}
                  >
                    Active
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Floating ROAS badge */}
      <motion.div
        className="absolute -top-12 -right-4 sm:-right-12 bg-gradient-to-br from-[#181116] to-[#0f0b0e] rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-primary/30 cursor-pointer z-10"
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
            animate={{ rotate: roas >= 3 ? [0, 5, -5, 0] : 0 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <TrendingUp className="w-5 h-5 text-primary" />
          </motion.div>
          <div>
            <p className="text-[10px] text-white/50">ROAS</p>
            <motion.p 
              className="text-lg font-bold text-primary"
              key={roas.toFixed(1)}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
            >
              {roas.toFixed(1)}x
            </motion.p>
          </div>
        </div>
      </motion.div>
      
      {/* Floating conversion notification */}
      <motion.div
        className="absolute -bottom-2 -left-4 sm:-left-8 bg-white rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-gray-100 cursor-pointer z-10"
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
            animate={conversions >= 287 ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </motion.div>
          <div>
            <p className="text-[10px] font-medium text-gray-900">New Lead!</p>
            <p className="text-[9px] text-gray-500">High-quality lead from Meta</p>
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
        <span>Move mouse • Switch platforms • Click Optimize</span>
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

export default function AdvertisingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,106,85,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(123,99,255,0.08),transparent_50%)] pointer-events-none" />
        
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground-secondary">Performance Marketing</span>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Ads That Actually{" "}
                <span className="bg-gradient-to-r from-primary via-[#ff7a59] to-[#7b63ff] bg-clip-text text-transparent">
                  Drive Revenue
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-foreground-secondary mb-8 leading-relaxed">
                Stop wasting ad spend on campaigns that don&apos;t convert. We build data-driven advertising systems that turn clicks into customers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/schedule-a-call"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-primary text-white font-semibold rounded-xl transition-all duration-200 hover:brightness-110 shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(255,106,85,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] active:scale-[0.98]"
                >
                  Get a Free Strategy Call
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#channels"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-white/[0.03] border border-white/[0.08] text-foreground font-semibold rounded-xl transition-all duration-200 hover:bg-white/[0.06] hover:border-white/[0.15] backdrop-blur-sm active:scale-[0.98]"
                >
                  <Play className="w-4 h-4" />
                  Explore Channels
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 pt-8 border-t border-white/10">
                {stats.map((stat, index) => (
                  <AnimatedCounter key={index} value={stat.value} label={stat.label} />
                ))}
              </div>
            </motion.div>

            {/* Right - Interactive Dashboard mockup */}
            <div className="relative lg:pl-8 w-full overflow-hidden">
              <div className="max-w-full">
                <InteractiveAdsMockup />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Ad Channels Section */}
      <section id="channels" className="py-20 relative">
        <Container>
          <SectionHeading
            overline="ADVERTISING CHANNELS"
            title="Multi-Platform Campaigns That Convert"
            highlightWord="Convert"
            subtitle="We don&apos;t just run ads — we build complete acquisition systems across the platforms that matter most."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
            {adChannels.map((channel, index) => (
              <motion.div
                key={channel.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={2}
                    className="rounded-2xl"
                  />
                </div>
                
                <div className="relative h-full rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] p-6 transition-all duration-300 hover:border-white/20">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-[#7b63ff]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <channel.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-1">{channel.title}</h3>
                  <p className="text-sm text-primary mb-3">{channel.subtitle}</p>
                  
                  {/* Description */}
                  <p className="text-sm text-foreground-secondary mb-5 leading-relaxed">
                    {channel.description}
                  </p>
                  
                  {/* Bullets */}
                  <ul className="space-y-2.5 mb-6">
                    {channel.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-foreground-secondary">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA */}
                  <Link
                    href={`/contact-us?service=${encodeURIComponent(channel.title)}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,99,255,0.05),transparent_60%)] pointer-events-none" />
        
        <Container>
          <SectionHeading
            overline="WHY CHOOSE US"
            title="Results-Driven Advertising"
            highlightWord="Results"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {benefits.map((benefit, index) => (
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
                  <p className="text-sm text-foreground-secondary leading-relaxed">{benefit.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,106,85,0.05),transparent_60%)] pointer-events-none" />
        
        <Container>
          <SectionHeading
            overline="OUR PROCESS"
            title="From Strategy to Scale"
            highlightWord="Scale"
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
                spread={60}
                glow={true}
                disabled={false}
                proximity={80}
                inactiveZone={0.01}
                borderWidth={2}
                className="rounded-3xl"
              />
            </div>
            
            <div className="relative rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,106,85,0.12),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(123,99,255,0.12),transparent_40%),linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Ready to Turn Ad Spend Into{" "}
                <span className="bg-gradient-to-r from-primary to-[#7b63ff] bg-clip-text text-transparent">
                  Revenue?
                </span>
              </h2>
              <p className="text-foreground-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
                Book a free strategy call. We&apos;ll analyze your business, discuss your goals, and show you exactly how paid advertising can fuel your growth.
              </p>
              <Link
                href="/schedule-a-call"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-primary text-white font-semibold rounded-xl transition-all duration-200 hover:brightness-110 shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(255,106,85,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] active:scale-[0.98]"
              >
                <span className="hidden sm:inline">Schedule Your Free Call</span>
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
