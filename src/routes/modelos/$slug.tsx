import { createFileRoute, Link, notFound } from "@tanstack/react-router"
import {
  ArrowLeft,
  Check,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  X,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HudPanel } from "@/components/cyber/hud-panel"
import { ModelCard, categoryAccent } from "@/components/model-card"
import { categoryMeta, getModelBySlug, models } from "@/data/models"
import { useDocumentTitle } from "@/lib/use-document-title"

export const Route = createFileRoute("/modelos/$slug")({
  component: ModelDetailPage,
})

function ModelDetailPage() {
  const { slug } = Route.useParams()
  const model = getModelBySlug(slug)

  useDocumentTitle(model?.name)

  if (!model) {
    throw notFound()
  }

  const accent = categoryAccent[model.category]
  const related = [
    ...models.filter((item) => item.category === model.category && item.slug !== model.slug),
    ...models.filter((item) => item.category !== model.category && item.slug !== model.slug),
  ].slice(0, 3)

  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <nav
        aria-label="Migas de pan"
        className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-dim"
      >
        <Link to="/" className="transition-colors hover:text-neon-cyan">
          Inicio
        </Link>
        <span aria-hidden>/</span>
        <Link to="/modelos" className="transition-colors hover:text-neon-cyan">
          Modelos
        </Link>
        <span aria-hidden>/</span>
        <span className="text-ink/80">{model.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.55fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={accent}>
              {categoryMeta[model.category].label}
            </Badge>
            {model.featured && (
              <span className="cyber-label flex items-center gap-1.5 text-neon-acid">
                <Sparkles className="size-3" aria-hidden />
                Destacado
              </span>
            )}
          </div>

          <h1 className="mt-5 font-display text-4xl font-black uppercase leading-none tracking-tight text-ink sm:text-5xl">
            {model.name}
          </h1>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
            {model.provider} · {model.license}
          </p>

          <p className="mt-4 text-xl leading-relaxed text-ink/85">{model.summary}</p>
          <p className="mt-5 leading-relaxed text-ink/70">{model.description}</p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <HudPanel className="p-5">
              <h2 className="cyber-label text-emerald-300">// Fortalezas</h2>
              <ul className="mt-4 space-y-3">
                {model.strengths.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink/75">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </HudPanel>

            <HudPanel className="p-5">
              <h2 className="cyber-label text-neon-pink">// Límites</h2>
              <ul className="mt-4 space-y-3">
                {model.limitations.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink/75">
                    <X className="mt-0.5 size-4 shrink-0 text-neon-pink" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </HudPanel>
          </div>

          <HudPanel className="mt-5 flex items-start gap-3 p-5">
            <ShieldAlert className="mt-0.5 size-4 shrink-0 text-neon-acid" aria-hidden />
            <p className="text-sm leading-relaxed text-ink/70">
              &quot;Gratis&quot; significa que puedes descargar y ejecutar el modelo sin pagar por
              la licencia. Los servicios alojados pueden aplicar cuotas, colas o límites de uso.
              Revisa siempre las condiciones oficiales.
            </p>
          </HudPanel>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <HudPanel className="p-6">
            <h2 className="cyber-label text-neon-cyan">// Ficha técnica</h2>

            <dl className="mt-4 divide-y divide-white/5">
              <div className="flex items-start justify-between gap-4 py-2.5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                  Proveedor
                </dt>
                <dd className="text-right text-sm text-ink">{model.provider}</dd>
              </div>
              <div className="flex items-start justify-between gap-4 py-2.5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                  Categoría
                </dt>
                <dd className="text-right text-sm text-ink">{categoryMeta[model.category].label}</dd>
              </div>
              <div className="flex items-start justify-between gap-4 py-2.5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                  Licencia
                </dt>
                <dd className="text-right text-sm text-ink">{model.license}</dd>
              </div>
              <div className="flex items-start justify-between gap-4 py-2.5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                  Tamaño
                </dt>
                <dd className="text-right font-mono text-xs text-ink">{model.size}</dd>
              </div>
            </dl>

            <div className="mt-5">
              <p className="cyber-label mb-2.5">// Dónde probarlo</p>
              <div className="flex flex-wrap gap-1.5">
                {model.access.map((tool) => (
                  <Badge key={tool} variant="muted">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-2 border-t border-white/5 pt-5">
              {model.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="clip-corner flex items-center justify-between gap-3 border border-neon-cyan/25 bg-neon-cyan/5 px-3.5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-neon-cyan transition-colors hover:border-neon-cyan/60 hover:bg-neon-cyan/10"
                >
                  {link.label}
                  <ExternalLink className="size-3.5" aria-hidden />
                </a>
              ))}
            </div>
          </HudPanel>

          <Button asChild variant="ghost" className="mt-4 w-full justify-start">
            <Link to="/modelos">
              <ArrowLeft aria-hidden />
              Volver al catálogo
            </Link>
          </Button>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-neon-cyan/60" aria-hidden />
            <h2 className="cyber-label text-neon-cyan">// Modelos relacionados</h2>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ModelCard key={item.slug} model={item} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
