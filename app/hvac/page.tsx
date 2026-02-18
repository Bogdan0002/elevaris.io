"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { useState, useRef, useCallback, useEffect } from "react"
import { Container } from "@/components/site/Container"
import { SectionHeading } from "@/components/site/SectionHeading"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Footer } from "@/components/site/Footer"
import { PricingTiers } from "@/components/site/PricingTiers"
import { getBasePricingTiers } from "@/lib/constants/pricing"
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
  Calendar,
  ChevronRight,
  Play,
  MousePointer2,
  RefreshCw,
  Send,
  Inbox,
  UserPlus
} from "lucide-react"

// Get pricing tiers with HVAC specific customization
const getTiers = () => getBasePricingTiers({
  industryName: "HVAC business",
  launchServices: [
    "Custom HVAC website design",
    "Service-focused landing pages (AC repair, heating, installation)",
    "Service request & contact forms",
    "Lead management CRM system",
    "Email notifications for new service calls",
    "Service area map integration",
    "SSL certificate & hosting included",
    "Mobile-responsive design",
    "Basic local SEO optimization",
  ],
  growthServices: [
    "Everything in Launch",
    "Automated lead follow-up (SMS + email)",
    "Missed-call instant text-back",
    "Visual lead pipeline (Quote → Scheduled → Completed)",
    "Post-service Google review automation",
    "Unified inbox (SMS, email, web leads)",
    "Mobile app for technician management",
    "Client tagging & service history",
    "Unlimited website content updates",
    "24/7 system monitoring",
    "Live chat widget for emergency calls",
    "Maintenance reminder automation",
  ],
  acceleratorServices: [
    "Everything in Growth",
    "Automated HVAC service pricing calculator",
    "Smart follow-up sequences by service type",
    "Seasonal maintenance campaign automation",
    "Filter replacement & tune-up reminders",
    "Priority 24/7 support",
    "Monthly performance & ROI reports",
    "Online booking & scheduling portal",
    "Advanced review filtering & responses",
    "Multi-location service management",
  ],
})

const features = [
  {
    icon: MessageSquare,
    title: "Never Miss an HVAC Call",
    description: "Instant automated responses to every AC repair and heating service inquiry, even during emergency calls.",
  },
  {
    icon: Star,
    title: "Build Your HVAC Reputation",
    description: "Automated Google review requests sent after every service call to grow your 5-star ratings.",
  },
  {
    icon: Users,
    title: "Manage All Your Clients",
    description: "Track all HVAC clients, service history, equipment details, and maintenance schedules in one CRM.",
  },
  {
    icon: Zap,
    title: "Automated Lead Nurturing",
    description: "SMS and email sequences that convert HVAC estimates into signed service agreements.",
  },
  {
    icon: Clock,
    title: "Reclaim 10+ Hours Weekly",
    description: "Stop manually following up on service quotes. Let automation handle the admin work.",
  },
  {
    icon: BarChart3,
    title: "Track Your Growth",
    description: "See which services (AC repair, heating, installation) bring the most revenue.",
  },
]

const stats = [
  { value: "3-7", label: "Days to Launch" },
  { value: "10+", label: "Hours Saved Weekly" },
  { value: "3x", label: "More Reviews" },
  { value: "24/7", label: "Lead Capture" },
]

const comparisonData = {
  without: [
    "Missed emergency service calls",
    "Estimates forgotten by homeowners",
    "Manually begging for reviews",
    "Texts, calls, emails scattered",
    "No idea which leads became clients",
    "Evenings wasted on paperwork",
  ],
  with: [
    "Instant text reply to every call",
    "Automated estimate follow-up sequences",
    "Reviews requested after every project",
    "All conversations in one place",
    "Full visibility into your pipeline",
    "System works while you build",
  ],
}

const faqData = [
  {
    q: "How quickly can my HVAC website go live?",
    a: "Most HVAC and air conditioning websites launch within 3-7 business days. We handle the entire build — you provide your services, service areas, and branding.",
  },
  {
    q: "Do I need technical skills to manage this system?",
    a: "Not at all. Everything is built for you and managed from your phone. We provide training and ongoing support for your HVAC business.",
  },
  {
    q: "Can I upgrade my plan as my HVAC business grows?",
    a: "Absolutely. Upgrade or downgrade anytime with no penalties. Perfect for seasonal HVAC businesses.",
  },
  {
    q: "What if I already have an HVAC website?",
    a: "We can integrate our CRM and automation with your existing site, or build a new modern HVAC website. We'll recommend the best option during your consultation.",
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

// Interactive CRM Mockup Component with 3D Mouse Tracking - HVAC Version
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
      setNewLeads(Math.min(currentLeads, 24))
      if (currentLeads >= 24) clearInterval(leadsInterval)
    }, 100)
    
    let currentConv = 0
    const convInterval = setInterval(() => {
      currentConv += 1
      setConversions(Math.min(currentConv, 18))
      if (currentConv >= 18) clearInterval(convInterval)
    }, 150)
    
    let currentRev = 0
    const revInterval = setInterval(() => {
      currentRev += 520
      setRevenue(Math.min(currentRev, 12480))
      if (currentRev >= 12480) clearInterval(revInterval)
    }, 80)
    
    let currentReviews = 0
    const reviewsInterval = setInterval(() => {
      currentReviews += 1
      setReviews(Math.min(currentReviews, 86))
      if (currentReviews >= 86) clearInterval(reviewsInterval)
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
      className="relative mx-auto w-full max-w-[400px] sm:max-w-[480px] lg:max-w-[520px] cursor-pointer"
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
            background: `radial-gradient(600px circle at ${glowX}% ${glowY}%, rgba(6,182,212,0.15), rgba(14,165,233,0.1), transparent 40%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Browser frame */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-900 p-1 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_60px_rgba(6,182,212,0.15)] transition-shadow duration-300 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6),0_0_80px_rgba(6,182,212,0.2)]">
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
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
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
                className="w-2 h-2 rounded-full bg-cyan-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[10px] text-cyan-400">Live</span>
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
                      <p className="text-[10px] text-white/50">HVAC CRM</p>
                      <p className="text-sm font-semibold text-white">Service Pipeline</p>
                    </div>
                    <motion.button
                      onClick={handleSendFollowUp}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-1.5 transition-all ${
                        isSending
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30'
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
                      animate={{ scale: newLeads === 22 ? [1, 1.02, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-[8px] text-white/50 mb-1">New Leads</p>
                      <p className="text-lg font-bold text-cyan-400">{newLeads}</p>
                    </motion.div>
                    <div className="rounded-xl bg-white/5 p-2.5 border border-white/10">
                      <p className="text-[8px] text-white/50 mb-1">Converted</p>
                      <p className="text-lg font-bold text-sky-400">{conversions}</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-2.5 border border-white/10">
                      <p className="text-[8px] text-white/50 mb-1">Revenue</p>
                      <p className="text-lg font-bold text-white">${revenue.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Lead cards */}
                  {[
                    { name: 'John D.', service: 'AC Repair', status: 'hot', time: 'Just now' },
                    { name: 'Sarah W.', service: 'Heating Installation', status: 'warm', time: '10 min ago' },
                    { name: 'Mike P.', service: 'Maintenance Plan', status: 'new', time: '22 min ago' },
                  ].map((lead, idx) => (
                    <motion.div
                      key={idx}
                      className={`rounded-xl p-3 border cursor-pointer transition-all ${
                        lead.status === 'hot'
                          ? 'bg-cyan-500/10 border-cyan-500/30 hover:border-cyan-500/50'
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
                          lead.status === 'hot' ? 'bg-cyan-500/20 text-cyan-400' :
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
                            lead.status === 'hot' ? 'bg-cyan-500/20 text-cyan-400' :
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
                      <span className="text-[9px] text-white/40">6 unread</span>
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-orange-400">6</span>
                      </div>
                    </div>
                  </div>

                  {/* Message cards */}
                  {[
                    { name: 'John D.', msg: 'AC not cooling, need urgent help...', channel: 'SMS', unread: true, time: '5m' },
                    { name: 'Sarah W.', msg: 'Quote for heating installation?', channel: 'Email', unread: true, time: '12m' },
                    { name: 'Mike P.', msg: 'Want to sign up for maintenance', channel: 'Web', unread: true, time: '48m' },
                    { name: 'Kelly R.', msg: 'Heating repair was perfect, thanks!', channel: 'SMS', unread: false, time: '3h' },
                  ].map((msg, idx) => (
                    <motion.div
                      key={idx}
                      className={`rounded-xl p-3 border cursor-pointer transition-all ${
                        msg.unread
                          ? 'bg-cyan-500/5 border-cyan-500/20 hover:border-cyan-500/40'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/30 to-sky-500/30 flex items-center justify-center text-[10px] font-bold text-white">
                          {msg.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-[11px] font-medium text-white">{msg.name}</p>
                            <span className={`text-[8px] px-1.5 py-0.5 rounded ${
                              msg.channel === 'SMS' ? 'bg-cyan-500/20 text-cyan-400' :
                              msg.channel === 'Email' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-purple-500/20 text-purple-400'
                            }`}>{msg.channel}</span>
                          </div>
                          <p className="text-[9px] text-white/50 truncate">{msg.msg}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[8px] text-white/40">{msg.time}</span>
                          {msg.unread && (
                            <div className="w-2 h-2 rounded-full bg-cyan-500" />
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
                      <p className="text-lg font-bold text-cyan-400">+16</p>
                    </div>
                  </div>

                  {/* Review cards */}
                  {[
                    { name: 'Tom B.', rating: 5, text: 'Fast AC repair! Arrived same day.', time: '3 days ago' },
                    { name: 'Lisa M.', rating: 5, text: 'Professional heating installation.', time: '1 week ago' },
                    { name: 'Kevin S.', rating: 5, text: 'Great service! Highly recommend!', time: '2 weeks ago' },
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
        className="absolute -top-8 right-0 sm:-top-10 sm:-right-6 bg-white rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-gray-100 cursor-pointer z-10"
        style={{ x: floatX, y: floatY, transformStyle: 'preserve-3d', transform: 'translateZ(40px)' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <UserPlus className="w-4 h-4 text-cyan-500" />
          </motion.div>
          <div>
            <p className="text-[10px] font-medium text-gray-900">New Lead!</p>
            <p className="text-[9px] text-gray-500">Auto-reply sent ✓</p>
          </div>
        </div>
      </motion.div>
      
      {/* Floating review card */}
      <motion.div
        className="absolute bottom-2 left-0 sm:-bottom-2 sm:-left-2 bg-gradient-to-br from-[#181116] to-[#0f0b0e] rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-yellow-500/20 cursor-pointer z-10"
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
        <p className="text-[9px] text-white/80 max-w-[120px]">&ldquo;Best HVAC service!&rdquo;</p>
        <p className="text-[8px] text-white/50 mt-1">— CoolAir Co.</p>
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
      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-sm text-foreground-secondary mt-1">{label}</div>
    </motion.div>
  )
}

export default function HVACPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(6,182,212,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(14,165,233,0.08),transparent_50%)] pointer-events-none" />
        
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center justify-items-center lg:justify-items-start">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
              >
                <Sparkles className="w-4 h-4 text-cyan-500" />
                <span className="text-sm font-medium text-foreground-secondary">For HVAC & Air Conditioning Businesses</span>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Grow Your HVAC Business{" "}
                <span className="bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 bg-clip-text text-transparent">
                  On Autopilot
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-foreground-secondary mb-8 leading-relaxed">
                Complete HVAC business growth system: capture AC repair leads, automate service follow-ups, collect 5-star reviews, and manage all your clients — so you can focus on installing and repairing heating and cooling systems, not chasing service calls.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 mb-8 justify-center lg:justify-start">
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-semibold rounded-xl transition-all duration-200 hover:brightness-110 shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(6,182,212,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] active:scale-[0.98]"
                >
                  View HVAC Pricing
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10">
                {stats.map((stat, index) => (
                  <AnimatedCounter key={index} value={stat.value} label={stat.label} />
                ))}
              </div>
            </motion.div>

            {/* Right - Interactive CRM mockup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full"
            >
              <InteractiveCRMMockup />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Before/After Comparison */}
      <section className="py-20 relative">
        <Container>
          <SectionHeading
            overline="THE DIFFERENCE"
            title="Running an HVAC Business Without vs. With Automation"
            highlightWord="Automation"
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
                <h3 className="text-lg font-bold text-foreground">Without Automation</h3>
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
              <div className="relative rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-sky-500/5 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">With Our System</h3>
                </div>
                <ul className="space-y-3">
                  {comparisonData.with.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground-secondary">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.05),transparent_60%)] pointer-events-none" />
        
        <Container>
          <SectionHeading
            overline="HVAC FEATURES"
            title="Everything Your HVAC Business Needs"
            highlightWord="Needs"
            subtitle="Stop juggling spreadsheets and missed calls. One system for AC repair calls, heating installations, maintenance contracts, and client management."
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
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-sky-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-cyan-500" />
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
            overline="HVAC PRICING"
            title="Transparent Pricing for HVAC Companies"
            highlightWord="Pricing"
            subtitle="No hidden fees. No surprises. Perfect for AC repair, heating installation, and HVAC service companies."
          />

          {/* Pricing Tiers - Now linked to Stripe Checkout */}
          <div className="mt-12">
            <PricingTiers tiers={getTiers()} accentColor="cyan" />
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
                <Shield className="w-4 h-4 text-cyan-500" />
                Cancel anytime
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                No long-term contracts
              </span>
              <span className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-cyan-500" />
                Own your website & data
              </span>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.05),transparent_60%)] pointer-events-none" />
        
        <Container>
          <SectionHeading
            overline="HOW IT WORKS"
            title="Launch Your HVAC System in Days"
            highlightWord="Days"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
            {[
              {
                num: "01",
                title: "Quick Onboarding Call",
                text: "15-minute consultation to discuss your HVAC services, service areas, and branding.",
                icon: Calendar,
              },
              {
                num: "02",
                title: "We Build Your System",
                text: "Custom website, CRM, and automation workflows built specifically for your HVAC business. Ready in 3-7 days.",
                icon: Zap,
              },
              {
                num: "03",
                title: "Start Capturing Project Leads",
                text: "Go live and start converting service quotes into contracts. We monitor performance and provide ongoing support.",
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
                <div className="relative rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.08),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.08),transparent_40%),linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] p-6 h-full transition-all duration-300 hover:border-white/20 text-center">
                  {/* Step number badge */}
                  <span className="inline-flex items-center justify-center text-3xl font-bold bg-gradient-to-br from-cyan-500/40 to-sky-500/40 bg-clip-text text-transparent mb-4 group-hover:from-cyan-500 group-hover:to-sky-500 transition-all duration-300">
                    {step.num}
                  </span>
                  
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-sky-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-cyan-500/20">
                    <step.icon className="w-7 h-7 text-cyan-500" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">{step.text}</p>
                </div>
                
                {/* Connector */}
                {index < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 items-center justify-center">
                    <ChevronRight className="w-5 h-5 text-cyan-500/40" />
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
            overline="HVAC FAQ"
            title="Common Questions from HVAC Professionals"
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.08),transparent_50%)] pointer-events-none" />
        
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
            
            <div className="relative rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.12),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(14,165,233,0.12),transparent_40%),linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Ready to Grow Your{" "}
                <span className="bg-gradient-to-r from-cyan-500 to-sky-500 bg-clip-text text-transparent">
                  HVAC Business?
                </span>
              </h2>
              <p className="text-foreground-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
                Book a free 15-minute consultation. We&apos;ll discuss your HVAC services and show you how to automate your business growth.
              </p>
              <Link
                href="/schedule-a-call"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-semibold rounded-xl transition-all duration-200 hover:brightness-110 shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(6,182,212,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] active:scale-[0.98]"
              >
                <span className="hidden sm:inline">Schedule Your Free HVAC Consultation</span>
                <span className="inline sm:hidden">Schedule Call</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-xs text-foreground-secondary mt-4">
                No commitment required • Perfect for HVAC contractors and service companies
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
              Need a custom solution for your HVAC business?{" "}
              <Link href="/contact-us" className="text-cyan-500 hover:text-cyan-400 transition-colors underline">
                Contact us
              </Link>{" "}
              and we&apos;ll create a tailored package for your HVAC services.
            </p>
          </div>
        </Container>
      </section>

      <Footer {...footerData} />
    </>
  )
}
