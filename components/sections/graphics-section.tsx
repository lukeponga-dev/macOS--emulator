"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraphicsFramebuffer } from "@/components/emulator/graphics-framebuffer"

export function GraphicsSection() {
  return (
    <div className="space-y-8">
      <div>
        <Badge variant="secondary" className="mb-4">
          Visual Output
        </Badge>
        <h1 className="text-4xl font-bold text-foreground mb-4">Graphics Pipeline</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          High-performance graphics emulation supporting Metal API translation, hardware acceleration, and Retina
          display rendering.
        </p>
      </div>

      <GraphicsFramebuffer width={640} height={480} imageData={null} />

      <Tabs defaultValue="metal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="metal">Metal Emulation</TabsTrigger>
          <TabsTrigger value="display">Display System</TabsTrigger>
          <TabsTrigger value="acceleration">Acceleration</TabsTrigger>
        </TabsList>

        <TabsContent value="metal" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Metal API Translation Layer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>
                Translates Metal API calls to host graphics APIs (Vulkan, DirectX 12, or native Metal on macOS hosts)
                for hardware-accelerated rendering.
              </CardDescription>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted space-y-2">
                  <p className="font-medium text-sm">Supported Metal Features</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Metal Shading Language compilation</li>
                    <li>• Render pipelines and compute shaders</li>
                    <li>• Texture sampling and filtering</li>
                    <li>• Argument buffers and indirect commands</li>
                    <li>• Tile-based deferred rendering</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-muted space-y-2">
                  <p className="font-medium text-sm">Backend Targets</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Vulkan 1.3 (Linux, Windows)</li>
                    <li>• DirectX 12 (Windows)</li>
                    <li>• Native Metal (macOS host)</li>
                    <li>• OpenGL 4.6 fallback</li>
                    <li>• Software rasterizer (debug)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Shader Translation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 overflow-x-auto pb-2">
                <div className="p-3 rounded-lg bg-accent text-accent-foreground text-center min-w-[100px]">
                  <p className="font-mono text-xs">MSL</p>
                  <p className="text-xs opacity-70">Metal Shader</p>
                </div>
                <div className="text-muted-foreground">→</div>
                <div className="p-3 rounded-lg bg-muted text-center min-w-[100px]">
                  <p className="font-mono text-xs">AIR</p>
                  <p className="text-xs text-muted-foreground">Intermediate</p>
                </div>
                <div className="text-muted-foreground">→</div>
                <div className="p-3 rounded-lg bg-muted text-center min-w-[100px]">
                  <p className="font-mono text-xs">SPIRV</p>
                  <p className="text-xs text-muted-foreground">Cross-platform</p>
                </div>
                <div className="text-muted-foreground">→</div>
                <div className="p-3 rounded-lg bg-accent text-accent-foreground text-center min-w-[100px]">
                  <p className="font-mono text-xs">GLSL/HLSL</p>
                  <p className="text-xs opacity-70">Host Shader</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="display" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Display Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg border border-border text-center">
                  <p className="text-2xl font-bold">5K</p>
                  <p className="text-xs text-muted-foreground">Max Resolution</p>
                </div>
                <div className="p-4 rounded-lg border border-border text-center">
                  <p className="text-2xl font-bold">120Hz</p>
                  <p className="text-xs text-muted-foreground">Max Refresh</p>
                </div>
                <div className="p-4 rounded-lg border border-border text-center">
                  <p className="text-2xl font-bold">HDR10</p>
                  <p className="text-xs text-muted-foreground">Color Support</p>
                </div>
                <div className="p-4 rounded-lg border border-border text-center">
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground">Multi-Display</p>
                </div>
              </div>

              <CardDescription className="mt-4">
                Supports Retina scaling (1x, 2x, 3x), dynamic resolution changes, and True Tone color temperature
                simulation.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Window Compositing</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  WindowServer emulation for proper window management
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Quartz compositor for layer-based rendering
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Core Animation support for smooth animations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Mission Control and Spaces virtualization
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="acceleration" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">GPU Passthrough Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-muted">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">Full Passthrough</p>
                    <Badge>Best Performance</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Direct GPU access via VFIO/PCI passthrough. Requires compatible hardware and secondary GPU for host.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">SR-IOV Virtualization</p>
                    <Badge variant="secondary">Good Performance</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Hardware-partitioned GPU sharing. Supported on Intel/AMD server GPUs with SR-IOV capability.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">API Translation</p>
                    <Badge variant="outline">Moderate Performance</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Software translation layer. Most compatible option, works with any modern GPU.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
