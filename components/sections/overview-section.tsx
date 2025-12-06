"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cpu, Monitor, HardDrive, Wifi, Shield, Zap, BookOpen } from "lucide-react"

export function OverviewSection() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <Badge variant="secondary" className="mb-4">
          Documentation
        </Badge>
        <h1 className="text-5xl font-extrabold text-foreground tracking-tight mb-4 text-balance">
          Mac Emulator Architecture Plan
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          A comprehensive technical blueprint for developing a high-fidelity Mac emulator capable of accurately
          replicating macOS environments with near-native performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-card border-border flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-accent/50 border border-accent">
                <Cpu className="w-6 h-6 text-accent-foreground" />
              </div>
              <CardTitle>CPU Emulation</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">
              Support for x86_64 and ARM64 architectures with dynamic binary translation and JIT compilation for optimal
              performance.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-accent/50 border border-accent">
                <Monitor className="w-6 h-6 text-accent-foreground" />
              </div>
              <CardTitle>Graphics Subsystem</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">
              Metal API emulation with fallback to OpenGL/Vulkan, supporting Retina displays and hardware-accelerated
              rendering.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-accent/50 border border-accent">
                <HardDrive className="w-6 h-6 text-accent-foreground" />
              </div>
              <CardTitle>Storage & I/O</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">
              APFS filesystem support, virtual disk management, and efficient I/O virtualization for realistic storage
              behavior.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-accent/50 border border-accent">
                <Wifi className="w-6 h-6 text-accent-foreground" />
              </div>
              <CardTitle>Network Stack</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">
              Full TCP/IP stack emulation with NAT support, allowing seamless network connectivity for guest
              applications.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-accent/50 border border-accent">
                <Shield className="w-6 h-6 text-accent-foreground" />
              </div>
              <CardTitle>Security Layer</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">
              Sandbox isolation, secure enclave emulation, and T2/M-series security chip simulation for compatibility.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-accent/50 border border-accent">
                <Zap className="w-6 h-6 text-accent-foreground" />
              </div>
              <CardTitle>Performance</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">
              Targeting 80-95% native performance through aggressive optimization, caching, and hardware passthrough
              where available.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-lg font-medium text-foreground">Project Goals</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-2">Accuracy</h3>
          <p className="text-muted-foreground text-sm">
            Faithful emulation of Mac hardware behavior including timing, interrupts, and peripheral communication.
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-2">Compatibility</h3>
          <p className="text-muted-foreground text-sm">
            Support for macOS 10.15+ and a wide range of applications including development tools and creative software.
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-2">Performance</h3>
          <p className="text-muted-foreground text-sm">
            Achieve near-native execution speeds through JIT compilation and hardware acceleration.
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-2">Usability</h3>
          <p className="text-muted-foreground text-sm">
            Intuitive configuration, snapshot management, and seamless host-guest integration.
          </p>
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-accent/50 border border-accent">
              <BookOpen className="w-6 h-6 text-accent-foreground" />
            </div>
            <CardTitle>Documentation Overview</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This section provides a high-level overview of the Mac emulator's architecture. Each card represents a core
            component of the emulator, detailing its function and performance goals. The project goals are listed below,
            outlining the desired outcomes for accuracy, compatibility, performance, and usability.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
