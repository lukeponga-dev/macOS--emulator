"use client"

import { useState } from "react"
import { EmulatorShell } from "./emulator/emulator-shell"
import { MachineManager } from "./emulator/machine-manager"
import { MacOSDesktop } from "./macos/macos-desktop"
import { BootSequence } from "./macos/boot-sequence"

export type EmulatorState = "manager" | "booting" | "running"

export interface VirtualMachine {
  id: string
  name: string
  model: string
  osVersion: string
  cpu: string
  ram: number
  storage: number
  status: "stopped" | "running" | "suspended"
}

const defaultMachines: VirtualMachine[] = [
  {
    id: "1",
    name: "macOS Sonoma",
    model: 'MacBook Pro 14"',
    osVersion: "macOS 14.0",
    cpu: "Apple M3 Pro",
    ram: 16,
    storage: 512,
    status: "stopped",
  },
  {
    id: "2",
    name: "macOS Ventura",
    model: 'iMac 24"',
    osVersion: "macOS 13.0",
    cpu: "Apple M1",
    ram: 8,
    storage: 256,
    status: "stopped",
  },
  {
    id: "3",
    name: "macOS Monterey",
    model: "Mac mini",
    osVersion: "macOS 12.0",
    cpu: "Intel Core i7",
    ram: 32,
    storage: 1024,
    status: "stopped",
  },
]

export function MacEmulator() {
  const [state, setState] = useState<EmulatorState>("manager")
  const [machines, setMachines] = useState<VirtualMachine[]>(defaultMachines)
  const [activeMachine, setActiveMachine] = useState<VirtualMachine | null>(null)

  const handleStartMachine = (machine: VirtualMachine) => {
    setActiveMachine(machine)
    setMachines((prev) => prev.map((m) => (m.id === machine.id ? { ...m, status: "running" } : m)))
    setState("booting")
  }

  const handleBootComplete = () => {
    setState("running")
  }

  const handleShutdown = () => {
    if (activeMachine) {
      setMachines((prev) => prev.map((m) => (m.id === activeMachine.id ? { ...m, status: "stopped" } : m)))
    }
    setActiveMachine(null)
    setState("manager")
  }

  const handleCreateMachine = (machine: Omit<VirtualMachine, "id" | "status">) => {
    const newMachine: VirtualMachine = {
      ...machine,
      id: Date.now().toString(),
      status: "stopped",
    }
    setMachines((prev) => [...prev, newMachine])
  }

  const handleDeleteMachine = (id: string) => {
    setMachines((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <EmulatorShell state={state} activeMachine={activeMachine} onShutdown={handleShutdown}>
      {state === "manager" && (
        <MachineManager
          machines={machines}
          onStartMachine={handleStartMachine}
          onCreateMachine={handleCreateMachine}
          onDeleteMachine={handleDeleteMachine}
        />
      )}
      {state === "booting" && activeMachine && <BootSequence machine={activeMachine} onComplete={handleBootComplete} />}
      {state === "running" && activeMachine && <MacOSDesktop machine={activeMachine} onShutdown={handleShutdown} />}
    </EmulatorShell>
  )
}
