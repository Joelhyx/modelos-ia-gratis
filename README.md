# MODELOS//IA

Directorio cyberpunk de modelos de inteligencia artificial gratuitos. React + TypeScript con
TanStack Router (file-based), Tailwind CSS 4 y shadcn/ui, servido en producción por un servidor
Node.js con Express.

## Qué incluye

- **Inicio** con hero, modelos destacados y guía rápida.
- **Catálogo** con buscador y filtros por categoría y licencia.
- **Ficha** por modelo con descripción, fortalezas, límites, especificaciones y enlaces.
- **Comparativa** de licencias, tamaños y plataformas de acceso.
- **Guías** prácticas (Ollama, Hugging Face, hardware y RAG).
- **Acerca de** con criterios de selección y aviso legal.
- Navegación interna 100 % con `<Link>` de TanStack Router, incluido el menú móvil.
- Estética cyberpunk cinematográfica, responsive y con respeto a `prefers-reduced-motion`.

## Stack

| Capa | Tecnología |
| --- | --- |
| Build | Vite 8 |
| UI | React 19 + TypeScript |
| Routing | TanStack Router 1.x (file-based) |
| Estilos | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Componentes | shadcn/ui + Radix UI + lucide-react |
| Servidor | Node.js 22+ + Express 5 |

## Requisitos

- Node.js 22 o superior (probado con Node 26).
- npm 10 o superior.

## Desarrollo

```bash
npm install
npm run dev
```

La web queda disponible en `http://localhost:5173`. El plugin de TanStack Router genera
`src/routeTree.gen.ts` automáticamente al arrancar.

## Producción

```bash
npm run build
npm start
```

`npm run build` genera el árbol de rutas, comprueba los tipos y construye `dist/`.
`npm start` levanta Express en `http://localhost:3000` (configurable con `PORT`).

El servidor incluye:

- Fallback SPA para que rutas como `/modelos/llama` funcionen al recargar.
- Cache inmutable para `/assets` y `no-cache` para `index.html`.
- Compresión gzip y cabeceras de seguridad con Helmet.
- Endpoint de salud en `/health`.

```bash
# ejemplo con otro puerto
PORT=8080 npm start
```

## Docker

```bash
docker build -t modelos-ia-gratis .
docker run --rm -p 3000:3000 modelos-ia-gratis
```

La imagen usa un build multi-stage sobre `node:24-alpine`, ejecuta como usuario `node` e incluye
un `HEALTHCHECK` contra `/health`.

### Despliegue rápido

- **Render / Railway / Fly.io:** conecta el repositorio, usa `npm run build` como comando de build
  y `npm start` como comando de arranque. Configura `PORT` si la plataforma lo requiere.
- **VPS con Docker:** construye la imagen, publica el puerto y pon Nginx o Caddy delante como
  proxy inverso con HTTPS.
- **Solo estático:** el contenido de `dist/` también puede servirse en Vercel, Netlify o
  Cloudflare Pages, pero necesitarás configurar el fallback SPA del hosting.

## Publicar en GitHub Pages

El repositorio incluye un workflow (`.github/workflows/deploy-pages.yml`) que compila la web y la
publica automáticamente en GitHub Pages cada vez que haces push a `main`.

1. Crea un repositorio vacío en GitHub (por ejemplo, `modelos-ia-gratis`).
2. Sube el proyecto:

   ```bash
   git init -b main
   git add .
   git commit -m "Publicar MODELOS//IA"
   git remote add origin https://github.com/joelhyx/modelos-ia-gratis.git
   git push -u origin main
   ```

3. En GitHub, entra en **Settings → Pages → Build and deployment** y selecciona
   **GitHub Actions** como source.
4. Espera a que termine el workflow en la pestaña **Actions**. La web quedará en
   `https://joelhyx.github.io/modelos-ia-gratis/`.

El workflow calcula automáticamente la subruta (`/<repositorio>/`) y el router se configura con
esa base, así que los enlaces y las recargas profundas funcionan. Para un repositorio de usuario
u organización (`joelhyx.github.io`) usa la raíz `/` automáticamente.

Si usas un **dominio propio**, crea una variable de repositorio llamada `VITE_BASE` con el valor
`/` en **Settings → Secrets and variables → Actions → Variables**, y añade tu dominio en Pages.

### Probar el build de GitHub Pages en local

```powershell
$env:VITE_BASE="/modelos-ia-gratis/"
npm run build
npm run preview:pages
```

`npm run preview:pages` simula GitHub Pages en `http://localhost:4173/modelos-ia-gratis/`,
incluido el fallback de rutas profundas. El build genera también `dist/404.html` y
`dist/.nojekyll`. GitHub Pages sirve ese `404.html` para rutas profundas (`/modelos/llama`); la
app arranca y el router resuelve la ruta en el navegador. Ten en cuenta que la respuesta HTTP de
esas rutas es 404 aunque el contenido se renderice correctamente: es el comportamiento estándar
de un SPA en GitHub Pages.

## Estructura

```
.
├─ src/
│  ├─ routes/                 # rutas file-based
│  │  ├─ __root.tsx           # layout, 404 y error boundary
│  │  ├─ index.tsx            # inicio
│  │  ├─ modelos/index.tsx    # catálogo
│  │  ├─ modelos/$slug.tsx    # ficha de modelo
│  │  ├─ comparativa.tsx
│  │  ├─ guias.tsx
│  │  └─ acerca.tsx
│  ├─ components/
│  │  ├─ ui/                  # componentes shadcn/ui
│  │  ├─ cyber/               # glitch, HUD, rejilla, badges
│  │  ├─ model-card.tsx
│  │  ├─ model-filters.tsx
│  │  ├─ site-header.tsx
│  │  └─ site-footer.tsx
│  ├─ data/
│  │  ├─ models.ts            # contenido del catálogo
│  │  └─ navigation.ts        # secciones del menú
│  ├─ lib/
│  ├─ styles.css              # tokens y efectos cyberpunk
│  └─ routeTree.gen.ts        # generado, no editar
├─ server/index.mjs
├─ Dockerfile
└─ vite.config.ts
```

## Añadir o editar modelos

Todo el contenido vive en `src/data/models.ts`. Para añadir un modelo, agrega un objeto al array
`models` con este formato:

```ts
{
  slug: "mi-modelo",
  name: "Mi Modelo",
  provider: "Proveedor",
  category: "chat", // chat | razonamiento | imagen | audio | embeddings
  license: "Apache 2.0",
  size: "7B",
  access: ["Ollama", "Hugging Face"],
  summary: "Resumen de una línea.",
  description: "Descripción completa.",
  strengths: ["Punto fuerte"],
  limitations: ["Limitación"],
  links: [{ label: "Sitio oficial", url: "https://example.com" }],
  featured: false,
}
```

El catálogo, la comparativa, las fichas y los contadores de la portada se actualizan
automáticamente.

## Accesibilidad

- Contraste alto en texto de lectura; el neón se reserva para acentos.
- Foco visible en todos los controles.
- `prefers-reduced-motion` desactiva glitch, scanlines y animaciones.
- Menú móvil con diálogo accesible de Radix (foco atrapado y cierre con Escape).

## Licencia

El código de este proyecto se distribuye con fines educativos. Los modelos enlazados mantienen sus
propias licencias; consulta siempre la fuente oficial antes de usarlos en producción.

## Créditos

Proyecto creado por el alumno **joelhyx** con agentes de inteligencia artificial.
