"use client"

import { ReactNode, useState } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { GlowingEffect } from "@/components/ui/glowing-effect"

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[26rem] md:auto-rows-[26rem] grid-cols-1 md:grid-cols-3 gap-4",
        "[&>*:first-child]:h-[32rem] md:[&>*:first-child]:h-auto",
        "[&>*:not(:first-child)]:h-[11rem] md:[&>*:not(:first-child)]:h-auto",
        className,
      )}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  splineScene,
  isMain = false,
}: {
  name: string
  className: string
  background: ReactNode
  Icon: any
  description: string
  href: string
  cta: string
  splineScene?: ReactNode
  isMain?: boolean
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl",
        // dark styles adapted to brand
        "bg-[radial-gradient(circle_at_20%_20%,rgba(255,106,85,0.12),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(123,99,255,0.12),transparent_40%),linear-gradient(160deg,#181116_0%,#0f0b0e_100%)]",
        "border border-white/10",
        "[box-shadow:0_0_0_1px_rgba(255,255,255,.05),0_2px_4px_rgba(0,0,0,.2),0_12px_24px_rgba(0,0,0,.3)]",
        "transform-gpu transition-all duration-300",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlowingEffect
        spread={30}
        glow={true}
        disabled={false}
        proximity={50}
        inactiveZone={0.01}
        borderWidth={1}
        className="rounded-2xl"
      />
      <div className="absolute inset-0">{background}</div>
      
      {/* Spline scene for main card - positioned at bottom */}
      {isMain && splineScene && (
        <div className="absolute bottom-0 left-0 right-0 h-[40%] opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden rounded-b-2xl">
          <div className="absolute inset-0 scale-110">
            {splineScene}
          </div>
        </div>
      )}

      {/* Icon - moves to center on hover */}
      <motion.div
        className="absolute top-6 left-6 text-primary z-[1]"
        initial={false}
        animate={{
          top: isHovered ? "50%" : "24px",
          left: isHovered ? "50%" : "24px",
          rotate: isHovered ? 360 : 0,
          scale: isHovered ? 1.8 : 1,
          x: isHovered ? "-50%" : "0%",
          y: isHovered ? "-50%" : "0%",
          opacity: isHovered ? 0.3 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 1.2,
        }}
      >
        <Icon className="h-12 w-12" />
      </motion.div>

      {/* Content - moves up on hover */}
      <motion.div
        className="pointer-events-none z-10 flex transform-gpu flex-col gap-3 p-6 relative"
        animate={{
          y: isHovered ? -28 : 0,
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          mass: 0.8,
        }}
        style={{ paddingTop: "5rem" }}
      >
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {name}
          </h3>
          <p className="text-sm text-foreground-secondary leading-relaxed">{description}</p>
        </div>
        
        {/* Additional features for main card */}
        {isMain && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-xs text-foreground-secondary">
              <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              <span>Next.js & React</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-foreground-secondary">
              <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              <span>TypeScript & Tailwind</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-foreground-secondary">
              <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              <span>Performance Optimized</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Learn More Button - appears on hover */}
      <motion.div
        className="pointer-events-none absolute bottom-0 flex w-full transform-gpu flex-row items-center p-4 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 20,
          pointerEvents: isHovered ? "auto" : "none",
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          mass: 0.8,
        }}
      >
        <div className="relative inline-block">
          <GlowingEffect
            spread={30}
            glow={true}
            disabled={false}
            proximity={50}
            inactiveZone={0.01}
            borderWidth={1}
            className="rounded-2xl"
          />
          <Button variant="ghost" asChild size="sm" className="relative pointer-events-auto text-primary hover:text-primary hover:bg-primary/10 rounded-2xl">
            <Link href={href}>
              {cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export { BentoCard, BentoGrid }

