"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { OverviewSection } from "./sections/overview-section"
import { ArchitectureSection } from "./sections/architecture-section"
import { HardwareSection } from "./sections/hardware-section"
import { GraphicsSection } from "./sections/graphics-section"
import { InputSection } from "./sections/input-section"
import { CompatibilitySection } from "./sections/compatibility-section"
import { PerformanceSection } from "./sections/performance-section"
import { RoadmapSection } from "./sections/roadmap-section"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"

export type Section =
  | "overview"
  | "architecture"
  | "hardware"
  | "graphics"
  | "input"
  | "compatibility"
  | "performance"
  | "roadmap"

export function MacEmulatorDocs() {
  const [activeSection, setActiveSection] = useState<Section>("overview")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />
      case "architecture":
        return <ArchitectureSection />
      case "hardware":
        return <HardwareSection />
      case "graphics":
        return <GraphicsSection />
      case "input":
        return <InputSection />
      case "compatibility":
        return <CompatibilitySection />
      case "performance":
        return <PerformanceSection />
      case "roadmap":
        return <RoadmapSection />
      default:
        return <OverviewSection />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={(section) => {
          setActiveSection(section)
          setIsSidebarOpen(false)
        }}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <main className="md:ml-64">
        <div className="flex items-center p-4 border-b border-border md:hidden">
          <Button variant="outline" size="icon" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-4 w-4" />
          </Button>
          <span className="font-semibold text-lg ml-4">MacEmu Docs</span>
        </div>
        <div className="max-w-4xl mx-auto px-8 py-12">{renderSection()}</div>
      </main>
    </div>
  )
}
