"use client"

import type React from "react"
import { useState } from "react"

interface CalculatorAppProps {
  windowId: string
}

export function CalculatorApp({ windowId }: CalculatorAppProps) {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const toggleSign = () => {
    const value = parseFloat(display)
    setDisplay(String(value * -1))
  }

  const percentage = () => {
    const value = parseFloat(display)
    setDisplay(String(value / 100))
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue
      let result = 0

      switch (operation) {
        case "+": result = currentValue + inputValue; break
        case "-": result = currentValue - inputValue; break
        case "×": result = currentValue * inputValue; break
        case "÷": result = currentValue / inputValue; break
      }

      setDisplay(String(result))
      setPreviousValue(result)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = () => {
    if (!operation || previousValue === null) return
    const inputValue = parseFloat(display)
    let result = 0

    switch (operation) {
      case "+": result = previousValue + inputValue; break
      case "-": result = previousValue - inputValue; break
      case "×": result = previousValue * inputValue; break
      case "÷": result = previousValue / inputValue; break
    }

    setDisplay(String(result))
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(true)
  }

  const Button = ({
    children,
    onClick,
    className = "",
    wide = false,
  }: {
    children: React.ReactNode
    onClick: () => void
    className?: string
    wide?: boolean
  }) => (
    <div className={`${wide ? "col-span-2" : ""} aspect-w-1 aspect-h-1`}>
      <button
        className={`w-full h-full rounded-full text-xl md:text-2xl font-light flex items-center justify-center active:opacity-70 transition-opacity ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )

  return (
    <div className="h-full flex flex-col bg-black p-2 space-y-2">
      {/* Display */}
      <div className="flex-1 flex items-end justify-end px-4 pb-2">
        <span className="text-white text-5xl md:text-6xl font-light truncate">
          {display.length > 9 ? parseFloat(display).toExponential(4) : display}
        </span>
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-4 gap-2">
        <Button onClick={clear} className="bg-gray-400 text-black">AC</Button>
        <Button onClick={toggleSign} className="bg-gray-400 text-black">±</Button>
        <Button onClick={percentage} className="bg-gray-400 text-black">%</Button>
        <Button onClick={() => performOperation("÷")} className="bg-orange-500 text-white">÷</Button>

        <Button onClick={() => inputDigit("7")} className="bg-gray-700 text-white">7</Button>
        <Button onClick={() => inputDigit("8")} className="bg-gray-700 text-white">8</Button>
        <Button onClick={() => inputDigit("9")} className="bg-gray-700 text-white">9</Button>
        <Button onClick={() => performOperation("×")} className="bg-orange-500 text-white">×</Button>

        <Button onClick={() => inputDigit("4")} className="bg-gray-700 text-white">4</Button>
        <Button onClick={() => inputDigit("5")} className="bg-gray-700 text-white">5</Button>
        <Button onClick={() => inputDigit("6")} className="bg-gray-700 text-white">6</Button>
        <Button onClick={() => performOperation("-")} className="bg-orange-500 text-white">−</Button>

        <Button onClick={() => inputDigit("1")} className="bg-gray-700 text-white">1</Button>
        <Button onClick={() => inputDigit("2")} className="bg-gray-700 text-white">2</Button>
        <Button onClick={() => inputDigit("3")} className="bg-gray-700 text-white">3</Button>
        <Button onClick={() => performOperation("+")} className="bg-orange-500 text-white">+</Button>

        <Button onClick={() => inputDigit("0")} className="bg-gray-700 text-white pl-6 md:pl-8 justify-start" wide>0</Button>
        <Button onClick={inputDecimal} className="bg-gray-700 text-white">.</Button>
        <Button onClick={calculate} className="bg-orange-500 text-white">=</Button>
      </div>
    </div>
  )
}
