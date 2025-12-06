import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MacEmulator } from "@/components/mac-emulator"
import { Progress } from "@/components/ui/progress"

export function HardwareSection() {
  return (
    <div className="space-y-8">
      <div>
        <Badge variant="secondary" className="mb-4">
          Core Emulation
        </Badge>
        <h1 className="text-4xl font-bold text-foreground mb-4">Hardware Virtualization</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Accurate emulation of Mac hardware components including CPU, memory, chipset, and peripheral controllers.
        </p>
      </div>

      <Tabs defaultValue="cpu" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cpu">CPU</TabsTrigger>
          <TabsTrigger value="memory">Memory</TabsTrigger>
          <TabsTrigger value="chipset">Chipset</TabsTrigger>
          <TabsTrigger value="peripherals">Peripherals</TabsTrigger>
        </TabsList>

        <TabsContent value="cpu" className="space-y-6 mt-6">
          <MacEmulator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">x86_64 Emulation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <CardDescription>
                  Full Intel/AMD instruction set support including SSE4, AVX, AVX2, and virtualization extensions.
                </CardDescription>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Instruction Coverage</span>
                    <span className="text-muted-foreground">98.5%</span>
                  </div>
                  <Progress value={98.5} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">ARM64 Emulation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <CardDescription>
                  Apple Silicon M-series emulation with NEON SIMD, AMX matrix extensions, and Neural Engine stubs.
                </CardDescription>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Instruction Coverage</span>
                    <span className="text-muted-foreground">94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">JIT Compilation Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted">
                  <p className="font-medium text-sm mb-1">Basic Blocks</p>
                  <p className="text-xs text-muted-foreground">
                    Identify and cache frequently executed code blocks for translation
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="font-medium text-sm mb-1">IR Generation</p>
                  <p className="text-xs text-muted-foreground">
                    Convert guest instructions to intermediate representation for optimization
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="font-medium text-sm mb-1">Native Codegen</p>
                  <p className="text-xs text-muted-foreground">
                    Emit optimized host machine code with register allocation
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="memory" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Memory Management Unit (MMU)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>
                Full virtual memory emulation with page table walking, TLB management, and memory protection
                enforcement.
              </CardDescription>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-lg border border-border">
                  <p className="text-2xl font-bold">64GB</p>
                  <p className="text-sm text-muted-foreground">Max Guest RAM</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="text-2xl font-bold">4KB</p>
                  <p className="text-sm text-muted-foreground">Page Size</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="text-2xl font-bold">1024</p>
                  <p className="text-sm text-muted-foreground">TLB Entries</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="text-2xl font-bold">4-Level</p>
                  <p className="text-sm text-muted-foreground">Page Tables</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Memory Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>0x00000000 - 0x000FFFFF</span>
                  <Badge variant="outline">Low Memory</Badge>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>0x00100000 - 0x7FFFFFFF</span>
                  <Badge variant="outline">Main RAM</Badge>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>0x80000000 - 0x8FFFFFFF</span>
                  <Badge variant="outline">MMIO Region</Badge>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>0xFEC00000 - 0xFECFFFFF</span>
                  <Badge variant="outline">APIC</Badge>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>0xFF000000 - 0xFFFFFFFF</span>
                  <Badge variant="outline">ROM/Firmware</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chipset" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Platform Controller Hub (PCH)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>
                Emulates the Mac&apos;s chipset functionality including PCI Express, USB controllers, and system
                management.
              </CardDescription>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div>
                    <p className="font-medium text-sm">PCIe Controller</p>
                    <p className="text-xs text-muted-foreground">Gen 4.0, 16 lanes</p>
                  </div>
                  <Badge>Emulated</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div>
                    <p className="font-medium text-sm">XHCI Controller</p>
                    <p className="text-xs text-muted-foreground">USB 3.2, 8 ports</p>
                  </div>
                  <Badge>Emulated</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div>
                    <p className="font-medium text-sm">NVMe Controller</p>
                    <p className="text-xs text-muted-foreground">Multiple namespaces</p>
                  </div>
                  <Badge>Emulated</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div>
                    <p className="font-medium text-sm">Thunderbolt Controller</p>
                    <p className="text-xs text-muted-foreground">TB4 passthrough</p>
                  </div>
                  <Badge variant="secondary">Partial</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="peripherals" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Storage Controllers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    NVMe SSD emulation with TRIM support
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    AHCI SATA controller for legacy drives
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Virtual disk image formats (QCOW2, RAW)
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Network Adapters</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Virtio-net for optimal performance
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Intel e1000e emulation for compatibility
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    Wi-Fi adapter passthrough (experimental)
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Audio Subsystem</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    HD Audio controller emulation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Multi-channel audio output
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Audio input for microphone
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Security Chip</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    T2/Secure Enclave stub
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    Touch ID sensor simulation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    DRM key storage (not supported)
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
