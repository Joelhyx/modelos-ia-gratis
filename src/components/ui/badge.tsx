import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] transition-colors",
  {
    variants: {
      variant: {
        default: "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan",
        secondary: "border-neon-pink/40 bg-neon-pink/10 text-neon-pink",
        outline: "border-border bg-transparent text-ink/80",
        acid: "border-neon-acid/40 bg-neon-acid/10 text-neon-acid",
        muted: "border-white/10 bg-white/5 text-dim",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
