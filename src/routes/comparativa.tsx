import { createFileRoute, Link } from "@tanstack/react-router"
import { Info, Scale } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { HudPanel } from "@/components/cyber/hud-panel"
import { SectionHeading } from "@/components/section-heading"
import { categoryMeta, models } from "@/data/models"
import { categoryAccent } from "@/components/model-card"
import { useDocumentTitle } from "@/lib/use-document-title"

export const Route = createFileRoute("/comparativa")({
  component: ComparisonPage,
})

function ComparisonPage() {
  useDocumentTitle("Comparativa")

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <SectionHeading
        as="h1"
        eyebrow="Análisis · 02"
        title="Comparativa de licencias"
        description="Una vista rápida para decidir qué modelo encaja con tu proyecto. La licencia importa tanto como la calidad: Apache 2.0 y MIT son las opciones más flexibles para uso comercial."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <HudPanel className="p-5">
          <p className="cyber-label">// Modelos indexados</p>
          <p className="mt-2 font-display text-3xl font-bold text-neon-cyan">{models.length}</p>
        </HudPanel>
        <HudPanel className="p-5">
          <p className="cyber-label">// Licencias permisivas</p>
          <p className="mt-2 font-display text-3xl font-bold text-neon-cyan">
            {models.filter((model) => /apache|mit/i.test(model.license)).length}
          </p>
        </HudPanel>
        <HudPanel className="p-5">
          <p className="cyber-label">// Categorías cubiertas</p>
          <p className="mt-2 font-display text-3xl font-bold text-neon-cyan">
            {new Set(models.map((model) => model.category)).size}
          </p>
        </HudPanel>
      </div>

      <HudPanel className="mt-8 overflow-hidden p-0">
        <div className="flex items-center justify-between gap-4 border-b border-white/5 bg-white/[0.02] px-5 py-3">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
            <Scale className="size-3.5 text-neon-cyan" aria-hidden />
            matriz de decisión
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim/70">
            {models.length} registros
          </span>
        </div>

        <div className="p-1 sm:p-2">
          <Table className="min-w-[820px]">
            <TableHeader>
              <TableRow>
                <TableHead>Modelo</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Licencia</TableHead>
                <TableHead>Tamaño</TableHead>
                <TableHead>Acceso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {models.map((model) => (
                <TableRow key={model.slug}>
                  <TableCell>
                    <Link
                      to="/modelos/$slug"
                      params={{ slug: model.slug }}
                      className="font-display text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:text-neon-cyan"
                    >
                      {model.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-ink/70">{model.provider}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={categoryAccent[model.category]}>
                      {categoryMeta[model.category].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-[11px] text-ink/70">{model.license}</TableCell>
                  <TableCell className="font-mono text-xs text-ink/70">{model.size}</TableCell>
                  <TableCell className="font-mono text-[11px] text-dim">
                    {model.access.join(" · ")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </HudPanel>

      <HudPanel className="mt-6 flex items-start gap-3 p-5">
        <Info className="mt-0.5 size-4 shrink-0 text-neon-acid" aria-hidden />
        <div className="text-sm leading-relaxed text-ink/70">
          <p>
            <strong className="font-semibold text-ink">Apache 2.0 y MIT</strong> permiten uso
            comercial, modificación y redistribución con muy pocas condiciones. Las licencias
            comunitarias (Llama, Gemma) también son gratuitas, pero incluyen cláusulas específicas.
          </p>
          <p className="mt-2">
            Los planes gratuitos de Groq, Google AI Studio o Hugging Face son independientes de la
            licencia del modelo: pueden cambiar sus cuotas en cualquier momento.
          </p>
        </div>
      </HudPanel>
    </section>
  )
}
