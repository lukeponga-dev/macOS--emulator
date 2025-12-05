"use client"

import { useState } from "react"
import { EmulatorShell } from "./emulator/emulator-shell"
import { MachineManager } from "./emulator/machine-manager"
import { MacOSDesktop } from "./macos/macos-desktop"
import { BootSequence } from "./macos/boot-sequence"
import { MacOSInstaller } from "./macos/macos-installer" // Import MacOSInstaller
import { EmulatorState, VirtualMachine, NVMeController, BootMedia } from "../types/emulator"

const defaultMachines: VirtualMachine[] = [
  {
    id: "1",
    name: "macOS Sonoma",
    model: 'MacBook Pro 14"',
    osVersion: "macOS 14.0",
    cpu: "Apple M3 Pro",
    ram: 16,
    storage: 0, // Storage now managed by nvmeControllers
    nvmeControllers: [
      {
        id: "nvme-1-1",
        name: "Internal NVMe Drive",
        sizeGb: 512,
      },
    ],
    screenWidth: 1440,
    screenHeight: 900,
    status: "stopped",
    bootMedia: "os", // Default boot media
    jitEnabled: true,
    mmuEnabled: true,
    mmuMode: "paged",
  },
  {
    id: "2",
    name: "macOS Ventura",
    model: 'iMac 24"',
    osVersion: "macOS 13.0",
    cpu: "Apple M1",
    ram: 8,
    storage: 0, // Storage now managed by nvmeControllers
    nvmeControllers: [
      {
        id: "nvme-2-1",
        name: "Internal NVMe Drive",
        sizeGb: 256,
      },
    ],
    screenWidth: 1920,
    screenHeight: 1080,
    status: "stopped",
    bootMedia: "os", // Default boot media
    jitEnabled: true,
    mmuEnabled: true,
    mmuMode: "paged",
  },
  {
    id: "3",
    name: "macOS Monterey",
    model: "Mac mini",
    osVersion: "macOS 12.0",
    cpu: "Intel Core i7",
    ram: 32,
    storage: 0, // Storage now managed by nvmeControllers
    nvmeControllers: [
      {
        id: "nvme-3-1",
        name: "Primary NVMe",
        sizeGb: 1000,
      },
      {
        id: "nvme-3-2",
        name: "Secondary NVMe",
        sizeGb: 250,
      },
    ],
    screenWidth: 1280,
    screenHeight: 800,
    status: "stopped",
    bootMedia: "installer", // Set this machine to boot from installer
    jitEnabled: false, // Example: disable JIT for an older machine
    mmuEnabled: true,
    mmuMode: "flat", // Example: use flat MMU for an older machine
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

  const handleCreateMachine = (
    machine: Omit<VirtualMachine, "id" | "status" | "storage" | "nvmeControllers" | "screenWidth" | "screenHeight" | "bootMedia" | "jitEnabled" | "mmuEnabled" | "mmuMode"> & {
      nvmeControllers?: NVMeController[];
      screenWidth?: number;
      screenHeight?: number;
      bootMedia?: BootMedia;
      jitEnabled?: boolean;
      mmuEnabled?: boolean;
      mmuMode?: "flat" | "paged";
    }
  ) => {
    const newMachine: VirtualMachine = {
      ...machine,
      id: Date.now().toString(),
      status: "stopped",
      storage: 0, // Ensure new machines also have storage set to 0 by default
      nvmeControllers: machine.nvmeControllers || [],
      screenWidth: machine.screenWidth || 1440, // Default to 1440 if not provided
      screenHeight: machine.screenHeight || 900, // Default to 900 if not provided
      bootMedia: machine.bootMedia || "os", // Default to "os" if not provided
      jitEnabled: machine.jitEnabled ?? true, // Default to true if not provided
      mmuEnabled: machine.mmuEnabled ?? true, // Default to true if not provided
      mmuMode: machine.mmuMode || "paged", // Default to "paged" if not provided
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
      {state === "running" && activeMachine && (
        activeMachine.bootMedia === "installer" ? (
          <MacOSInstaller machine={activeMachine} />
        ) : (
          <MacOSDesktop machine={activeMachine} onShutdown={handleShutdown} />
        )
      )}
    </EmulatorShell>
  )
}
