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
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSectionChange = (section: Section) => {
    setActiveSection(section)
    setSidebarOpen(false) // Close sidebar on mobile after selection
  }

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
      <div className="md:hidden flex items-center justify-between p-4 border-b dark:border-gray-800">
        <h1 className="text-lg font-bold">Documentation</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <div className="flex">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">{renderSection()}</div>
        </main>
      </div>
    </div>
  )
}
