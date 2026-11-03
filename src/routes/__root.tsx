import { createRootRoute, Link, Outlet, type ErrorComponentProps } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import { GlitchText } from "@/components/cyber/glitch-text"
import { GridBackground } from "@/components/cyber/grid-background"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { useDocumentTitle } from "@/lib/use-document-title"

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
  errorComponent: RootError,
})

function RootLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-neon-cyan focus:bg-void focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-neon-cyan"
      >
        Saltar al contenido
      </a>
      <GridBackground />
      <SiteHeader />
      <main id="contenido" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

function NotFoundPage() {
  useDocumentTitle("Ruta no encontrada")

  return (
    <section className="mx-auto flex min-h-[65vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-24 text-center">
      <GlitchText
        text="404"
        className="font-display text-7xl font-black tracking-tight text-neon-cyan sm:text-9xl"
      />
      <p className="cyber-label mt-6 text-neon-pink">// Señal perdida</p>
      <h1 className="mt-3 font-display text-2xl font-bold uppercase tracking-wider text-ink sm:text-3xl">
        Esta ruta no existe
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-dim">
        El nodo al que intentas acceder no está en el directorio. Puede que el enlace haya
        cambiado o que el modelo aún no esté indexado.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link to="/">Volver al inicio</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/modelos">Explorar modelos</Link>
        </Button>
      </div>
    </section>
  )
}

function RootError({ error, reset }: ErrorComponentProps) {
  return (
    <section className="mx-auto flex min-h-[65vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="cyber-label text-neon-pink">// Fallo del sistema</p>
      <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-wider text-ink">
        Algo se ha roto
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-dim">
        {error instanceof Error ? error.message : "Error inesperado en la aplicación."}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Reintentar</Button>
        <Button asChild variant="outline">
          <Link to="/">Ir al inicio</Link>
        </Button>
      </div>
    </section>
  )
}
