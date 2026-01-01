"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Container } from "@/components/site/Container"
import { Footer } from "@/components/site/Footer"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Sparkles,
  Clock,
  MessageSquare,
  CheckCircle2
} from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "info@elevaris.app",
    href: "mailto:info@elevaris.app",
    description: "We'll respond within 24 hours"
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+1 855-532-7511",
    href: "tel:+18555327511",
    description: "Mon-Fri, 9am-6pm EST"
  },
  {
    icon: Clock,
    title: "Response Time",
    value: "< 2 Hours",
    href: null,
    description: "Average response time"
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

export default function ContactUsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,106,85,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(123,99,255,0.08),transparent_50%)] pointer-events-none" />
        
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground-secondary">Get In Touch</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Let&apos;s Build Something{" "}
              <span className="bg-gradient-to-r from-primary via-[#ff7a59] to-[#7b63ff] bg-clip-text text-transparent">
                Amazing
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-foreground-secondary leading-relaxed"
            >
              Ready to transform your online presence? We&apos;re here to help. Reach out and let&apos;s discuss how we can help your business grow.
            </motion.p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                
                {info.href ? (
                  <a href={info.href} className="block">
                    <div className="relative h-full rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] p-6 transition-all duration-300 hover:border-white/20 text-center">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-[#7b63ff]/20 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{info.title}</h3>
                      <p className="text-primary font-medium mb-2">{info.value}</p>
                      <p className="text-sm text-foreground-secondary">{info.description}</p>
                    </div>
                  </a>
                ) : (
                  <div className="relative h-full rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] p-6 transition-all duration-300 hover:border-white/20 text-center">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-[#7b63ff]/20 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <info.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{info.title}</h3>
                    <p className="text-primary font-medium mb-2">{info.value}</p>
                    <p className="text-sm text-foreground-secondary">{info.description}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Main Contact Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                Why Work With{" "}
                <span className="bg-gradient-to-r from-primary to-[#7b63ff] bg-clip-text text-transparent">
                  Elevaris?
                </span>
              </h2>
              
              <div className="space-y-4 mb-8">
                {[
                  "Custom solutions tailored to your business needs",
                  "Transparent communication throughout the project",
                  "Fast turnaround times without sacrificing quality",
                  "Ongoing support and maintenance included",
                  "Results-driven approach focused on your ROI"
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground-secondary">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Prefer to Schedule a Call?</h3>
                </div>
                <p className="text-sm text-foreground-secondary mb-4">
                  Book a free 30-minute consultation to discuss your project in detail.
                </p>
                <Link
                  href="/schedule-a-call"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl transition-all duration-200 hover:brightness-110 shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_rgba(255,106,85,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] active:scale-[0.98]"
                >
                  Schedule a Call
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Right - Booking Widget */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
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
              
              <div className="relative rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] p-6 overflow-hidden">
                <h3 className="text-xl font-bold mb-4 text-center">Book Your Free Consultation</h3>
                <div className="rounded-xl overflow-hidden bg-white/5 min-h-[500px]">
                  <iframe 
                    src="https://link.elevaris.app/widget/booking/CE1Idz6ruqaUcAU7LYMc" 
                    style={{ width: '100%', height: '550px', border: 'none' }}
                    scrolling="no"
                    title="Schedule a Call"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <Footer {...footerData} />
    </>
  )
}
