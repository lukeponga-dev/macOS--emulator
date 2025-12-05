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

  if (window.maximized) {
    return (
      <div
        ref={windowRef}
        className="absolute top-6 left-0 right-0 bottom-16 window-open"
        style={{
          zIndex: window.zIndex,
          backgroundColor: "var(--color-macos-window)",
          borderRadius: 0,
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
      className="absolute flex flex-col window-open"
      style={{
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height,
        zIndex: window.zIndex,
        backgroundColor: "var(--color-macos-window)",
        borderRadius: "10px",
        boxShadow: isActive
          ? "0 22px 70px 4px rgba(0,0,0,0.56), 0 0 0 1px rgba(0,0,0,0.1)"
          : "0 10px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)",
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
      <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize" onMouseDown={handleResizeStart} />
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
  const [hoveredControl, setHoveredControl] = useState(false)

  return (
    <div
      className="h-7 flex items-center px-3 cursor-default select-none shrink-0"
      style={{
        backgroundColor: isActive ? "#f6f6f6" : "#e8e8e8",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
      }}
      onMouseDown={onMouseDown}
    >
      <div
        className="window-controls flex items-center gap-2"
        onMouseEnter={() => setHoveredControl(true)}
        onMouseLeave={() => setHoveredControl(false)}
      >
        <button
          className="w-3 h-3 rounded-full flex items-center justify-center text-[8px]"
          style={{ backgroundColor: "var(--color-macos-red)" }}
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
        >
          {hoveredControl && <span className="text-red-900 font-bold">×</span>}
        </button>
        <button
          className="w-3 h-3 rounded-full flex items-center justify-center text-[8px]"
          style={{ backgroundColor: "var(--color-macos-yellow)" }}
          onClick={(e) => {
            e.stopPropagation()
            onMinimize()
          }}
        >
          {hoveredControl && <span className="text-yellow-900 font-bold">−</span>}
        </button>
        <button
          className="w-3 h-3 rounded-full flex items-center justify-center text-[8px]"
          style={{ backgroundColor: "var(--color-macos-green)" }}
          onClick={(e) => {
            e.stopPropagation()
            onMaximize()
          }}
        >
          {hoveredControl && <span className="text-green-900 font-bold">+</span>}
        </button>
      </div>
      <span className="flex-1 text-center text-xs font-medium" style={{ color: "var(--color-macos-text)" }}>
        {title}
      </span>
      <div className="w-14" /> {/* Spacer for centering */}
    </div>
  )
}
