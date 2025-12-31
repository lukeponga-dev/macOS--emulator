"use client"

import { useState } from "react"
import { Search, Plus, Trash2, FolderOpen } from "lucide-react"

interface NotesAppProps {
  windowId: string
}

interface Note {
  id: string
  title: string
  content: string
  date: string
}

const defaultNotes: Note[] = [
  {
    id: "1",
    title: "Welcome to Notes",
    content: "Start writing your thoughts here. Notes syncs across all your devices with iCloud.",
    date: "Today",
  },
  {
    id: "2",
    title: "Shopping List",
    content: "- Milk\n- Eggs\n- Bread\n- Butter\n- Coffee",
    date: "Yesterday",
  },
  {
    id: "3",
    title: "Meeting Notes",
    content: "Q4 Planning Meeting:\n- Review OKRs\n- Budget allocation\n- Team expansion",
    date: "Dec 1",
  },
]

export function NotesApp({ windowId }: NotesAppProps) {
  const [notes, setNotes] = useState<Note[]>(defaultNotes)
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      date: "Just now",
    }
    setNotes([newNote, ...notes])
    setSelectedNote(newNote)
  }

  const updateNote = (content: string) => {
    if (!selectedNote) return
    const lines = content.split("\n")
    const title = lines[0] || "New Note"
    const updatedNote = { ...selectedNote, title, content, date: "Just now" }
    setNotes(notes.map((n) => (n.id === selectedNote.id ? updatedNote : n)))
    setSelectedNote(updatedNote)
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id))
    if (selectedNote?.id === id) {
      setSelectedNote(notes[0] || null)
    }
  }

  return (
    <div className="flex h-full" style={{ color: "var(--color-macos-text)" }}>
      {/* Sidebar */}
      <div
        className="w-56 flex flex-col border-r border-black/10"
        style={{ backgroundColor: "var(--color-macos-sidebar)" }}
      >
        {/* Search */}
        <div className="p-2">
          <div className="flex items-center gap-2 px-2 py-1.5 bg-black/5 rounded-md">
            <Search className="w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent text-xs outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Folders */}
        <div className="px-2 py-1">
          <div className="flex items-center gap-2 px-2 py-1 text-xs font-medium rounded hover:bg-black/5">
            <FolderOpen className="w-4 h-4 text-yellow-500" />
            All Notes
            <span className="ml-auto text-gray-400">{notes.length}</span>
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto macos-scrollbar">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`px-3 py-2 cursor-default border-b border-black/5 ${
                selectedNote?.id === note.id ? "bg-blue-500 text-white" : "hover:bg-black/5"
              }`}
              onClick={() => setSelectedNote(note)}
            >
              <div className="text-xs font-medium truncate">{note.title}</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-[10px] ${selectedNote?.id === note.id ? "text-blue-100" : "text-gray-400"}`}>
                  {note.date}
                </span>
                <span
                  className={`text-[10px] truncate ${selectedNote?.id === note.id ? "text-blue-100" : "text-gray-400"}`}
                >
                  {note.content.split("\n")[0].substring(0, 30)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="p-2 flex items-center justify-between border-t border-black/10">
          <button className="p-1.5 hover:bg-black/5 rounded" onClick={createNote}>
            <Plus className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 hover:bg-black/5 rounded text-gray-400"
            onClick={() => selectedNote && deleteNote(selectedNote.id)}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedNote ? (
          <>
            <div className="p-3 border-b border-black/10">
              <div className="text-[10px] text-gray-400">{selectedNote.date}</div>
            </div>
            <textarea
              className="flex-1 p-4 text-sm outline-none resize-none"
              value={selectedNote.content}
              onChange={(e) => updateNote(e.target.value)}
              placeholder="Start writing..."
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">Select or create a note</div>
        )}
      </div>
    </div>
  )
}
