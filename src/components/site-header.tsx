import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { ArrowUpRight, Menu, Terminal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { StatusBadge } from "@/components/cyber/status-badge"
import { navItems } from "@/data/navigation"

function Brand() {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="MODELOS//IA, ir al inicio">
      <span className="grid size-9 place-items-center border border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan transition-colors group-hover:border-neon-cyan group-hover:bg-neon-cyan/20">
        <Terminal className="size-4" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-sm font-bold tracking-[0.22em] text-ink">
          MODELOS<span className="text-neon-cyan">//</span>IA
        </span>
        <span className="mt-1 block font-mono text-[9px] tracking-[0.28em] text-dim">
          DIRECTORIO GRATUITO
        </span>
      </span>
    </Link>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-neon-cyan/15 bg-void/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Brand />

        <nav aria-label="Navegación principal" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ "aria-current": "page" }}
              className="relative py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-dim transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-neon-cyan after:transition-transform after:duration-200 hover:text-ink hover:after:scale-x-100 data-[status=active]:text-neon-cyan data-[status=active]:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <StatusBadge label="Sistema online" tone="green" className="hidden lg:inline-flex" />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Abrir menú de navegación">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Navegación</SheetTitle>
                <SheetDescription>Directorio de modelos de IA gratuitos.</SheetDescription>
              </SheetHeader>

              <nav aria-label="Navegación móvil" className="flex flex-col">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    activeProps={{ "aria-current": "page" }}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-white/5 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-dim transition-colors hover:text-neon-cyan data-[status=active]:text-neon-cyan"
                  >
                    {item.label}
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                ))}
              </nav>

              <SheetFooter>
                <StatusBadge label="Sistema online" tone="green" />
                <p className="font-mono text-[10px] leading-relaxed tracking-wider text-dim">
                  // Selección de modelos abiertos y gratuitos
                </p>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
