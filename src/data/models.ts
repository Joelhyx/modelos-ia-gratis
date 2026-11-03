export type Category = "chat" | "razonamiento" | "imagen" | "audio" | "embeddings"

export type ModelLink = {
  label: string
  url: string
}

export type AIModel = {
  slug: string
  name: string
  provider: string
  category: Category
  license: string
  size: string
  access: string[]
  summary: string
  description: string
  strengths: string[]
  limitations: string[]
  links: ModelLink[]
  featured?: boolean
}

export const categoryMeta: Record<Category, { label: string; description: string }> = {
  chat: {
    label: "Chat",
    description: "Conversación general, redacción, resúmenes y asistencia diaria.",
  },
  razonamiento: {
    label: "Razonamiento",
    description: "Matemáticas, lógica, análisis paso a paso y problemas complejos.",
  },
  imagen: {
    label: "Imagen",
    description: "Generación de ilustraciones, conceptos y arte a partir de texto.",
  },
  audio: {
    label: "Audio",
    description: "Transcripción de voz, texto a voz y procesamiento de audio.",
  },
  embeddings: {
    label: "Embeddings",
    description: "Búsqueda semántica, RAG y representaciones vectoriales de texto.",
  },
}

export const models: AIModel[] = [
  {
    slug: "llama",
    name: "Llama",
    provider: "Meta",
    category: "chat",
    license: "Licencia comunitaria Llama",
    size: "1B – 405B",
    access: ["Ollama", "Hugging Face", "Groq"],
    summary: "La familia abierta de Meta para conversación, código y tareas generales.",
    description:
      "Llama es una de las familias de modelos abiertos más utilizadas del mundo. Meta publica los pesos para que puedas descargarlos y ejecutarlos en tu propio equipo, y su ecosistema de herramientas, variantes afinadas y cuantizaciones es enorme. Es una apuesta segura cuando quieres un modelo generalista con mucha documentación y comunidad detrás.",
    strengths: [
      "Ecosistema enorme y muchísimas variantes afinadas",
      "Buen rendimiento en español y en tareas de código",
      "Tamaños desde 1B, ejecutables en portátiles modestos",
    ],
    limitations: [
      "La licencia comunitaria no es de código abierto estricta",
      "Los modelos grandes necesitan GPU con bastante VRAM",
      "Hay restricciones de uso comercial para grandes plataformas",
    ],
    links: [
      { label: "Sitio oficial", url: "https://www.llama.com/" },
      { label: "Modelos en Hugging Face", url: "https://huggingface.co/meta-llama" },
    ],
    featured: true,
  },
  {
    slug: "mistral",
    name: "Mistral",
    provider: "Mistral AI",
    category: "chat",
    license: "Apache 2.0 en varias versiones",
    size: "7B – 123B",
    access: ["Ollama", "Hugging Face", "Mistral AI"],
    summary: "Modelos europeos eficientes, con versiones Apache 2.0 listas para producción.",
    description:
      "Mistral AI publica modelos compactos y rápidos que compiten con alternativas mucho más grandes. Varias de sus versiones usan licencia Apache 2.0, lo que permite uso comercial sin las fricciones de otras licencias comunitarias. Son una opción muy habitual para desplegar en servidores modestos o incluso en local.",
    strengths: [
      "Licencia Apache 2.0 en buena parte de la familia",
      "Muy buena relación calidad / tamaño",
      "Multilingüe y con buen soporte de herramientas",
    ],
    limitations: [
      "No todas las versiones comparten la misma licencia",
      "Los modelos más grandes usan licencias propias",
      "Ecosistema algo menor que el de Llama",
    ],
    links: [
      { label: "Sitio oficial", url: "https://mistral.ai/" },
      { label: "Modelos en Hugging Face", url: "https://huggingface.co/mistralai" },
    ],
    featured: true,
  },
  {
    slug: "gemma",
    name: "Gemma",
    provider: "Google DeepMind",
    category: "chat",
    license: "Términos de uso de Gemma",
    size: "270M – 27B",
    access: ["Ollama", "Hugging Face", "Google AI Studio"],
    summary: "Modelos ligeros de Google que funcionan muy bien en equipos personales.",
    description:
      "Gemma nace de la misma investigación que los modelos Gemini de Google, pero se distribuye con pesos abiertos y tamaños pensados para ejecutarse en local. Las versiones pequeñas son ideales para prototipos y aplicaciones en el navegador o en portátiles, mientras que las medianas ofrecen una calidad sorprendente para su tamaño.",
    strengths: [
      "Tamaños pequeños muy eficientes",
      "Integración gratuita con Google AI Studio",
      "Buen equilibrio entre calidad y requisitos de hardware",
    ],
    limitations: [
      "Licencia propia con condiciones de uso",
      "Menos flexible que Apache 2.0 para productos comerciales",
      "Ventana de contexto más corta en las versiones pequeñas",
    ],
    links: [
      { label: "Gemma en Google", url: "https://ai.google.dev/gemma" },
      { label: "Modelos en Hugging Face", url: "https://huggingface.co/google" },
    ],
    featured: true,
  },
  {
    slug: "qwen",
    name: "Qwen",
    provider: "Alibaba",
    category: "chat",
    license: "Apache 2.0",
    size: "0.5B – 235B",
    access: ["Ollama", "Hugging Face", "ModelScope"],
    summary: "Familia multilingüe con un rendimiento excelente en español y código.",
    description:
      "Qwen se ha convertido en una de las familias abiertas más completas: cubre desde modelos minúsculos para móviles hasta versiones enormes de tipo Mixture of Experts. Destaca por su multilingüismo real, su capacidad para programar y una licencia Apache 2.0 que simplifica muchísimo el uso comercial.",
    strengths: [
      "Multilingüe muy sólido, incluido el español",
      "Licencia Apache 2.0 en la mayoría de tamaños",
      "Excelente en código, matemáticas y herramientas",
    ],
    limitations: [
      "Las versiones gigantes requieren infraestructura seria",
      "Algunas variantes especiales usan otra licencia",
      "La documentación mezcla inglés y chino",
    ],
    links: [
      { label: "Qwen en GitHub", url: "https://github.com/QwenLM" },
      { label: "Modelos en Hugging Face", url: "https://huggingface.co/Qwen" },
    ],
    featured: true,
  },
  {
    slug: "deepseek-r1",
    name: "DeepSeek-R1",
    provider: "DeepSeek",
    category: "razonamiento",
    license: "MIT",
    size: "1.5B – 671B",
    access: ["Hugging Face", "Ollama"],
    summary: "Razonamiento paso a paso con licencia MIT y destilados para equipos modestos.",
    description:
      "DeepSeek-R1 popularizó los modelos de razonamiento abiertos: antes de responder, genera una cadena de pensamiento que le permite resolver problemas de matemáticas, lógica y programación. La licencia MIT y los modelos destilados más pequeños hacen que puedas probar la técnica de razonamiento sin un clúster de GPUs.",
    strengths: [
      "Licencia MIT, muy permisiva",
      "Razonamiento fuerte en matemáticas y código",
      "Destilados pequeños que funcionan en local",
    ],
    limitations: [
      "Genera más tokens y tarda más en responder",
      "El modelo completo necesita hardware de gama alta",
      "La versión oficial aplica filtros de contenido",
    ],
    links: [
      { label: "Repositorio en GitHub", url: "https://github.com/deepseek-ai/DeepSeek-R1" },
      { label: "Modelos en Hugging Face", url: "https://huggingface.co/deepseek-ai" },
    ],
    featured: true,
  },
  {
    slug: "phi",
    name: "Phi",
    provider: "Microsoft",
    category: "razonamiento",
    license: "MIT",
    size: "3.8B – 14B",
    access: ["Hugging Face", "Ollama"],
    summary: "Modelos pequeños centrados en razonamiento y matemáticas, con licencia MIT.",
    description:
      "La familia Phi demuestra que un modelo pequeño, bien entrenado con datos de calidad, puede razonar bastante bien. Está pensada para entornos con recursos limitados: portátiles, edge computing o aplicaciones donde la latencia importa más que el conocimiento enciclopédico.",
    strengths: [
      "Muy eficiente en CPU y portátiles",
      "Buen razonamiento para su tamaño",
      "Licencia MIT y pesos fáciles de encontrar",
    ],
    limitations: [
      "Conocimiento general más limitado que modelos grandes",
      "Menos multilingüe que Qwen o Mistral",
      "No es la mejor opción para tareas creativas largas",
    ],
    links: [
      { label: "Phi en Hugging Face", url: "https://huggingface.co/microsoft" },
      { label: "Documentación de Microsoft", url: "https://azure.microsoft.com/en-us/products/phi" },
    ],
  },
  {
    slug: "whisper",
    name: "Whisper",
    provider: "OpenAI",
    category: "audio",
    license: "MIT",
    size: "39M – 1.55B",
    access: ["Hugging Face", "faster-whisper", "Groq"],
    summary: "El estándar abierto para transcribir audio y vídeo a texto.",
    description:
      "Whisper es un modelo de reconocimiento de voz entrenado con una enorme cantidad de audio multilingüe. Sigue siendo la referencia cuando necesitas transcribir clases, entrevistas, podcasts o vídeos sin pagar por minuto. Existen implementaciones optimizadas como faster-whisper que multiplican su velocidad.",
    strengths: [
      "Muy buen multilingüismo, incluido el español",
      "Varios tamaños según precisión y velocidad",
      "Ecosistema maduro y muchas herramientas",
    ],
    limitations: [
      "Puede inventar frases en silencios o ruido",
      "No separa hablantes por sí solo",
      "Las versiones grandes piden GPU para ir rápido",
    ],
    links: [
      { label: "Repositorio en GitHub", url: "https://github.com/openai/whisper" },
      { label: "Modelos en Hugging Face", url: "https://huggingface.co/openai/whisper-large-v3" },
    ],
    featured: true,
  },
  {
    slug: "kokoro",
    name: "Kokoro",
    provider: "Kokoro Project",
    category: "audio",
    license: "Apache 2.0",
    size: "82M",
    access: ["Hugging Face", "Kokoro-ONNX"],
    summary: "Texto a voz ligero y natural que corre incluso en CPU.",
    description:
      "Kokoro es un modelo de síntesis de voz sorprendentemente pequeño que genera audio natural con muy pocos recursos. Es ideal para narraciones, audiolibros, vídeos o sistemas de accesibilidad sin depender de servicios en la nube. Su licencia Apache 2.0 permite integrarlo en productos propios.",
    strengths: [
      "Solo 82M de parámetros: funciona en CPU",
      "Voces de calidad y generación rápida",
      "Licencia Apache 2.0 para uso comercial",
    ],
    limitations: [
      "La mayoría de voces están en inglés",
      "No hace clonación de voz",
      "El español depende de voces comunitarias",
    ],
    links: [
      { label: "Repositorio en GitHub", url: "https://github.com/hexgrad/kokoro" },
      { label: "Modelo en Hugging Face", url: "https://huggingface.co/hexgrad/Kokoro-82M" },
    ],
  },
  {
    slug: "flux-schnell",
    name: "FLUX.1 [schnell]",
    provider: "Black Forest Labs",
    category: "imagen",
    license: "Apache 2.0",
    size: "12B",
    access: ["Hugging Face", "fal.ai", "Replicate"],
    summary: "Generación de imágenes de alta calidad en solo cuatro pasos.",
    description:
      "FLUX.1 schnell es la versión rápida de la familia FLUX: genera imágenes detalladas con muy pocos pasos de inferencia, lo que la hace viable en GPUs de consumo. Destaca por su fidelidad al prompt y por escribir texto legible dentro de las imágenes, algo que muchos modelos anteriores no lograban.",
    strengths: [
      "Calidad alta con solo 4 pasos",
      "Licencia Apache 2.0 para uso comercial",
      "Muy buen seguimiento del prompt y del texto",
    ],
    limitations: [
      "Necesita una GPU con VRAM considerable",
      "Menos control fino que herramientas de edición",
      "Los endpoints gratuitos suelen tener cola o límites",
    ],
    links: [
      { label: "FLUX en Black Forest Labs", url: "https://blackforestlabs.ai/" },
      { label: "Modelo en Hugging Face", url: "https://huggingface.co/black-forest-labs" },
    ],
    featured: true,
  },
  {
    slug: "bge-m3",
    name: "BGE-M3",
    provider: "BAAI",
    category: "embeddings",
    license: "MIT",
    size: "568M",
    access: ["Hugging Face", "Sentence Transformers", "FlagEmbedding"],
    summary: "Embeddings multilingües para búsqueda semántica y RAG.",
    description:
      "BGE-M3 es un modelo de embeddings que combina búsqueda densa, dispersa y multi-vector en un solo modelo. Es la pieza clave de muchos sistemas RAG: convierte documentos y preguntas en vectores para recuperar la información relevante antes de pasársela a un modelo de chat. Soporta contextos largos y más de cien idiomas.",
    strengths: [
      "Multilingüe con más de 100 idiomas",
      "Combina denso, disperso y multi-vector",
      "Licencia MIT y buen rendimiento en CPU",
    ],
    limitations: [
      "No genera texto: solo representaciones",
      "Necesita una base vectorial para producción",
      "El contexto largo aumenta el coste de cómputo",
    ],
    links: [
      { label: "Modelo en Hugging Face", url: "https://huggingface.co/BAAI/bge-m3" },
      { label: "Repositorio en GitHub", url: "https://github.com/FlagOpen/FlagEmbedding" },
    ],
  },
]

export const categories = Object.keys(categoryMeta) as Category[]

export function getModelBySlug(slug: string) {
  return models.find((model) => model.slug === slug)
}

export const featuredModels = models.filter((model) => model.featured)

export const licenses = [...new Set(models.map((model) => model.license))].sort((a, b) => a.localeCompare(b, "es"))
