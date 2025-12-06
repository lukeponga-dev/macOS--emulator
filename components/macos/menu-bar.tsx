"use client"

import { useState, useEffect } from "react"
import { Apple, Wifi, Battery, Search, Volume2, SlidersHorizontal } from "lucide-react"
import type { VirtualMachine } from "@/types/emulator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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

  const formatTime = (date: Date) => date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
  const formatDate = (date: Date) => date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })

  const menuStyle = {
    backgroundColor: "rgba(29, 29, 29, 0.7)",
    backdropFilter: "blur(30px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "white",
  };

  return (
    <div
      className="h-7 px-2 flex items-center justify-between text-sm text-white relative z-50"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(30px) saturate(180%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Left Side */}
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center hover:bg-white/20 p-1 rounded transition-colors">
            <Apple className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" style={menuStyle} className="min-w-[220px]">
            <DropdownMenuItem>About This Mac</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem>System Settings...</DropdownMenuItem>
            <DropdownMenuItem>App Store...</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem>Sleep</DropdownMenuItem>
            <DropdownMenuItem>Restart...</DropdownMenuItem>
            <DropdownMenuItem onClick={onShutdown}>Shut Down...</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="font-bold hidden sm:inline">
          {activeApp ? activeApp.charAt(0).toUpperCase() + activeApp.slice(1) : "Finder"}
        </span>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <div className="md:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger className="hover:bg-white/20 p-1 rounded transition-colors">
                    <SlidersHorizontal className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" style={menuStyle} className="min-w-[180px]">
                    <DropdownMenuLabel>Control Center</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem><Wifi className="w-4 h-4 mr-2" /> Wi-Fi</DropdownMenuItem>
                    <DropdownMenuItem><Battery className="w-4 h-4 mr-2" /> Battery</DropdownMenuItem>
                    <DropdownMenuItem><Volume2 className="w-4 h-4 mr-2" /> Sound</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <Battery className="w-4 h-4 hidden md:inline" />
        <Wifi className="w-4 h-4 hidden md:inline" />
        <Volume2 className="w-4 h-4 hidden md:inline" />
        <Search className="w-4 h-4 hidden sm:inline" />
        <div className="hidden sm:flex flex-col items-end text-xs">
          <span className="font-medium">{formatTime(currentTime)}</span>
        </div>
         <span className="font-medium sm:hidden">{formatTime(currentTime)}</span>
      </div>
    </div>
  )
}
