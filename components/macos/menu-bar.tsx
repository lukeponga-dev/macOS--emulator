"use client"

import { useState, useEffect } from "react"
import { Apple, Wifi, Battery, Search, Volume2 } from "lucide-react"
import type { VirtualMachine } from "../mac-emulator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MenuBarProps {
  activeApp: string | null
  machine: VirtualMachine
  onShutdown: () => void
}

export function MenuBar({ activeApp, machine, onShutdown }: MenuBarProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div
      className="h-6 px-2 flex items-center justify-between text-xs"
      style={{
        backgroundColor: "var(--color-macos-menubar)",
        backdropFilter: "blur(20px)",
        color: "var(--color-macos-text)",
      }}
    >
      {/* Left Side - Apple Menu & App Menu */}
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center hover:bg-black/5 px-2 py-0.5 rounded">
            <Apple className="w-3.5 h-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="min-w-[200px] text-xs"
            style={{ backgroundColor: "var(--color-macos-window)" }}
          >
            <DropdownMenuItem className="text-xs">About This Mac</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs">System Settings...</DropdownMenuItem>
            <DropdownMenuItem className="text-xs">App Store...</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs">Recent Items</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs">Force Quit...</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs">Sleep</DropdownMenuItem>
            <DropdownMenuItem className="text-xs">Restart...</DropdownMenuItem>
            <DropdownMenuItem className="text-xs" onClick={onShutdown}>
              Shut Down...
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <span className="font-semibold">
          {activeApp ? activeApp.charAt(0).toUpperCase() + activeApp.slice(1) : "Finder"}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-black/5 px-2 py-0.5 rounded">File</DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[180px] text-xs">
            <DropdownMenuItem className="text-xs">
              New Window <span className="ml-auto text-[10px] text-muted-foreground">⌘N</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs">
              New Folder <span className="ml-auto text-[10px] text-muted-foreground">⇧⌘N</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs">
              Close Window <span className="ml-auto text-[10px] text-muted-foreground">⌘W</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-black/5 px-2 py-0.5 rounded">Edit</DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[180px] text-xs">
            <DropdownMenuItem className="text-xs">
              Undo <span className="ml-auto text-[10px] text-muted-foreground">⌘Z</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs">
              Redo <span className="ml-auto text-[10px] text-muted-foreground">⇧⌘Z</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs">
              Cut <span className="ml-auto text-[10px] text-muted-foreground">⌘X</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs">
              Copy <span className="ml-auto text-[10px] text-muted-foreground">⌘C</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs">
              Paste <span className="ml-auto text-[10px] text-muted-foreground">⌘V</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-black/5 px-2 py-0.5 rounded">View</DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[180px] text-xs">
            <DropdownMenuItem className="text-xs">as Icons</DropdownMenuItem>
            <DropdownMenuItem className="text-xs">as List</DropdownMenuItem>
            <DropdownMenuItem className="text-xs">as Columns</DropdownMenuItem>
            <DropdownMenuItem className="text-xs">as Gallery</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <span className="hover:bg-black/5 px-2 py-0.5 rounded cursor-default">Go</span>
        <span className="hover:bg-black/5 px-2 py-0.5 rounded cursor-default">Window</span>
        <span className="hover:bg-black/5 px-2 py-0.5 rounded cursor-default">Help</span>
      </div>

      {/* Right Side - Status Icons */}
      <div className="flex items-center gap-3">
        <Battery className="w-4 h-4" />
        <Wifi className="w-3.5 h-3.5" />
        <Volume2 className="w-3.5 h-3.5" />
        <Search className="w-3.5 h-3.5" />
        <span>{formatDate(currentTime)}</span>
        <span className="font-medium">{formatTime(currentTime)}</span>
      </div>
    </div>
  )
}
