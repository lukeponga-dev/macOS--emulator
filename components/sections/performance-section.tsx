"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PerformanceChart } from "@/components/demos/performance-chart"

export function PerformanceSection() {
  return (
    <div className="space-y-8">
      <div>
        <Badge variant="secondary" className="mb-4">
          Optimization
        </Badge>
        <h1 className="text-4xl font-bold text-foreground mb-4">Performance Optimization</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Strategies and techniques to achieve near-native performance through JIT compilation, caching, and hardware
          acceleration.
        </p>
      </div>

      <PerformanceChart />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">JIT Optimization Levels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg bg-muted">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">Level 0: Interpreter</span>
                <Badge variant="outline">1x speed</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Direct instruction interpretation for cold code paths</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">Level 1: Basic JIT</span>
                <Badge variant="outline">10-20x speed</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Simple block translation without optimization</p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">Level 2: Optimizing JIT</span>
                <Badge variant="outline">50-80x speed</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Full optimization with inlining and register allocation</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Caching Strategies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg bg-muted">
              <p className="font-medium text-sm mb-1">Translation Cache</p>
              <p className="text-xs text-muted-foreground">
                Store compiled code blocks keyed by guest address for instant reuse
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <p className="font-medium text-sm mb-1">Block Linking</p>
              <p className="text-xs text-muted-foreground">
                Direct jumps between cached blocks to avoid dispatcher overhead
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted">
              <p className="font-medium text-sm mb-1">TLB Softcache</p>
              <p className="text-xs text-muted-foreground">Fast address translation without full page table walks</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Memory Optimization</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                Large page support (2MB/1GB) for reduced TLB pressure
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                Memory ballooning for dynamic allocation
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                Copy-on-write for efficient snapshots
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                NUMA-aware memory allocation
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Threading Model</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                1:1 vCPU to host thread mapping
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                Lock-free device I/O where possible
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                Dedicated threads for JIT compilation
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                Async I/O for disk and network operations
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Performance Targets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-accent/10 border border-accent text-center">
              <p className="text-3xl font-bold text-accent-foreground">80-95%</p>
              <p className="text-sm text-muted-foreground">CPU Performance</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/10 border border-accent text-center">
              <p className="text-3xl font-bold text-accent-foreground">60-90%</p>
              <p className="text-sm text-muted-foreground">GPU Performance</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/10 border border-accent text-center">
              <p className="text-3xl font-bold text-accent-foreground">{"<"}5ms</p>
              <p className="text-sm text-muted-foreground">Input Latency</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/10 border border-accent text-center">
              <p className="text-3xl font-bold text-accent-foreground">{"<"}16ms</p>
              <p className="text-sm text-muted-foreground">Frame Time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
