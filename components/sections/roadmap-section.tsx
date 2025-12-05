"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Clock } from "lucide-react"

const phases = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "complete",
    duration: "3-4 months",
    items: [
      { task: "CPU emulation core (interpreter)", done: true },
      { task: "Basic memory management", done: true },
      { task: "Simple I/O subsystem", done: true },
      { task: "Boot to firmware/EFI", done: true },
      { task: "Debug infrastructure", done: true },
    ],
  },
  {
    phase: "Phase 2",
    title: "Core Systems",
    status: "in-progress",
    duration: "4-6 months",
    items: [
      { task: "JIT compiler implementation", done: true },
      { task: "Full MMU with paging", done: true },
      { task: "Storage controller (NVMe)", done: false },
      { task: "Basic graphics framebuffer", done: false },
      { task: "Boot macOS installer", done: false },
    ],
  },
  {
    phase: "Phase 3",
    title: "Hardware Acceleration",
    status: "planned",
    duration: "4-6 months",
    items: [
      { task: "Metal API translation layer", done: false },
      { task: "GPU passthrough support", done: false },
      { task: "Audio subsystem", done: false },
      { task: "USB controller", done: false },
      { task: "Network virtualization", done: false },
    ],
  },
  {
    phase: "Phase 4",
    title: "Compatibility",
    status: "planned",
    duration: "3-4 months",
    items: [
      { task: "Framework stubs & shims", done: false },
      { task: "iCloud service simulation", done: false },
      { task: "App Store compatibility", done: false },
      { task: "Rosetta 2 translation support", done: false },
      { task: "Security feature emulation", done: false },
    ],
  },
  {
    phase: "Phase 5",
    title: "Polish & Release",
    status: "planned",
    duration: "2-3 months",
    items: [
      { task: "Performance optimization pass", done: false },
      { task: "User interface refinement", done: false },
      { task: "Documentation", done: false },
      { task: "Cross-platform packaging", done: false },
      { task: "Public beta release", done: false },
    ],
  },
]

export function RoadmapSection() {
  return (
    <div className="space-y-8">
      <div>
        <Badge variant="secondary" className="mb-4">
          Project Timeline
        </Badge>
        <h1 className="text-4xl font-bold text-foreground mb-4">Development Roadmap</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Phased development plan outlining major milestones from initial foundation to public release.
        </p>
      </div>

      <Card className="bg-accent/20 border-accent">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold">16-23</p>
              <p className="text-sm text-muted-foreground">Months Total</p>
            </div>
            <div>
              <p className="text-3xl font-bold">5</p>
              <p className="text-sm text-muted-foreground">Major Phases</p>
            </div>
            <div>
              <p className="text-3xl font-bold">25</p>
              <p className="text-sm text-muted-foreground">Key Milestones</p>
            </div>
            <div>
              <p className="text-3xl font-bold">3-5</p>
              <p className="text-sm text-muted-foreground">Core Developers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {phases.map((phase, index) => (
          <Card key={phase.phase} className={phase.status === "in-progress" ? "border-accent" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      phase.status === "complete"
                        ? "bg-green-500/20 text-green-500"
                        : phase.status === "in-progress"
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      {phase.phase}: {phase.title}
                    </CardTitle>
                    <CardDescription>{phase.duration}</CardDescription>
                  </div>
                </div>
                <Badge
                  variant={
                    phase.status === "complete" ? "default" : phase.status === "in-progress" ? "secondary" : "outline"
                  }
                >
                  {phase.status === "complete" && "Complete"}
                  {phase.status === "in-progress" && "In Progress"}
                  {phase.status === "planned" && "Planned"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item.task} className="flex items-center gap-3 text-sm">
                    {item.done ? (
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    ) : phase.status === "in-progress" ? (
                      <Clock className="w-4 h-4 text-yellow-500 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                    )}
                    <span className={item.done ? "text-muted-foreground" : ""}>{item.task}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Technical Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-medium text-sm mb-2">Minimum Host Requirements</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 8-core CPU (x86_64 or ARM64)</li>
                <li>• 16GB RAM (32GB recommended)</li>
                <li>• GPU with Vulkan 1.3 support</li>
                <li>• 100GB SSD storage</li>
                <li>• Linux, Windows 10+, or macOS 12+</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-sm mb-2">Development Stack</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Core: Rust (performance-critical), C++ (legacy)</li>
                <li>• JIT: Custom + LLVM for optimization</li>
                <li>• Graphics: Vulkan, MoltenVK</li>
                <li>• UI: Qt 6 / GTK4 / native</li>
                <li>• Build: CMake, Cargo, Meson</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}