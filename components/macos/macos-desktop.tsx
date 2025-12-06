"use client"

import React, { useState, useCallback, useEffect, useRef } from "react"
import type { VirtualMachine } from "@/types/emulator"
import { MenuBar } from "./menu-bar"
import { Dock } from "./dock"
import { MacWindow } from "./mac-window"
import { FinderApp } from "./apps/finder-app"
import { CalculatorApp } from "./apps/calculator-app"
import { NotesApp } from "./apps/notes-app"
import { TerminalApp } from "./apps/terminal-app"
import { SettingsApp } from "./apps/settings-app"
import { SafariApp } from "./apps/safari-app"

interface MacOSDesktopProps {
  machine: VirtualMachine
  onShutdown: () => void
}

export interface AppWindow {
  id: string; app: string; title: string; x: number; y: number;
  width: number; height: number; minimized: boolean; maximized: boolean; zIndex: number;
}

const appComponents: Record<string, React.ComponentType<{ windowId: string }>> = {
  finder: FinderApp, calculator: CalculatorApp, notes: NotesApp,
  terminal: TerminalApp, settings: SettingsApp, safari: SafariApp,
}

const defaultWindowSizes: Record<string, { width: number; height: number }> = {
  finder: { width: 800, height: 500 }, calculator: { width: 240, height: 340 },
  notes: { width: 600, height: 450 }, terminal: { width: 680, height: 420 },
  settings: { width: 720, height: 500 }, safari: { width: 900, height: 600 },
}

export function MacOSDesktop({ machine, onShutdown }: MacOSDesktopProps) {
  const [windows, setWindows] = useState<AppWindow[]>([])
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)
  const [maxZIndex, setMaxZIndex] = useState(100)
  const desktopRef = useRef<HTMLDivElement>(null);

  const openApp = useCallback((app: string) => {
      const existingWindow = windows.find((w) => w.app === app);
      if (existingWindow) {
        if (existingWindow.minimized) {
            setWindows((prev) => prev.map((w) => w.id === existingWindow.id ? { ...w, minimized: false } : w));
        }
        bringToFront(existingWindow.id);
        return;
      }

      const size = defaultWindowSizes[app] || { width: 600, height: 400 };
      const desktopBounds = desktopRef.current?.getBoundingClientRect();
      const screenWidth = desktopBounds?.width || window.innerWidth;
      const screenHeight = desktopBounds?.height || window.innerHeight;

      const responsiveWidth = Math.min(size.width, screenWidth * 0.85);
      const responsiveHeight = Math.min(size.height, screenHeight * 0.8);
      
      const initialX = Math.max(10, (screenWidth - responsiveWidth) / 2 + (windows.length % 5) * 20 - 40);
      const initialY = Math.max(40, (screenHeight - responsiveHeight) / 2 + (windows.length % 5) * 20 - 40);

      const newWindow: AppWindow = {
        id: `${app}-${Date.now()}`, app, title: app.charAt(0).toUpperCase() + app.slice(1),
        x: initialX, y: initialY, width: responsiveWidth, height: responsiveHeight,
        minimized: false, maximized: false, zIndex: maxZIndex + 1,
      }
      setMaxZIndex((p) => p + 1); setWindows((p) => [...p, newWindow]); setActiveWindowId(newWindow.id)
    }, [windows, maxZIndex])

  const closeWindow = useCallback((id: string) => {
      setWindows((prev) => prev.filter((w) => w.id !== id))
      if (activeWindowId === id) {
        const remaining = windows.filter((w) => w.id !== id && !w.minimized)
        setActiveWindowId(remaining.length > 0 ? remaining[remaining.length - 1].id : null)
      }
    }, [activeWindowId, windows])

  const bringToFront = useCallback((id: string) => {
      if (id === activeWindowId) return;
      setMaxZIndex((prev) => prev + 1)
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w)))
      setActiveWindowId(id)
    }, [maxZIndex, activeWindowId])

  const activeApp = activeWindowId ? windows.find((w) => w.id === activeWindowId)?.app : null

  return (
    <div ref={desktopRef} className="flex-1 h-full relative overflow-hidden bg-cover bg-center"
         style={{ backgroundImage: "url('/wallpaper.jpg')" }}>
      <MenuBar activeApp={activeApp} machine={machine} onShutdown={onShutdown} />
      {windows.filter((w) => !w.minimized).map((window) => {
          const AppComponent = appComponents[window.app]
          return (
            <MacWindow key={window.id} window={window} isActive={activeWindowId === window.id}
              onClose={() => closeWindow(window.id)}
              onMinimize={(id) => setWindows(p => p.map(w => w.id === id ? { ...w, minimized: true } : w))}
              onMaximize={(id) => setWindows(p => p.map(w => w.id === id ? { ...w, maximized: !w.maximized } : w))}
              onFocus={() => bringToFront(window.id)}
              onMove={(id, x, y) => setWindows(p => p.map(w => w.id === id ? { ...w, x, y } : w))}
              onResize={(id, width, height) => setWindows(p => p.map(w => w.id === id ? { ...w, width, height } : w))}>
              {AppComponent && <AppComponent windowId={window.id} />}
            </MacWindow>
          )
        })}
      <Dock openApp={openApp} windows={windows} onWindowClick={(id) => {
          const win = windows.find((w) => w.id === id)
          if (win?.minimized) setWindows(p => p.map(w => w.id === id ? { ...w, minimized: false } : w))
          bringToFront(id)
        }} />
    </div>
  )
}
