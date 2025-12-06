"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"

const compatibilityData = {
  os: [
    { name: "macOS 15 Sequoia", status: "supported", progress: 85 },
    { name: "macOS 14 Sonoma", status: "supported", progress: 95 },
    { name: "macOS 13 Ventura", status: "supported", progress: 98 },
    { name: "macOS 12 Monterey", status: "supported", progress: 99 },
    { name: "macOS 11 Big Sur", status: "supported", progress: 99 },
    { name: "macOS 10.15 Catalina", status: "supported", progress: 100 },
  ],
  apps: [
    { name: "Xcode", category: "Development", status: "working" },
    { name: "Final Cut Pro", category: "Creative", status: "working" },
    { name: "Logic Pro", category: "Audio", status: "working" },
    { name: "Adobe Creative Cloud", category: "Creative", status: "partial" },
    { name: "Microsoft Office", category: "Productivity", status: "working" },
    { name: "Sketch", category: "Design", status: "working" },
    { name: "Steam", category: "Gaming", status: "partial" },
    { name: "Docker Desktop", category: "Development", status: "working" },
  ],
}

export function CompatibilitySection() {
  const [selectedOs, setSelectedOs] = useState("macOS 14 Sonoma")

  return (
    <div className="space-y-8">
      <div>
        <Badge variant="secondary" className="mb-4">
          Software Support
        </Badge>
        <h1 className="text-4xl font-bold text-foreground mb-4">System Compatibility</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Target macOS version support and application compatibility status across major software categories.
        </p>
      </div>

      <Tabs defaultValue="macos" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="macos">macOS Versions</TabsTrigger>
          <TabsTrigger value="apps">Applications</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
        </TabsList>

        <TabsContent value="macos" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Supported macOS Versions</CardTitle>
              <CardDescription>Compatibility progress for different macOS releases</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {compatibilityData.os.map((os) => (
                <button
                  key={os.name}
                  onClick={() => setSelectedOs(os.name)}
                  className={`w-full p-4 rounded-lg border text-left transition-colors ${
                    selectedOs === os.name ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{os.name}</span>
                    <span className="text-sm text-muted-foreground">{os.progress}%</span>
                  </div>
                  <Progress value={os.progress} className="h-2" />
                </button>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apps" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Application Compatibility</CardTitle>
              <CardDescription>Status of popular Mac applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {compatibilityData.apps.map((app) => (
                  <div key={app.name} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <div>
                      <p className="font-medium text-sm">{app.name}</p>
                      <p className="text-xs text-muted-foreground">{app.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {app.status === "working" && (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Working
                          </Badge>
                        </>
                      )}
                      {app.status === "partial" && (
                        <>
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                            Partial
                          </Badge>
                        </>
                      )}
                      {app.status === "unsupported" && (
                        <>
                          <XCircle className="w-4 h-4 text-red-500" />
                          <Badge variant="outline" className="text-red-600 border-red-600">
                            Unsupported
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frameworks" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Core Frameworks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>AppKit / UIKit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>SwiftUI</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Core Data</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Core Graphics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Core Animation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Media Frameworks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>AVFoundation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Core Audio</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span>Core ML (partial)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span>Vision (partial)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span>Neural Engine (stub)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">System Services</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Keychain Services</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Notification Center</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>CloudKit (simulated)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span>iCloud Sync</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Security Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>App Sandbox</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Gatekeeper</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span>System Integrity Protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span>Secure Enclave</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
