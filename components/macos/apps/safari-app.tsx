"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, RotateCw, Share, Plus, Bookmark, Grid, Lock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


interface SafariAppProps {
  windowId: string
}

const defaultTabs = [{ id: "1", title: "Apple", url: "https://www.apple.com", favicon: "🍎" }]

const bookmarks = [
  { id: "1", title: "Apple", url: "https://apple.com", favicon: "🍎" },
  { id: "2", title: "GitHub", url: "https://github.com", favicon: "🐙" },
  { id: "3", title: "YouTube", url: "https://youtube.com", favicon: "📺" },
  { id: "4", title: "Twitter", url: "https://twitter.com", favicon: "🐦" },
  { id: "5", title: "Reddit", url: "https://reddit.com", favicon: "🤖" },
  { id: "6", title: "Wikipedia", url: "https://wikipedia.org", favicon: "📚" },
]

export function SafariApp({ windowId }: SafariAppProps) {
  const [tabs, setTabs] = useState(defaultTabs)
  const [activeTab, setActiveTab] = useState("1")
  const [url, setUrl] = useState("https://www.apple.com")
  const [isLoading, setIsLoading] = useState(false)

  const currentTab = tabs.find((t) => t.id === activeTab)

  const addTab = () => {
    const newTab = {
      id: Date.now().toString(),
      title: "New Tab",
      url: "",
      favicon: "🌐",
    }
    setTabs([...tabs, newTab])
    setActiveTab(newTab.id)
    setUrl("")
  }

  const closeTab = (id: string) => {
    if (tabs.length === 1) return
    const newTabs = tabs.filter((t) => t.id !== id)
    setTabs(newTabs)
    if (activeTab === id) {
      setActiveTab(newTabs[newTabs.length - 1].id)
    }
  }

  const navigate = (newUrl: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setUrl(newUrl)
      setTabs(
        tabs.map((t) =>
          t.id === activeTab ? { ...t, url: newUrl, title: new URL(newUrl).hostname.replace("www.", "") } : t,
        ),
      )
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="flex flex-col h-full bg-white" style={{ color: "var(--color-macos-text)" }}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center gap-1 px-2 py-1 border-b border-black/10" style={{ backgroundColor: "#f6f6f6" }}>
                <TabsList className="flex items-center gap-1 px-2 py-1">
                    {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs cursor-default max-w-[200px]"
                        onClick={() => {
                        setActiveTab(tab.id)
                        setUrl(tab.url)
                        }}
                    >
                        <span>{tab.favicon}</span>
                        <span className="truncate flex-1">{tab.title || "New Tab"}</span>
                        {tabs.length > 1 && (
                        <button
                            className="opacity-0 hover:opacity-100 text-gray-400 hover:text-gray-600"
                            onClick={(e) => {
                            e.stopPropagation()
                            closeTab(tab.id)
                            }}
                        >
                            ×
                        </button>
                        )}
                    </TabsTrigger>
                    ))}
                </TabsList>
                <button className="p-1.5 hover:bg-black/5 rounded" onClick={addTab}>
                    <Plus className="w-3.5 h-3.5" />
                </button>
            </div>


            {/* URL Bar */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-black/10 bg-gray-50">
                <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-black/5 rounded text-gray-400">
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1.5 hover:bg-black/5 rounded text-gray-400">
                    <ChevronRight className="w-4 h-4" />
                </button>
                </div>

                <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200">
                <Lock className="w-3 h-3 text-gray-400" />
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => {
                    if (e.key === "Enter" && url) {
                        const fullUrl = url.startsWith("http") ? url : `https://${url}`
                        navigate(fullUrl)
                    }
                    }}
                    className="flex-1 text-xs outline-none bg-transparent"
                    placeholder="Search or enter website name"
                />
                {isLoading && <RotateCw className="w-3 h-3 text-gray-400 animate-spin" />}
                </div>

                <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-black/5 rounded">
                    <Share className="w-4 h-4" />
                </button>
                <button className="p-1.5 hover:bg-black/5 rounded">
                    <Bookmark className="w-4 h-4" />
                </button>
                <button className="p-1.5 hover:bg-black/5 rounded">
                    <Grid className="w-4 h-4" />
                </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
                {tabs.map((tab) => (
                    <TabsContent key={tab.id} value={tab.id}>
                        {tab.url ? (
                        <div className="h-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
                            <div className="text-center">
                            <div className="text-6xl mb-4">{tab.favicon}</div>
                            <h2 className="text-xl font-semibold mb-2">{tab.title}</h2>
                            <p className="text-sm text-gray-500">{tab.url}</p>
                            <p className="text-xs text-gray-400 mt-4">External websites cannot be displayed in this simulation</p>
                            </div>
                        </div>
                        ) : (
                        <div className="p-8">
                            <h2 className="text-lg font-medium mb-4 text-center">Favorites</h2>
                            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                            {bookmarks.map((bookmark) => (
                                <button
                                key={bookmark.id}
                                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100"
                                onClick={() => navigate(bookmark.url)}
                                >
                                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
                                    {bookmark.favicon}
                                </div>
                                <span className="text-xs text-gray-600 truncate w-full text-center">{bookmark.title}</span>
                                </button>
                            ))}
                            </div>
                        </div>
                        )}
                    </TabsContent>
                ))}
            </div>
        </Tabs>
    </div>
  )
}
