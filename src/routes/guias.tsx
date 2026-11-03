import { createFileRoute } from "@tanstack/react-router"
import { ExternalLink, Terminal } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HudPanel } from "@/components/cyber/hud-panel"
import { SectionHeading } from "@/components/section-heading"
import { useDocumentTitle } from "@/lib/use-document-title"

export const Route = createFileRoute("/guias")({
  component: GuidesPage,
})

const guides = [
  {
    id: "ollama",
    title: "Ejecutar un modelo en local con Ollama",
    intro:
      "Ollama es la forma más rápida de probar modelos abiertos en tu ordenador. Descarga los pesos, los ejecuta con una API local y gestiona el hardware por ti.",
    steps: [
      "Instala Ollama desde su web oficial y comprueba que el comando responde en tu terminal.",
      "Descarga un modelo ligero para empezar, por ejemplo `ollama pull gemma3` o `ollama pull mistral`.",
      "Arranca una conversación con `ollama run mistral` y prueba preguntas en español.",
      "Cuando quieras integrarlo en una app, usa el endpoint local `http://localhost:11434/api/chat`.",
    ],
    tip: "Si el modelo va lento, elige una versión con menos parámetros o una cuantización Q4. La diferencia de calidad suele ser menor que la de velocidad.",
    link: { label: "Documentación de Ollama", url: "https://ollama.com/" },
  },
  {
    id: "hugging-face",
    title: "Probar modelos en Hugging Face sin instalar nada",
    intro:
      "Hugging Face aloja miles de modelos con demos interactivas. Es perfecto para comparar resultados antes de descargar pesos o montar infraestructura.",
    steps: [
      "Crea una cuenta gratuita en huggingface.co.",
      "Busca el modelo por nombre y entra en su ficha para ver la model card y la licencia.",
      "Abre la pestaña de inferencia o el Space asociado para probarlo en el navegador.",
      "Si te convence, descarga el modelo con `huggingface-cli` o intégralo con Transformers.",
    ],
    tip: "Las cuotas de inferencia gratuita son limitadas y pueden requerir iniciar sesión. No uses datos sensibles en demos públicas.",
    link: { label: "Hugging Face", url: "https://huggingface.co/" },
  },
  {
    id: "eleccion",
    title: "Elegir modelo según tu hardware",
    intro:
      "No existe el mejor modelo universal: existe el que cabe en tu equipo y resuelve tu tarea. Estas son las reglas básicas para acertar.",
    steps: [
      "Para 8 GB de RAM o menos, apunta a modelos de 1B a 4B cuantizados (Gemma pequeña, Phi, Qwen pequeños).",
      "Con 16 GB de RAM, los modelos de 7B a 9B suelen funcionar bien en CPU, aunque con latencia.",
      "Con una GPU de 8 GB de VRAM, prueba modelos de 7B en Q4; con 16 GB puedes subir a 13B.",
      "Para imágenes o audio, revisa los requisitos específicos: FLUX y Whisper grande agradecen una GPU dedicada.",
    ],
    tip: "La cuantización reduce el tamaño a cambio de una pérdida pequeña de calidad. Empieza por Q4_K_M en Ollama: es el equilibrio habitual.",
    link: { label: "Guía de cuantizaciones", url: "https://huggingface.co/docs/transformers/main/en/quantization/overview" },
  },
  {
    id: "rag",
    title: "Montar un RAG básico con embeddings gratis",
    intro:
      "Un modelo de chat no conoce tus documentos. Con un modelo de embeddings y una base vectorial puedes darle contexto sin entrenar nada.",
    steps: [
      "Divide tus documentos en fragmentos de 300 a 800 tokens con algo de solapamiento.",
      "Genera embeddings con BGE-M3 y guárdalos en una base vectorial como pgvector, Qdrant o Chroma.",
      "Cuando llegue una pregunta, calcula su embedding y recupera los fragmentos más similares.",
      "Envía esos fragmentos como contexto al modelo de chat y pídele que responda citando la fuente.",
    ],
    tip: "La calidad del RAG depende más de la fragmentación y de la recuperación que del modelo generador. Mide antes de cambiar de modelo.",
    link: { label: "BGE-M3 en Hugging Face", url: "https://huggingface.co/BAAI/bge-m3" },
  },
] as const

function GuidesPage() {
  useDocumentTitle("Guías")

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <SectionHeading
        as="h1"
        eyebrow="Protocolos · 03"
        title="Guías de uso"
        description="Cuatro rutas para pasar de la curiosidad a la práctica: ejecutar en local, probar en la nube, elegir según tu hardware y construir un RAG."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <HudPanel className="p-5 sm:p-6">
          <Accordion type="single" collapsible defaultValue="ollama" className="w-full">
            {guides.map((guide, index) => (
              <AccordionItem key={guide.id} value={guide.id}>
                <AccordionTrigger>
                  <span className="flex items-start gap-3">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-neon-cyan">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{guide.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p>{guide.intro}</p>
                  <ol className="mt-4 space-y-3">
                    {guide.steps.map((step, stepIndex) => (
                      <li key={step} className="flex gap-3">
                        <span className="mt-0.5 font-mono text-[10px] text-neon-cyan">
                          {String(stepIndex + 1).padStart(2, "0")}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-4 border-l-2 border-neon-acid/50 bg-neon-acid/5 px-4 py-3 text-sm text-ink/70">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon-acid">
                      // Tip
                    </span>
                    <p className="mt-1.5">{guide.tip}</p>
                  </div>
                  <a
                    href={guide.link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-neon-cyan transition-colors hover:text-neon-pink"
                  >
                    {guide.link.label}
                    <ExternalLink className="size-3" aria-hidden />
                  </a>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </HudPanel>

        <div className="space-y-5">
          <HudPanel className="relative overflow-hidden p-5 sm:p-6">
            <div className="scan-beam" aria-hidden />
            <div className="flex items-center gap-2">
              <Terminal className="size-4 text-neon-cyan" aria-hidden />
              <h2 className="cyber-label text-neon-cyan">// Comandos rápidos</h2>
            </div>
            <pre className="mt-4 overflow-x-auto font-mono text-[11px] leading-relaxed text-ink/75">
              <code>{`# instalar Ollama
winget install Ollama.Ollama

# descargar y probar
ollama pull gemma3
ollama run gemma3

# listar modelos locales
ollama list`}</code>
            </pre>
          </HudPanel>

          <HudPanel className="p-5 sm:p-6">
            <h2 className="cyber-label text-neon-cyan">// Antes de empezar</h2>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink/70">
              <li>Comprueba la licencia del modelo, no solo su precio.</li>
              <li>No envíes datos personales a demos públicas.</li>
              <li>Mide latencia y calidad con tus propios casos de uso.</li>
              <li>Los planes gratuitos pueden cambiar sin aviso.</li>
            </ul>
          </HudPanel>
        </div>
      </div>
    </section>
  )
}
