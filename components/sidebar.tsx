"use client"

import { cn } from "@/lib/utils"
import { X } from 'lucide-react';

export type Section =
  | "overview"
  | "architecture"
  | "hardware"
  | "graphics"
  | "input"
  | "compatibility"
  | "performance"
  | "roadmap"

interface SidebarProps {
  activeSection: Section
  onSectionChange: (section: Section) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const sections: { id: Section; title: string }[] = [
  { id: "overview", title: "Overview" },
  { id: "architecture", title: "Architecture" },
  { id: "hardware", title: "Hardware" },
  { id: "graphics", title: "Graphics" },
  { id: "input", title: "Input" },
  { id: "compatibility", title: "Compatibility" },
  { id: "performance", title: "Performance" },
  { id: "roadmap", title: "Roadmap" },
]

export function Sidebar({ activeSection, onSectionChange, isOpen, setIsOpen }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full w-64 bg-gray-100 dark:bg-gray-800 p-8 z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0"
      )}
    >
      <div className="flex justify-between items-center md:hidden mb-4">
        <h2 className="text-lg font-bold">Menu</h2>
        <button onClick={() => setIsOpen(false)}>
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav>
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => onSectionChange(section.id)}
                className={cn(
                  "w-full text-left px-4 py-2 rounded-md",
                  activeSection === section.id
                    ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
