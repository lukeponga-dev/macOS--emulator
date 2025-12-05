"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Play, Trash2, Settings, Monitor, Laptop, Server, Book } from "lucide-react";
import type { VirtualMachine } from "@/components/mac-emulator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface MachineManagerProps {
  machines: VirtualMachine[];
  onStartMachine: (machine: VirtualMachine) => void;
  onCreateMachine: (machine: Omit<VirtualMachine, "id" | "status">) => void;
  onDeleteMachine: (id: string) => void;
}

const modelIcons: Record<string, typeof Monitor> = {
  'MacBook Pro 14"': Laptop,
  'MacBook Pro 16"': Laptop,
  "MacBook Air": Laptop,
  'iMac 24"': Monitor,
  "Mac mini": Server,
  "Mac Studio": Server,
  "Mac Pro": Server,
};

export function MachineManager({ machines, onStartMachine, onCreateMachine, onDeleteMachine }: MachineManagerProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newMachine, setNewMachine] = useState({
    name: "",
    model: 'MacBook Pro 14"',
    osVersion: "macOS 14.0",
    cpu: "Apple M3 Pro",
    ram: 16,
    storage: 512,
  });

  const handleCreate = () => {
    if (newMachine.name.trim()) {
      onCreateMachine(newMachine);
      setNewMachine({
        name: "",
        model: 'MacBook Pro 14"',
        osVersion: "macOS 14.0",
        cpu: "Apple M3 Pro",
        ram: 16,
        storage: 512,
      });
      setIsCreateOpen(false);
    }
  };

  return (
    <div className="flex-1 p-6 overflow-auto bg-background">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Virtual Machines</h1>
            <p className="text-muted-foreground mt-1">Create, manage, and run your macOS virtual machines.</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/docs" className="flex items-center gap-2">
                <Book className="w-4 h-4" />
                Documentation
              </Link>
            </Button>
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
                  <DialogDescription>Configure your new macOS virtual machine.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {/* Form fields for creating a new machine */}
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
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {machines.map((machine) => {
            const IconComponent = modelIcons[machine.model] || Monitor;
            return (
              <Card key={machine.id} className="bg-card border-border hover:border-primary/60 transition-colors flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-6 h-6 text-primary" />
                      <div>
                        <CardTitle className="text-lg font-semibold">{machine.name}</CardTitle>
                        <CardDescription>{machine.model}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>OS: {machine.osVersion}</p>
                    <p>CPU: {machine.cpu}</p>
                    <p>RAM: {machine.ram}GB</p>
                    <p>Storage: {machine.storage}GB</p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 pt-4">
                  <Button
                    className="w-full gap-2"
                    onClick={() => onStartMachine(machine)}
                    disabled={machine.status === "running"}
                  >
                    <Play className="w-4 h-4" />
                    {machine.status === "running" ? "Running" : "Start"}
                  </Button>
                  <div className="flex w-full gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-2">
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
    </div>
  );
}
