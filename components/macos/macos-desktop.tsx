"use client"

import React, { useState, useCallback, useEffect } from "react"
import type { VirtualMachine } from "../types/emulator"
import { MenuBar } from "./menu-bar"
import { Dock } from "./dock"
import { MacWindow } from "./mac-window"
import { FinderApp } from "./apps/finder-app"
import { CalculatorApp } from "./apps/calculator-app"
import { NotesApp } from "./apps/notes-app"
import { TerminalApp } from "./apps/terminal-app"
import { SettingsApp } from "./apps/settings-app"
import { SafariApp } from "./apps/safari-app"
import { GraphicsFramebuffer } from "../emulator/graphics-framebuffer"

interface MacOSDesktopProps {
  machine: VirtualMachine
  onShutdown: () => void
}

export interface AppWindow {
  id: string
  app: string
  title: string
  x: number
  y: number
  width: number
  height: number
  minimized: boolean
  maximized: boolean
  zIndex: number
}

const appComponents: Record<string, React.ComponentType<{ windowId: string }>> = {
  finder: FinderApp,
  calculator: CalculatorApp,
  notes: NotesApp,
  terminal: TerminalApp,
  settings: SettingsApp,
  safari: SafariApp,
}

const defaultWindowSizes: Record<string, { width: number; height: number }> = {
  finder: { width: 800, height: 500 },
  calculator: { width: 240, height: 340 },
  notes: { width: 600, height: 450 },
  terminal: { width: 680, height: 420 },
  settings: { width: 720, height: 500 },
  safari: { width: 900, height: 600 },
}

export function MacOSDesktop({ machine, onShutdown }: MacOSDesktopProps) {
  const [windows, setWindows] = useState<AppWindow[]>([])
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)
  const [maxZIndex, setMaxZIndex] = useState(100)
  const [imageData, setImageData] = useState<Uint8ClampedArray | null>(null); // State for framebuffer image data

  // Placeholder for updating imageData - in a real emulator, this would come from the VM
  // For now, let's simulate a simple red screen for demonstration
  useEffect(() => {
    if (machine.screenWidth && machine.screenHeight) {
      const size = machine.screenWidth * machine.screenHeight * 4; // R, G, B, A
      const newImageData = new Uint8ClampedArray(size);
      for (let i = 0; i < size; i += 4) {
        newImageData[i] = 255;   // Red
        newImageData[i + 1] = 0; // Green
        newImageData[i + 2] = 0; // Blue
        newImageData[i + 3] = 255; // Alpha
      }
      setImageData(newImageData);
    }
  }, [machine.screenWidth, machine.screenHeight]);

  const openApp = useCallback(
    (app: string) => {
      // Check if app is already open
      const existingWindow = windows.find((w) => w.app === app && !w.minimized)
      if (existingWindow) {
        bringToFront(existingWindow.id)
        return
      }

      // Check if minimized
      const minimizedWindow = windows.find((w) => w.app === app && w.minimized)
      if (minimizedWindow) {
        setWindows((prev) => prev.map((w) => (w.id === minimizedWindow.id ? { ...w, minimized: false } : w)))
        bringToFront(minimizedWindow.id)
        return
      }

      const size = defaultWindowSizes[app] || { width: 600, height: 400 }
      const newWindow: AppWindow = {
        id: `${app}-${Date.now()}`,
        app,
        title: app.charAt(0).toUpperCase() + app.slice(1),
        x: 100 + ((windows.length * 30) % 200),
        y: 50 + ((windows.length * 30) % 150),
        width: size.width,
        height: size.height,
        minimized: false,
        maximized: false,
        zIndex: maxZIndex + 1,
      }
      setMaxZIndex((prev) => prev + 1)
      setWindows((prev) => [...prev, newWindow])
      setActiveWindowId(newWindow.id)
    },
    [windows, maxZIndex],
  )

  const closeWindow = useCallback(
    (id: string) => {
      setWindows((prev) => prev.filter((w) => w.id !== id))
      if (activeWindowId === id) {
        const remaining = windows.filter((w) => w.id !== id)
        setActiveWindowId(remaining.length > 0 ? remaining[remaining.length - 1].id : null)
      }
    },
    [activeWindowId, windows],
  )

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)))
  }, [])

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)))
  }, [])

  const bringToFront = useCallback(
    (id: string) => {
      setMaxZIndex((prev) => prev + 1)
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w)))
      setActiveWindowId(id)
    },
    [maxZIndex],
  )

  const updateWindowPosition = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)))
  }, [])

  const updateWindowSize = useCallback((id: string, width: number, height: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, width, height } : w)))
  }, [])

  const activeApp = activeWindowId ? windows.find((w) => w.id === activeWindowId)?.app : null

  return (
    <div
      className="flex-1 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom right, #007AFF, #5AC8FA)",
      }}
    >
      {/* Desktop Wallpaper Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 90%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 90% 10%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 60%)
          `,
        }}
      />

      {/* Framebuffer for the emulated display */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {machine.screenWidth && machine.screenHeight && (
          <GraphicsFramebuffer
            width={machine.screenWidth}
            height={machine.screenHeight}
            imageData={imageData}
          />
        )}
      </div>

      {/* Menu Bar */}
      <MenuBar activeApp={activeApp} machine={machine} onShutdown={onShutdown} />

      {/* Windows */}
      {windows
        .filter((w) => !w.minimized)
        .map((window) => {
          const AppComponent = appComponents[window.app]
          return (
            <MacWindow
              key={window.id}
              window={window}
              isActive={activeWindowId === window.id}
              onClose={() => closeWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
              onMaximize={() => maximizeWindow(window.id)}
              onFocus={() => bringToFront(window.id)}
              onMove={(x, y) => updateWindowPosition(window.id, x, y)}
              onResize={(w, h) => updateWindowSize(window.id, w, h)}
            >
              {AppComponent && <AppComponent windowId={window.id} />}
            </MacWindow>
          )
        })}

      {/* Dock */}
      <Dock
        openApp={openApp}
        windows={windows}
        onWindowClick={(id) => {
          const win = windows.find((w) => w.id === id)
          if (win?.minimized) {
            setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: false } : w)))
          }
          bringToFront(id)
        }}
      />
    </div>
  )
}
