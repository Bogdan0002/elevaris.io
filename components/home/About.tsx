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
          {/* Left: Blob Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] max-w-lg mx-auto">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(255,106,85,0.12),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(123,99,255,0.12),transparent_40%),linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff6a55]/20 via-[#7b63ff]/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-foreground-secondary">Team Image</span>
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

