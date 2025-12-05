"use client"

import { useState } from "react"
import {
  Wifi,
  Bluetooth,
  Monitor,
  Volume2,
  Sun,
  Moon,
  Bell,
  Shield,
  HardDrive,
  User,
  Keyboard,
  MousePointer,
  Battery,
  Clock,
  Globe,
  Accessibility,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

interface SettingsAppProps {
  windowId: string
}

const settingsSections = [
  { id: "wifi", label: "Wi-Fi", icon: Wifi },
  { id: "bluetooth", label: "Bluetooth", icon: Bluetooth },
  { id: "display", label: "Displays", icon: Monitor },
  { id: "sound", label: "Sound", icon: Volume2 },
  { id: "appearance", label: "Appearance", icon: Sun },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy & Security", icon: Shield },
  { id: "storage", label: "Storage", icon: HardDrive },
  { id: "users", label: "Users & Groups", icon: User },
  { id: "keyboard", label: "Keyboard", icon: Keyboard },
  { id: "trackpad", label: "Trackpad", icon: MousePointer },
  { id: "battery", label: "Battery", icon: Battery },
  { id: "datetime", label: "Date & Time", icon: Clock },
  { id: "language", label: "Language & Region", icon: Globe },
  { id: "accessibility", label: "Accessibility", icon: Accessibility },
]

export function SettingsApp({ windowId }: SettingsAppProps) {
  const [selectedSection, setSelectedSection] = useState("wifi")
  const [settings, setSettings] = useState({
    wifi: true,
    bluetooth: true,
    darkMode: false,
    notifications: true,
    volume: 75,
    brightness: 80,
  })

  const renderContent = () => {
    switch (selectedSection) {
      case "wifi":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Wi-Fi</h3>
                <p className="text-xs text-gray-500">Connected to MacEmu-Network</p>
              </div>
              <Switch
                checked={settings.wifi}
                onCheckedChange={(checked) => setSettings({ ...settings, wifi: checked })}
              />
            </div>
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-xs font-medium text-gray-500 mb-2">AVAILABLE NETWORKS</h4>
              {["MacEmu-Network", "Guest-WiFi", "Office-5G", "Neighbor's WiFi"].map((network, i) => (
                <div
                  key={network}
                  className="flex items-center justify-between py-2 hover:bg-gray-100 rounded px-2 -mx-2"
                >
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">{network}</span>
                  </div>
                  {i === 0 && <span className="text-xs text-blue-500">Connected</span>}
                </div>
              ))}
            </div>
          </div>
        )
      case "display":
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Brightness</span>
                <Sun className="w-4 h-4" />
              </div>
              <Slider
                value={[settings.brightness]}
                onValueChange={([value]) => setSettings({ ...settings, brightness: value })}
                max={100}
              />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Resolution</h4>
              <div className="grid grid-cols-3 gap-2">
                {["Default", "Scaled", "Custom"].map((res) => (
                  <button
                    key={res}
                    className="px-3 py-2 text-xs rounded-lg border border-gray-300 hover:border-blue-500"
                  >
                    {res}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">True Tone</span>
              <Switch checked={true} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Night Shift</span>
              <Switch checked={false} />
            </div>
          </div>
        )
      case "sound":
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Output Volume</span>
                <Volume2 className="w-4 h-4" />
              </div>
              <Slider
                value={[settings.volume]}
                onValueChange={([value]) => setSettings({ ...settings, volume: value })}
                max={100}
              />
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Output Device</h4>
              {["MacBook Pro Speakers", "External Display", "AirPods Pro"].map((device, i) => (
                <div key={device} className="flex items-center gap-2 py-2">
                  <div
                    className={`w-3 h-3 rounded-full border ${i === 0 ? "bg-blue-500 border-blue-500" : "border-gray-300"}`}
                  />
                  <span className="text-sm">{device}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Play feedback when volume is changed</span>
              <Switch checked={true} />
            </div>
          </div>
        )
      case "appearance":
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-3">Appearance</h4>
              <div className="grid grid-cols-3 gap-3">
                <button className="flex flex-col items-center p-3 rounded-lg border-2 border-blue-500 bg-blue-50">
                  <Sun className="w-6 h-6 mb-1" />
                  <span className="text-xs">Light</span>
                </button>
                <button className="flex flex-col items-center p-3 rounded-lg border border-gray-300">
                  <Moon className="w-6 h-6 mb-1" />
                  <span className="text-xs">Dark</span>
                </button>
                <button className="flex flex-col items-center p-3 rounded-lg border border-gray-300">
                  <Monitor className="w-6 h-6 mb-1" />
                  <span className="text-xs">Auto</span>
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3">Accent Color</h4>
              <div className="flex gap-2">
                {["#007AFF", "#5856D6", "#FF2D55", "#FF9500", "#FFCC00", "#34C759", "#5AC8FA", "#AF52DE"].map(
                  (color) => (
                    <button
                      key={color}
                      className="w-6 h-6 rounded-full ring-2 ring-offset-2 ring-transparent hover:ring-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Settings panel for {selectedSection}
          </div>
        )
    }
  }

  return (
    <div className="flex h-full" style={{ color: "var(--color-macos-text)" }}>
      {/* Sidebar */}
      <div
        className="w-56 py-2 overflow-y-auto macos-scrollbar border-r border-black/10"
        style={{ backgroundColor: "var(--color-macos-sidebar)" }}
      >
        {settingsSections.map((section) => {
          const Icon = section.icon
          return (
            <button
              key={section.id}
              className={`w-full px-3 py-1.5 flex items-center gap-3 text-xs ${
                selectedSection === section.id ? "bg-blue-500 text-white" : "hover:bg-black/5"
              }`}
              onClick={() => setSelectedSection(section.id)}
            >
              <Icon className="w-4 h-4" />
              {section.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-white overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">{settingsSections.find((s) => s.id === selectedSection)?.label}</h2>
        {renderContent()}
      </div>
    </div>
  )
}
