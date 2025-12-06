"use client"

import { useState } from "react"
import { EmulatorShell } from "./emulator/emulator-shell"
import { MachineManager } from "./emulator/machine-manager"
import { MacOSDesktop } from "./macos/macos-desktop"
import { BootSequence } from "./macos/boot-sequence"
import { MacOSInstaller } from "./macos/macos-installer"
import { EmulatorState, VirtualMachine, NVMeController, BootMedia } from "../types/emulator"

const defaultMachines: VirtualMachine[] = [
  {
    id: "1",
    name: "macOS Sonoma",
    model: 'MacBook Pro 14"',
    osVersion: "macOS 14.0",
    cpu: "Apple M3 Pro",
    ram: 16,
    storage: 0,
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
    bootMedia: "os",
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
    storage: 0,
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
    bootMedia: "os",
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
    storage: 0,
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
    bootMedia: "installer",
    jitEnabled: false,
    mmuEnabled: true,
    mmuMode: "flat",
  },
  {
    id: "4",
    name: "macOS Installer",
    model: "VirtualMac",
    osVersion: "macOS 12.0",
    cpu: "Generic x86",
    ram: 4,
    storage: 0,
    nvmeControllers: [
      {
        id: "nvme-4-1",
        name: "Boot Drive",
        sizeGb: 64,
      },
    ],
    screenWidth: 1024,
    screenHeight: 768,
    status: "stopped",
    bootMedia: "installer",
    jitEnabled: true,
    mmuEnabled: true,
    mmuMode: "paged",
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
      storage: 0,
      nvmeControllers: machine.nvmeControllers || [],
      screenWidth: machine.screenWidth || 1024,
      screenHeight: machine.screenHeight || 768,
      bootMedia: machine.bootMedia || "os",
      jitEnabled: machine.jitEnabled ?? true,
      mmuEnabled: machine.mmuEnabled ?? true,
      mmuMode: machine.mmuMode || "paged",
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
