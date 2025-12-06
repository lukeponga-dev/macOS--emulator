"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Columns,
  FolderOpen,
  FileText,
  ImageIcon,
  Music,
  Film,
  HardDrive,
  Cloud,
  Clock,
  Download,
} from "lucide-react"

interface FinderAppProps {
  windowId: string
}

const sidebarItems = [
  { id: "favorites", label: "Favorites", type: "header" },
  { id: "airdrop", label: "AirDrop", icon: Cloud },
  { id: "recents", label: "Recents", icon: Clock },
  { id: "applications", label: "Applications", icon: LayoutGrid },
  { id: "desktop", label: "Desktop", icon: FolderOpen },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "downloads", label: "Downloads", icon: Download },
  { id: "locations", label: "Locations", type: "header" },
  { id: "macintosh", label: "Macintosh HD", icon: HardDrive },
  { id: "icloud", label: "iCloud Drive", icon: Cloud },
  { id: "tags", label: "Tags", type: "header" },
]

const files = [
  { id: "1", name: "Documents", type: "folder", modified: "Today" },
  { id: "2", name: "Downloads", type: "folder", modified: "Today" },
  { id: "3", name: "Pictures", type: "folder", modified: "Yesterday" },
  { id: "4", name: "Music", type: "folder", modified: "Dec 1" },
  { id: "5", name: "Movies", type: "folder", modified: "Nov 28" },
  { id: "6", name: "Desktop", type: "folder", modified: "Today" },
  { id: "7", name: "README.md", type: "file", modified: "Today" },
  { id: "8", name: "project.json", type: "file", modified: "Yesterday" },
  { id: "9", name: "vacation.jpg", type: "image", modified: "Nov 15" },
  { id: "10", name: "presentation.key", type: "file", modified: "Nov 10" },
]

const getFileIcon = (type: string) => {
  switch (type) {
    case "folder":
      return FolderOpen
    case "image":
      return ImageIcon
    case "music":
      return Music
    case "video":
      return Film
    default:
      return FileText
  }
}

export function FinderApp({ windowId }: FinderAppProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list" | "columns">("list")
  const [currentPath, setCurrentPath] = useState("Home")

  return (
    <div className="flex flex-col md:flex-row h-full" style={{ color: "var(--color-macos-text)" }}>
      {/* Sidebar */}
      <div
        className="w-full md:w-44 shrink-0 py-2 overflow-x-auto overflow-y-hidden md:overflow-y-auto md:overflow-x-hidden macos-scrollbar border-b md:border-b-0 md:border-r border-black/10 flex md:flex-col"
        style={{ backgroundColor: "var(--color-macos-sidebar)" }}
      >
        <div className="flex md:flex-col px-2 md:px-0">
          {sidebarItems.map((item) => {
            if (item.type === "header") {
              return (
                <div
                  key={item.id}
                  className="px-2 md:px-4 py-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                >
                  {item.label}
                </div>
              )
            }
            const Icon = item.icon!
            return (
              <button
                key={item.id}
                className="w-full px-2 md:px-4 py-1 flex items-center gap-2 text-xs hover:bg-black/5 rounded-md whitespace-nowrap"
                onClick={() => setCurrentPath(item.label)}
              >
                <Icon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {/* Toolbar */}
        <div className="h-10 flex items-center justify-between px-3 border-b border-black/10 bg-white flex-shrink-0">
          <div className="flex items-center gap-1">
            <button className="p-1 hover:bg-black/5 rounded">
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-black/5 rounded">
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <span className="ml-2 text-sm font-medium">{currentPath}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              className={`p-1.5 rounded ${viewMode === "grid" ? "bg-black/10" : "hover:bg-black/5"}`}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              className={`p-1.5 rounded ${viewMode === "list" ? "bg-black/10" : "hover:bg-black/5"}`}
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              className={`p-1.5 rounded ${viewMode === "columns" ? "bg-black/10" : "hover:bg-black/5"}`}
              onClick={() => setViewMode("columns")}
            >
              <Columns className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-auto p-2">
          {viewMode === "list" && (
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-200">
                  <th className="pb-2 font-medium">Name</th>
                  <th className="pb-2 font-medium hidden sm:table-cell">Date Modified</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => {
                  const Icon = getFileIcon(file.type)
                  return (
                    <tr
                      key={file.id}
                      className={`cursor-default ${selectedItem === file.id ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
                      onClick={() => setSelectedItem(file.id)}
                    >
                      <td className="py-1.5 flex items-center gap-2">
                        <Icon
                          className={`w-4 h-4 ${selectedItem === file.id ? "text-white" : file.type === "folder" ? "text-blue-500" : "text-gray-400"}`}
                        />
                        {file.name}
                      </td>
                      <td className="py-1.5 hidden sm:table-cell">{file.modified}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
          {viewMode === "grid" && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 p-2">
              {files.map((file) => {
                const Icon = getFileIcon(file.type)
                return (
                  <div
                    key={file.id}
                    className={`flex flex-col items-center p-3 rounded-lg cursor-default ${selectedItem === file.id ? "bg-blue-500" : "hover:bg-gray-100"}`}
                    onClick={() => setSelectedItem(file.id)}
                  >
                    <Icon
                      className={`w-12 h-12 ${selectedItem === file.id ? "text-white" : file.type === "folder" ? "text-blue-500" : "text-gray-400"}`}
                    />
                    <span
                      className={`text-xs mt-1 text-center truncate w-full ${selectedItem === file.id ? "text-white" : ""}`}
                    >
                      {file.name}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="h-6 px-3 flex items-center justify-between text-[10px] text-gray-500 bg-gray-50 border-t border-gray-200 flex-shrink-0">
          <span>{files.length} items</span>
          <span className="hidden sm:inline">25.4 GB available</span>
        </div>
      </div>
    </div>
  )
}
