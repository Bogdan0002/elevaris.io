import { cn } from "@/lib/utils"
import Link from "next/link"
import { ButtonHTMLAttributes, ReactNode } from "react"

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline"
  href?: string
  children: ReactNode
  className?: string
}

export function GlowButton({
  variant = "primary",
  href,
  children,
  className,
  type,
  ...props
}: GlowButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none"
  
  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#ff6a55] to-[#7b63ff] text-white shadow-[0_0_24px_rgba(123,99,255,0.38)] hover:shadow-[0_0_34px_rgba(123,99,255,0.55)] hover:-translate-y-[1px]",
    outline:
      "border-2 border-primary/40 bg-transparent text-primary hover:border-primary/70 hover:bg-primary/10 shadow-[0_0_12px_rgba(255,106,85,0.25)] hover:shadow-[0_0_20px_rgba(255,106,85,0.4)]",
  }

  const content = (
    <button
      type={type}
      className={cn(baseStyles, variantStyles[variant], className)}
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

