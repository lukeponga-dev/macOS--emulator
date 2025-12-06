
"use client"

import { useState } from "react"
import { OverviewSection } from "./sections/overview-section"
import { ArchitectureSection } from "./sections/architecture-section"
import { HardwareSection } from "./sections/hardware-section"
import { GraphicsSection } from "./sections/graphics-section"
import { InputSection } from "./sections/input-section"
import { CompatibilitySection } from "./sections/compatibility-section"
import { PerformanceSection } from "./sections/performance-section"
import { RoadmapSection } from "./sections/roadmap-section"

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
    <div className="max-w-4xl mx-auto px-8 py-12">{renderSection()}</div>
  )
}
