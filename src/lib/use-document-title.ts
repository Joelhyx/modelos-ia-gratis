import { useEffect } from "react"

const BASE_TITLE = "MODELOS//IA"

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${BASE_TITLE}` : `${BASE_TITLE} · Directorio de modelos de IA gratuitos`
  }, [title])
}
