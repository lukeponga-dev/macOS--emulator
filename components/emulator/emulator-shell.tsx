"use client";

import type { ReactNode } from "react";
import { Monitor, Settings, HardDrive, Cpu, MemoryStick, Wifi, Volume2, Power } from "lucide-react";
import type { EmulatorState, VirtualMachine } from "@/components/mac-emulator";
import { Button } from "@/components/ui/button";

interface EmulatorShellProps {
  children: ReactNode;
  state: EmulatorState;
  activeMachine: VirtualMachine | null;
  onShutdown: () => void;
}

export function EmulatorShell({ children, state, activeMachine, onShutdown }: EmulatorShellProps) {
  return (
    <div className="flex h-screen flex-col bg-card text-card-foreground shadow-lg rounded-lg border border-border">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-border">
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">MacEmu</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">{children}</div>

      {/* Status Bar */}
      <footer className="flex items-center justify-between px-4 py-1.5 bg-background text-xs text-muted-foreground border-t border-border">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${state === "running" ? "bg-green-500" : state === "booting" ? "bg-yellow-500" : "bg-muted"}`}
            />
            <span>
              {state === "running" ? "Running" : state === "booting" ? "Booting" : "Idle"}
            </span>
          </span>
          {activeMachine && (
            <>
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3 h-3" />
                {activeMachine.cpu}
              </span>
              <span className="flex items-center gap-1.5">
                <MemoryStick className="w-3 h-3" />
                {activeMachine.ram}GB
              </span>
              <span className="flex items-center gap-1.5">
                <HardDrive className="w-3 h-3" />
                {activeMachine.storage}GB
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Wifi className="w-3 h-3" />
            Connected
          </span>
          <span className="flex items-center gap-1.5">
            <Volume2 className="w-3 h-3" />
            100%
          </span>
          {state !== "manager" && (
            <Button
              variant="destructive"
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={onShutdown}
            >
              <Power className="w-3 h-3 mr-1" />
              Shutdown
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}
