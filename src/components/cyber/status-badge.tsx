import { cn } from "@/lib/utils"

const tones = {
  cyan: "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan",
  pink: "border-neon-pink/40 bg-neon-pink/10 text-neon-pink",
  acid: "border-neon-acid/40 bg-neon-acid/10 text-neon-acid",
  green: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  dim: "border-white/15 bg-white/5 text-dim",
} as const

type StatusBadgeProps = {
  label: string
  tone?: keyof typeof tones
  pulse?: boolean
  className?: string
}

export function StatusBadge({ label, tone = "cyan", pulse = true, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em]",
        tones[tone],
        className,
      )}
    >
      {pulse && <span className="size-1.5 animate-pulse bg-current" aria-hidden />}
      {label}
    </span>
  )
}
