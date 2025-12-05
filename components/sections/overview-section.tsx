"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cpu, Monitor, HardDrive, Wifi, Shield, Zap, BookOpen } from "lucide-react"

export function OverviewSection() {
  return (
    <div className="space-y-8">
      <div>
        <Badge variant="secondary" className="mb-4">
          Documentation
        </Badge>
        <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Mac Emulator Architecture Plan</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          A comprehensive technical blueprint for developing a high-fidelity Mac emulator capable of accurately
          replicating macOS environments with near-native performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent">
                <Cpu className="w-5 h-5 text-accent-foreground" />
              </div>
              <CardTitle className="text-base">CPU Emulation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Support for x86_64 and ARM64 architectures with dynamic binary translation and JIT compilation for optimal
              performance.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent">
                <Monitor className="w-5 h-5 text-accent-foreground" />
              </div>
              <CardTitle className="text-base">Graphics Subsystem</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Metal API emulation with fallback to OpenGL/Vulkan, supporting Retina displays and hardware-accelerated
              rendering.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent">
                <HardDrive className="w-5 h-5 text-accent-foreground" />
              </div>
              <CardTitle className="text-base">Storage & I/O</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              APFS filesystem support, virtual disk management, and efficient I/O virtualization for realistic storage
              behavior.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent">
                <Wifi className="w-5 h-5 text-accent-foreground" />
              </div>
              <CardTitle className="text-base">Network Stack</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Full TCP/IP stack emulation with NAT support, allowing seamless network connectivity for guest
              applications.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent">
                <Shield className="w-5 h-5 text-accent-foreground" />
              </div>
              <CardTitle className="text-base">Security Layer</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Sandbox isolation, secure enclave emulation, and T2/M-series security chip simulation for compatibility.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent">
                <Zap className="w-5 h-5 text-accent-foreground" />
              </div>
              <CardTitle className="text-base">Performance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Targeting 80-95% native performance through aggressive optimization, caching, and hardware passthrough
              where available.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-accent/30 border-accent">
        <CardHeader>
          <CardTitle className="text-lg">Project Goals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground shrink-0">
              1
            </div>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Accuracy:</strong> Faithful emulation of Mac hardware behavior
              including timing, interrupts, and peripheral communication.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground shrink-0">
              2
            </div>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Compatibility:</strong> Support for macOS 10.15+ and a wide range of
              applications including development tools and creative software.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground shrink-0">
              3
            </div>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Performance:</strong> Achieve near-native execution speeds through JIT
              compilation and hardware acceleration.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground shrink-0">
              4
            </div>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Usability:</strong> Intuitive configuration, snapshot management, and
              seamless host-guest integration.
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent">
                <BookOpen className="w-5 h-5 text-accent-foreground" />
              </div>
              <CardTitle className="text-base">Documentation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              This section provides a high-level overview of the Mac emulator's architecture. Each card represents a core component of the emulator, detailing its function and performance goals. The project goals are listed at the end, outlining the desired outcomes for accuracy, compatibility, performance, and usability.
            </CardDescription>
          </CardContent>
        </Card>
    </div>
  )
}