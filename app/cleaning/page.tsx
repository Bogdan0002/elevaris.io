"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { useState, useRef, useCallback, useEffect } from "react"
import { Container } from "@/components/site/Container"
import { SectionHeading } from "@/components/site/SectionHeading"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Footer } from "@/components/site/Footer"
import { 
  CheckCircle2, 
  X,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Star,
  Users,
  Zap,
  Clock,
  Shield,
  BarChart3,
  Smartphone,
  Phone,
  Mail,
  Bell,
  Calendar,
  ChevronRight,
  Play,
  MousePointer2,
  RefreshCw,
  TrendingUp,
  Send,
  Inbox,
  UserPlus
} from "lucide-react"

const tiers = [
  {
    name: "Launch",
    tagline: "Look professional. Capture leads. Stay organized.",
    setupPrice: "$249",
    monthlyPrice: "$99",
    popular: false,
    included: [
      "Custom cleaning business website",
      "Custom branding (logo, colors, service area)",
      "Quote / contact forms (lead capture)",
      "Leads stored in your client CRM",
      "Email notifications for new inquiries",
      "Google Maps integration",
      "Hosting + SSL included",
      "Basic SEO structure",
      "Mobile optimized",
    ],
    notIncluded: [
      "SMS follow-up automation",
      "Missed-call text-back",
      "Review request automation",
      "Lead pipeline tracking",
    ],
    cta: "Launch My System",
  },
  {
    name: "Growth",
    tagline: "Convert more inquiries into paying clients — automatically.",
    setupPrice: "$549",
    monthlyPrice: "$149",
    popular: true,
    included: [
      "Everything in Launch",
      "Automatic lead follow-up (SMS + email)",
      "Missed-call text-back (instant response)",
      "Lead pipeline tracking (New → Contacted → Won)",
      "Google review request automation",
      "Centralized conversations",
      "Mobile app access",
      "Tagging & segmentation",
      "Unlimited content edits (fair-use)",
      "System monitoring & maintenance",
      "Website live chat widget",
      "Automated review requests after jobs",
    ],
    notIncluded: [
      "Automated estimate calculator",
      "Reactivation campaigns",
    ],
    cta: "Choose Growth",
  },
  {
    name: "Accelerator",
    tagline: "Maximize every lead and scale with advanced automation.",
    setupPrice: "$999",
    monthlyPrice: "$299",
    popular: false,
    included: [
      "Everything in Growth",
      "Automated estimate calculator",
      "Advanced follow-up logic (smart nudges)",
      "Lead reactivation campaigns",
      "Custom workflows by service type",
      "Priority support",
      "Monthly performance insights",
      "Optional online booking flow",
      "Smart review filtering",
    ],
    notIncluded: [],
    cta: "Choose Accelerator",
  },
]

const features = [
  {
    icon: MessageSquare,
    title: "Never Miss a Lead",
    description: "Automatic responses to inquiries within seconds, even when you're on a job.",
  },
  {
    icon: Star,
    title: "5-Star Review Machine",
    description: "Automated review requests sent at the perfect moment to happy customers.",
  },
  {
    icon: Users,
    title: "Client Management",
    description: "All your clients, conversations, and history in one organized place.",
  },
  {
    icon: Zap,
    title: "Instant Follow-Up",
    description: "SMS and email sequences that nurture leads while you focus on cleaning.",
  },
  {
    icon: Clock,
    title: "Save 10+ Hours/Week",
    description: "Stop chasing leads manually. Let automation handle the repetitive work.",
  },
  {
    icon: BarChart3,
    title: "Track Everything",
    description: "See which leads convert, where they come from, and how to improve.",
  },
]

const stats = [
  { value: "3-7", label: "Days to Launch" },
  { value: "10+", label: "Hours Saved Weekly" },
  { value: "2x", label: "More Reviews" },
  { value: "24/7", label: "Lead Capture" },
]

const comparisonData = {
  without: [
    "Missed calls while on jobs",
    "Leads forget about you",
    "Manually asking for reviews",
    "Scattered messages everywhere",
    "No idea which leads converted",
    "Spending evenings on admin",
  ],
  with: [
    "Instant text-back to every call",
    "Automated follow-up sequences",
    "Reviews requested automatically",
    "All conversations in one inbox",
    "Full pipeline visibility",
    "System works while you sleep",
  ],
}

const faqData = [
  {
    q: "How long does it take to get started?",
    a: "Most systems are live within 3-7 business days. We handle everything — you just provide your business details and branding preferences.",
  },
  {
    q: "Do I need any technical skills?",
    a: "Not at all. Everything is set up for you and can be managed from your phone. We provide training and ongoing support.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes, you can upgrade or downgrade anytime. No penalties, no long-term contracts.",
  },
  {
    q: "What if I already have a website?",
    a: "We can either replace it or integrate your existing site with our automation system. We'll recommend the best approach during your call.",
  },
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

// Interactive CRM Mockup Component with 3D Mouse Tracking
function InteractiveCRMMockup() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [activeTab, setActiveTab] = useState<'leads' | 'inbox' | 'reviews'>('leads')
  const [newLeads, setNewLeads] = useState(0)
  const [conversions, setConversions] = useState(0)
  const [reviews, setReviews] = useState(0)
  const [revenue, setRevenue] = useState(0)
  const [isSending, setIsSending] = useState(false)
  
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

  // Simulate sending follow-up
  const handleSendFollowUp = useCallback(() => {
    if (isSending) return
    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      setConversions(prev => prev + 1)
    }, 1500)
  }, [isSending])

  // Animate metrics on mount
  useEffect(() => {
    let currentLeads = 0
    const leadsInterval = setInterval(() => {
      currentLeads += 1
      setNewLeads(Math.min(currentLeads, 12))
      if (currentLeads >= 12) clearInterval(leadsInterval)
    }, 100)
    
    let currentConv = 0
    const convInterval = setInterval(() => {
      currentConv += 1
      setConversions(Math.min(currentConv, 8))
      if (currentConv >= 8) clearInterval(convInterval)
    }, 150)
    
    let currentRev = 0
    const revInterval = setInterval(() => {
      currentRev += 150
      setRevenue(Math.min(currentRev, 2450))
      if (currentRev >= 2450) clearInterval(revInterval)
    }, 80)
    
    let currentReviews = 0
    const reviewsInterval = setInterval(() => {
      currentReviews += 1
      setReviews(Math.min(currentReviews, 47))
      if (currentReviews >= 47) clearInterval(reviewsInterval)
    }, 60)
    
    return () => {
      clearInterval(leadsInterval)
      clearInterval(convInterval)
      clearInterval(revInterval)
      clearInterval(reviewsInterval)
    }
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
      className="relative mx-auto w-full max-w-[480px] lg:max-w-[520px] cursor-pointer px-2 sm:px-0"
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
            
            {/* Tab switcher */}
            <div className="flex-1 flex items-center justify-center gap-1">
              {([
                { key: 'leads', label: 'Leads', icon: UserPlus },
                { key: 'inbox', label: 'Inbox', icon: Inbox },
                { key: 'reviews', label: 'Reviews', icon: Star }
              ] as const).map((tab) => (
                <motion.button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-medium transition-all flex items-center gap-1 ${
                    activeTab === tab.key 
                      ? 'bg-primary/20 text-primary border border-primary/30' 
                      : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <tab.icon className="w-3 h-3" />
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-1.5">
              <motion.div 
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[10px] text-green-400">Live</span>
            </div>
          </div>
          
          {/* Content area */}
          <div className="bg-[#0f0b0e] rounded-b-xl min-h-[340px] overflow-hidden">
            <motion.div 
              className="relative p-4"
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Leads View */}
              {activeTab === 'leads' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] text-white/50">Cleaning Business CRM</p>
                      <p className="text-sm font-semibold text-white">Lead Pipeline</p>
                    </div>
                    <motion.button
                      onClick={handleSendFollowUp}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-1.5 transition-all ${
                        isSending
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : 'bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSending ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-3 h-3" />
                          Follow Up
                        </>
                      )}
                    </motion.button>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <motion.div 
                      className="rounded-xl bg-white/5 p-2.5 border border-white/10"
                      animate={{ scale: newLeads === 12 ? [1, 1.02, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-[8px] text-white/50 mb-1">New Leads</p>
                      <p className="text-lg font-bold text-primary">{newLeads}</p>
                    </motion.div>
                    <div className="rounded-xl bg-white/5 p-2.5 border border-white/10">
                      <p className="text-[8px] text-white/50 mb-1">Converted</p>
                      <p className="text-lg font-bold text-green-400">{conversions}</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-2.5 border border-white/10">
                      <p className="text-[8px] text-white/50 mb-1">Revenue</p>
                      <p className="text-lg font-bold text-white">${revenue.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Lead cards */}
                  {[
                    { name: 'Sarah M.', service: 'Deep Clean', status: 'hot', time: 'Just now' },
                    { name: 'John D.', service: 'Weekly Service', status: 'warm', time: '5 min ago' },
                    { name: 'Lisa K.', service: 'Move-out Clean', status: 'new', time: '12 min ago' },
                  ].map((lead, idx) => (
                    <motion.div
                      key={idx}
                      className={`rounded-xl p-3 border cursor-pointer transition-all ${
                        lead.status === 'hot'
                          ? 'bg-primary/10 border-primary/30 hover:border-primary/50'
                          : lead.status === 'warm'
                          ? 'bg-yellow-500/10 border-yellow-500/20 hover:border-yellow-500/40'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          lead.status === 'hot' ? 'bg-primary/20 text-primary' :
                          lead.status === 'warm' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-white/10 text-white/60'
                        }`}>
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <p className="text-[11px] font-medium text-white">{lead.name}</p>
                          <p className="text-[9px] text-white/50">{lead.service}</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-[8px] px-2 py-0.5 rounded-full ${
                            lead.status === 'hot' ? 'bg-primary/20 text-primary' :
                            lead.status === 'warm' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-white/10 text-white/50'
                          }`}>
                            {lead.status}
                          </span>
                          <p className="text-[8px] text-white/40 mt-1">{lead.time}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Inbox View */}
              {activeTab === 'inbox' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] text-white/50">Unified Inbox</p>
                      <p className="text-sm font-semibold text-white">All Conversations</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-white/40">3 unread</span>
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-primary">3</span>
                      </div>
                    </div>
                  </div>

                  {/* Message cards */}
                  {[
                    { name: 'Sarah M.', msg: 'Hi! I need a quote for...', channel: 'SMS', unread: true, time: '2m' },
                    { name: 'Mike Johnson', msg: 'Thanks for the great service!', channel: 'Email', unread: true, time: '15m' },
                    { name: 'Lisa K.', msg: 'Can you do next Tuesday?', channel: 'Web', unread: true, time: '1h' },
                    { name: 'Tom W.', msg: 'Perfect, see you then!', channel: 'SMS', unread: false, time: '3h' },
                  ].map((msg, idx) => (
                    <motion.div
                      key={idx}
                      className={`rounded-xl p-3 border cursor-pointer transition-all ${
                        msg.unread
                          ? 'bg-primary/5 border-primary/20 hover:border-primary/40'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-[#7b63ff]/30 flex items-center justify-center text-[10px] font-bold text-white">
                          {msg.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-[11px] font-medium text-white">{msg.name}</p>
                            <span className={`text-[8px] px-1.5 py-0.5 rounded ${
                              msg.channel === 'SMS' ? 'bg-green-500/20 text-green-400' :
                              msg.channel === 'Email' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-purple-500/20 text-purple-400'
                            }`}>{msg.channel}</span>
                          </div>
                          <p className="text-[9px] text-white/50 truncate">{msg.msg}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[8px] text-white/40">{msg.time}</span>
                          {msg.unread && (
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Reviews View */}
              {activeTab === 'reviews' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] text-white/50">Reputation Management</p>
                      <p className="text-sm font-semibold text-white">Google Reviews</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-white">4.9</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="rounded-xl bg-white/5 p-2.5 border border-white/10">
                      <p className="text-[8px] text-white/50 mb-1">Total Reviews</p>
                      <p className="text-lg font-bold text-yellow-400">{reviews}</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-2.5 border border-white/10">
                      <p className="text-[8px] text-white/50 mb-1">This Month</p>
                      <p className="text-lg font-bold text-green-400">+8</p>
                    </div>
                  </div>

                  {/* Review cards */}
                  {[
                    { name: 'Jennifer B.', rating: 5, text: 'Amazing service! My house has never been cleaner.', time: '2 days ago' },
                    { name: 'Robert M.', rating: 5, text: 'Very professional and thorough. Highly recommend!', time: '1 week ago' },
                    { name: 'Amanda S.', rating: 5, text: 'Best cleaning service in town. Will use again!', time: '2 weeks ago' },
                  ].map((review, idx) => (
                    <motion.div
                      key={idx}
                      className="rounded-xl p-3 bg-white/5 border border-white/10 cursor-pointer hover:border-yellow-500/30 transition-all"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-[10px] font-bold text-yellow-400">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-[11px] font-medium text-white">{review.name}</p>
                            <div className="flex gap-0.5">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-[9px] text-white/60">&ldquo;{review.text}&rdquo;</p>
                          <p className="text-[8px] text-white/40 mt-1">{review.time}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Floating new lead notification */}
      <motion.div
        className="absolute -top-10 -right-4 sm:-right-12 bg-white rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-gray-100 cursor-pointer z-10"
        style={{ x: floatX, y: floatY, transformStyle: 'preserve-3d', transform: 'translateZ(40px)' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <UserPlus className="w-4 h-4 text-green-500" />
          </motion.div>
          <div>
            <p className="text-[10px] font-medium text-gray-900">New Lead!</p>
            <p className="text-[9px] text-gray-500">Auto-reply sent ✓</p>
          </div>
        </div>
      </motion.div>
      
      {/* Floating review card */}
      <motion.div
        className="absolute -bottom-2 -left-4 sm:-left-12 bg-gradient-to-br from-[#181116] to-[#0f0b0e] rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-yellow-500/20 cursor-pointer z-10"
        style={{ x: floatXReverse, y: floatYReverse, transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <p className="text-[9px] text-white/80 max-w-[120px]">&ldquo;Best cleaning service ever!&rdquo;</p>
        <p className="text-[8px] text-white/50 mt-1">— Mike&apos;s Cleaning Co.</p>
      </motion.div>

      {/* Interaction hint */}
      <motion.div
        className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[11px] text-white/40"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        <MousePointer2 className="w-3 h-3" />
        <span>Move mouse • Switch tabs • Click Follow Up</span>
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

export default function CleaningPage() {
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
                <span className="text-sm font-medium text-foreground-secondary">For Cleaning Businesses</span>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Stop Chasing Leads.{" "}
                <span className="bg-gradient-to-r from-primary via-[#ff7a59] to-[#7b63ff] bg-clip-text text-transparent">
                  Start Growing.
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-foreground-secondary mb-8 leading-relaxed">
                A complete system that captures leads, follows up automatically, collects reviews, and keeps everything organized — so you can focus on cleaning, not chasing.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-primary text-white font-semibold rounded-xl transition-all duration-200 hover:brightness-110 shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(255,106,85,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] active:scale-[0.98]"
                >
                  View Pricing
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/schedule-a-call"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-white/[0.03] border border-white/[0.08] text-foreground font-semibold rounded-xl transition-all duration-200 hover:bg-white/[0.06] hover:border-white/[0.15] backdrop-blur-sm active:scale-[0.98]"
                >
                  <Play className="w-4 h-4" />
                  See How It Works
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 pt-8 border-t border-white/10">
                {stats.map((stat, index) => (
                  <AnimatedCounter key={index} value={stat.value} label={stat.label} />
                ))}
              </div>
            </motion.div>

            {/* Right - Interactive CRM mockup */}
            <div className="relative lg:pl-8 w-full overflow-hidden px-4 sm:px-0">
              <div className="max-w-full mx-auto">
                <InteractiveCRMMockup />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Before/After Comparison */}
      <section className="py-20 relative">
        <Container>
          <SectionHeading
            overline="THE DIFFERENCE"
            title="Without vs. With Our System"
            highlightWord="System"
          />

          <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
            {/* Without */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                  <X className="w-4 h-4 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Without a System</h3>
              </div>
              <ul className="space-y-3">
                {comparisonData.without.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground-secondary">
                    <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* With */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
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
                  className="rounded-2xl"
                />
              </div>
              <div className="relative rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-[#7b63ff]/5 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">With Our System</h3>
                </div>
                <ul className="space-y-3">
                  {comparisonData.with.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground-secondary">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,99,255,0.05),transparent_60%)] pointer-events-none" />
        
        <Container>
          <SectionHeading
            overline="FEATURES"
            title="Everything You Need to Grow"
            highlightWord="Grow"
            subtitle="Stop juggling multiple tools. Get one system that handles lead capture, follow-up, reviews, and client management."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
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
                <div className="relative rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] p-6 h-full transition-all duration-300 hover:border-white/20">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-[#7b63ff]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 relative">
        <Container>
          <SectionHeading
            overline="PRICING"
            title="Simple, Transparent Pricing"
            highlightWord="Pricing"
            subtitle="No hidden fees. No surprises. Cancel anytime."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12 items-stretch">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${tier.popular ? 'lg:-mt-6 lg:mb-6 z-10' : ''}`}
              >
                {/* Glowing effect for popular tier */}
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
                
                <div className={`relative h-full rounded-2xl border ${tier.popular ? 'border-primary/50' : 'border-white/10'} bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] overflow-hidden transition-all duration-300 hover:border-white/20`}>
                  {/* Popular badge */}
                  {tier.popular && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-[#ff7a59] to-[#7b63ff]" />
                  )}
                  
                  <div className="p-6 sm:p-8 flex flex-col h-full">
                    {/* Header */}
                    <div className="mb-6">
                      {tier.popular && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-primary via-[#ff7a59] to-[#7b63ff] mb-3">
                          <Sparkles className="w-3 h-3" />
                          Most Popular
                        </span>
                      )}
                      <h3 className="text-2xl font-bold text-foreground">{tier.name}</h3>
                      <p className="text-sm text-foreground-secondary mt-1">{tier.tagline}</p>
                    </div>
                    
                    {/* Price */}
                    <div className="mb-6 pb-6 border-b border-white/10">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-foreground">{tier.monthlyPrice}</span>
                        <span className="text-foreground-secondary">/month</span>
                      </div>
                      <p className="text-sm text-foreground-secondary mt-1">
                        {tier.setupPrice} one-time setup
                      </p>
                    </div>
                    
                    {/* Included */}
                    <div className="mb-6 flex-1">
                      <p className="text-sm font-semibold text-foreground mb-3">What&apos;s included:</p>
                      <ul className="space-y-2.5">
                        {tier.included.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-foreground-secondary">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Not Included */}
                    {tier.notIncluded.length > 0 && (
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-foreground mb-3">Not included:</p>
                        <ul className="space-y-2.5">
                          {tier.notIncluded.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-foreground-secondary/60">
                              <X className="w-4 h-4 text-foreground-secondary/40 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* CTA */}
                    <Link
                      href="/schedule-a-call"
                      className={`w-full inline-flex items-center justify-center gap-2 h-11 px-5 font-semibold rounded-xl transition-all duration-200 mt-auto active:scale-[0.98] ${
                        tier.popular 
                          ? 'bg-primary text-white hover:brightness-110 shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(255,106,85,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]'
                          : 'bg-white/[0.03] border border-white/[0.08] text-foreground hover:bg-white/[0.06] hover:border-white/[0.15]'
                      }`}
                    >
                      {tier.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-6 text-sm text-foreground-secondary">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Cancel anytime
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                No long-term contracts
              </span>
              <span className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-primary" />
                Full ownership of your assets
              </span>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,106,85,0.05),transparent_60%)] pointer-events-none" />
        
        <Container>
          <SectionHeading
            overline="HOW IT WORKS"
            title="Live in Days, Not Months"
            highlightWord="Days"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
            {[
              {
                num: "01",
                title: "Quick Onboarding",
                text: "15-minute call to gather your business details, branding, and preferences.",
                icon: Calendar,
              },
              {
                num: "02",
                title: "We Build Everything",
                text: "Your website and automation system are built and tested. Ready in 3-7 days.",
                icon: Zap,
              },
              {
                num: "03",
                title: "Go Live & Grow",
                text: "Launch your system and start capturing leads. We monitor and support you ongoing.",
                icon: BarChart3,
              },
            ].map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative group"
              >
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-2xl">
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
                <div className="relative rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,106,85,0.08),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(123,99,255,0.08),transparent_40%),linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] p-6 h-full transition-all duration-300 hover:border-white/20 text-center">
                  {/* Step number badge */}
                  <span className="inline-flex items-center justify-center text-3xl font-bold bg-gradient-to-br from-primary/40 to-[#7b63ff]/40 bg-clip-text text-transparent mb-4 group-hover:from-primary group-hover:to-[#7b63ff] transition-all duration-300">
                    {step.num}
                  </span>
                  
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-[#7b63ff]/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">{step.text}</p>
                </div>
                
                {/* Connector */}
                {index < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 items-center justify-center">
                    <ChevronRight className="w-5 h-5 text-primary/40" />
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
          />

          <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
            {faqData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                    className="rounded-2xl"
                  />
                </div>
                <div className="relative rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] p-6 h-full">
                  <h3 className="text-base font-bold text-foreground mb-2">{item.q}</h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">{item.a}</p>
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
                Ready to Grow Your{" "}
                <span className="bg-gradient-to-r from-primary to-[#7b63ff] bg-clip-text text-transparent">
                  Cleaning Business?
                </span>
              </h2>
              <p className="text-foreground-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
                Book a free 15-minute call. We&apos;ll learn about your business, answer your questions, and show you exactly how the system works.
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
                No commitment required • See if it&apos;s the right fit
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Custom note */}
      <section className="pb-20">
        <Container>
          <div className="text-center">
            <p className="text-sm text-foreground-secondary">
              Need something custom?{" "}
              <Link href="/contact-us" className="text-primary hover:text-primary/80 transition-colors underline">
                Contact us
              </Link>{" "}
              and we&apos;ll tailor a package around your goals.
            </p>
          </div>
        </Container>
      </section>

      <Footer {...footerData} />
    </>
  )
}
