import * as React from "react"

import { cn } from "@/lib/utils"

type HudPanelProps = React.ComponentProps<"div"> & {
  interactive?: boolean
}

export function HudPanel({ className, interactive = false, ...props }: HudPanelProps) {
  return (
    <div
      className={cn("hud-panel", interactive && "hud-interactive", className)}
      {...props}
    />
  )
}
