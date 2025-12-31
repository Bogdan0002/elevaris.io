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
  const baseStyles = cn(
    "relative inline-flex items-center justify-center gap-2",
    "font-medium tracking-[-0.01em]",
    "transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background/95",
    "disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed",
    "transform-gpu will-change-transform",
    "active:scale-[0.97]",
    "select-none"
  )
  
  const sizeStyles = {
    sm: "h-9 px-4 text-[13px] rounded-[10px]",
    md: "h-11 px-5 text-[13px] rounded-[11px]",
    lg: "h-[50px] px-7 text-[15px] rounded-[12px]",
  }
  
  const variantStyles = {
    // Primary: Solid orange - main CTA
    primary: cn(
      "bg-primary text-white",
      "hover:brightness-[1.08]",
      "shadow-[0_1px_3px_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.12),inset_0_0_0_1px_rgba(255,255,255,0.1)]",
      "hover:shadow-[0_4px_12px_-2px_rgba(255,106,85,0.5),0_2px_6px_-2px_rgba(255,106,85,0.3),inset_0_0_0_1px_rgba(255,255,255,0.15)]",
      "hover:-translate-y-[1px]"
    ),
    // Secondary: Gradient - special emphasis
    secondary: cn(
      "bg-gradient-to-r from-primary via-[#f06a50] to-[#8b6fff] text-white",
      "hover:brightness-[1.08]",
      "shadow-[0_1px_3px_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.12),inset_0_0_0_1px_rgba(255,255,255,0.15)]",
      "hover:shadow-[0_6px_16px_-4px_rgba(123,99,255,0.45),0_2px_6px_-2px_rgba(255,106,85,0.3),inset_0_0_0_1px_rgba(255,255,255,0.2)]",
      "hover:-translate-y-[1px]"
    ),
    // Outline: Glass effect - secondary actions
    outline: cn(
      "bg-white/[0.02] text-foreground/90",
      "border border-white/[0.06]",
      "hover:bg-white/[0.05] hover:border-white/[0.12] hover:text-foreground",
      "backdrop-blur-md",
      "shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.02)]",
      "hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.04)]"
    ),
    // Ghost: Minimal - tertiary actions
    ghost: cn(
      "text-foreground-secondary/80",
      "hover:text-foreground hover:bg-white/[0.03]",
      "hover:shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
    ),
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
