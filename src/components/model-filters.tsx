import { ChevronDown, RotateCcw, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { categories, categoryMeta, licenses, type Category } from "@/data/models"

type ModelFiltersProps = {
  query: string
  onQueryChange: (value: string) => void
  category: Category | "all"
  onCategoryChange: (value: Category | "all") => void
  license: string
  onLicenseChange: (value: string) => void
  onReset: () => void
  resultCount: number
  totalCount: number
}

export function ModelFilters({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  license,
  onLicenseChange,
  onReset,
  resultCount,
  totalCount,
}: ModelFiltersProps) {
  return (
    <div className="hud-panel p-5 sm:p-6">
      <div className="grid gap-4 md:grid-cols-[1fr_240px]">
        <div>
          <label htmlFor="model-search" className="cyber-label mb-2 block">
            // Buscar
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-dim"
              aria-hidden
            />
            <Input
              id="model-search"
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Nombre, proveedor o etiqueta…"
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label htmlFor="license-filter" className="cyber-label mb-2 block">
            // Licencia
          </label>
          <div className="relative">
            <select
              id="license-filter"
              value={license}
              onChange={(event) => onLicenseChange(event.target.value)}
              className="h-11 w-full appearance-none border border-neon-cyan/20 bg-panel px-3 pr-9 font-mono text-[11px] uppercase tracking-[0.12em] text-ink transition-colors focus-visible:border-neon-cyan/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/25"
            >
              <option value="all">Todas las licencias</option>
              {licenses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-dim"
              aria-hidden
            />
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="cyber-label mr-1">// Categoría</span>
        <button
          type="button"
          onClick={() => onCategoryChange("all")}
          aria-pressed={category === "all"}
          className={cn(
            "clip-corner border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors",
            category === "all"
              ? "border-neon-cyan bg-neon-cyan/15 text-neon-cyan"
              : "border-white/10 bg-white/[0.02] text-dim hover:border-neon-cyan/40 hover:text-ink",
          )}
        >
          Todas
        </button>
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onCategoryChange(item)}
            aria-pressed={category === item}
            className={cn(
              "clip-corner border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors",
              category === item
                ? "border-neon-cyan bg-neon-cyan/15 text-neon-cyan"
                : "border-white/10 bg-white/[0.02] text-dim hover:border-neon-cyan/40 hover:text-ink",
            )}
          >
            {categoryMeta[item].label}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim" aria-live="polite">
          {resultCount} de {totalCount} modelos
        </p>
        <Button type="button" variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="size-3.5" aria-hidden />
          Reiniciar filtros
        </Button>
      </div>
    </div>
  )
}
