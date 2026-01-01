"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { useState, useRef, useEffect, useCallback } from "react"
import { Container } from "@/components/site/Container"
import { SectionHeading } from "@/components/site/SectionHeading"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Footer } from "@/components/site/Footer"
import {
  Code2,
  Zap,
  Shield,
  Smartphone,
  TrendingUp,
  Search,
  Palette,
  ArrowRight,
  CheckCircle2,
  ShoppingCart,
  Briefcase,
  Users,
  Sparkles,
  Globe,
  Layers,
  Play,
  ChevronRight,
  ArrowUpRight,
  Terminal,
  Database,
  Cpu,
  MousePointer2,
  Rocket,
  RefreshCw
} from "lucide-react"

const footerData = {
  aboutText:
    "Elevaris Web Solutions helps small businesses grow online with modern, personalized websites. Our team combines design, technology, and strategy to create user-friendly solutions backed by ongoing support.",
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

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance with modern frameworks and best practices for instant page loads.",
    gradient: "from-[#ff6a55]/20 to-[#7b63ff]/10",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security and 99.9% uptime guarantee for peace of mind.",
    gradient: "from-[#7b63ff]/20 to-[#3d52d5]/10",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Responsive design that looks perfect on every device, from phones to desktops.",
    gradient: "from-[#3d52d5]/20 to-[#ff6a55]/10",
  },
]

const allBenefits = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance with modern frameworks and best practices for instant page loads."
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security and 99.9% uptime guarantee for peace of mind."
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Responsive design that looks perfect on every device, from phones to desktops."
  },
  {
    icon: TrendingUp,
    title: "Conversion Focused",
    description: "Strategic design and smart CTA placement to turn visitors into customers."
  },
  {
    icon: Search,
    title: "SEO Ready",
    description: "Built with search engines in mind to help you rank higher and get found."
  },
  {
    icon: Palette,
    title: "Beautiful Design",
    description: "Modern, clean interfaces that reflect your brand and engage visitors."
  }
]

const websiteTypes = [
  {
    icon: Briefcase,
    title: "Business Websites",
    description: "Professional sites that establish credibility and showcase your services",
    features: ["Custom design", "Lead capture forms", "Service showcases", "Contact integration"]
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Full-featured online stores that drive sales and manage inventory",
    features: ["Product catalogs", "Secure checkout", "Inventory management", "Payment processing"]
  },
  {
    icon: Users,
    title: "CRM Connected",
    description: "Websites integrated with powerful CRM for lead management and automation",
    features: ["Lead capture", "Auto-follow-ups", "Pipeline tracking", "Unified inbox"]
  },
  {
    icon: Sparkles,
    title: "Marketing Sites",
    description: "Landing pages and campaign sites optimized for conversions",
    features: ["High conversion rates", "A/B testing ready", "Analytics setup", "Ad platform sync"]
  }
]

const techStack = [
  { name: "Next.js", description: "Modern React framework" },
  { name: "React", description: "Component-based UI" },
  { name: "TypeScript", description: "Type-safe development" },
  { name: "Tailwind CSS", description: "Utility-first styling" },
  { name: "Custom CMS", description: "Easy content updates" },
  { name: "API Integration", description: "Connect any service" }
]

const process = [
  {
    num: "01",
    title: "Discovery & Strategy",
    text: "We learn about your business, goals, target audience, and competitors to create a strategic plan."
  },
  {
    num: "02",
    title: "Design & Prototype",
    text: "Custom designs that reflect your brand, with interactive prototypes for feedback before development."
  },
  {
    num: "03",
    title: "Development & Testing",
    text: "Clean code, rigorous testing, and optimization across all devices and browsers."
  },
  {
    num: "04",
    title: "Launch & Support",
    text: "Smooth deployment with training, documentation, and ongoing support for your peace of mind."
  }
]

const stats = [
  { value: "1-2", label: "Weeks to Launch" },
  { value: "100%", label: "Mobile Optimized" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
]

const faqs = [
  {
    q: "How long does it take to build a website?",
    a: "Most websites are live within 2-4 weeks. Complex projects with custom features may take 6-8 weeks. We'll give you a clear timeline during our initial consultation."
  },
  {
    q: "What platforms do you build on?",
    a: "We build custom websites using modern frameworks like Next.js and React, as well as popular platforms like WordPress and Shopify when appropriate. We'll recommend the best solution for your needs."
  },
  {
    q: "Can I update the website myself?",
    a: "Yes! We build easy-to-use content management systems so you can make updates without technical skills. We also provide training and documentation."
  },
  {
    q: "Do you offer ongoing support?",
    a: "Absolutely. We provide ongoing maintenance, updates, and support packages. Your website will stay secure, fast, and up-to-date."
  },
  {
    q: "Will my website work on mobile devices?",
    a: "Every website we build is fully responsive and optimized for all devices — phones, tablets, and desktops. Mobile-first design is standard."
  },
  {
    q: "What about SEO and analytics?",
    a: "All our websites are built with SEO best practices and include analytics setup so you can track performance and make data-driven decisions."
  }
]

// Interactive Code Dashboard Mockup Component with 3D Mouse Tracking
function InteractiveCodeMockup() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [activeTab, setActiveTab] = useState<'code' | 'preview' | 'terminal'>('code')
  const [isBuilding, setIsBuilding] = useState(false)
  const [buildProgress, setBuildProgress] = useState(0)
  const [deployStatus, setDeployStatus] = useState<'idle' | 'building' | 'deployed'>('idle')
  const [lighthouseScore, setLighthouseScore] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  
  // Mouse position for 3D effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Smooth spring animation for mouse movement
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

  // Simulate build process
  const handleDeploy = useCallback(() => {
    if (isBuilding) return
    setIsBuilding(true)
    setDeployStatus('building')
    setBuildProgress(0)
    setClickCount(prev => prev + 1)
    
    const interval = setInterval(() => {
      setBuildProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsBuilding(false)
          setDeployStatus('deployed')
          // Animate lighthouse score
          let score = 0
          const scoreInterval = setInterval(() => {
            score += 2
            setLighthouseScore(Math.min(score, 98))
            if (score >= 98) clearInterval(scoreInterval)
          }, 20)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)
  }, [isBuilding])

  // Reset after deploy
  useEffect(() => {
    if (deployStatus === 'deployed') {
      const timeout = setTimeout(() => {
        setDeployStatus('idle')
        setBuildProgress(0)
      }, 4000)
      return () => clearTimeout(timeout)
    }
  }, [deployStatus])

  // Initial lighthouse score animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      let score = 0
      const interval = setInterval(() => {
        score += 2
        setLighthouseScore(Math.min(score, 98))
        if (score >= 98) clearInterval(interval)
      }, 30)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [])

  const codeLines = [
    { num: 1, content: [{ text: 'import', color: 'text-purple-400' }, { text: ' { Hero }', color: 'text-white/80' }, { text: ' from', color: 'text-purple-400' }, { text: " '@/components'", color: 'text-green-400' }] },
    { num: 2, content: [] },
    { num: 3, content: [{ text: 'export default function', color: 'text-purple-400' }, { text: ' Page', color: 'text-yellow-400' }, { text: '() {', color: 'text-white/80' }] },
    { num: 4, content: [{ text: '  return', color: 'text-purple-400' }, { text: ' (', color: 'text-white/80' }], indent: 1 },
    { num: 5, content: [{ text: '    <Hero', color: 'text-blue-400' }], indent: 2 },
    { num: 6, content: [{ text: '      title', color: 'text-cyan-400' }, { text: '=', color: 'text-white/80' }, { text: '"Fast & Secure"', color: 'text-green-400' }], indent: 3 },
    { num: 7, content: [{ text: '      performance', color: 'text-cyan-400' }, { text: '={', color: 'text-white/80' }, { text: 'optimized', color: 'text-orange-400' }, { text: '}', color: 'text-white/80' }], indent: 3 },
    { num: 8, content: [{ text: '    />', color: 'text-blue-400' }], indent: 2 },
    { num: 9, content: [{ text: '  )', color: 'text-white/80' }], indent: 1 },
    { num: 10, content: [{ text: '}', color: 'text-white/80' }] },
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
        {/* Dynamic glow effect that follows mouse */}
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
            
            {/* Tab bar */}
            <div className="flex-1 flex items-center justify-center gap-1">
              {(['code', 'preview', 'terminal'] as const).map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-medium transition-all ${
                    activeTab === tab 
                      ? 'bg-primary/20 text-primary border border-primary/30' 
                      : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab === 'code' && '< />'}
                  {tab === 'preview' && '👁'}
                  {tab === 'terminal' && '>_'}
                </motion.button>
              ))}
            </div>

            {/* Deploy button */}
            <motion.button
              onClick={handleDeploy}
              disabled={isBuilding}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-1.5 transition-all ${
                isBuilding 
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                  : deployStatus === 'deployed'
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30'
              }`}
              whileHover={!isBuilding ? { scale: 1.05 } : {}}
              whileTap={!isBuilding ? { scale: 0.95 } : {}}
            >
              {isBuilding ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  Building...
                </>
              ) : deployStatus === 'deployed' ? (
                <>
                  <CheckCircle2 className="w-3 h-3" />
                  Live!
                </>
              ) : (
                <>
                  <Rocket className="w-3 h-3" />
                  Deploy
                </>
              )}
            </motion.button>
          </div>
          
          {/* Build progress bar */}
          {isBuilding && (
            <div className="h-0.5 bg-zinc-800">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-[#7b63ff] to-primary"
                initial={{ width: 0 }}
                animate={{ width: `${buildProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          )}
          
          {/* Content area */}
          <div className="bg-[#1a1625] rounded-b-xl min-h-[340px] overflow-hidden">
            {/* Code Tab */}
            {activeTab === 'code' && (
              <div className="p-4 font-mono text-xs">
                <div className="space-y-1.5">
                  {codeLines.map((line, idx) => (
                    <motion.div
                      key={line.num}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.05, duration: 0.3 }}
                      className="flex gap-3 group hover:bg-white/5 rounded px-1 -mx-1 transition-colors cursor-text"
                      style={{ paddingLeft: line.indent ? `${line.indent * 8}px` : undefined }}
                    >
                      <span className="text-white/30 w-4 text-right select-none">{line.num}</span>
                      <span className="flex-1">
                        {line.content.map((part, i) => (
                          <span key={i} className={part.color}>{part.text}</span>
                        ))}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Blinking cursor */}
                <motion.div
                  className="inline-block w-0.5 h-4 bg-primary ml-[72px] mt-2"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                />

                {/* Interactive stats */}
                <div className="grid grid-cols-3 gap-2 mt-6">
                  {[
                    { icon: Zap, label: 'Speed', value: lighthouseScore, color: 'text-green-400', bg: 'bg-white/5' },
                    { icon: Database, label: 'SEO', value: 100, color: 'text-primary', bg: 'bg-primary/10' },
                    { icon: Shield, label: 'Security', value: 'A+', color: 'text-[#7b63ff]', bg: 'bg-white/5' },
                  ].map((stat, idx) => (
                    <motion.div
                      key={stat.label}
                      className={`rounded-xl ${stat.bg} p-2.5 border border-white/10 cursor-pointer transition-all hover:border-primary/30 hover:scale-105`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 + idx * 0.1, duration: 0.3 }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <stat.icon className="w-3 h-3 text-primary/60" />
                        <p className="text-[8px] text-white/50">{stat.label}</p>
                      </div>
                      <p className={`text-base font-bold ${stat.color}`}>
                        {typeof stat.value === 'number' ? stat.value : stat.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Preview Tab */}
            {activeTab === 'preview' && (
              <div className="p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/10 p-4 min-h-[280px]"
                >
                  {/* Mini website preview */}
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="w-16 h-4 rounded bg-gradient-to-r from-primary/40 to-[#7b63ff]/40" />
                      <div className="flex gap-2">
                        <div className="w-8 h-2 rounded bg-white/10" />
                        <div className="w-8 h-2 rounded bg-white/10" />
                        <div className="w-12 h-4 rounded bg-primary/30" />
                      </div>
                    </div>
                    
                    {/* Hero section */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="space-y-2">
                        <motion.div 
                          className="w-3/4 h-3 rounded bg-white/20"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <div className="w-full h-2 rounded bg-white/10" />
                        <div className="w-2/3 h-2 rounded bg-white/10" />
                        <motion.div 
                          className="w-16 h-5 rounded bg-gradient-to-r from-primary to-[#7b63ff] mt-3"
                          whileHover={{ scale: 1.1 }}
                        />
                      </div>
                      <motion.div 
                        className="rounded-lg bg-gradient-to-br from-primary/20 to-[#7b63ff]/20 border border-white/10"
                        animate={{ 
                          boxShadow: ['0 0 20px rgba(255,106,85,0.2)', '0 0 40px rgba(123,99,255,0.3)', '0 0 20px rgba(255,106,85,0.2)']
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="p-2 rounded-lg bg-white/5 border border-white/5 cursor-pointer"
                          whileHover={{ scale: 1.05, borderColor: 'rgba(255,106,85,0.3)' }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="w-4 h-4 rounded bg-primary/20 mb-1" />
                          <div className="w-full h-1.5 rounded bg-white/10" />
                          <div className="w-2/3 h-1 rounded bg-white/5 mt-1" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-white/40 text-center mt-4">
                    ✨ Interactive preview - hover over elements!
                  </p>
                </motion.div>
              </div>
            )}

            {/* Terminal Tab */}
            {activeTab === 'terminal' && (
              <div className="p-4 font-mono text-xs">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-1"
                >
                  <div className="text-green-400">$ npm run build</div>
                  <motion.div 
                    className="text-white/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Creating optimized production build...
                  </motion.div>
                  <motion.div 
                    className="text-white/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    ✓ Compiled successfully
                  </motion.div>
                  <motion.div 
                    className="text-white/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    ✓ Linting and type checking
                  </motion.div>
                  <motion.div 
                    className="text-white/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    ✓ Collecting page data
                  </motion.div>
                  <motion.div 
                    className="text-green-400 font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    ✓ Build completed in 2.3s
                  </motion.div>
                  <motion.div
                    className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 }}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-semibold">Ready for deployment!</span>
                    </div>
                    <div className="text-white/50 mt-1 text-[10px]">
                      Bundle size: 87kb (gzipped)
                    </div>
                  </motion.div>
                  
                  {/* Blinking cursor */}
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-green-400">$</span>
                    <motion.span
                      className="w-2 h-4 bg-green-400"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Floating Performance badge - with parallax */}
      <motion.div
        className="absolute -top-12 -right-4 sm:-right-12 bg-gradient-to-br from-[#181116] to-[#0f0b0e] rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-green-500/30 cursor-pointer z-10"
        style={{ 
          x: floatX, 
          y: floatY,
          transformStyle: 'preserve-3d',
          transform: 'translateZ(40px)'
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{ scale: 1.1, borderColor: 'rgba(34, 197, 94, 0.5)' }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-[#7b63ff]/20 flex items-center justify-center"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Zap className="w-5 h-5 text-green-400" />
          </motion.div>
          <div>
            <p className="text-[10px] text-white/50">Lighthouse Score</p>
            <p className="text-lg font-bold text-green-400">{lighthouseScore}/100</p>
          </div>
        </div>
      </motion.div>
      
      {/* Floating deploy notification - with parallax */}
      <motion.div
        className="absolute -bottom-2 -left-4 sm:-left-8 bg-white rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-gray-100 cursor-pointer z-10"
        style={{ 
          x: floatXReverse, 
          y: floatYReverse,
          transformStyle: 'preserve-3d',
          transform: 'translateZ(30px)'
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center"
            animate={deployStatus === 'deployed' ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            {deployStatus === 'building' ? (
              <RefreshCw className="w-4 h-4 text-yellow-500 animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            )}
          </motion.div>
          <div>
            <p className="text-[10px] font-medium text-gray-900">
              {deployStatus === 'building' ? 'Deploying...' : deployStatus === 'deployed' ? 'Deployed!' : 'Ready'}
            </p>
            <p className="text-[9px] text-gray-500">
              {deployStatus === 'building' ? `${Math.round(buildProgress)}%` : 'Live in 2.3s'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Floating interaction hint */}
      <motion.div
        className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[11px] text-white/40"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        <MousePointer2 className="w-3 h-3" />
        <span>Move mouse to interact • Click Deploy to build</span>
        {clickCount > 0 && (
          <span className="text-primary ml-2">({clickCount} deploys)</span>
        )}
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

export default function WebDevelopmentPage() {
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
                <span className="text-sm font-medium text-foreground-secondary">Custom Web Development</span>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Websites That{" "}
                <span className="bg-gradient-to-r from-primary via-[#ff7a59] to-[#7b63ff] bg-clip-text text-transparent">
                  Drive Growth
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-foreground-secondary mb-8 leading-relaxed">
                Custom-built websites designed for performance, conversions, and growth. From local businesses to e-commerce, we create digital experiences that deliver results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/schedule-a-call"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-primary text-white font-semibold rounded-xl transition-all duration-200 hover:brightness-110 shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(255,106,85,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] active:scale-[0.98]"
                >
                  Start Your Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#process"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-white/[0.03] border border-white/[0.08] text-foreground font-semibold rounded-xl transition-all duration-200 hover:bg-white/[0.06] hover:border-white/[0.15] backdrop-blur-sm active:scale-[0.98]"
                >
                  <Play className="w-4 h-4" />
                  How It Works
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
            <div className="relative lg:pl-8">
              <InteractiveCodeMockup />
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 relative">
        <Container>
          <SectionHeading
            overline="WHY CHOOSE US"
            title="Built for Performance & Results"
            highlightWord="Performance"
            subtitle="Modern websites optimized for speed, conversions, and user experience."
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
            title="Everything You Get With Our Development"
            highlightWord="Development"
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

      {/* Website Types */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,106,85,0.04),transparent_60%)] pointer-events-none" />
        <Container>
          <SectionHeading
            overline="WHAT WE BUILD"
            title="Websites Tailored to Your Needs"
            highlightWord="Tailored"
            subtitle="From business sites to e-commerce stores, we build what you need to succeed."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {websiteTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
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
                <div className="relative h-full p-8 rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)]">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-[#7b63ff]/20 flex items-center justify-center flex-shrink-0">
                      <type.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{type.title}</h3>
                      <p className="text-sm text-foreground-secondary leading-relaxed">{type.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mt-6">
                    {type.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground-secondary">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Tech Stack */}
      <section className="py-20">
        <Container>
          <SectionHeading
            overline="TECHNOLOGY"
            title="Modern Tech Stack"
            highlightWord="Modern"
            subtitle="Built with cutting-edge technologies for performance and scalability."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="relative group"
              >
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <GlowingEffect
                    spread={20}
                    glow={true}
                    disabled={false}
                    proximity={40}
                    inactiveZone={0.01}
                    borderWidth={1}
                    className="rounded-xl"
                  />
                </div>
                <div className="relative p-6 rounded-xl border border-white/10 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] hover:border-white/20 transition-all duration-300 text-center">
                  <div className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{tech.name}</div>
                  <div className="text-xs text-foreground-secondary">{tech.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,99,255,0.05),transparent_60%)] pointer-events-none" />
        
        <Container>
          <SectionHeading
            overline="OUR PROCESS"
            title="From Concept to Launch"
            highlightWord="Launch"
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
            subtitle="Everything you need to know about our web development services."
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
                Ready to Build Your{" "}
                <span className="bg-gradient-to-r from-primary to-[#7b63ff] bg-clip-text text-transparent">
                  Dream Website?
                </span>
              </h2>
              <p className="text-foreground-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
                Let&apos;s discuss your project and create a website that drives real results for your business.
              </p>
              <Link
                href="/schedule-a-call"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-primary text-white font-semibold rounded-xl transition-all duration-200 hover:brightness-110 shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(255,106,85,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] active:scale-[0.98]"
              >
                Schedule Your Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-xs text-foreground-secondary mt-4">
                No commitment required • Free consultation • Expert advice
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      <Footer {...footerData} />
    </>
  )
}
