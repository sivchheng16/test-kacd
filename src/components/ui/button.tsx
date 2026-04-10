import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-background shadow-lg shadow-primary/10 hover:bg-primary/90 hover:scale-[1.02]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-white/10 bg-transparent hover:bg-white/5 hover:border-white/20 hover:text-primary",
        secondary:
          "bg-secondary text-background shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-white/5 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
        neon: "border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-background shadow-[0_0_20px_rgba(var(--primary),0.1)]",
        glass: "glass-panel bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20 text-foreground",
      },
      size: {
        default: "h-12 px-8 py-2",
        sm: "h-10 px-6 text-[9px]",
        lg: "h-14 px-10 text-[11px] tracking-[0.3em]",
        icon: "h-12 w-12 rounded-full",
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
