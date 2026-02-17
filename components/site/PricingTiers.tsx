"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { CheckCircle2, X, Sparkles, ArrowRight } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"

export interface PricingTier {
  name: string
  tagline: string
  setupPrice: string
  monthlyPrice: string
  popular: boolean
  included: string[]
  notIncluded: string[]
  cta: string
  // Stripe checkout URLs
  stripeUrl?: string
}

interface PricingTiersProps {
  tiers: PricingTier[]
  accentColor?: "cyan" | "red" | "orange" | "primary"
}

const colorClasses = {
  cyan: {
    gradient: "from-cyan-500 via-sky-500 to-blue-500",
    gradientButton: "from-cyan-600 to-sky-600",
    glow: "rgba(6,182,212,0.4)",
    border: "border-cyan-500/50",
    badge: "from-cyan-500 via-sky-500 to-blue-500",
    checkmark: "text-cyan-500",
    topBar: "from-cyan-500 via-sky-500 to-blue-500",
  },
  red: {
    gradient: "from-red-500 via-slate-500 to-red-600",
    gradientButton: "from-red-600 to-slate-600",
    glow: "rgba(239,68,68,0.4)",
    border: "border-red-500/50",
    badge: "from-red-500 via-slate-500 to-red-600",
    checkmark: "text-red-500",
    topBar: "from-red-500 via-slate-500 to-red-600",
  },
  orange: {
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    gradientButton: "from-orange-600 to-amber-600",
    glow: "rgba(249,115,22,0.4)",
    border: "border-orange-500/50",
    badge: "from-orange-500 via-amber-500 to-yellow-500",
    checkmark: "text-orange-500",
    topBar: "from-orange-500 via-amber-500 to-yellow-500",
  },
  primary: {
    gradient: "from-primary to-[#7b63ff]",
    gradientButton: "from-primary to-[#7b63ff]",
    glow: "rgba(255,106,85,0.4)",
    border: "border-primary/50",
    badge: "from-primary via-[#ff7a59] to-[#7b63ff]",
    checkmark: "text-primary",
    topBar: "from-primary via-[#ff7a59] to-[#7b63ff]",
  },
}

export function PricingTiers({ tiers, accentColor = "cyan" }: PricingTiersProps) {
  const colors = colorClasses[accentColor]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
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
          
          <div className={`relative h-full rounded-2xl border ${tier.popular ? colors.border : 'border-white/10'} bg-[linear-gradient(160deg,#181116_0%,#0f0b0e_100%)] overflow-hidden transition-all duration-300 hover:border-white/20`}>
            {/* Popular badge */}
            {tier.popular && (
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.topBar}`} />
            )}
            
            <div className="p-6 sm:p-8 flex flex-col h-full">
              {/* Header */}
              <div className="mb-6">
                {tier.popular && (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${colors.badge} mb-3`}>
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
                      <CheckCircle2 className={`w-4 h-4 ${colors.checkmark} mt-0.5 flex-shrink-0`} />
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
                href={tier.stripeUrl || "/schedule-a-call"}
                className={`w-full inline-flex items-center justify-center gap-2 h-11 px-5 font-semibold rounded-xl transition-all duration-200 mt-auto active:scale-[0.98] ${
                  tier.popular 
                    ? `bg-gradient-to-r ${colors.gradientButton} text-white hover:brightness-110 shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_${colors.glow},inset_0_1px_0_rgba(255,255,255,0.1)]`
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
  )
}
