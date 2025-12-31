import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface GlowCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlowCard({ children, className, hover = true }: GlowCardProps) {
  return (
    <div
      className={cn(
        "card-gradient rounded-2xl border border-primary/30 p-6 transition-all duration-300",
        hover &&
          "hover:-translate-y-1.5 hover:border-primary/50",
        className
      )}
    >
      {children}
    </div>
  )
}

