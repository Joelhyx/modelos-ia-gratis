import { copyFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const distDir = path.join(rootDir, "dist")
const indexFile = path.join(distDir, "index.html")
const notFoundFile = path.join(distDir, "404.html")

// GitHub Pages no reescribe rutas del SPA: sirve 404.html para rutas profundas.
// Copiamos el index para que el router resuelva la ruta en el navegador.
await copyFile(indexFile, notFoundFile)

// Evita que Jekyll procese el sitio en GitHub Pages.
await writeFile(path.join(distDir, ".nojekyll"), "")

console.log("[postbuild] dist/404.html y dist/.nojekyll generados para GitHub Pages")
