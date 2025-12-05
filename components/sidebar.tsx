"use client"

import { cn } from "@/lib/utils"

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

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gray-100 dark:bg-gray-800 p-8">
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
