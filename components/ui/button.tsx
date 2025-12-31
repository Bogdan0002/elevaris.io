import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium tracking-[-0.01em] transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background/95 disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed transform-gpu will-change-transform active:scale-[0.97] select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:brightness-[1.08] shadow-[0_1px_3px_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.12),inset_0_0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_12px_-2px_rgba(255,106,85,0.5),0_2px_6px_-2px_rgba(255,106,85,0.3),inset_0_0_0_1px_rgba(255,255,255,0.15)] hover:-translate-y-[1px] rounded-[11px]",
        destructive:
          "bg-destructive text-destructive-foreground hover:brightness-[1.08] rounded-[11px]",
        outline:
          "bg-white/[0.02] text-foreground/90 border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] hover:text-foreground backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.02)] hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.04)] rounded-[11px]",
        secondary:
          "bg-gradient-to-r from-primary via-[#f06a50] to-[#8b6fff] text-white hover:brightness-[1.08] shadow-[0_1px_3px_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.12),inset_0_0_0_1px_rgba(255,255,255,0.15)] hover:shadow-[0_6px_16px_-4px_rgba(123,99,255,0.45),0_2px_6px_-2px_rgba(255,106,85,0.3),inset_0_0_0_1px_rgba(255,255,255,0.2)] hover:-translate-y-[1px] rounded-[11px]",
        ghost: "text-foreground-secondary/80 hover:text-foreground hover:bg-white/[0.03] hover:shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-[11px]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 text-[13px]",
        sm: "h-9 px-4 text-[13px] rounded-[10px]",
        lg: "h-[50px] px-7 text-[15px] rounded-[12px]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
