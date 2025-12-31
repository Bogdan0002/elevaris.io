"use client"

import { motion } from "framer-motion"
import Link from "next/link"
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
  ArrowUpRight
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
function AdsDashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: 10 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative mx-auto w-full max-w-[500px]"
      style={{ perspective: 1000 }}
    >
      {/* Browser frame */}
      <div className="relative rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-900 p-1 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_60px_rgba(255,106,85,0.1)]">
        {/* Browser header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/80 rounded-t-xl border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-zinc-800 rounded-lg px-3 py-1.5 text-[10px] text-white/40 text-center">
              ads.elevaris.app/dashboard
            </div>
          </div>
        </div>
        
        {/* Dashboard content */}
        <div className="bg-[#0f0b0e] rounded-b-xl p-4 min-h-[320px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] text-white/50">Campaign Performance</p>
              <p className="text-sm font-semibold text-white">This Month</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-green-400 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                +24%
              </span>
            </div>
          </div>
          
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <motion.div 
              className="rounded-xl bg-white/5 p-3 border border-white/10"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              <div className="flex items-center gap-1 mb-1">
                <Eye className="w-3 h-3 text-primary/60" />
                <p className="text-[9px] text-white/50">Impressions</p>
              </div>
              <p className="text-lg font-bold text-white">124K</p>
            </motion.div>
            <motion.div 
              className="rounded-xl bg-primary/10 p-3 border border-primary/20"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, delay: 0.5 }}
            >
              <div className="flex items-center gap-1 mb-1">
                <MousePointer2 className="w-3 h-3 text-primary/60" />
                <p className="text-[9px] text-white/50">Clicks</p>
              </div>
              <p className="text-lg font-bold text-primary">3,847</p>
            </motion.div>
            <motion.div 
              className="rounded-xl bg-white/5 p-3 border border-white/10"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, delay: 1 }}
            >
              <div className="flex items-center gap-1 mb-1">
                <ShoppingCart className="w-3 h-3 text-green-400/60" />
                <p className="text-[9px] text-white/50">Conversions</p>
              </div>
              <p className="text-lg font-bold text-green-400">287</p>
            </motion.div>
          </div>
          
          {/* Chart area */}
          <div className="rounded-xl bg-white/5 border border-white/10 p-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] text-white/50">Revenue Generated</p>
              <p className="text-sm font-bold text-white">$18,420</p>
            </div>
            {/* Fake chart bars */}
            <div className="flex items-end gap-1 h-16">
              {[40, 65, 45, 80, 60, 90, 75, 95, 70, 85, 100, 88].map((height, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-primary to-[#7b63ff] rounded-t"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.05 }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[8px] text-white/30">Jan</span>
              <span className="text-[8px] text-white/30">Dec</span>
            </div>
          </div>
          
          {/* Active campaigns */}
          <div className="space-y-2">
            <p className="text-[10px] text-white/50">Active Campaigns</p>
            
            <motion.div 
              className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-2.5"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-white truncate">Meta - Lead Gen</p>
                <p className="text-[9px] text-white/50">$2.40 per lead</p>
              </div>
              <span className="text-[9px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">Active</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-2.5"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                <Target className="w-4 h-4 text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-white truncate">Google - Search</p>
                <p className="text-[9px] text-white/50">4.2x ROAS</p>
              </div>
              <span className="text-[9px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">Active</span>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Floating ROAS card */}
      <motion.div
        className="absolute -top-4 -right-4 sm:-right-8 bg-gradient-to-br from-[#181116] to-[#0f0b0e] rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-primary/30"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-[#7b63ff]/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-[10px] text-white/50">Return on Ad Spend</p>
            <p className="text-lg font-bold text-primary">3.2x</p>
          </div>
        </div>
      </motion.div>
      
      {/* Floating conversion notification */}
      <motion.div
        className="absolute -bottom-2 -left-4 sm:-left-8 bg-white rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-gray-100"
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </div>
          <div>
            <p className="text-[10px] font-medium text-gray-900">New Conversion!</p>
            <p className="text-[9px] text-gray-500">$147 sale from Meta</p>
          </div>
        </div>
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
                Stop wasting ad spend on campaigns that don't convert. We build data-driven advertising systems that turn clicks into customers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/schedule-a-call"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,106,85,0.3)] hover:shadow-[0_0_30px_rgba(255,106,85,0.5)]"
                >
                  Get a Free Strategy Call
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#channels"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-foreground font-semibold rounded-xl transition-all duration-300"
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

            {/* Right - Dashboard mockup */}
            <div className="relative lg:pl-8">
              <AdsDashboardMockup />
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
            subtitle="We don't just run ads — we build complete acquisition systems across the platforms that matter most."
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
                Book a free strategy call. We'll analyze your business, discuss your goals, and show you exactly how paid advertising can fuel your growth.
              </p>
              <Link
                href="/schedule-a-call"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,106,85,0.3)] hover:shadow-[0_0_30px_rgba(255,106,85,0.5)]"
              >
                Schedule Your Free Call
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
