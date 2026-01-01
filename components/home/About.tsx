"use client"

import { motion } from "framer-motion"
import { Mail, Phone } from "lucide-react"
import { Container } from "@/components/site/Container"
import { SectionHeading } from "@/components/site/SectionHeading"
import { BlobImage } from "@/components/brand/BlobImage"
import { GlowCard } from "@/components/brand/GlowCard"
import { GlowingEffect } from "@/components/ui/glowing-effect"

interface AboutProps {
  title: string
  highlight: string
  text: string
  email: string
  phone: string
}

export function About({ title, highlight, text, email, phone }: AboutProps) {
  const titleParts = title.split(new RegExp(`(${highlight})`, "gi"))

  return (
    <section className="py-20">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          {/* Left: Creative Design */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] max-w-lg mx-auto">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(255,106,85,0.12),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(123,99,255,0.12),transparent_40%),linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.3)]">
                {/* Animated grid pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,106,85,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,106,85,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>
                
                {/* Floating elements */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative w-full h-full">
                    {/* Center glow */}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-primary/40 to-[#7b63ff]/40 blur-3xl"
                    />
                    
                    {/* Floating cards */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-12 h-12 rounded-lg bg-gradient-to-br from-primary/30 to-[#7b63ff]/30 border border-white/10"
                        style={{
                          top: `${20 + (i % 3) * 30}%`,
                          left: `${15 + Math.floor(i / 3) * 60}%`,
                        }}
                        animate={{
                          y: [0, -15, 0],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                    
                    {/* Center icon/text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="text-6xl font-bold bg-gradient-to-r from-primary via-[#ff7a59] to-[#7b63ff] bg-clip-text text-transparent"
                      >
                        E
                      </motion.div>
                      <p className="text-xs text-foreground-secondary mt-2">Building Impact</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 shadow-[0_0_20px_rgba(255,106,85,0.3)]" />
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-[1px] w-8 bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
                  ABOUT US
                </span>
                <div className="h-[1px] w-8 bg-primary" />
              </div>
              <h2 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {titleParts.map((part, index) =>
                  part.toLowerCase() === highlight.toLowerCase() ? (
                    <span key={index} className="text-primary">
                      {part}
                    </span>
                  ) : (
                    <span key={index}>{part}</span>
                  )
                )}
              </h2>
              <p className="text-base text-foreground-secondary leading-relaxed sm:text-lg">
                {text}
              </p>
            </div>

            {/* Contact Pills */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={2}
                  className="rounded-2xl"
                />
                <GlowCard hover={false} className="rounded-2xl p-4 bg-[radial-gradient(circle_at_20%_20%,rgba(255,106,85,0.12),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(123,99,255,0.12),transparent_40%),linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition-all duration-300 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff6a55]/20 to-[#7b63ff]/20 border border-primary/30">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground-muted">Email Us</p>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              </GlowCard>
              </div>

              <div className="relative">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={2}
                  className="rounded-2xl"
                />
                <GlowCard hover={false} className="rounded-2xl p-4 bg-[radial-gradient(circle_at_20%_20%,rgba(255,106,85,0.12),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(123,99,255,0.12),transparent_40%),linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition-all duration-300 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff6a55]/20 to-[#7b63ff]/20 border border-primary/30">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground-muted">Call Us</p>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              </GlowCard>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

