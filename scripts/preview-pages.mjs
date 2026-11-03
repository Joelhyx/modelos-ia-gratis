import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import express from "express"

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const distDir = path.join(rootDir, "dist")
const base = process.env.VITE_BASE || "/"
const port = Number.parseInt(process.env.PORT ?? "4173", 10)
const notFoundFile = path.join(distDir, "404.html")

if (!existsSync(notFoundFile)) {
  console.error(
    "[preview:pages] Falta dist/404.html. Ejecuta primero `npm run build` (genera el fallback de GitHub Pages).",
  )
  process.exit(1)
}

const app = express()

app.use(base, express.static(distDir))
app.use((_req, res) => {
  res.status(404).sendFile(notFoundFile)
})

app.listen(port, "0.0.0.0", () => {
  console.log(`[preview:pages] Simulando GitHub Pages en http://localhost:${port}${base}`)
  console.log("[preview:pages] Las rutas profundas devuelven 404.html, igual que en GitHub Pages.")
})
