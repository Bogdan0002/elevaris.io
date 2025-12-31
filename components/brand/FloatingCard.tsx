"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ReactNode, useRef } from "react"

interface FloatingCardProps {
  children: ReactNode
  className?: string
  rotation?: number
  delay?: number
}

export function FloatingCard({
  children,
  className,
  rotation = 0,
  delay = 0,
}: FloatingCardProps) {
  const randomX = useRef(Math.random() * 10 - 5) // -5 to 5
  const randomY = useRef(Math.random() * 10 - 5)
  const randomDuration = useRef(4 + Math.random() * 4) // 4-8 seconds

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn("relative", className)}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          x: [0, randomX.current, 0],
          rotate: [rotation, rotation + 2, rotation],
        }}
        transition={{
          duration: randomDuration.current,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        className="h-full relative"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
