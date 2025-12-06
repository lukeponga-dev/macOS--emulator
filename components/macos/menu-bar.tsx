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
      className="h-6 px-2 flex items-center justify-between text-xs relative z-50"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(30px) saturate(180%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        color: "white",
      }}
    >
      {/* Left Side - Apple Menu & App Menu */}
      <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center hover:bg-white/20 px-2 py-0.5 rounded transition-colors duration-150">
            <Apple className="w-3.5 h-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="min-w-[200px] text-xs"
            style={{
              backgroundColor: "rgba(29, 29, 29, 0.8)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "white",
            }}
          >
            <DropdownMenuItem className="text-xs hover:bg-white/20">About This Mac</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10"/>
            <DropdownMenuItem className="text-xs hover:bg-white/20">System Settings...</DropdownMenuItem>
            <DropdownMenuItem className="text-xs hover:bg-white/20">App Store...</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10"/>
            <DropdownMenuItem className="text-xs hover:bg-white/20">Recent Items</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10"/>
            <DropdownMenuItem className="text-xs hover:bg-white/20">Force Quit...</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10"/>
            <DropdownMenuItem className="text-xs hover:bg-white/20">Sleep</DropdownMenuItem>
            <DropdownMenuItem className="text-xs hover:bg-white/20">Restart...</DropdownMenuItem>
            <DropdownMenuItem className="text-xs hover:bg-white/20" onClick={onShutdown}>
              Shut Down...
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <span className="font-semibold inline">
          {activeApp ? activeApp.charAt(0).toUpperCase() + activeApp.slice(1) : "Finder"}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-white/20 px-2 py-0.5 rounded transition-colors duration-150 hidden sm:flex">File</DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="min-w-[180px] text-xs"
            style={{
              backgroundColor: "rgba(29, 29, 29, 0.8)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "white",
            }}
          >
            <DropdownMenuItem className="text-xs hover:bg-white/20">
              New Window <span className="ml-auto text-[10px] text-gray-400">⌘N</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs hover:bg-white/20">
              New Folder <span className="ml-auto text-[10px] text-gray-400">⇧⌘N</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10"/>
            <DropdownMenuItem className="text-xs hover:bg-white/20">
              Close Window <span className="ml-auto text-[10px] text-gray-400">⌘W</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-white/20 px-2 py-0.5 rounded transition-colors duration-150 hidden sm:flex">Edit</DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="min-w-[180px] text-xs"
            style={{
              backgroundColor: "rgba(29, 29, 29, 0.8)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "white",
            }}
          >
            <DropdownMenuItem className="text-xs hover:bg-white/20">
              Undo <span className="ml-auto text-[10px] text-gray-400">⌘Z</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs hover:bg-white/20">
              Redo <span className="ml-auto text-[10px] text-gray-400">⇧⌘Z</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10"/>
            <DropdownMenuItem className="text-xs hover:bg-white/20">
              Cut <span className="ml-auto text-[10px] text-gray-400">⌘X</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs hover:bg-white/20">
              Copy <span className="ml-auto text-[10px] text-gray-400">⌘C</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs hover:bg-white/20">
              Paste <span className="ml-auto text-[10px] text-gray-400">⌘V</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-white/20 px-2 py-0.5 rounded transition-colors duration-150 hidden sm:flex">View</DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="min-w-[180px] text-xs"
            style={{
              backgroundColor: "rgba(29, 29, 29, 0.8)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "white",
            }}
          >
            <DropdownMenuItem className="text-xs hover:bg-white/20">as Icons</DropdownMenuItem>
            <DropdownMenuItem className="text-xs hover:bg-white/20">as List</DropdownMenuItem>
            <DropdownMenuItem className="text-xs hover:bg-white/20">as Columns</DropdownMenuItem>
            <DropdownMenuItem className="text-xs hover:bg-white/20">as Gallery</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <span className="hover:bg-white/20 px-2 py-0.5 rounded cursor-default transition-colors duration-150 hidden md:inline">Go</span>
        <span className="hover:bg-white/20 px-2 py-0.5 rounded cursor-default transition-colors duration-150 hidden md:inline">Window</span>
        <span className="hover:bg-white/20 px-2 py-0.5 rounded cursor-default transition-colors duration-150 hidden md:inline">Help</span>
      </div>

      {/* Right Side - Status Icons */}
      <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
        <Battery className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <Volume2 className="w-3.5 h-3.5" />
        <Search className="w-3 h-3 md:w-3.5 md:h-3.5 hidden sm:block" />
        <span className="hidden md:inline">{formatDate(currentTime)}</span>
        <span className="font-medium">{formatTime(currentTime)}</span>
      </div>
    </div>
  )
}
