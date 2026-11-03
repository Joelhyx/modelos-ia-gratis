import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow: string
  title: ReactNode
  description?: string
  className?: string
  as?: "h1" | "h2"
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-neon-cyan/60" aria-hidden />
        <span className="cyber-label text-neon-cyan">{eyebrow}</span>
      </div>
      <Heading className="font-display text-2xl font-bold uppercase tracking-wider text-ink sm:text-3xl">
        {title}
      </Heading>
      {description && <p className="max-w-2xl leading-relaxed text-dim">{description}</p>}
    </div>
  )
}
