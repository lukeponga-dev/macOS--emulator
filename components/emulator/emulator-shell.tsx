"use client"

import type { ReactNode } from "react"
import { Monitor, Settings, HardDrive, Cpu, MemoryStick, Wifi, Volume2, Power } from "lucide-react"
import type { EmulatorState, VirtualMachine } from "../mac-emulator"
import { Button } from "@/components/ui/button"

interface EmulatorShellProps {
  children: ReactNode
  state: EmulatorState
  activeMachine: VirtualMachine | null
  onShutdown: () => void
}

export function EmulatorShell({ children, state, activeMachine, onShutdown }: EmulatorShellProps) {
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">MacEmu</span>
          </div>
          <span className="text-xs text-muted-foreground px-2 py-0.5 bg-secondary rounded">v1.0.0</span>
        </div>

        <nav className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            File
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Machine
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Devices
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            View
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Debug
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            Help
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">{children}</div>

      {/* Status Bar */}
      <footer className="flex items-center justify-between px-4 py-1.5 bg-card border-t border-border text-xs">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${state === "running" ? "bg-(--color-macos-green)" : state === "booting" ? "bg-(--color-macos-yellow)" : "bg-muted-foreground"}`}
            />
            <span className="text-muted-foreground">
              {state === "running" ? "Running" : state === "booting" ? "Booting" : "Idle"}
            </span>
          </span>
          {activeMachine && (
            <>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Cpu className="w-3 h-3" />
                {activeMachine.cpu}
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <MemoryStick className="w-3 h-3" />
                {activeMachine.ram}GB
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <HardDrive className="w-3 h-3" />
                {activeMachine.storage}GB
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Wifi className="w-3 h-3" />
            Connected
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Volume2 className="w-3 h-3" />
            100%
          </span>
          {state !== "manager" && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={onShutdown}
            >
              <Power className="w-3 h-3 mr-1" />
              Shutdown
            </Button>
          )}
        </div>
      </footer>
    </div>
  )
}
