"use client";

import type { ReactNode } from "react";
import {
  Monitor,
  Settings,
  HardDrive,
  Cpu,
  MemoryStick,
  Wifi,
  Volume2,
  Power,
} from "lucide-react";
import type { EmulatorState, VirtualMachine } from "@/types/emulator";
import { Button } from "@/components/ui/button";

interface EmulatorShellProps {
  children: ReactNode;
  state: EmulatorState;
  activeMachine: VirtualMachine | null;
  onShutdown: () => void;
}

export function EmulatorShell({ children, state, activeMachine, onShutdown }: EmulatorShellProps) {
  const totalStorage = activeMachine?.nvmeControllers.reduce((acc, c) => acc + c.sizeGb, 0) || 0;
  return (
    <div className="flex flex-col h-full min-h-[500px] bg-card text-card-foreground shadow-lg rounded-lg border border-border">
      <header className="flex items-center justify-between px-4 py-2 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-primary" />
          <span className="font-semibold text-base text-foreground">MacEmu</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-4 md:p-6">{children}</div>

      <footer className="flex items-center justify-between flex-wrap gap-y-2 gap-x-4 px-4 py-2 bg-background text-xs text-muted-foreground border-t border-border">
        <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${state === "running" ? "bg-green-500" : state === "booting" ? "bg-yellow-500" : "bg-muted"}`}
            />
            <span>{state === "running" ? "Running" : state === "booting" ? "Booting" : "Idle"}</span>
          </span>
          {activeMachine && (
            <>
              <span className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                {activeMachine.cpu}
              </span>
              <span className="flex items-center gap-1.5">
                <MemoryStick className="w-4 h-4" />
                {activeMachine.ram}GB RAM
              </span>
              {totalStorage > 0 && (
                <span className="flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4" />
                  {totalStorage}GB Storage
                </span>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-x-4 gap-y-2 flex-wrap justify-end">
           <span className="flex items-center gap-1.5">
            <Wifi className="w-4 h-4" />
            <span className="hidden sm:inline">Connected</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">100%</span>
          </span>
          {state !== "manager" && (
            <Button variant="destructive" size="sm" className="h-7 px-2 text-xs" onClick={onShutdown}>
              <Power className="w-3 h-3 mr-1.5" />
              Shutdown
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}
