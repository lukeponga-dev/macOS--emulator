"use client"

import { useState, useRef, MouseEvent } from "react"
import {
  FolderOpen, Calculator, StickyNote, Terminal, Settings, Globe, Mail,
  Music, MessageSquare, Calendar, Trash2
} from "lucide-react"
import type { AppWindow } from "./macos-desktop"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DockProps {
  openApp: (app: string) => void
  windows: AppWindow[]
  onWindowClick: (id: string) => void
}

const dockApps = [
  { id: "finder", name: "Finder", icon: FolderOpen },
  { id: "safari", name: "Safari", icon: Globe },
  { id: "mail", name: "Mail", icon: Mail },
  { id: "messages", name: "Messages", icon: MessageSquare },
  { id: "music", name: "Music", icon: Music },
  { id: "calendar", name: "Calendar", icon: Calendar },
  { id: "notes", name: "Notes", icon: StickyNote },
  { id: "calculator", name: "Calculator", icon: Calculator },
  { id: "terminal", name: "Terminal", icon: Terminal },
  { id: "settings", name: "System Settings", icon: Settings },
]

const DOCK_ICON_SIZE = 48;
const DOCK_ICON_MARGIN = 8;

export function Dock({ openApp, windows, onWindowClick }: DockProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const [hoveredX, setHoveredX] = useState<number | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (dockRef.current) {
      setHoveredX(e.clientX - dockRef.current.getBoundingClientRect().left);
    }
  };

  const getScale = (iconX: number) => {
    if (hoveredX === null) return 1;
    const distance = Math.abs(iconX - hoveredX);
    const scale = Math.max(0, 1 - distance / (DOCK_ICON_SIZE * 2));
    return 1 + 1.2 * Math.pow(scale, 2);
  };

  return (
    <TooltipProvider delayDuration={100}>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <div
          ref={dockRef}
          className="flex items-end h-[64px] px-2 py-2 rounded-2xl transition-all duration-200 ease-out"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredX(null)}
        >
          {dockApps.map((app, i) => {
            const iconCenterX = i * (DOCK_ICON_SIZE + DOCK_ICON_MARGIN) + (DOCK_ICON_SIZE + DOCK_ICON_MARGIN) / 2;
            const scale = getScale(iconCenterX);
            const Icon = app.icon;
            const isOpen = windows.some((w) => w.app === app.id);

            return (
              <div key={app.id} className="relative flex flex-col items-center" style={{ margin: `0 ${DOCK_ICON_MARGIN / 2}px` }}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="relative flex items-center justify-center transition-transform duration-100 ease-out origin-bottom"
                      style={{ 
                        width: DOCK_ICON_SIZE, height: DOCK_ICON_SIZE, 
                        transform: `scale(${scale})` 
                      }}
                      onClick={() => {
                        const openWindow = windows.find((w) => w.app === app.id);
                        if (openWindow) onWindowClick(openWindow.id); else openApp(app.id);
                      }}
                    >
                      <Icon className="w-full h-full text-white drop-shadow-lg" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-neutral-800/80 text-white text-xs border-0 py-1 px-2 rounded-md">
                    {app.name}
                  </TooltipContent>
                </Tooltip>
                {isOpen && <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-white/80" />}
              </div>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
