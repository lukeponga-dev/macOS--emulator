"use client"

import { memo, useState } from "react"

interface WindowHeaderProps {
  title: string
  isActive: boolean
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onMouseDown: (e: React.MouseEvent) => void
}

export const WindowHeader = memo(function WindowHeader({
  title,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onMouseDown,
}: WindowHeaderProps) {
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
})
