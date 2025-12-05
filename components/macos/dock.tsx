"use client"

import { useState } from "react"
import {
  FolderOpen,
  Calculator,
  StickyNote,
  Terminal,
  Settings,
  Globe,
  Mail,
  Music,
  MessageSquare,
  Calendar,
} from "lucide-react"
import type { AppWindow } from "./macos-desktop"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DockProps {
  openApp: (app: string) => void
  windows: AppWindow[]
  onWindowClick: (id: string) => void
}

const dockApps = [
  { id: "finder", name: "Finder", icon: FolderOpen, color: "#3b82f6" },
  { id: "safari", name: "Safari", icon: Globe, color: "#0ea5e9" },
  { id: "mail", name: "Mail", icon: Mail, color: "#3b82f6" },
  { id: "messages", name: "Messages", icon: MessageSquare, color: "#22c55e" },
  { id: "music", name: "Music", icon: Music, color: "#ec4899" },
  { id: "calendar", name: "Calendar", icon: Calendar, color: "#ef4444" },
  { id: "notes", name: "Notes", icon: StickyNote, color: "#eab308" },
  { id: "calculator", name: "Calculator", icon: Calculator, color: "#6b7280" },
  { id: "terminal", name: "Terminal", icon: Terminal, color: "#1f2937" },
  { id: "settings", name: "System Settings", icon: Settings, color: "#6b7280" },
]

export function Dock({ openApp, windows, onWindowClick }: DockProps) {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null)

  const isAppOpen = (appId: string) => windows.some((w) => w.app === appId)

  return (
    <TooltipProvider delayDuration={0}>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <div
          className="flex items-end gap-1 px-3 py-2 rounded-2xl transition-all duration-200 ease-out"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(30px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          }}
        >
          {dockApps.map((app, index) => {
            const Icon = app.icon
            const isHovered = hoveredApp === app.id
            const isOpen = isAppOpen(app.id)

            return (
              <Tooltip key={app.id}>
                <TooltipTrigger asChild>
                  <button
                    className="relative flex flex-col items-center transition-transform duration-200 ease-out p-1 rounded-lg"
                    style={{
                      transform: isHovered ? "translateY(-10px) scale(1.15)" : "translateY(0) scale(1)",
                    }}
                    onMouseEnter={() => setHoveredApp(app.id)}
                    onMouseLeave={() => setHoveredApp(null)}
                    onClick={() => {
                      const openWindow = windows.find((w) => w.app === app.id)
                      if (openWindow) {
                        onWindowClick(openWindow.id)
                      } else {
                        openApp(app.id)
                      }
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transition-all duration-200 ease-out"
                      style={{
                        backgroundColor: app.color,
                        boxShadow: isHovered ? "0 12px 25px rgba(0,0,0,0.4)" : "0 5px 15px rgba(0,0,0,0.2)",
                        transform: isHovered ? "scale(1.05)" : "scale(1)",
                      }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    {/* Running indicator */}
                    {isOpen && (
                      <div className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-white transition-opacity duration-200" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-neutral-800 text-white text-xs border-0 py-1 px-2 rounded-md shadow-lg"
                >
                  {app.name}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </div>
    </TooltipProvider>
  )
}
