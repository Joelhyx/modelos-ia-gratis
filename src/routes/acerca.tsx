import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowRight, Cpu, Database, ShieldCheck, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HudPanel } from "@/components/cyber/hud-panel"
import { SectionHeading } from "@/components/section-heading"
import { useDocumentTitle } from "@/lib/use-document-title"

export const Route = createFileRoute("/acerca")({
  component: AboutPage,
})

const criteria = [
  {
    icon: Sparkles,
    title: "Pesos accesibles",
    description:
      "Solo entran modelos que puedes descargar o probar con un plan gratuito real, sin trucos ni pruebas de pago camufladas.",
  },
  {
    icon: ShieldCheck,
    title: "Licencia clara",
    description:
      "Cada ficha indica la licencia y sus matices. Apache 2.0 y MIT son las más permisivas; las comunitarias tienen condiciones propias.",
  },
  {
    icon: Cpu,
    title: "Utilidad práctica",
    description:
      "Priorizamos modelos que la comunidad usa de verdad, con documentación, herramientas y variantes para hardware doméstico.",
  },
  {
    icon: Database,
    title: "Cobertura completa",
    description:
      "Chat, razonamiento, imagen, audio y embeddings: el stack necesario para construir aplicaciones de IA sin depender de una sola API.",
  },
] as const

function AboutPage() {
  useDocumentTitle("Acerca de")

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <SectionHeading
        as="h1"
        eyebrow="Manifiesto · 04"
        title="Acerca de este directorio"
        description="MODELOS//IA es un proyecto independiente que reúne modelos de inteligencia artificial gratuitos con explicaciones breves, honestas y en español."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-base leading-relaxed text-ink/75">
          <p>
            La inteligencia artificial abierta avanza más rápido que la documentación en español.
            Este sitio nace para reducir esa distancia: una ficha por modelo, sin tecnicismos
            innecesarios y con enlaces directos a la fuente.
          </p>
          <p>
            No vendemos cursos ni suscripciones. No hay modelos patrocinados ni rankings secretos.
            Si un modelo está aquí es porque sus pesos se pueden obtener sin pagar y porque tiene
            un caso de uso claro.
          </p>
          <p>
            La selección inicial cubre diez familias que representan lo mejor del ecosistema
            abierto: Llama, Mistral, Gemma, Qwen, DeepSeek-R1, Phi, Whisper, Kokoro, FLUX.1
            schnell y BGE-M3. El catálogo está pensado para crecer con la comunidad.
          </p>

          <p>
            Este proyecto es un trabajo del alumno conocido como{" "}
            <span className="font-semibold text-ink">joelhyx</span>, desarrollado con agentes de
            inteligencia artificial. La estructura, los textos y la implementación se han
            construido con esas herramientas y revisado para mantener la información clara y
            verificable.
          </p>

          <HudPanel className="p-5">
            <p className="cyber-label text-neon-cyan">// Créditos</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Proyecto creado por el alumno{" "}
              <strong className="font-semibold text-ink">joelhyx</strong> con agentes de IA.
            </p>
          </HudPanel>

          <HudPanel className="p-5">
            <p className="cyber-label text-neon-cyan">// Nota legal</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Este sitio es informativo. Las licencias, los planes gratuitos y las capacidades de
              los modelos pueden cambiar. Antes de usar un modelo en producción, verifica los
              términos en su web oficial y consulta a un profesional si tu caso tiene implicaciones
              legales o de privacidad.
            </p>
          </HudPanel>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {criteria.map((item, index) => (
            <HudPanel key={item.title} className="p-5">
              <div className="flex items-center justify-between">
                <span className="grid size-9 place-items-center border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan">
                  <item.icon className="size-4" aria-hidden />
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-dim">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="mt-4 font-display text-sm font-bold uppercase tracking-wider text-ink">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{item.description}</p>
            </HudPanel>
          ))}
        </div>
      </div>

      <HudPanel className="relative mt-10 overflow-hidden p-8 sm:p-10">
        <div className="scan-beam" aria-hidden />
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="cyber-label text-neon-acid">// Siguiente paso</p>
            <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-wider text-ink">
              Encuentra tu modelo
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-dim">
              Filtra el catálogo por categoría o licencia, compara opciones y empieza a probar.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/modelos">
              Ir al catálogo
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </HudPanel>
    </section>
  )
}
