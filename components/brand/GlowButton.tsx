import { cn } from "@/lib/utils"
import Link from "next/link"
import { ButtonHTMLAttributes, ReactNode } from "react"

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  href?: string
  children: ReactNode
  className?: string
}

export function GlowButton({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  type,
  ...props
}: GlowButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none rounded-xl"
  
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  }
  
  const variantStyles = {
    primary:
      "bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(255,106,85,0.3)] hover:shadow-[0_0_30px_rgba(255,106,85,0.5)] hover:-translate-y-0.5",
    secondary:
      "bg-gradient-to-r from-primary to-[#7b63ff] text-white shadow-[0_0_24px_rgba(123,99,255,0.3)] hover:shadow-[0_0_34px_rgba(123,99,255,0.5)] hover:-translate-y-0.5",
    outline:
      "border border-white/20 bg-white/5 text-foreground hover:border-white/30 hover:bg-white/10 backdrop-blur-sm",
    ghost:
      "bg-transparent text-foreground hover:bg-white/5",
  }

  const content = (
    <button
      type={type}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  )

  if (href && !type) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    )
  }

  return content
}
