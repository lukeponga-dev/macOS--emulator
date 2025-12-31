"use client"

import { useEffect, useState } from "react"
import type { VirtualMachine } from "../mac-emulator"

interface BootSequenceProps {
  machine: VirtualMachine
  onComplete: () => void
}

const bootMessages = [
  "Initializing hardware...",
  "Loading EFI firmware...",
  "Starting kernel...",
  "Loading kernel extensions...",
  "Mounting file systems...",
  "Starting system services...",
  "Loading WindowServer...",
  "Starting login window...",
]

export function BootSequence({ machine, onComplete }: BootSequenceProps) {
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [showAppleLogo, setShowAppleLogo] = useState(true)

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 80)

    // Boot message cycling
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => {
        if (prev >= bootMessages.length - 1) {
          clearInterval(messageInterval)
          return prev
        }
        return prev + 1
      })
    }, 500)

    // Complete boot
    const completeTimeout = setTimeout(() => {
      onComplete()
    }, 4500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
      clearTimeout(completeTimeout)
    }
  }, [onComplete])

  return (
    <div className="flex-1 bg-black flex flex-col items-center justify-center">
      {/* Apple Logo */}
      <div className="mb-8">
        <svg className="w-20 h-24 text-white" viewBox="0 0 170 170" fill="currentColor">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929 0.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002 0.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-0.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375-0.119-0.972-0.188-1.995-0.188-3.07 0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.311 11.45-8.597 4.62-2.252 8.99-3.497 13.1-3.71 0.12 1.083 0.17 2.166 0.17 3.241z" />
        </svg>
      </div>

      {/* Progress Bar */}
      <div className="w-48 h-1 bg-neutral-800 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Boot Message */}
      <p className="text-neutral-500 text-xs font-mono">{bootMessages[currentMessage]}</p>

      {/* Machine Info */}
      <div className="absolute bottom-8 text-neutral-600 text-xs text-center">
        <p>
          {machine.name} - {machine.model}
        </p>
        <p>{machine.osVersion}</p>
      </div>
    </div>
  )
}
