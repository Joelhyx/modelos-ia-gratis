import { Link } from "@tanstack/react-router"
import { Terminal } from "lucide-react"

import { StatusBadge } from "@/components/cyber/status-badge"
import { navItems } from "@/data/navigation"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-neon-cyan/15 bg-void/60">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="grid size-8 place-items-center border border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan">
              <Terminal className="size-4" />
            </span>
            <span className="font-display text-sm font-bold tracking-[0.22em] text-ink">
              MODELOS<span className="text-neon-cyan">//</span>IA
            </span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-dim">
            Un directorio en español de modelos de inteligencia artificial que puedes descargar,
            ejecutar o probar sin pagar. Sin registros, sin ruido y sin humo.
          </p>
          <div className="mt-5">
            <StatusBadge label="Directorio operativo" tone="green" />
          </div>
        </div>

        <div>
          <h2 className="cyber-label text-neon-cyan">// Secciones</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim transition-colors hover:text-neon-cyan"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="cyber-label text-neon-cyan">// Aviso</h2>
          <p className="mt-4 text-sm leading-relaxed text-dim">
            Las licencias y los planes gratuitos cambian con el tiempo. Verifica siempre las
            condiciones en la web oficial del modelo antes de usarlo en producción.
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-dim/70">
            © {year} MODELOS//IA
          </p>
        </div>
      </div>
    </footer>
  )
}
