"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Play,
  Trash2,
  Settings,
  Monitor,
  Laptop,
  Server,
  Book,
} from "lucide-react";
import type { VirtualMachine, NVMeController, BootMedia } from "@/types/emulator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MachineManagerProps {
  machines: VirtualMachine[];
  onStartMachine: (machine: VirtualMachine) => void;
  onCreateMachine: (
    machine: Omit<VirtualMachine, "id" | "status" | "storage" | "nvmeControllers" | "screenWidth" | "screenHeight" | "bootMedia" | "jitEnabled" | "mmuEnabled" | "mmuMode">
  ) => void;
  onDeleteMachine: (id: string) => void;
}

const modelIcons: Record<string, React.ElementType> = {
  'MacBook Pro 14"': Laptop,
  'MacBook Pro 16"': Laptop,
  "MacBook Air": Laptop,
  'iMac 24"': Monitor,
  "Mac mini": Server,
  "Mac Studio": Server,
  "Mac Pro": Server,
  "VirtualMac": Monitor,
};

export function MachineManager({ machines, onStartMachine, onCreateMachine, onDeleteMachine }: MachineManagerProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newMachine, setNewMachine] = useState<Partial<VirtualMachine>>({
    name: "",
    model: 'MacBook Pro 14"',
    osVersion: "macOS 14.0",
    cpu: "Apple M3 Pro",
    ram: 16,
  });

  const handleCreate = () => {
    if (newMachine.name && newMachine.model && newMachine.osVersion && newMachine.cpu && newMachine.ram) {
      onCreateMachine(
        newMachine as Omit<
          VirtualMachine,
          | "id"
          | "status"
          | "storage"
          | "nvmeControllers"
          | "screenWidth"
          | "screenHeight"
          | "bootMedia"
          | "jitEnabled"
          | "mmuEnabled"
          | "mmuMode"
        >
      );
      setNewMachine({
        name: "",
        model: 'MacBook Pro 14"',
        osVersion: "macOS 14.0",
        cpu: "Apple M3 Pro",
        ram: 16,
      });
      setIsCreateOpen(false);
    }
  };

  return (
    <div className="h-full overflow-auto">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 md:gap-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Virtual Machines</h1>
            <p className="text-muted-foreground mt-1">Create, manage, and run your macOS virtual machines.</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 flex-1 md:flex-none">
                  <Plus className="w-4 h-4" />
                  New Machine
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Virtual Machine</DialogTitle>
                  <DialogDescription>Configure your new macOS virtual machine.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" value={newMachine.name} onChange={(e) => setNewMachine({ ...newMachine, name: e.target.value })} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="model" className="text-right">Model</Label>
                    <Select onValueChange={(value) => setNewMachine({ ...newMachine, model: value })} defaultValue={newMachine.model}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(modelIcons).map((model) => (
                          <SelectItem key={model} value={model}>{model}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
             <Button variant="outline" asChild className="gap-2">
              <Link href="/docs">
                <Book className="w-4 h-4" />
                <span className="hidden sm:inline">Documentation</span>
              </Link>
            </Button>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {machines.map((machine) => {
            const IconComponent = modelIcons[machine.model] || Monitor;
            return (
              <Card key={machine.id} className="bg-card border-border hover:border-primary/60 transition-colors flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-6 h-6 text-primary" />
                      <div>
                        <CardTitle className="text-lg font-semibold leading-tight">{machine.name}</CardTitle>
                        <CardDescription className="text-sm mt-0.5">{machine.model}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow text-sm text-muted-foreground space-y-2">
                  <p className="flex items-center gap-2"><span className="font-medium text-foreground w-16">OS:</span> {machine.osVersion}</p>
                  <p className="flex items-center gap-2"><span className="font-medium text-foreground w-16">CPU:</span> {machine.cpu}</p>
                  <p className="flex items-center gap-2"><span className="font-medium text-foreground w-16">RAM:</span> {machine.ram}GB</p>
                  <p className="flex items-center gap-2"><span className="font-medium text-foreground w-16">JIT:</span> {machine.jitEnabled ? 'Enabled' : 'Disabled'}</p>
                </CardContent>
                <CardFooter className="flex flex-col gap-2.5 pt-4">
                  <Button
                    className="w-full gap-2"
                    onClick={() => onStartMachine(machine)}
                    disabled={machine.status === "running"}
                  >
                    <Play className="w-4 h-4" />
                    {machine.status === "running" ? "Running" : "Start"}
                  </Button>
                  <div className="flex w-full gap-2.5">
                    <Button variant="outline" size="sm" className="flex-1 gap-2 text-xs">
                      <Settings className="w-4 h-4" />
                      Settings
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onDeleteMachine(machine.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
  );
}
