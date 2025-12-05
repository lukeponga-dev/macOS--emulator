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
          className="flex items-end gap-1 px-2 py-1 rounded-2xl"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
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
                    className="relative flex flex-col items-center transition-transform duration-150"
                    style={{
                      transform: isHovered ? "translateY(-8px) scale(1.2)" : "translateY(0) scale(1)",
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
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-shadow"
                      style={{
                        backgroundColor: app.color,
                        boxShadow: isHovered ? "0 8px 20px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.2)",
                      }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    {/* Running indicator */}
                    {isOpen && <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-white/80" />}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-neutral-800 text-white text-xs border-0">
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
