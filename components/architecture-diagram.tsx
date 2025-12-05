"use client"

import { cn } from "@/lib/utils"

interface ArchitectureDiagramProps {
  activeLayer: string | null
  onLayerHover: (layer: string | null) => void
}

export function ArchitectureDiagram({ activeLayer, onLayerHover }: ArchitectureDiagramProps) {
  const layers = [
    {
      id: "presentation",
      label: "Presentation Layer",
      sublabel: "UI, Debug Console, Settings",
      color: "bg-blue-500/20 border-blue-500/50",
      activeColor: "bg-blue-500/40 border-blue-500",
    },
    {
      id: "emulation",
      label: "Emulation Core",
      sublabel: "CPU, MMU, Scheduler, Event System",
      color: "bg-emerald-500/20 border-emerald-500/50",
      activeColor: "bg-emerald-500/40 border-emerald-500",
    },
    {
      id: "hal",
      label: "Hardware Abstraction Layer",
      sublabel: "GPU, Audio, USB, Storage Drivers",
      color: "bg-amber-500/20 border-amber-500/50",
      activeColor: "bg-amber-500/40 border-amber-500",
    },
    {
      id: "host",
      label: "Host Interface Layer",
      sublabel: "OS Bindings, File I/O, Network Bridge",
      color: "bg-rose-500/20 border-rose-500/50",
      activeColor: "bg-rose-500/40 border-rose-500",
    },
  ]

  return (
    <div className="p-6 rounded-xl bg-muted/50 border border-border">
      <p className="text-sm font-medium mb-4 text-muted-foreground">System Architecture Layers</p>
      <div className="space-y-3">
        {layers.map((layer, index) => (
          <div
            key={layer.id}
            onMouseEnter={() => onLayerHover(layer.id)}
            onMouseLeave={() => onLayerHover(null)}
            className={cn(
              "p-4 rounded-lg border-2 transition-all cursor-pointer",
              activeLayer === layer.id ? layer.activeColor : layer.color,
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{layer.label}</p>
                <p className="text-xs text-muted-foreground">{layer.sublabel}</p>
              </div>
              <div className="text-xs text-muted-foreground">Layer {index + 1}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <span>↑ Guest (macOS)</span>
        <span className="w-px h-4 bg-border" />
        <span>↓ Host (Linux/Windows/macOS)</span>
      </div>
    </div>
  )
}
