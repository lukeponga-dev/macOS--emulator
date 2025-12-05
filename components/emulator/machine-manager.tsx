"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Play, Trash2, Settings, Monitor, Laptop, Server, Book } from "lucide-react"
import type { VirtualMachine } from "../mac-emulator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface MachineManagerProps {
  machines: VirtualMachine[]
  onStartMachine: (machine: VirtualMachine) => void
  onCreateMachine: (machine: Omit<VirtualMachine, "id" | "status">) => void
  onDeleteMachine: (id: string) => void
}

const modelIcons: Record<string, typeof Monitor> = {
  'MacBook Pro 14"': Laptop,
  'MacBook Pro 16"': Laptop,
  "MacBook Air": Laptop,
  'iMac 24"': Monitor,
  "Mac mini": Server,
  "Mac Studio": Server,
  "Mac Pro": Server,
}

export function MachineManager({ machines, onStartMachine, onCreateMachine, onDeleteMachine }: MachineManagerProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newMachine, setNewMachine] = useState({
    name: "",
    model: 'MacBook Pro 14"',
    osVersion: "macOS 14.0",
    cpu: "Apple M3 Pro",
    ram: 16,
    storage: 512,
  })

  const handleCreate = () => {
    if (newMachine.name.trim()) {
      onCreateMachine(newMachine)
      setNewMachine({
        name: "",
        model: 'MacBook Pro 14"',
        osVersion: "macOS 14.0",
        cpu: "Apple M3 Pro",
        ram: 16,
        storage: 512,
      })
      setIsCreateOpen(false)
    }
  }

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Virtual Machines</h1>
            <p className="text-muted-foreground mt-1">Manage and run your macOS virtual machines</p>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/docs" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Book className="w-4 h-4" />
              Documentation
            </Link>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  New Machine
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create Virtual Machine</DialogTitle>
                  <DialogDescription>Configure a new macOS virtual machine</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Machine Name</Label>
                    <Input
                      id="name"
                      value={newMachine.name}
                      onChange={(e) => setNewMachine((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="My Mac"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Model</Label>
                      <Select
                        value={newMachine.model}
                        onValueChange={(value) => setNewMachine((prev) => ({ ...prev, model: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='MacBook Pro 14"'>MacBook Pro 14"</SelectItem>
                          <SelectItem value='MacBook Pro 16"'>MacBook Pro 16"</SelectItem>
                          <SelectItem value="MacBook Air">MacBook Air</SelectItem>
                          <SelectItem value='iMac 24"'>iMac 24"</SelectItem>
                          <SelectItem value="Mac mini">Mac mini</SelectItem>
                          <SelectItem value="Mac Studio">Mac Studio</SelectItem>
                          <SelectItem value="Mac Pro">Mac Pro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>macOS Version</Label>
                      <Select
                        value={newMachine.osVersion}
                        onValueChange={(value) => setNewMachine((prev) => ({ ...prev, osVersion: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="macOS 14.0">macOS 14 Sonoma</SelectItem>
                          <SelectItem value="macOS 13.0">macOS 13 Ventura</SelectItem>
                          <SelectItem value="macOS 12.0">macOS 12 Monterey</SelectItem>
                          <SelectItem value="macOS 11.0">macOS 11 Big Sur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>CPU</Label>
                    <Select
                      value={newMachine.cpu}
                      onValueChange={(value) => setNewMachine((prev) => ({ ...prev, cpu: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Apple M3 Pro">Apple M3 Pro</SelectItem>
                        <SelectItem value="Apple M3 Max">Apple M3 Max</SelectItem>
                        <SelectItem value="Apple M2 Pro">Apple M2 Pro</SelectItem>
                        <SelectItem value="Apple M1">Apple M1</SelectItem>
                        <SelectItem value="Intel Core i7">Intel Core i7</SelectItem>
                        <SelectItem value="Intel Core i9">Intel Core i9</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>RAM: {newMachine.ram}GB</Label>
                    <Slider
                      value={[newMachine.ram]}
                      onValueChange={([value]) => setNewMachine((prev) => ({ ...prev, ram: value }))}
                      min={8}
                      max={128}
                      step={8}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Storage: {newMachine.storage}GB</Label>
                    <Slider
                      value={[newMachine.storage]}
                      onValueChange={([value]) => setNewMachine((prev) => ({ ...prev, storage: value }))}
                      min={128}
                      max={2048}
                      step={128}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreate}>Create Machine</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {machines.map((machine) => {
            const IconComponent = modelIcons[machine.model] || Monitor
            return (
              <Card key={machine.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-secondary">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{machine.name}</CardTitle>
                        <CardDescription className="text-xs">{machine.model}</CardDescription>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        machine.status === "running"
                          ? "bg-(--color-macos-green)/20 text-(--color-macos-green)"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {machine.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
                    <div>OS: {machine.osVersion}</div>
                    <div>CPU: {machine.cpu.split(" ").slice(-2).join(" ")}</div>
                    <div>RAM: {machine.ram}GB</div>
                    <div>Storage: {machine.storage}GB</div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 gap-1.5"
                      size="sm"
                      onClick={() => onStartMachine(machine)}
                      disabled={machine.status === "running"}
                    >
                      <Play className="w-3.5 h-3.5" />
                      Start
                    </Button>
                    <Button variant="outline" size="sm" className="px-2.5 bg-transparent">
                      <Settings className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-2.5 text-destructive hover:text-destructive bg-transparent"
                      onClick={() => onDeleteMachine(machine.id)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
