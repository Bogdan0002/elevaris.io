"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { useState, useRef, useCallback, useEffect } from "react"
import { Container } from "@/components/site/Container"
import { SectionHeading } from "@/components/site/SectionHeading"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Footer } from "@/components/site/Footer"
import { 
  Shield, 
  Zap, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  Activity,
  AlertCircle,
  Server,
  RefreshCw,
  Bell,
  MousePointer2,
  Wrench,
  Bug,
  HelpCircle,
  MessageSquare,
  Database,
  Lock,
  FileCheck,
  Gauge,
  Play
} from "lucide-react"

const supportPackages = [
  {
    title: "Security Monitoring",
    subtitle: "24/7 Protection",
    icon: Shield,
    description: "Round-the-clock security scanning and threat detection to keep your website safe from vulnerabilities, malware, and attacks.",
    bullets: [
      "Real-time threat monitoring",
      "Malware scanning & removal",
      "Firewall configuration",
      "SSL certificate management",
    ],
    gradient: "from-[#ff6a55]/20 to-[#7b63ff]/10",
  },
  {
    title: "Performance Optimization",
    subtitle: "Lightning Fast",
    icon: Gauge,
    description: "Continuous monitoring and optimization to ensure your site loads fast, runs smoothly, and delivers the best user experience.",
    bullets: [
      "Speed optimization & caching",
      "Database query optimization",
      "Image & asset compression",
      "CDN configuration & monitoring",
    ],
    gradient: "from-[#7b63ff]/20 to-[#3d52d5]/10",
  },
  {
    title: "Regular Maintenance",
    subtitle: "Always Updated",
    icon: RefreshCw,
    description: "Keep your software, plugins, and dependencies up-to-date with the latest features, security patches, and compatibility fixes.",
    bullets: [
      "Core & plugin updates",
      "Compatibility testing",
      "Automated daily backups",
      "Priority bug fixes",
    ],
    gradient: "from-[#3d52d5]/20 to-[#ff6a55]/10",
  },
]

const benefits = [
  {
    icon: Clock,
    title: "Fast Response Times",
    text: "Average 2-hour response time for support tickets. Your issues get resolved quickly.",
  },
  {
    icon: Activity,
    title: "99.9% Uptime SLA",
    text: "We guarantee your website stays online with proactive monitoring and instant alerts.",
  },
  {
    icon: FileCheck,
    title: "Detailed Reports",
    text: "Monthly performance and security reports so you always know how your site is doing.",
  },
]

const process = [
  {
    num: "01",
    title: "Initial Audit",
    text: "We conduct a comprehensive security and performance audit of your website.",
  },
  {
    num: "02",
    title: "Setup & Monitoring",
    text: "Install monitoring tools, configure backups, and establish baseline performance metrics.",
  },
  {
    num: "03",
    title: "Proactive Maintenance",
    text: "Regular updates, optimizations, and security patches applied before issues arise.",
  },
  {
    num: "04",
    title: "Ongoing Support",
    text: "Dedicated support team available to handle any issues, questions, or improvements.",
  },
]

const stats = [
  { value: "99.9%", label: "Uptime" },
  { value: "<2hrs", label: "Response" },
  { value: "24/7", label: "Monitoring" },
  { value: "100%", label: "Satisfaction" },
]

// Interactive Support Dashboard Mockup with 3D Mouse Tracking
function InteractiveSupportMockup() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [activeTab, setActiveTab] = useState<'tickets' | 'uptime' | 'security'>('tickets')
  const [ticketStatus, setTicketStatus] = useState<'open' | 'in-progress' | 'resolved'>('open')
  const [uptime, setUptime] = useState(97.0)
  const [responseTime, setResponseTime] = useState(0)
  const [issuesFixed, setIssuesFixed] = useState(0)
  
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

  // Simulate metrics animation
  useEffect(() => {
    let currentUptime = 0
    setUptime(currentUptime)
    const uptimeInterval = setInterval(() => {
      currentUptime += 2.5
      setUptime(Math.min(currentUptime, 99.9))
      if (currentUptime >= 99.9) clearInterval(uptimeInterval)
    }, 20)
    
    let currentResponse = 0
    const responseInterval = setInterval(() => {
      currentResponse += 1
      setResponseTime(Math.min(currentResponse, 2))
      if (currentResponse >= 2) clearInterval(responseInterval)
    }, 100)
    
    let currentIssues = 0
    const issuesInterval = setInterval(() => {
      currentIssues += 1
      setIssuesFixed(Math.min(currentIssues, 47))
      if (currentIssues >= 47) clearInterval(issuesInterval)
    }, 80)
    
    return () => {
      clearInterval(uptimeInterval)
      clearInterval(responseInterval)
      clearInterval(issuesInterval)
    }
  }, [])

  const handleResolveTicket = () => {
    if (ticketStatus === 'open') {
      setTicketStatus('in-progress')
      setTimeout(() => setTicketStatus('resolved'), 1500)
    } else {
      setTicketStatus('open')
    }
  }

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
            
            {/* Tab switcher */}
            <div className="flex-1 flex items-center justify-center gap-1">
              {([
                { key: 'tickets', label: 'Tickets', icon: MessageSquare },
                { key: 'uptime', label: 'Uptime', icon: Activity },
                { key: 'security', label: 'Security', icon: Shield }
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
              <span className="text-[10px] text-green-400">Online</span>
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
              {/* Tickets View */}
              {activeTab === 'tickets' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] text-white/50">Support Tickets</p>
                      <p className="text-sm font-semibold text-white">Recent Activity</p>
                    </div>
                    <motion.button
                      onClick={handleResolveTicket}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-1.5 transition-all ${
                        ticketStatus === 'resolved'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : ticketStatus === 'in-progress'
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : 'bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {ticketStatus === 'resolved' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          Resolved
                        </>
                      ) : ticketStatus === 'in-progress' ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          Working...
                        </>
                      ) : (
                        <>
                          <Wrench className="w-3 h-3" />
                          Resolve
                        </>
                      )}
                    </motion.button>
                  </div>

                  {/* Ticket cards */}
                  {[
                    { icon: Bug, title: 'Fix login bug', priority: 'high', time: '2h ago', status: ticketStatus },
                    { icon: HelpCircle, title: 'Update SSL certificate', priority: 'medium', time: '5h ago', status: 'resolved' },
                    { icon: AlertCircle, title: 'Optimize images', priority: 'low', time: '1d ago', status: 'resolved' },
                  ].map((ticket, idx) => (
                    <motion.div
                      key={idx}
                      className={`rounded-xl p-3 border cursor-pointer transition-all ${
                        ticket.status === 'resolved'
                          ? 'bg-green-500/5 border-green-500/20 opacity-60'
                          : ticket.status === 'in-progress'
                          ? 'bg-yellow-500/10 border-yellow-500/30'
                          : 'bg-white/5 border-white/10 hover:border-primary/30'
                      }`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: ticket.status === 'resolved' ? 0.6 : 1 }}
                      transition={{ delay: idx * 0.1, duration: 0.4 }}
                      whileHover={{ scale: ticket.status !== 'resolved' ? 1.02 : 1 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          ticket.priority === 'high' ? 'bg-red-500/20' :
                          ticket.priority === 'medium' ? 'bg-yellow-500/20' :
                          'bg-blue-500/20'
                        }`}>
                          <ticket.icon className={`w-4 h-4 ${
                            ticket.priority === 'high' ? 'text-red-400' :
                            ticket.priority === 'medium' ? 'text-yellow-400' :
                            'text-blue-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[11px] font-medium text-white mb-1">{ticket.title}</p>
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] px-2 py-0.5 rounded-full ${
                              ticket.priority === 'high' ? 'bg-red-500/10 text-red-400' :
                              ticket.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                              'bg-blue-500/10 text-blue-400'
                            }`}>
                              {ticket.priority}
                            </span>
                            <span className="text-[9px] text-white/40">{ticket.time}</span>
                          </div>
                        </div>
                        {ticket.status === 'resolved' && (
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="rounded-xl bg-white/5 p-2.5 border border-white/10">
                      <p className="text-[8px] text-white/50 mb-1">Avg Response</p>
                      <p className="text-base font-bold text-white">{responseTime}hrs</p>
                    </div>
                    <div className="rounded-xl bg-primary/10 p-2.5 border border-primary/20">
                      <p className="text-[8px] text-white/50 mb-1">Fixed</p>
                      <p className="text-base font-bold text-primary">{issuesFixed}</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-2.5 border border-white/10">
                      <p className="text-[8px] text-white/50 mb-1">Uptime</p>
                      <p className="text-base font-bold text-green-400">{uptime.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Uptime View */}
              {activeTab === 'uptime' && (
                <div>
                  <div className="mb-4">
                    <p className="text-[10px] text-white/50">Server Uptime</p>
                    <p className="text-sm font-semibold text-white">Last 30 Days</p>
                  </div>

                  {/* Uptime percentage */}
                  <div className="rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-white/50">Overall Uptime</span>
                      <Activity className="w-4 h-4 text-green-400" />
                    </div>
                    <motion.p 
                      className="text-2xl font-bold text-green-400"
                      key={uptime.toFixed(1)}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {uptime.toFixed(1)}%
                    </motion.p>
                    <p className="text-[9px] text-white/40 mt-1">99.9% SLA guaranteed</p>
                  </div>

                  {/* Uptime history bars */}
                  <div className="space-y-2">
                    <p className="text-[10px] text-white/50">Daily Status</p>
                    <div className="flex gap-1">
                      {Array.from({ length: 30 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className={`flex-1 rounded-sm ${
                            i === 12 ? 'bg-yellow-500/60' : 
                            i === 7 ? 'bg-red-500/60' :
                            'bg-green-500/60'
                          }`}
                          initial={{ height: 0 }}
                          animate={{ height: '40px' }}
                          transition={{ delay: i * 0.02, duration: 0.3 }}
                          whileHover={{ height: '48px', backgroundColor: i === 12 ? 'rgb(234 179 8)' : i === 7 ? 'rgb(239 68 68)' : 'rgb(34 197 94)' }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-[8px] text-white/30">
                      <span>30 days ago</span>
                      <span>Today</span>
                    </div>
                  </div>

                  {/* Recent events */}
                  <div className="mt-4 space-y-2">
                    <p className="text-[10px] text-white/50">Recent Events</p>
                    {[
                      { type: 'success', message: 'All systems operational', time: 'Now' },
                      { type: 'warning', message: 'Scheduled maintenance', time: '2d ago' },
                      { type: 'error', message: 'Brief downtime (2min)', time: '7d ago' },
                    ].map((event, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-2 text-[10px]"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className={`w-2 h-2 rounded-full ${
                          event.type === 'success' ? 'bg-green-500' :
                          event.type === 'warning' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} />
                        <span className="text-white/70 flex-1">{event.message}</span>
                        <span className="text-white/40">{event.time}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security View */}
              {activeTab === 'security' && (
                <div>
                  <div className="mb-4">
                    <p className="text-[10px] text-white/50">Security Overview</p>
                    <p className="text-sm font-semibold text-white">Protection Status</p>
                  </div>

                  {/* Security score */}
                  <div className="rounded-xl bg-gradient-to-br from-primary/10 to-[#7b63ff]/10 border border-primary/20 p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-white/50">Security Score</span>
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-primary">A+</p>
                    <p className="text-[9px] text-white/40 mt-1">Excellent protection</p>
                  </div>

                  {/* Security features */}
                  <div className="space-y-2">
                    {[
                      { icon: Shield, label: 'SSL Certificate', status: 'active', color: 'green' },
                      { icon: Server, label: 'Firewall Protection', status: 'active', color: 'green' },
                      { icon: RefreshCw, label: 'Daily Backups', status: 'active', color: 'green' },
                      { icon: Bell, label: 'Threat Monitoring', status: 'active', color: 'green' },
                    ].map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-green-500/20 flex items-center justify-center">
                            <feature.icon className="w-3 h-3 text-green-400" />
                          </div>
                          <span className="text-[10px] text-white/80">{feature.label}</span>
                        </div>
                        <span className="text-[9px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                          {feature.status}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Scan results */}
                  <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-white/50">Last Security Scan</span>
                      <span className="text-[9px] text-white/40">2 hours ago</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-[10px] text-green-400">No threats detected</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Floating Uptime badge */}
      <motion.div
        className="absolute -top-8 right-0 sm:-top-12 sm:-right-6 bg-gradient-to-br from-[#181116] to-[#0f0b0e] rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-green-500/30 cursor-pointer z-10"
        style={{ x: floatX, y: floatY, transformStyle: 'preserve-3d', transform: 'translateZ(40px)' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{ scale: 1.1, borderColor: 'rgba(34,197,94,0.5)' }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Activity className="w-5 h-5 text-green-400" />
          </motion.div>
          <div>
            <p className="text-[10px] text-white/50">Uptime</p>
            <motion.p 
              className="text-lg font-bold text-green-400"
              key={uptime.toFixed(1)}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
            >
              {uptime.toFixed(1)}%
            </motion.p>
          </div>
        </div>
      </motion.div>
      
      {/* Floating response time notification */}
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
            className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
            animate={responseTime <= 2 ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <Clock className="w-4 h-4 text-primary" />
          </motion.div>
          <div>
            <p className="text-[10px] font-medium text-gray-900">Avg Response</p>
            <p className="text-[9px] text-gray-500">{responseTime}hrs • Fast support</p>
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
        <span>Move mouse • Switch tabs • Click Resolve</span>
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

export default function OngoingSupportPage() {
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
                <span className="text-sm font-medium text-foreground-secondary">Ongoing Support & Maintenance</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Always{" "}
                <span className="bg-gradient-to-r from-primary via-[#ff7a59] to-[#7b63ff] bg-clip-text text-transparent">
                  Protected
                </span>
                , Always Running
              </h1>

              <p className="text-lg sm:text-xl text-foreground-secondary mb-8 leading-relaxed">
                24/7 monitoring, proactive maintenance, and expert support to keep your website secure, fast, and worry-free.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                <Link
                  href="/schedule-a-call"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-primary text-white font-semibold rounded-xl transition-all duration-200 hover:brightness-110 shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(255,106,85,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] active:scale-[0.98]"
                >
                  Get Protected
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 bg-white/[0.03] border border-white/[0.08] text-foreground font-semibold rounded-xl transition-all duration-200 hover:bg-white/[0.06] hover:border-white/[0.15] backdrop-blur-sm active:scale-[0.98]"
                >
                  <Play className="w-4 h-4" />
                  Learn More
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
              <InteractiveSupportMockup />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Support Packages Section */}
      <section id="packages" className="py-20 relative">
        <Container>
          <SectionHeading
            overline="SUPPORT PACKAGES"
            title="Comprehensive Website Care"
            highlightWord="Care"
            subtitle="We don&apos;t just fix problems — we prevent them. Proactive monitoring and maintenance to keep your site running perfectly."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
            {supportPackages.map((pkg, index) => (
              <motion.div
                key={pkg.title}
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
                    <pkg.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-1">{pkg.title}</h3>
                  <p className="text-sm text-primary mb-3">{pkg.subtitle}</p>
                  
                  {/* Description */}
                  <p className="text-sm text-foreground-secondary mb-5 leading-relaxed">
                    {pkg.description}
                  </p>
                  
                  {/* Bullets */}
                  <ul className="space-y-2.5 mb-6">
                    {pkg.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-foreground-secondary">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA */}
                  <Link
                    href={`/contact-us?service=${encodeURIComponent(pkg.title)}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
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
            title="Peace of Mind Included"
            highlightWord="Peace"
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
                
                <div className="relative h-full rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] p-6 transition-all duration-300 hover:border-white/20">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-[#7b63ff]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-6 h-6 text-primary" />
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
            overline="HOW IT WORKS"
            title="Simple Setup, Ongoing Care"
            highlightWord="Care"
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
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-white/20 to-transparent" />
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
                Ready to Stay{" "}
                <span className="bg-gradient-to-r from-primary to-[#7b63ff] bg-clip-text text-transparent">
                  Protected?
                </span>
              </h2>
              <p className="text-foreground-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
                Let us handle the technical details while you focus on growing your business.
              </p>
              <Link href="/schedule-a-call">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-primary to-[#ff8a75] rounded-xl font-semibold text-white shadow-[0_0_40px_rgba(255,106,85,0.3)] hover:shadow-[0_0_60px_rgba(255,106,85,0.4)] transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Schedule a Call
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      <Footer {...footerData} />
    </>
  )
}
