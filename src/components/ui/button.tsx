import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-xs font-medium uppercase tracking-[0.18em] transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 clip-corner",
  {
    variants: {
      variant: {
        default:
          "bg-neon-cyan text-primary-foreground hover:bg-neon-cyan/90 hover:shadow-[0_0_26px_rgba(0,240,255,0.4)]",
        secondary:
          "bg-neon-pink text-secondary-foreground hover:bg-neon-pink/90 hover:shadow-[0_0_26px_rgba(255,46,136,0.35)]",
        outline:
          "border border-neon-cyan/40 bg-transparent text-neon-cyan hover:border-neon-cyan/80 hover:bg-neon-cyan/10",
        ghost: "text-ink/80 hover:bg-neon-cyan/10 hover:text-neon-cyan",
        link: "text-neon-cyan underline-offset-4 hover:underline",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-[10px]",
        lg: "h-12 px-7 text-sm",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
