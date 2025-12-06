"use client";

import type React from "react";

import type { Section } from "./mac-emulator-docs";
import { cn } from "@/lib/utils";
import {
  Cpu,
  Monitor,
  Keyboard,
  Layers,
  Gauge,
  CheckCircle,
  Map,
  LayoutGrid,
} from "lucide-react";

interface SidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

const sections: { id: Section; label: string; icon: React.ReactNode }[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <LayoutGrid className="w-4 h-4" />,
  },
  {
    id: "architecture",
    label: "Architecture",
    icon: <Layers className="w-4 h-4" />,
  },
  {
    id: "hardware",
    label: "Hardware Virtualization",
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    id: "graphics",
    label: "Graphics Pipeline",
    icon: <Monitor className="w-4 h-4" />,
  },
  {
    id: "input",
    label: "Input Devices",
    icon: <Keyboard className="w-4 h-4" />,
  },
  {
    id: "compatibility",
    label: "Compatibility",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  {
    id: "performance",
    label: "Performance",
    icon: <Gauge className="w-4 h-4" />,
  },
  {
    id: "roadmap",
    label: "Development Roadmap",
    icon: <Map className="w-4 h-4" />,
  },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border p-6 overflow-y-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Monitor className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="font-semibold text-sidebar-foreground">MacEmu</span>
        </div>
        <p className="text-xs text-sidebar-foreground/60 mt-2">
          Emulator Architecture Documentation
        </p>
      </div>

      <nav className="space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-left",
              activeSection === section.id
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}
          >
            {section.icon}
            {section.label}
          </button>
        ))}
      </nav>

      <div className="mt-8 pt-6 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/50">Version 1.0.0</p>
        <p className="text-xs text-sidebar-foreground/50 mt-1">
          Last updated: Dec 2025
        </p>
      </div>
    </aside>
  );
}
