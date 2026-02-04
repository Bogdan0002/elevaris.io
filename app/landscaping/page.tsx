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
  Calendar,
  ChevronRight,
  Play,
  MousePointer2,
  RefreshCw,
  Send,
  Inbox,
  UserPlus,
  Trees,
  Scissors,
  Sprout,
  Droplets,
  Leaf,
  FlowerIcon
} from "lucide-react"

const tiers = [
  {
    name: "Launch",
    tagline: "Professional online presence for your landscaping business.",
    setupPrice: "$249",
    monthlyPrice: "$99",
    popular: false,
    included: [
      "Custom landscaping website design",
      "Service-focused landing pages (mowing, trimming, design)",
      "Quote request & contact forms",
      "Lead management CRM system",
      "Email notifications for new inquiries",
      "Service area map integration",
      "SSL certificate & hosting included",
      "Mobile-responsive design",
      "Basic local SEO optimization",
    ],
    notIncluded: [
      "Automated SMS follow-up",
      "Missed-call text-back system",
      "Review automation workflows",
      "Lead pipeline visualization",
    ],
    cta: "Launch My Website",
  },
  {
    name: "Growth",
    tagline: "Convert more lawn care leads into recurring customers automatically.",
    setupPrice: "$549",
    monthlyPrice: "$149",
    popular: true,
    included: [
      "Everything in Launch",
      "Automated lead follow-up (SMS + email)",
      "Missed-call instant text-back",
      "Visual lead pipeline (Quote → Scheduled → Recurring)",
      "Post-service Google review automation",
      "Unified inbox (SMS, email, web leads)",
      "Mobile app for on-the-go management",
      "Client tagging & seasonal segmentation",
      "Unlimited website content updates",
      "24/7 system monitoring",
      "Live chat widget for instant inquiries",
      "Seasonal service reminder automation",
    ],
    notIncluded: [
      "Custom estimate calculator",
      "Dormant client reactivation campaigns",
    ],
    cta: "Choose Growth",
  },
  {
    name: "Accelerator",
    tagline: "Scale your landscaping business with advanced automation.",
    setupPrice: "$999",
    monthlyPrice: "$299",
    popular: false,
    included: [
      "Everything in Growth",
      "Automated lawn care estimate calculator",
      "Smart follow-up sequences by service type",
      "Dormant client win-back campaigns",
      "Seasonal service upsell automation",
      "Priority 24/7 support",
      "Monthly performance & ROI reports",
      "Online booking & scheduling portal",
      "Advanced review filtering & responses",
      "Multi-property client management",
    ],
    notIncluded: [],
    cta: "Choose Accelerator",
  },
]

const features = [
  {
    icon: MessageSquare,
    title: "Never Miss a Lawn Care Lead",
    description: "Instant automated responses to every lawn maintenance inquiry, even when you're mowing or trimming.",
  },
  {
    icon: Star,
    title: "Build Your Reputation Fast",
    description: "Automated Google review requests sent after every lawn service to grow your 5-star ratings.",
  },
  {
    icon: Users,
    title: "Manage Recurring Customers",
    description: "Track all lawn care clients, service history, and seasonal schedules in one organized CRM.",
  },
  {
    icon: Zap,
    title: "Automated Lead Nurturing",
    description: "SMS and email sequences that convert lawn care estimates into signed contracts.",
  },
  {
    icon: Clock,
    title: "Reclaim 10+ Hours Weekly",
    description: "Stop manually following up on mowing quotes. Let automation handle the admin work.",
  },
  {
    icon: BarChart3,
    title: "Track Your Growth",
    description: "See which services (mowing, landscaping, hardscaping) bring the most revenue.",
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
    "Missed calls during lawn jobs",
    "Quotes forgotten by homeowners",
    "Manually begging for reviews",
    "Texts, calls, emails scattered",
    "No idea which leads became clients",
    "Evenings wasted on paperwork",
  ],
  with: [
    "Instant text reply to every call",
    "Automated quote follow-up sequences",
    "Reviews requested after every job",
    "All conversations in one place",
    "Full visibility into your pipeline",
    "System works while you landscape",
  ],
}

const faqData = [
  {
    q: "How quickly can my landscaping website go live?",
    a: "Most lawn care and landscaping websites launch within 3-7 business days. We handle the entire build — you provide your services, service areas, and branding.",
  },
  {
    q: "Do I need technical skills to manage this system?",
    a: "Not at all. Everything is built for you and managed from your phone. We provide training and ongoing support for your landscaping business.",
  },
  {
    q: "Can I upgrade my plan as my landscaping business grows?",
    a: "Absolutely. Upgrade or downgrade anytime with no penalties. Perfect for seasonal landscaping businesses.",
  },
  {
    q: "What if I already have a landscaping website?",
    a: "We can integrate our CRM and automation with your existing site, or build a new modern lawn care website. We'll recommend the best option during your consultation.",
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

// New Landscaping-Specific Hero Graphic
function LandscapingHeroGraphic() {
  return (
    <div className="relative w-full max-w-[500px] mx-auto">
      {/* Main lawn/landscape illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-lime-500/20 blur-3xl" />
        
        {/* Lawn/landscape container */}
        <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl p-8 border border-white/10 shadow-2xl">
          {/* Sky/header area */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-blue-500/10 to-transparent rounded-t-3xl" />
          
          {/* Service icons grid */}
          <div className="relative grid grid-cols-3 gap-4 mb-6">
            {[
              { icon: Trees, label: "Tree Care", color: "from-green-600 to-green-500" },
              { icon: Scissors, label: "Trimming", color: "from-emerald-600 to-emerald-500" },
              { icon: Sprout, label: "Planting", color: "from-lime-600 to-lime-500" },
              { icon: Droplets, label: "Irrigation", color: "from-blue-600 to-blue-500" },
              { icon: Leaf, label: "Maintenance", color: "from-green-600 to-green-500" },
              { icon: FlowerIcon, label: "Design", color: "from-pink-600 to-pink-500" },
            ].map((service, idx) => (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="group cursor-pointer"
              >
                <div className={`relative rounded-2xl bg-gradient-to-br ${service.color} p-4 shadow-lg border border-white/20 transition-all duration-300 group-hover:shadow-2xl`}>
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-2xl transition-all duration-300" />
                  
                  <service.icon className="w-8 h-8 text-white mx-auto mb-2 relative z-10" />
                  <p className="text-[10px] text-white/90 text-center font-medium relative z-10">{service.label}</p>
                  
                  {/* Pulse animation */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-white/20"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: 1.1, opacity: [0, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm"
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <motion.div
                  className="text-2xl font-bold text-green-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  <AnimatedNumber value={287} suffix="+" />
                </motion.div>
                <p className="text-[10px] text-white/60 mt-1">Active Lawns</p>
              </div>
              <div>
                <motion.div
                  className="text-2xl font-bold text-emerald-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.4 }}
                >
                  <AnimatedNumber value={98} suffix="%" />
                </motion.div>
                <p className="text-[10px] text-white/60 mt-1">Retention</p>
              </div>
              <div>
                <motion.div
                  className="text-2xl font-bold text-lime-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.6 }}
                >
                  4.9★
                </motion.div>
                <p className="text-[10px] text-white/60 mt-1">Rating</p>
              </div>
            </div>
          </motion.div>
          
          {/* Grass/ground element */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-green-600/30 to-transparent rounded-b-3xl" />
        </div>
      </motion.div>
      
      {/* Floating notification - New Lawn Care Lead */}
      <motion.div
        className="absolute -top-4 -right-4 bg-white rounded-2xl p-3 shadow-2xl border border-gray-100"
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.8 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <Trees className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">New Lead!</p>
            <p className="text-[10px] text-gray-600">Weekly mowing</p>
          </div>
        </div>
      </motion.div>
      
      {/* Floating badge - Automated */}
      <motion.div
        className="absolute -bottom-4 -left-4 bg-gradient-to-br from-emerald-600 to-green-600 rounded-2xl p-3 shadow-2xl"
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-white" />
          <div>
            <p className="text-xs font-bold text-white">Automated</p>
            <p className="text-[10px] text-white/80">24/7 Active</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Animated number component
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let current = 0
    const increment = value / 30
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 30)
    
    return () => clearInterval(timer)
  }, [value])
  
  return <span>{count}{suffix}</span>
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
      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-sm text-foreground-secondary mt-1">{label}</div>
    </motion.div>
  )
}

export default function LandscapingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,197,94,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none" />
        
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
                <Sparkles className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-foreground-secondary">For Landscaping & Lawn Care Businesses</span>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Grow Your Lawn Care Business{" "}
                <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 bg-clip-text text-transparent">
                  On Autopilot
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-foreground-secondary mb-8 leading-relaxed">
                Complete landscaping business growth system: capture lawn mowing leads, automate follow-ups, collect 5-star reviews, and manage recurring customers — so you can focus on trimming hedges and designing beautiful yards, not chasing quotes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 mb-8 justify-center lg:justify-start">
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl transition-all duration-200 hover:brightness-110 shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(34,197,94,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] active:scale-[0.98]"
                >
                  View Lawn Care Pricing
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

            {/* Right - New Landscaping Graphic */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full"
            >
              <LandscapingHeroGraphic />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Before/After Comparison */}
      <section className="py-20 relative">
        <Container>
          <SectionHeading
            overline="THE DIFFERENCE"
            title="Running a Landscaping Business Without vs. With Automation"
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
              <div className="relative rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">With Our System</h3>
                </div>
                <ul className="space-y-3">
                  {comparisonData.with.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground-secondary">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.05),transparent_60%)] pointer-events-none" />
        
        <Container>
          <SectionHeading
            overline="LANDSCAPING FEATURES"
            title="Everything Your Lawn Care Business Needs"
            highlightWord="Needs"
            subtitle="Stop juggling spreadsheets and missed calls. One system for lawn mowing quotes, hedge trimming estimates, landscape design leads, and recurring maintenance contracts."
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
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-green-500" />
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
            overline="LANDSCAPING PRICING"
            title="Transparent Pricing for Lawn Care Pros"
            highlightWord="Pricing"
            subtitle="No hidden fees. No surprises. Perfect for lawn mowing services, landscape design firms, and full-service landscaping companies."
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
                
                <div className={`relative h-full rounded-2xl border ${tier.popular ? 'border-green-500/50' : 'border-white/10'} bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] overflow-hidden transition-all duration-300 hover:border-white/20`}>
                  {/* Popular badge */}
                  {tier.popular && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500" />
                  )}
                  
                  <div className="p-6 sm:p-8 flex flex-col h-full">
                    {/* Header */}
                    <div className="mb-6">
                      {tier.popular && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 mb-3">
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
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
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
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:brightness-110 shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(34,197,94,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]'
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
                <Shield className="w-4 h-4 text-green-500" />
                Cancel anytime
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                No long-term contracts
              </span>
              <span className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-green-500" />
                Own your website & data
              </span>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.05),transparent_60%)] pointer-events-none" />
        
        <Container>
          <SectionHeading
            overline="HOW IT WORKS"
            title="Launch Your Landscaping System in Days"
            highlightWord="Days"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
            {[
              {
                num: "01",
                title: "Quick Onboarding Call",
                text: "15-minute consultation to discuss your landscaping services, lawn care pricing, service areas, and branding.",
                icon: Calendar,
              },
              {
                num: "02",
                title: "We Build Your System",
                text: "Custom website, CRM, and automation workflows built specifically for your landscaping business. Ready in 3-7 days.",
                icon: Zap,
              },
              {
                num: "03",
                title: "Start Capturing Lawn Leads",
                text: "Go live and start converting mowing quotes into contracts. We monitor performance and provide ongoing support.",
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
                <div className="relative rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.08),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.08),transparent_40%),linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] p-6 h-full transition-all duration-300 hover:border-white/20 text-center">
                  {/* Step number badge */}
                  <span className="inline-flex items-center justify-center text-3xl font-bold bg-gradient-to-br from-green-500/40 to-emerald-500/40 bg-clip-text text-transparent mb-4 group-hover:from-green-500 group-hover:to-emerald-500 transition-all duration-300">
                    {step.num}
                  </span>
                  
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-green-500/20">
                    <step.icon className="w-7 h-7 text-green-500" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">{step.text}</p>
                </div>
                
                {/* Connector */}
                {index < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 items-center justify-center">
                    <ChevronRight className="w-5 h-5 text-green-500/40" />
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
            overline="LANDSCAPING FAQ"
            title="Common Questions from Lawn Care Professionals"
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08),transparent_50%)] pointer-events-none" />
        
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
            
            <div className="relative rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.12),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.12),transparent_40%),linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Ready to Grow Your{" "}
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  Landscaping Business?
                </span>
              </h2>
              <p className="text-foreground-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
                Book a free 15-minute consultation. We&apos;ll discuss your lawn care services, mowing routes, seasonal needs, and show you how to automate your landscaping business growth.
              </p>
              <Link
                href="/schedule-a-call"
                className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl transition-all duration-200 hover:brightness-110 shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(34,197,94,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] active:scale-[0.98]"
              >
                <span className="hidden sm:inline">Schedule Your Free Landscaping Consultation</span>
                <span className="inline sm:hidden">Schedule Call</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-xs text-foreground-secondary mt-4">
                No commitment required • Perfect for lawn mowing, landscape design, and full-service companies
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
              Need a custom solution for your landscaping or lawn care business?{" "}
              <Link href="/contact-us" className="text-green-500 hover:text-green-400 transition-colors underline">
                Contact us
              </Link>{" "}
              and we&apos;ll create a tailored package for your lawn maintenance services.
            </p>
          </div>
        </Container>
      </section>

      <Footer {...footerData} />
    </>
  )
}
