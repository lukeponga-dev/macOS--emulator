"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Label, Pie, PieChart, Sector, Tooltip as RechartsTooltip } from "recharts"
import {
  Cell,
  Legend,
  PolarGrid,
  RadialBar,
  RadialBarChart,
  type TooltipProps,
} from "recharts"

import { cn } from "@/lib/utils"

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: {
      [key in string]: {
        label: string
        color: string
      }
    }
  }
>(({ config, className, ...props }, ref) => {
  const [activeChart, setActiveChart] = React.useState<string | null>(null)

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      {...props}
      style={
        {
          ...props.style,
          "--chart-1": "hsl(var(--chart-1))",
          "--chart-2": "hsl(var(--chart-2))",
          "--chart-3": "hsl(var(--chart-3))",
          "--chart-4": "hsl(var(--chart-4))",
          "--chart-5": "hsl(var(--chart-5))",
        } as React.CSSProperties
      }
    />
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = RechartsTooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipProps<any, any> & React.HTMLAttributes<HTMLDivElement>
>(({ active, payload, label, className, ...props }, ref) => {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        "grid w-40 gap-1.5 rounded-lg border border-border bg-background/95 p-2.5 text-sm shadow-lg backdrop-blur-lg transition-all animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    >
      <div className="font-medium">{label}</div>
      <div className="grid gap-1.5">
        {payload.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
          >
            {item.payload.icon ? (
              item.payload.icon
            ) : (
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                style={{ backgroundColor: item.color }}
              />
            )}
            <div className="flex flex-1 justify-between">
              <div className="text-muted-foreground">{item.name}</div>
              <div>{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

export { ChartContainer, ChartTooltip, ChartTooltipContent }
