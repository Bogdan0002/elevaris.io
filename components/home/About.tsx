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
    <section className="py-10 md:py-20">
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
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[radial-gradient(circle_at_30%_30%,rgba(255,106,85,0.15),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(123,99,255,0.15),transparent_50%),linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                {/* Animated grid pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,106,85,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(123,99,255,0.08)_1px,transparent_1px)] bg-[size:30px_30px]" />
                </div>
                
                {/* Tech-inspired design */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    {/* Center glow */}
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.7, 0.4],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-primary/50 to-[#7b63ff]/50 blur-[80px]"
                    />
                    
                    {/* Orbiting circles - centered */}
                    <div className="relative flex items-center justify-center">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute"
                          animate={{
                            rotate: i % 2 === 0 ? 360 : -360,
                          }}
                          transition={{
                            duration: 15 + i * 5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <div 
                            className="rounded-full border"
                            style={{
                              width: `${80 + i * 45}px`,
                              height: `${80 + i * 45}px`,
                              borderColor: i === 0 ? 'rgba(255, 106, 85, 0.3)' : i === 1 ? 'rgba(123, 99, 255, 0.25)' : 'rgba(61, 82, 213, 0.2)',
                              borderWidth: '2px',
                              borderStyle: i === 1 ? 'dashed' : 'solid',
                            }}
                          />
                          {/* Orbiting dots */}
                          <motion.div
                            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary to-[#7b63ff]"
                            style={{
                              width: `${10 - i * 2}px`,
                              height: `${10 - i * 2}px`,
                            }}
                            animate={{
                              scale: [1, 1.5, 1],
                              boxShadow: [
                                '0 0 8px rgba(255,106,85,0.6)',
                                '0 0 16px rgba(255,106,85,0.9)',
                                '0 0 8px rgba(255,106,85,0.6)',
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.5,
                            }}
                          />
                          {/* Additional dot on opposite side */}
                          <motion.div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-r from-[#7b63ff] to-[#3d52d5]"
                            style={{
                              width: `${8 - i * 2}px`,
                              height: `${8 - i * 2}px`,
                            }}
                            animate={{
                              scale: [1, 1.3, 1],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.3 + 0.5,
                            }}
                          />
                        </motion.div>
                      ))}
                      
                      {/* Center element - hexagon-like shape */}
                      <motion.div
                        className="relative w-16 h-16 flex items-center justify-center"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 30,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-[#7b63ff]/20 rounded-xl rotate-45" />
                        <motion.div
                          className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-[#ff7a59] to-[#7b63ff]"
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [45, 45, 45],
                            boxShadow: [
                              '0 0 20px rgba(255,106,85,0.5)',
                              '0 0 35px rgba(255,106,85,0.8)',
                              '0 0 20px rgba(255,106,85,0.5)',
                            ],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 rounded-full bg-primary/60"
                    style={{
                      left: `${15 + i * 15}%`,
                      top: `${20 + (i % 3) * 25}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                  />
                ))}
                
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/40 rounded-tl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#7b63ff]/40 rounded-br-lg" />
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
                  spread={30}
                  glow={true}
                  disabled={false}
                  proximity={50}
                  inactiveZone={0.01}
                  borderWidth={1}
                  className="rounded-2xl"
                />
                <GlowCard hover={true} className="rounded-2xl p-4 bg-[radial-gradient(circle_at_20%_20%,rgba(255,106,85,0.12),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(123,99,255,0.12),transparent_40%),linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition-all duration-300 relative z-10 hover:shadow-[0_16px_36px_rgba(255,106,85,0.2)]">
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
                  spread={30}
                  glow={true}
                  disabled={false}
                  proximity={50}
                  inactiveZone={0.01}
                  borderWidth={1}
                  className="rounded-2xl"
                />
                <GlowCard hover={true} className="rounded-2xl p-4 bg-[radial-gradient(circle_at_20%_20%,rgba(255,106,85,0.12),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(123,99,255,0.12),transparent_40%),linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition-all duration-300 relative z-10 hover:shadow-[0_16px_36px_rgba(255,106,85,0.2)]">
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

