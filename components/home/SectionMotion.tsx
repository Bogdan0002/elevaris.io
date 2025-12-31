"use client"

import { ReactNode } from "react"
import { motion, Variants } from "framer-motion"

type Direction = "up" | "left" | "right"

const variantsMap: Record<Direction, Variants> = {
  up: { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } },
}

interface SectionMotionProps {
  children: ReactNode
  direction?: Direction
  delay?: number
}

export function SectionMotion({
  children,
  direction = "up",
  delay = 0,
}: SectionMotionProps) {
  const variants = variantsMap[direction]

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}

