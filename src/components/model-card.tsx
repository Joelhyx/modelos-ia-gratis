import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  AudioLines,
  BrainCircuit,
  Database,
  Image as ImageIcon,
  MessagesSquare,
} from "lucide-react"
import { Link } from "@tanstack/react-router"

import { Badge } from "@/components/ui/badge"
import { HudPanel } from "@/components/cyber/hud-panel"
import { cn } from "@/lib/utils"
import { categoryMeta, type AIModel, type Category } from "@/data/models"

const categoryIcons: Record<Category, LucideIcon> = {
  chat: MessagesSquare,
  razonamiento: BrainCircuit,
  imagen: ImageIcon,
  audio: AudioLines,
  embeddings: Database,
}

export const categoryAccent: Record<Category, string> = {
  chat: "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan",
  razonamiento: "border-neon-violet/40 bg-neon-violet/10 text-[#b9a7ff]",
  imagen: "border-neon-pink/40 bg-neon-pink/10 text-[#ff8fbe]",
  audio: "border-neon-acid/40 bg-neon-acid/10 text-neon-acid",
  embeddings: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
}

type ModelCardProps = {
  model: AIModel
}

export function ModelCard({ model }: ModelCardProps) {
  const Icon = categoryIcons[model.category]
  const accent = categoryAccent[model.category]

  return (
    <HudPanel interactive className="group flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={cn("grid size-8 place-items-center border", accent)}>
            <Icon className="size-4" aria-hidden />
          </span>
          <Badge variant="outline" className={accent}>
            {categoryMeta[model.category].label}
          </Badge>
        </div>
        {model.featured && (
          <span className="cyber-label text-neon-acid">// Destacado</span>
        )}
      </div>

      <h3 className="mt-5 font-display text-xl font-bold uppercase tracking-wide text-ink">
        <Link
          to="/modelos/$slug"
          params={{ slug: model.slug }}
          className="transition-colors hover:text-neon-cyan"
        >
          {model.name}
        </Link>
      </h3>
      <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
        {model.provider} · {model.license}
      </p>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">{model.summary}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {model.access.map((tool) => (
          <Badge key={tool} variant="muted">
            {tool}
          </Badge>
        ))}
      </div>

      <Link
        to="/modelos/$slug"
        params={{ slug: model.slug }}
        className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-neon-cyan transition-colors hover:text-neon-pink"
      >
        Ver ficha
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
      </Link>
    </HudPanel>
  )
}
