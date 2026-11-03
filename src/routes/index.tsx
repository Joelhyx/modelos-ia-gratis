import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowRight, Cloud, Cpu, Download, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GlitchText } from "@/components/cyber/glitch-text"
import { HudPanel } from "@/components/cyber/hud-panel"
import { StatusBadge } from "@/components/cyber/status-badge"
import { ModelCard } from "@/components/model-card"
import { SectionHeading } from "@/components/section-heading"
import { categoryMeta, categories, featuredModels, models } from "@/data/models"
import { useDocumentTitle } from "@/lib/use-document-title"

export const Route = createFileRoute("/")({
  component: HomePage,
})

const steps = [
  {
    icon: Download,
    title: "Descarga los pesos",
    description:
      "Los modelos abiertos se publican en Hugging Face o en la web del proveedor. Elegir uno no cuesta nada.",
  },
  {
    icon: Cpu,
    title: "Ejecútalo donde quieras",
    description:
      "Con Ollama o llama.cpp puedes correr modelos en tu portátil. Si necesitas más potencia, usa una GPU o un servicio con plan gratuito.",
  },
  {
    icon: Cloud,
    title: "O pruébalo en la nube",
    description:
      "Groq, Google AI Studio y Hugging Face ofrecen cuotas gratuitas para experimentar sin instalar nada.",
  },
] as const

function HomePage() {
  useDocumentTitle()

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="animate-rise">
            <StatusBadge label="Directorio abierto · sin registro" tone="cyan" />

            <h1 className="mt-6 font-display text-[2.6rem] font-black uppercase leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Modelos de IA
              <span className="mt-2 block">
                <GlitchText text="gratis" className="text-gradient-cyan" />
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
              {models.length} modelos abiertos para conversar, razonar, generar imágenes,
              transcribir audio y construir búsquedas semánticas. Sin suscripciones: descárgalos,
              pruébalos y ejecútalos tú mismo.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/modelos">
                  Explorar modelos
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/comparativa">Comparar licencias</Link>
              </Button>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/5 pt-6">
              <div>
                <dt className="cyber-label">// Modelos</dt>
                <dd className="mt-2 font-display text-2xl font-bold text-neon-cyan">
                  {models.length.toString().padStart(2, "0")}
                </dd>
              </div>
              <div>
                <dt className="cyber-label">// Categorías</dt>
                <dd className="mt-2 font-display text-2xl font-bold text-neon-cyan">
                  {categories.length.toString().padStart(2, "0")}
                </dd>
              </div>
              <div>
                <dt className="cyber-label">// Coste</dt>
                <dd className="mt-2 font-display text-2xl font-bold text-neon-cyan">0 €</dd>
              </div>
            </dl>
          </div>

          <HudPanel className="relative overflow-hidden p-0">
            <div className="scan-beam" aria-hidden />
            <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
              <div className="flex items-center gap-1.5" aria-hidden>
                <span className="size-2 bg-neon-pink/80" />
                <span className="size-2 bg-neon-acid/80" />
                <span className="size-2 bg-neon-cyan/80" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                terminal — modelos
              </span>
            </div>
            <div className="space-y-4 p-5 font-mono text-[12px] leading-relaxed sm:p-6">
              <p>
                <span className="text-neon-cyan">$</span>{" "}
                <span className="text-ink">modelos --list --free</span>
              </p>
              <p className="space-y-1 text-dim">
                <span className="block">
                  <span className="text-emerald-400">[OK]</span> {models.length} modelos indexados
                </span>
                <span className="block">
                  <span className="text-emerald-400">[OK]</span> {categories.length} categorías
                  disponibles
                </span>
                <span className="block">
                  <span className="text-emerald-400">[OK]</span> 0 suscripciones detectadas
                </span>
              </p>
              <p>
                <span className="text-neon-cyan">$</span>{" "}
                <span className="text-ink">recomendar --perfil=principiante</span>
              </p>
              <div className="space-y-1 border-l border-neon-cyan/25 pl-3 text-ink/70">
                <p>&gt; Empieza por Gemma o Mistral con Ollama.</p>
                <p>&gt; Si tu equipo es modesto, prueba Phi.</p>
                <p>&gt; Para imágenes, FLUX.1 [schnell] en 4 pasos.</p>
              </div>
              <p className="text-dim">
                <span className="text-neon-cyan">$</span>{" "}
                <span className="inline-block h-3.5 w-2 translate-y-0.5 animate-blink bg-neon-cyan/80" />
              </p>
            </div>
          </HudPanel>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selección del sistema"
            title="Modelos destacados"
            description="Una muestra del catálogo: opciones contrastadas, con pesos abiertos y comunidad activa."
          />
          <Button asChild variant="outline">
            <Link to="/modelos">
              Ver catálogo completo
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredModels.slice(0, 6).map((model) => (
            <ModelCard key={model.slug} model={model} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Protocolo de uso"
          title="Cómo empezar sin gastar"
          description="No necesitas una tarjeta de crédito ni un servidor dedicado para probar estos modelos."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <HudPanel key={step.title} className="p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan">
                  <step.icon className="size-5" aria-hidden />
                </span>
                <span className="font-mono text-xs tracking-[0.2em] text-dim">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-display text-base font-bold uppercase tracking-wider text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{step.description}</p>
            </HudPanel>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <HudPanel className="relative overflow-hidden p-8 sm:p-10">
          <div className="scan-beam" aria-hidden />
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="cyber-label flex items-center gap-2 text-neon-acid">
                <Sparkles className="size-3.5" aria-hidden />
                // Acceso libre
              </p>
              <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-wider text-ink sm:text-3xl">
                Sin coste. Sin excusas.
              </h2>
              <p className="mt-3 max-w-xl leading-relaxed text-dim">
                Explora las cinco categorías, compara licencias y elige el modelo que encaja con tu
                hardware. Si tienes dudas, empieza por las guías.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/modelos">Abrir catálogo</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/guias">Leer guías</Link>
              </Button>
            </div>
          </div>
        </HudPanel>
      </section>

      <div className="sr-only">
        Categorías disponibles: {categories.map((category) => categoryMeta[category].label).join(", ")}.
      </div>
    </>
  )
}
