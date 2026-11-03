import { useMemo, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { SearchX, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ModelCard } from "@/components/model-card"
import { ModelFilters } from "@/components/model-filters"
import { SectionHeading } from "@/components/section-heading"
import { categoryMeta, models, type Category } from "@/data/models"
import { useDocumentTitle } from "@/lib/use-document-title"

export const Route = createFileRoute("/modelos/")({
  component: ModelsPage,
})

function ModelsPage() {
  useDocumentTitle("Catálogo de modelos")

  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<Category | "all">("all")
  const [license, setLicense] = useState("all")

  const filteredModels = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return models.filter((model) => {
      const matchesCategory = category === "all" || model.category === category
      const matchesLicense = license === "all" || model.license === license
      const haystack = [
        model.name,
        model.provider,
        model.summary,
        model.license,
        categoryMeta[model.category].label,
        ...model.access,
        ...model.strengths,
      ]
        .join(" ")
        .toLowerCase()
      const matchesQuery = normalizedQuery.length === 0 || haystack.includes(normalizedQuery)

      return matchesCategory && matchesLicense && matchesQuery
    })
  }, [query, category, license])

  function resetFilters() {
    setQuery("")
    setCategory("all")
    setLicense("all")
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          as="h1"
          eyebrow="Base de datos · 01"
          title="Catálogo de modelos"
          description="Filtra por categoría o licencia y encuentra el modelo gratuito que necesitas. Todas las fichas incluyen fortalezas, límites y enlaces oficiales."
        />
        <div className="hidden items-center gap-2 border border-white/10 bg-white/[0.02] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-dim sm:flex">
          <SlidersHorizontal className="size-3.5" aria-hidden />
          Filtros activos
        </div>
      </div>

      <div className="mt-10">
        <ModelFilters
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
          license={license}
          onLicenseChange={setLicense}
          onReset={resetFilters}
          resultCount={filteredModels.length}
          totalCount={models.length}
        />
      </div>

      {filteredModels.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredModels.map((model) => (
            <ModelCard key={model.slug} model={model} />
          ))}
        </div>
      ) : (
        <div className="hud-panel mt-8 flex flex-col items-center gap-4 px-6 py-16 text-center">
          <span className="grid size-12 place-items-center border border-neon-pink/30 bg-neon-pink/10 text-neon-pink">
            <SearchX className="size-5" aria-hidden />
          </span>
          <h2 className="font-display text-lg font-bold uppercase tracking-wider text-ink">
            Sin resultados
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-dim">
            Ningún modelo coincide con esos filtros. Prueba con otra categoría, revisa la licencia
            o borra la búsqueda.
          </p>
          <Button type="button" variant="outline" onClick={resetFilters}>
            Reiniciar filtros
          </Button>
        </div>
      )}

      <p className="mt-10 border-t border-white/5 pt-5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-dim/80">
        // La disponibilidad gratuita depende del proveedor. Comprueba siempre la licencia y los
        &nbsp;límites del plan antes de desplegar.
      </p>
    </section>
  )
}
