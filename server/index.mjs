import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import compression from "compression"
import express from "express"
import helmet from "helmet"

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(currentDir, "..", "dist")
const indexFile = path.join(distDir, "index.html")
const port = Number.parseInt(process.env.PORT ?? "3000", 10)

if (!existsSync(indexFile)) {
  console.error(
    "[modelos-ia] No se encontró dist/index.html. Ejecuta `npm run build` antes de arrancar el servidor.",
  )
  process.exit(1)
}

const app = express()

app.disable("x-powered-by")
app.set("trust proxy", 1)

app.use(compression())
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: null,
      },
    },
    crossOriginEmbedderPolicy: false,
  }),
)

// Assets con hash: cache agresiva. El resto de estáticos, cache normal.
app.use(
  "/assets",
  express.static(path.join(distDir, "assets"), {
    immutable: true,
    maxAge: "1y",
    fallthrough: false,
  }),
)

app.use(
  express.static(distDir, {
    index: false,
    setHeaders(res, filePath) {
      if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache")
      }
    },
  }),
)

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  })
})

// Fallback SPA: cualquier ruta GET devuelve el index para que el router resuelva.
app.get("/{*splat}", (_req, res) => {
  res.setHeader("Cache-Control", "no-cache")
  res.sendFile(indexFile)
})

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" })
})

// Manejo de errores (por ejemplo, assets inexistentes servidos con fallthrough: false).
app.use((err, _req, res, _next) => {
  const status = err.statusCode ?? err.status ?? 500

  if (status === 404) {
    res.status(404).json({ error: "Not found" })
    return
  }

  console.error("[modelos-ia] Error inesperado:", err)
  res.status(500).json({ error: "Internal server error" })
})

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`[modelos-ia] Servidor escuchando en http://localhost:${port}`)
})

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    server.close(() => process.exit(0))
  })
}
