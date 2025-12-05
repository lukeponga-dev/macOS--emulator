"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface TerminalAppProps {
  windowId: string
}

interface HistoryEntry {
  command: string
  output: string
}

export function TerminalApp({ windowId }: TerminalAppProps) {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { command: "", output: "Last login: " + new Date().toLocaleString() + " on ttys000" },
  ])
  const [currentInput, setCurrentInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const username = "user"
  const hostname = "MacEmu"

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [history])

  const processCommand = (cmd: string): string => {
    const args = cmd.trim().split(" ")
    const command = args[0].toLowerCase()

    switch (command) {
      case "":
        return ""
      case "help":
        return `Available commands:
  help     - Show this help message
  ls       - List directory contents
  pwd      - Print working directory
  whoami   - Print current user
  date     - Print current date and time
  echo     - Print arguments
  clear    - Clear terminal
  uname    - Print system information
  uptime   - Show system uptime
  neofetch - Display system information`
      case "ls":
        return "Applications  Desktop  Documents  Downloads  Library  Movies  Music  Pictures  Public"
      case "pwd":
        return `/Users/${username}`
      case "whoami":
        return username
      case "date":
        return new Date().toString()
      case "echo":
        return args.slice(1).join(" ")
      case "clear":
        setHistory([])
        return ""
      case "uname":
        if (args[1] === "-a") {
          return "Darwin MacEmu.local 23.0.0 Darwin Kernel Version 23.0.0: root:xnu-10002.1.13~1/RELEASE_ARM64_T6000 arm64"
        }
        return "Darwin"
      case "uptime":
        return " 10:42  up 2 days, 14:32, 2 users, load averages: 1.42 1.58 1.67"
      case "neofetch":
        return `                    'c.          ${username}@${hostname}
                 ,xNMM.          ---------------
               .OMMMMo           OS: macOS 14.0 Sonoma arm64
               OMMM0,            Host: MacBook Pro (14-inch, 2023)
     .;loddo:' loolloddol;.      Kernel: 23.0.0
   cKMMMMMMMMMMNWMMMMMMMMMM0:    Uptime: 2 days, 14 hours
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.    Packages: 142 (brew)
 XMMMMMMMMMMMMMMMMMMMMMMMX.      Shell: zsh 5.9
;MMMMMMMMMMMMMMMMMMMMMMMM:       Resolution: 3024x1964
:MMMMMMMMMMMMMMMMMMMMMMMM:       Terminal: MacEmu Terminal
.MMMMMMMMMMMMMMMMMMMMMMMMX.      CPU: Apple M3 Pro
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.    Memory: 8192MiB / 16384MiB
 .XMMMMMMMMMMMMMMMMMMMMMMMMMMk
  .XMMMMMMMMMMMMMMMMMMMMMMMMK.
    kMMMMMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMMMMMk.
       .coeli;,  .:lodl:.`
      default:
        return `zsh: command not found: ${command}`
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const output = processCommand(currentInput)
    if (currentInput !== "clear") {
      setHistory([...history, { command: currentInput, output }])
    }
    setCurrentInput("")
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return (
    <div
      ref={containerRef}
      className="h-full p-2 overflow-auto font-mono text-xs bg-black text-green-400 cursor-text"
      onClick={focusInput}
    >
      {history.map((entry, index) => (
        <div key={index}>
          {entry.command && (
            <div className="flex">
              <span className="text-blue-400">
                {username}@{hostname}
              </span>
              <span className="text-white">:</span>
              <span className="text-cyan-400">~</span>
              <span className="text-white">$ </span>
              <span className="text-white">{entry.command}</span>
            </div>
          )}
          {entry.output && <pre className="whitespace-pre-wrap text-white">{entry.output}</pre>}
        </div>
      ))}
      <form onSubmit={handleSubmit} className="flex">
        <span className="text-blue-400">
          {username}@{hostname}
        </span>
        <span className="text-white">:</span>
        <span className="text-cyan-400">~</span>
        <span className="text-white">$ </span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          className="flex-1 bg-transparent text-white outline-none"
          autoFocus
          spellCheck={false}
        />
      </form>
    </div>
  )
}
