"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { useState, useRef, useCallback } from "react"
import { Container } from "@/components/site/Container"
import { SectionHeading } from "@/components/site/SectionHeading"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Footer } from "@/components/site/Footer"
import {
  Palette,
  Zap,
  Smartphone,
  Monitor,
  Layers,
  ArrowRight,
  CheckCircle2,
  Eye,
  MousePointer2,
  BarChart3,
  Pencil,
  Sparkles,
  Play,
  ChevronRight,
  ArrowUpRight,
  Type,
  Square,
  Circle,
  Image as ImageIcon
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
    icon: Eye,
    title: "See It Live, Not Static",
    description: "Test your design in a real browser before launch. Click, scroll, and interact—experience it exactly as users will.",
    gradient: "from-[#ff6a55]/20 to-[#7b63ff]/10",
  },
  {
    icon: Zap,
    title: "Faster Approvals",
    description: "No guessing how it will look. Live previews mean faster feedback and quicker decisions.",
    gradient: "from-[#7b63ff]/20 to-[#3d52d5]/10",
  },
  {
    icon: Smartphone,
    title: "Test on Any Device",
    description: "Pull out your phone and test the preview. See how it looks on tablets, desktops—everything.",
    gradient: "from-[#3d52d5]/20 to-[#ff6a55]/10",
  },
]

const allBenefits = [
  {
    icon: Eye,
    title: "See It Live, Not Static",
    description: "Test your design in a real browser before launch. Click, scroll, and interact—experience it exactly as users will."
  },
  {
    icon: Zap,
    title: "Faster Approvals",
    description: "No guessing how it will look. Live previews mean faster feedback and quicker decisions."
  },
  {
    icon: Smartphone,
    title: "Test on Any Device",
    description: "Pull out your phone and test the preview. See how it looks on tablets, desktops—everything."
  },
  {
    icon: Palette,
    title: "Brand Consistency",
    description: "Cohesive visual language that reflects your brand identity across every touchpoint."
  },
  {
    icon: MousePointer2,
    title: "Real Interactions",
    description: "Experience smooth animations, hover effects, and micro-interactions—not just look at them."
  },
  {
    icon: BarChart3,
    title: "Conversion Optimized",
    description: "Strategic design elements and CTAs placed to maximize conversions and engagement."
  }
]

const services = [
  {
    icon: Monitor,
    title: "Web Design",
    description: "Beautiful, responsive websites that work perfectly on all screen sizes and devices.",
    features: ["Responsive layouts", "Modern aesthetics", "Custom components", "Pixel-perfect design"]
  },
  {
    icon: Smartphone,
    title: "Mobile App Design",
    description: "Native-feeling mobile experiences with intuitive navigation and touch interactions.",
    features: ["iOS & Android", "Touch-optimized", "Gesture controls", "App iconography"]
  },
  {
    icon: Pencil,
    title: "Live Previews",
    description: "Interactive, coded previews you can click through and experience before final approval.",
    features: ["Real working demos", "Test interactions", "Mobile responsive", "Instant feedback"]
  },
  {
    icon: Layers,
    title: "Design Systems",
    description: "Scalable design systems and component libraries for consistent, efficient growth.",
    features: ["Component library", "Style guide", "Documentation", "Reusable patterns"]
  }
]

const process = [
  {
    num: "01",
    title: "Research & Strategy",
    text: "We analyze your business, users, and goals to create a design strategy that drives results."
  },
  {
    num: "02",
    title: "Design & Build Preview",
    text: "We design and code a working preview you can interact with, not just static mockups."
  },
  {
    num: "03",
    title: "Review & Refine",
    text: "You test the live preview on any device, request changes, and we refine until perfect."
  },
  {
    num: "04",
    title: "Approve & Launch",
    text: "Once you approve, we finalize everything and prepare for seamless launch."
  }
]

const stats = [
  { value: "1-2", label: "Weeks to Deliver" },
  { value: "100%", label: "User-Focused" },
  { value: "∞", label: "Revisions" },
  { value: "24/7", label: "Support" },
]

const faqs = [
  {
    q: "What's the difference between UX and UI design?",
    a: "UX (User Experience) design focuses on the overall feel and journey through your product, while UI (User Interface) design focuses on the visual elements, layout, and aesthetics. We handle both to create complete, cohesive experiences."
  },
  {
    q: "How long does the design process take?",
    a: "Most design projects take 1-2 weeks depending on scope and complexity. We'll provide a clear timeline during our initial consultation."
  },
  {
    q: "How do you show me the design before it's final?",
    a: "We build live, interactive previews that you can actually click through and test on any device. This lets you experience the design exactly as your users will, not just look at static mockups."
  },
  {
    q: "Can you redesign my existing website?",
    a: "Absolutely. We specialize in refreshing and modernizing existing designs while maintaining brand consistency and improving user experience."
  },
  {
    q: "Do you design for mobile apps?",
    a: "Yes, we design for both web and mobile platforms (iOS and Android), ensuring consistent experiences across all devices."
  },
  {
    q: "What if I need changes after seeing the preview?",
    a: "That's the beauty of our process! You can request unlimited revisions during the design phase. We'll refine until you're 100% satisfied before moving to final development."
  }
]

// Design Dashboard Mockup Component
// Interactive Design Mockup with 3D Mouse Tracking
function InteractiveDesignMockup() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [activeMode, setActiveMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [selectedElement, setSelectedElement] = useState<number | null>(null)
  const [colorScheme, setColorScheme] = useState(0)
  
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

  const colorSchemes = [
    { primary: '#ff6a55', secondary: '#7b63ff' },
    { primary: '#3b82f6', secondary: '#8b5cf6' },
    { primary: '#10b981', secondary: '#06b6d4' },
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
            
            {/* Device mode tabs */}
            <div className="flex-1 flex items-center justify-center gap-1">
              {(['desktop', 'tablet', 'mobile'] as const).map((mode) => (
                <motion.button
                  key={mode}
                  onClick={() => setActiveMode(mode)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-medium transition-all capitalize flex items-center gap-1 ${
                    activeMode === mode 
                      ? 'bg-primary/20 text-primary border border-primary/30' 
                      : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {mode === 'desktop' && <Monitor className="w-3 h-3" />}
                  {mode === 'tablet' && <Layers className="w-3 h-3" />}
                  {mode === 'mobile' && <Smartphone className="w-3 h-3" />}
                  {mode}
                </motion.button>
              ))}
            </div>

            {/* Color scheme button */}
            <motion.button
              onClick={() => setColorScheme((prev) => (prev + 1) % 3)}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-[#7b63ff] border border-white/10"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <Palette className="w-4 h-4 text-white mx-auto" />
            </motion.button>
          </div>
          
          {/* Content area */}
          <div className="bg-[#0f0b0e] rounded-b-xl min-h-[340px] overflow-hidden relative">
            {/* Grid background */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />

            <motion.div 
              className="relative p-4"
              key={activeMode}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                maxWidth: activeMode === 'mobile' ? '280px' : activeMode === 'tablet' ? '400px' : '100%',
                margin: '0 auto'
              }}
            >
              {/* Header mockup */}
              <motion.div
                className={`flex items-center ${activeMode === 'mobile' ? 'flex-col gap-2' : 'justify-between'} p-3 rounded-xl bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 border border-white/5 mb-3 cursor-pointer`}
                whileHover={{ scale: 1.02, borderColor: 'rgba(255,106,85,0.3)' }}
                onClick={() => setSelectedElement(selectedElement === 0 ? null : 0)}
                animate={selectedElement === 0 ? { borderColor: 'rgba(255,106,85,0.5)' } : {}}
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    className={`rounded-lg ${activeMode === 'mobile' ? 'w-6 h-6' : 'w-8 h-8'}`}
                    style={{ 
                      background: `linear-gradient(135deg, ${colorSchemes[colorScheme].primary}, ${colorSchemes[colorScheme].secondary})` 
                    }}
                    animate={{ rotate: selectedElement === 0 ? [0, 5, -5, 0] : 0 }}
                  />
                  {activeMode !== 'mobile' && (
                    <div className="space-y-1">
                      <div className="w-16 h-2 rounded bg-white/20" />
                      <div className="w-12 h-1.5 rounded bg-white/10" />
                    </div>
                  )}
                </div>
                <div className={`flex gap-2 ${activeMode === 'mobile' ? 'w-full' : ''}`}>
                  <div className={`rounded-lg bg-primary/20 border border-primary/30 ${activeMode === 'mobile' ? 'flex-1 h-6' : 'w-14 h-5'}`} />
                  {activeMode !== 'mobile' && (
                    <div className="w-14 h-5 rounded-lg bg-white/5 border border-white/10" />
                  )}
                </div>
              </motion.div>

              {/* Hero section mockup */}
              <motion.div
                className={`${activeMode === 'mobile' ? 'flex flex-col' : 'grid grid-cols-2'} gap-3 p-3 rounded-xl bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 border border-white/5 mb-3 cursor-pointer`}
                whileHover={{ scale: 1.02, borderColor: 'rgba(255,106,85,0.3)' }}
                onClick={() => setSelectedElement(selectedElement === 1 ? null : 1)}
                animate={selectedElement === 1 ? { borderColor: 'rgba(255,106,85,0.5)' } : {}}
              >
                <div className={`space-y-2 ${activeMode === 'mobile' ? 'order-2' : ''}`}>
                  <motion.div 
                    className={`rounded ${activeMode === 'mobile' ? 'w-16 h-2' : 'w-20 h-2.5'}`}
                    style={{ 
                      background: `linear-gradient(90deg, ${colorSchemes[colorScheme].primary}66, ${colorSchemes[colorScheme].secondary}66)` 
                    }}
                  />
                  <div className="w-full h-1.5 rounded bg-white/10" />
                  <div className="w-3/4 h-1.5 rounded bg-white/10" />
                  <motion.div 
                    className={`rounded-lg shadow-lg ${activeMode === 'mobile' ? 'w-full h-8' : 'w-16 h-6'}`}
                    style={{ 
                      background: `linear-gradient(135deg, ${colorSchemes[colorScheme].primary}, ${colorSchemes[colorScheme].secondary})`,
                      boxShadow: `0 0 15px ${colorSchemes[colorScheme].primary}66`
                    }}
                    whileHover={{ scale: 1.1 }}
                  />
                </div>
                <div className={`relative ${activeMode === 'mobile' ? 'h-24 order-1 mb-2' : ''}`}>
                  <motion.div
                    className="absolute inset-0 rounded-lg border border-white/10"
                    style={{ 
                      background: `linear-gradient(135deg, ${colorSchemes[colorScheme].primary}33, ${colorSchemes[colorScheme].secondary}33)` 
                    }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              {/* Cards mockup */}
              <div className={`grid ${activeMode === 'mobile' ? 'grid-cols-1' : activeMode === 'tablet' ? 'grid-cols-2' : 'grid-cols-3'} gap-2 mb-3`}>
                {[0, 1, 2].map((i) => (
                  <motion.div 
                    key={i} 
                    className="p-2.5 rounded-lg bg-zinc-800/30 border border-white/5 space-y-1.5 cursor-pointer"
                    whileHover={{ scale: 1.05, borderColor: 'rgba(255,106,85,0.3)' }}
                    onClick={() => setSelectedElement(selectedElement === (i + 2) ? null : (i + 2))}
                    animate={selectedElement === (i + 2) ? { borderColor: 'rgba(255,106,85,0.5)' } : {}}
                  >
                    <motion.div 
                      className="w-5 h-5 rounded-lg"
                      style={{ 
                        background: `linear-gradient(135deg, ${colorSchemes[colorScheme].primary}4D, ${colorSchemes[colorScheme].secondary}4D)` 
                      }}
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="w-full h-1.5 rounded bg-white/10" />
                    <div className="w-3/4 h-1 rounded bg-white/5" />
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className={`grid ${activeMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-3'} gap-2`}>
                {[
                  { icon: Eye, label: 'Views', value: '12.4K', color: 'white' },
                  { icon: MousePointer2, label: 'Clicks', value: '847', color: 'primary' },
                  { icon: BarChart3, label: 'Conv.', value: '8.2%', color: 'green' },
                ].map((stat, idx) => (
                  <motion.div 
                    key={idx}
                    className={`rounded-xl p-2.5 border cursor-pointer ${
                      stat.color === 'primary' 
                        ? 'bg-primary/10 border-primary/20' 
                        : 'bg-white/5 border-white/10'
                    } ${activeMode === 'mobile' ? 'flex items-center gap-3' : ''}`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`flex items-center gap-1 ${activeMode === 'mobile' ? '' : 'mb-1'}`}>
                      <stat.icon className="w-3 h-3 text-primary/60" />
                      <p className="text-[8px] text-white/50">{stat.label}</p>
                    </div>
                    <p className={`text-base font-bold ${activeMode === 'mobile' ? 'ml-auto' : ''} ${
                      stat.color === 'primary' 
                        ? 'text-primary' 
                        : stat.color === 'green' 
                        ? 'text-green-400' 
                        : 'text-white'
                    }`}>
                      {stat.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Tool palette */}
              {selectedElement !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur-sm rounded-xl p-2 border border-white/10 flex gap-2"
                >
                  {[Type, Square, Circle, ImageIcon].map((Icon, idx) => (
                    <motion.button
                      key={idx}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,106,85,0.2)', borderColor: 'rgba(255,106,85,0.3)' }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="w-4 h-4 text-white/60" />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Floating Live Preview badge */}
      <motion.div
        className="absolute -top-12 -right-4 sm:-right-12 bg-gradient-to-br from-[#181116] to-[#0f0b0e] rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-[#7b63ff]/30 cursor-pointer z-10"
        style={{ x: floatX, y: floatY, transformStyle: 'preserve-3d', transform: 'translateZ(40px)' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{ scale: 1.1, borderColor: 'rgba(123,99,255,0.5)' }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-[#7b63ff]/20 flex items-center justify-center">
            <motion.div 
              className="w-3 h-3 rounded-full bg-green-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <p className="text-[10px] text-white/50">Live Preview</p>
            <p className="text-sm font-bold text-[#7b63ff]">Interactive</p>
          </div>
        </div>
      </motion.div>
      
      {/* Floating interaction badge */}
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
            className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
            animate={selectedElement !== null ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <MousePointer2 className="w-4 h-4 text-primary" />
          </motion.div>
          <div>
            <p className="text-[10px] font-medium text-gray-900">Click Elements</p>
            <p className="text-[9px] text-gray-500">Change colors & modes</p>
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
        <span>Click elements • Switch modes • Change colors</span>
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

export default function UXUIDesignPage() {
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
                <span className="text-sm font-medium text-foreground-secondary">UX/UI Design Services</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Design That{" "}
                <span className="bg-gradient-to-r from-primary via-[#ff7a59] to-[#7b63ff] bg-clip-text text-transparent">
                  Actually Converts
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-foreground-secondary mb-8 leading-relaxed">
                Beautiful, user-centered interfaces you can experience before launch. We build live previews so you can test, refine, and approve with confidence—not just look at pictures.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/schedule-a-call"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-primary text-white font-semibold rounded-xl transition-all duration-200 hover:brightness-110 shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(255,106,85,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] active:scale-[0.98]"
                >
                  Get Started
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
              <div className="grid grid-cols-4 gap-4 pt-8 border-t border-white/10">
                {stats.map((stat, index) => (
                  <AnimatedCounter key={index} value={stat.value} label={stat.label} />
                ))}
              </div>
            </motion.div>

            {/* Right - Interactive Dashboard mockup */}
            <div className="relative lg:pl-8">
              <InteractiveDesignMockup />
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 relative">
        <Container>
          <SectionHeading
            overline="WHY CHOOSE US"
            title="Experience Your Design Before Launch"
            highlightWord="Experience"
            subtitle="No more guessing. Test live, interactive previews on any device before going live."
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
            title="Everything You Get With Our Design"
            highlightWord="Design"
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

      {/* Services */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,106,85,0.04),transparent_60%)] pointer-events-none" />
        <Container>
          <SectionHeading
            overline="OUR SERVICES"
            title="Complete Design Solutions"
            highlightWord="Design"
            subtitle="From concept to live preview to launch—we handle every aspect of your digital experience."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
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
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                      <p className="text-sm text-foreground-secondary leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mt-6">
                    {service.features.map((feature, i) => (
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

      {/* Process Section */}
      <section id="process" className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,99,255,0.05),transparent_60%)] pointer-events-none" />
        
        <Container>
          <SectionHeading
            overline="OUR PROCESS"
            title="From Idea to Interface"
            highlightWord="Interface"
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
            subtitle="Everything you need to know about our UX/UI design services."
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
                Ready to Transform Your{" "}
                <span className="bg-gradient-to-r from-primary to-[#7b63ff] bg-clip-text text-transparent">
                  Design?
                </span>
                </h2>
                <p className="text-foreground-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
                  Let&apos;s create a beautiful, user-centered experience that drives real results for your business.
                </p>
                <Link
                  href="/schedule-a-call"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-primary text-white font-semibold rounded-xl transition-all duration-200 hover:brightness-110 shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(255,106,85,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] active:scale-[0.98]"
                >
                  <span className="hidden sm:inline">Schedule Your Free Consultation</span>
                  <span className="inline sm:hidden">Schedule Call</span>
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
