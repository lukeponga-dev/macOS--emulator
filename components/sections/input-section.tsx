"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InputDemo } from "@/components/demos/input-demo"

export function InputSection() {
  return (
    <div className="space-y-8">
      <div>
        <Badge variant="secondary" className="mb-4">
          Human Interface
        </Badge>
        <h1 className="text-4xl font-bold text-foreground mb-4">Input Device Support</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Comprehensive input handling for keyboard, mouse, trackpad, and specialized Mac peripherals with proper key
          mapping and gesture support.
        </p>
      </div>

      <InputDemo />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Keyboard Emulation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription>
              Full Mac keyboard layout support with proper modifier key mapping and special function keys.
            </CardDescription>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded bg-muted text-sm">
                <span>Command (⌘)</span>
                <span className="text-muted-foreground font-mono">→ Super/Win</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-muted text-sm">
                <span>Option (⌥)</span>
                <span className="text-muted-foreground font-mono">→ Alt</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-muted text-sm">
                <span>Control (⌃)</span>
                <span className="text-muted-foreground font-mono">→ Ctrl</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-muted text-sm">
                <span>Globe (🌐)</span>
                <span className="text-muted-foreground font-mono">→ Configurable</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Trackpad Gestures</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription>
              Multi-touch gesture recognition for Mac-native navigation and interactions.
            </CardDescription>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Two-finger scroll and zoom
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Three-finger swipe (Mission Control)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Four-finger pinch (Launchpad)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Force Touch pressure sensitivity
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                Apple Pencil support (iPad apps)
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Game Controllers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription>Support for game controllers via the Game Controller framework emulation.</CardDescription>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Xbox Controller</Badge>
              <Badge variant="outline">PlayStation DualSense</Badge>
              <Badge variant="outline">Nintendo Pro Controller</Badge>
              <Badge variant="outline">MFi Controllers</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Accessibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription>Full accessibility feature support for assistive technologies.</CardDescription>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                VoiceOver screen reader passthrough
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Switch Control compatibility
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Voice Control commands
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
