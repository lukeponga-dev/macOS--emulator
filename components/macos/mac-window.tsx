"use client"

import type React from "react"

import { type ReactNode, useRef, useState, useEffect } from "react"
import type { AppWindow } from "./macos-desktop"

interface MacWindowProps {
  window: AppWindow
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
  onMove: (x: number, y: number) => void
  onResize: (width: number, height: number) => void
  children: ReactNode
}

export function MacWindow({
  window,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize,
  children,
}: MacWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isResizing, setIsResizing] = useState(false)
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".window-controls")) return
    onFocus()
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - window.x,
      y: e.clientY - window.y,
    })
  }

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation()
    onFocus()
    setIsResizing(true)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: window.width,
      height: window.height,
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = Math.max(0, e.clientX - dragOffset.x)
        const newY = Math.max(24, e.clientY - dragOffset.y)
        onMove(newX, newY)
      }
      if (isResizing) {
        const deltaX = e.clientX - resizeStart.x
        const deltaY = e.clientY - resizeStart.y
        const newWidth = Math.max(200, resizeStart.width + deltaX)
        const newHeight = Math.max(150, resizeStart.height + deltaY)
        onResize(newWidth, newHeight)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, isResizing, dragOffset, resizeStart, onMove, onResize])

  const shadowStyle = isActive
    ? "0 15px 30px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)"
    : "0 8px 20px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.03)"

  if (window.maximized) {
    return (
      <div
        ref={windowRef}
        className="absolute top-6 left-0 right-0 bottom-16 window-open"
        style={{
          zIndex: window.zIndex,
          backgroundColor: "var(--color-macos-window)",
          borderRadius: 0,
          boxShadow: shadowStyle,
        }}
        onClick={onFocus}
      >
        <WindowHeader
          title={window.title}
          isActive={isActive}
          onClose={onClose}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
          onMouseDown={handleMouseDown}
        />
        <div className="flex-1 overflow-hidden" style={{ height: "calc(100% - 28px)" }}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={windowRef}
      className="absolute flex flex-col window-open inset-x-2 top-8 bottom-20 md:left-auto md:top-auto md:right-auto md:bottom-auto"
      style={{
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height,
        zIndex: window.zIndex,
        backgroundColor: "var(--color-macos-window)",
        borderRadius: "8px",
        boxShadow: shadowStyle,
        overflow: "hidden",
      }}
      onClick={onFocus}
    >
      <WindowHeader
        title={window.title}
        isActive={isActive}
        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onMouseDown={handleMouseDown}
      />
      <div className="flex-1 overflow-hidden">{children}</div>
      {/* Resize handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-0 hover:opacity-100 transition-opacity duration-200 md:block hidden"
        onMouseDown={handleResizeStart}
      />
    </div>
  )
}

interface WindowHeaderProps {
  title: string
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onMouseDown: (e: React.MouseEvent) => void
}

function WindowHeader({ title, isActive, onClose, onMinimize, onMaximize, onMouseDown }: WindowHeaderProps) {
  const [isHovered, setIsHovered] = useState(false)

  const controlButtonClass =
    "w-3 h-3 rounded-full flex items-center justify-center text-[8px] transition-all duration-100 ease-out"

  return (
    <div
      className="h-7 flex items-center px-3 cursor-default select-none shrink-0"
      style={{
        backgroundColor: isActive ? "#ffffff" : "#f0f0f0",
        borderBottom: isActive ? "1px solid #e0e0e0" : "1px solid #e8e8e8",
      }}
      onMouseDown={onMouseDown}
    >
      <div
        className="window-controls flex items-center gap-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          className={`${controlButtonClass} ${isHovered ? "bg-red-500" : "bg-red-400 opacity-50"}`}
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
        >
          {isHovered && <span className="text-white font-bold">×</span>}
        </button>
        <button
          className={`${controlButtonClass} ${isHovered ? "bg-yellow-500" : "bg-yellow-400 opacity-50"}`}
          onClick={(e) => {
            e.stopPropagation()
            onMinimize()
          }}
        >
          {isHovered && <span className="text-white font-bold">−</span>}
        </button>
        <button
          className={`${controlButtonClass} ${isHovered ? "bg-green-500" : "bg-green-400 opacity-50"}`}
          onClick={(e) => {
            e.stopPropagation()
            onMaximize()
          }}
        >
          {isHovered && <span className="text-white font-bold">+</span>}
        </button>
      </div>
      <span className="flex-1 text-center text-xs font-medium" style={{ color: isActive ? "#333" : "#666" }}>
        {title}
      </span>
      <div className="w-14" /> {/* Spacer for centering */}
    </div>
  )
}
