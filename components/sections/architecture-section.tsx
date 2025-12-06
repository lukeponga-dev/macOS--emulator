"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArchitectureDiagram } from "@/components/architecture-diagram";

export function ArchitectureSection() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <Badge variant="secondary" className="mb-4">
          System Design
        </Badge>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          System Architecture
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The emulator follows a layered architecture separating concerns
          between hardware emulation, system services, and user interface.
        </p>
      </div>

      <ArchitectureDiagram
        activeLayer={activeLayer}
        onLayerHover={setActiveLayer}
      />

      <Tabs defaultValue="layers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="layers">Layer Details</TabsTrigger>
          <TabsTrigger value="components">Core Components</TabsTrigger>
          <TabsTrigger value="dataflow">Data Flow</TabsTrigger>
        </TabsList>

        <TabsContent value="layers" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">1. Presentation Layer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <CardDescription>
                Handles all user-facing elements including the main window, menu
                bar emulation, configuration dialogs, and debug interfaces.
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline">Window Manager</Badge>
                <Badge variant="outline">Menu Emulation</Badge>
                <Badge variant="outline">Settings UI</Badge>
                <Badge variant="outline">Debug Console</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">2. Emulation Core</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <CardDescription>
                The heart of the emulator containing CPU emulation, memory
                management, and device coordination. Implements the main
                emulation loop and scheduling.
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline">CPU Core</Badge>
                <Badge variant="outline">MMU</Badge>
                <Badge variant="outline">Scheduler</Badge>
                <Badge variant="outline">Event System</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                3. Hardware Abstraction Layer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <CardDescription>
                Provides virtualized hardware interfaces that guest software
                interacts with. Handles device enumeration, interrupt routing,
                and I/O operations.
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline">GPU Driver</Badge>
                <Badge variant="outline">Audio HAL</Badge>
                <Badge variant="outline">USB Controller</Badge>
                <Badge variant="outline">Storage Driver</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                4. Host Interface Layer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <CardDescription>
                Bridges the emulator with the host operating system, managing
                resource allocation, file system access, and native API calls.
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline">OS Bindings</Badge>
                <Badge variant="outline">File I/O</Badge>
                <Badge variant="outline">Network Bridge</Badge>
                <Badge variant="outline">Clipboard Sync</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  CPU Emulator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  JIT-compiled instruction translation supporting both x86_64
                  and ARM64 guest architectures with cycle-accurate timing
                  options.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Memory Controller
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Virtual memory management with page table emulation, TLB
                  caching, and support for up to 64GB guest RAM allocation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Graphics Engine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Metal API translation layer with Vulkan/DirectX backend
                  support, enabling hardware-accelerated 3D rendering.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Device Manager
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Coordinates virtual device lifecycle, handles plug-and-play
                  events, and manages interrupt dispatching.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  State Manager
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Handles save states, snapshots, and machine state
                  serialization for suspend/resume functionality.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Debug Interface
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  GDB server integration, breakpoint support, memory inspection,
                  and real-time register monitoring.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="dataflow" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Execution Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-accent-foreground shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-sm">Instruction Fetch</p>
                    <p className="text-sm text-muted-foreground">
                      Read guest instruction from emulated memory via MMU
                    </p>
                  </div>
                </div>
                <div className="w-px h-4 bg-border ml-4" />
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-accent-foreground shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-sm">Decode & Translate</p>
                    <p className="text-sm text-muted-foreground">
                      Convert guest instruction to host-native code via JIT
                    </p>
                  </div>
                </div>
                <div className="w-px h-4 bg-border ml-4" />
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-accent-foreground shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-sm">Execute</p>
                    <p className="text-sm text-muted-foreground">
                      Run translated code on host CPU with state tracking
                    </p>
                  </div>
                </div>
                <div className="w-px h-4 bg-border ml-4" />
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-accent-foreground shrink-0">
                    4
                  </div>
                  <div>
                    <p className="font-medium text-sm">Device Sync</p>
                    <p className="text-sm text-muted-foreground">
                      Process I/O operations, update device state, handle
                      interrupts
                    </p>
                  </div>
                </div>
                <div className="w-px h-4 bg-border ml-4" />
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-accent-foreground shrink-0">
                    5
                  </div>
                  <div>
                    <p className="font-medium text-sm">Frame Commit</p>
                    <p className="text-sm text-muted-foreground">
                      Render graphics output, update audio buffers, sync timing
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
