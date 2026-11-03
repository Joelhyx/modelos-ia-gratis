import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"

import "@fontsource/orbitron/latin-500.css"
import "@fontsource/orbitron/latin-700.css"
import "@fontsource/orbitron/latin-900.css"
import "@fontsource/rajdhani/latin-400.css"
import "@fontsource/rajdhani/latin-500.css"
import "@fontsource/rajdhani/latin-600.css"
import "@fontsource/rajdhani/latin-700.css"
import "@fontsource/jetbrains-mono/latin-400.css"
import "@fontsource/jetbrains-mono/latin-500.css"

import "./styles.css"
import { routeTree } from "./routeTree.gen"

const basepath = import.meta.env.BASE_URL.replace(/\/+$/, "") || "/"

const router = createRouter({
  routeTree,
  basepath,
  defaultPreload: "intent",
  scrollRestoration: true,
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error("No se encontró el elemento #root")
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
