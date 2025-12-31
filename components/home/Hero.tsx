"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Spline from "@splinetool/react-spline/next"
import { Container } from "@/components/site/Container"
import { GlowButton } from "@/components/brand/GlowButton"
import { GlowCard } from "@/components/brand/GlowCard"
import { FloatingCard } from "@/components/brand/FloatingCard"
import { SparklesCore } from "@/components/ui/sparkles"

interface HeroProps {
  title: string
  highlight: string
  subtitle: string
  button: string
  floatingCards: Array<{ title: string; text: string }>
  badge: string
}

export function Hero({
  title,
  highlight,
  subtitle,
  button,
  floatingCards,
  badge,
}: HeroProps) {
  const titleParts = title.split(new RegExp(`(${highlight})`, "gi"))
  const highlightMatch = title.match(new RegExp(`(${highlight})`, "i"))
  const beforeHighlight = highlightMatch ? title.slice(0, highlightMatch.index).trimEnd() : title
  const highlightText = highlightMatch ? highlightMatch[0] : highlight
  const afterHighlight = highlightMatch
    ? title.slice((highlightMatch.index ?? 0) + highlightText.length).trimStart()
    : ""

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(255,106,85,0.08),transparent_40%),radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.4),transparent_50%),linear-gradient(135deg,#0b0809_0%,#090707_60%,#0f0b0c_100%)]">
      {/* Sparkles Background for entire hero section */}
      <div className="absolute inset-0 -z-0 overflow-hidden">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={120}
          className="w-full h-full"
          particleColor="#FF6A55"
          speed={1}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 relative"
          >
            <div className="relative inline-block">
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-[56px] lg:leading-[1.1]">
                <span className="block whitespace-nowrap">
                  {beforeHighlight}{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-highlight-accent bg-[length:180%_100%] animate-[glint_3s_ease-in-out_infinite] drop-shadow-[0_0_12px_rgba(110,166,255,0.28)]">
                      {highlightText}
                    </span>
                    {/* Soft glow band */}
                    <span className="pointer-events-none absolute inset-x-[-6%] bottom-[-6px] h-[14px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(116,137,255,0.28),rgba(110,166,255,0.08)_60%,transparent_85%)] blur-[7px] opacity-85" />
                  </span>
                </span>
                {afterHighlight && <span className="block">{afterHighlight}</span>}
              </h1>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-foreground-secondary">
              {subtitle}
            </p>
            <div className="flex items-center gap-4">
              <GlowButton
                variant="outline"
                href="/contact-us"
                className="rounded-2xl"
              >
                {button}
              </GlowButton>
            </div>
          </motion.div>

          {/* Right Column - Blob Image with glow and badge */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:pl-6"
          >
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[720px] lg:translate-x-4">
              {/* Outer glow rim - emphasize right side, softer reach */}
              <div className="pointer-events-none absolute inset-0 rounded-[64%_40%_58%_48%/48%_62%_46%_56%] bg-[linear-gradient(94deg,rgba(255,106,85,0)_0%,rgba(255,106,85,0.14)_46%,rgba(255,106,85,0.48)_90%),radial-gradient(circle_at_86%_64%,rgba(255,106,85,0.28),transparent_46%)] blur-[28px]" />

              {/* Spline scene blob */}
              <div className="relative h-full w-full overflow-hidden rounded-[64%_42%_60%_46%/50%_66%_48%_54%] border border-[#FF6A55]/24 shadow-[30px_8px_90px_rgba(255,106,85,0.26),18px_10px_52px_rgba(0,0,0,0.38)] bg-[#050505]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_64%,rgba(255,106,85,0.22),transparent_52%),radial-gradient(circle_at_18%_18%,rgba(255,106,85,0.08),transparent_40%)]" />
                <Spline
                  scene="https://prod.spline.design/6TWxRUwSg-KaueDF/scene.splinecode"
                  className="absolute inset-0 h-full w-full"
                />
              </div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-10 left-4 flex items-center gap-3 rounded-2xl border border-[#FF6A55]/50 bg-[rgba(10,10,10,0.8)] px-4 py-2 backdrop-blur-xl shadow-[0_0_26px_rgba(255,106,85,0.35)]"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-9 w-9 rounded-full border-2 border-black/60 bg-primary/30"
                    />
                  ))}
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-white">100+</p>
                  <p className="text-xs text-white/70">Satisfied Clients</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Floating Cards Below Hero - Evenly Spaced */}
        <div className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-3 relative sm:h-[200px] sm:flex sm:justify-between sm:items-start sm:gap-0">
          {floatingCards.map((card, index) => (
            <FloatingCard
              key={card.title}
              rotation={index === 0 ? -8 : index === 1 ? 5 : -5}
              delay={index * 0.2}
              className="sm:w-[280px] sm:flex-shrink-0"
            >
              <div className="h-full rounded-2xl p-[1px] bg-gradient-to-r from-[#ff6a55] via-[#ff7a59] to-[#7b63ff]">
                <GlowCard hover={false} className="h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,106,85,0.12),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(123,99,255,0.12),transparent_40%),linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] border-0 shadow-[0_12px_30px_rgba(0,0,0,0.3)]">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {card.title}
                  </h3>
                  <p className="text-sm text-foreground-secondary">
                    {card.text}
                  </p>
                </GlowCard>
              </div>
            </FloatingCard>
          ))}
        </div>
      </Container>

      <style jsx>{`
        @media (max-width: 1024px) {
          .hero-blob {
            transform: scale(0.94);
          }
        }

        @keyframes glint {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </section>
  )
}
