"use client"

import { useState, useMemo } from "react"
import { Search, Plus, Trash2, Folder, Bold, Italic, Underline } from "lucide-react"
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

interface Note {
  id: string
  title: string
  content: string // Should be HTML string
  date: string
}

const defaultNotes: Note[] = [
  {
    id: "1", title: "Welcome to Notes",
    content: "<p>Start writing your thoughts here. This is a <b>rich text editor</b>!</p>",
    date: "Today",
  },
  {
    id: "2", title: "Shopping List",
    content: "<ul><li>Milk</li><li>Eggs</li><li>Bread</li></ul>",
    date: "Yesterday",
  },
]

export function NotesApp({ windowId }: { windowId: string }) {
  const [notes, setNotes] = useState<Note[]>(defaultNotes)
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(notes[0]?.id || null)
  const [searchQuery, setSearchQuery] = useState("")

  const selectedNote = useMemo(() => notes.find(n => n.id === selectedNoteId), [notes, selectedNoteId])

  const editor = useEditor({
    extensions: [StarterKit],
    content: selectedNote?.content || '',
    editorProps: { attributes: { class: 'prose prose-sm sm:prose-base focus:outline-none p-4 flex-1' } },
    onUpdate: ({ editor }) => {
      if (!selectedNote) return;
      const html = editor.getHTML();
      const title = editor.state.doc.content.firstChild?.textContent || 'New Note';
      const updatedNote = { ...selectedNote, title, content: html, date: "Just now" };
      setNotes(notes.map(n => n.id === selectedNote.id ? updatedNote : n));
    },
  });

  const createNote = () => {
    const newNote: Note = { id: Date.now().toString(), title: "New Note", content: "", date: "Just now" };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
    editor?.commands.setContent('');
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    if (selectedNoteId === id) setSelectedNoteId(notes[0]?.id || null);
  }

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full bg-neutral-100">
      {/* Sidebar */}
      <div className="w-48 sm:w-56 flex flex-col border-r border-neutral-200">
        <div className="p-2 border-b border-neutral-200">
            <div className="flex items-center gap-2 px-2 py-1 bg-white rounded-md shadow-sm">
                <Search className="w-3.5 h-3.5 text-neutral-400" />
                <input type="text" placeholder="Search" className="flex-1 bg-transparent text-xs outline-none"
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
        </div>
        <div className="flex-1 overflow-y-auto">
            {filteredNotes.map(note => (
                <div key={note.id} onClick={() => setSelectedNoteId(note.id)}
                    className={`px-3 py-2 cursor-pointer border-l-2 ${selectedNoteId === note.id ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:bg-neutral-50'}`}>
                    <div className="text-xs font-semibold truncate">{note.title}</div>
                    <div className="text-[10px] text-neutral-500 truncate">{note.date}</div>
                </div>
            ))}
        </div>
        <div className="p-2 flex items-center justify-between border-t border-neutral-200">
            <button className="p-1.5 hover:bg-neutral-200 rounded" onClick={createNote}><Plus className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-neutral-200 rounded text-neutral-500"
                onClick={() => selectedNoteId && deleteNote(selectedNoteId)}><Trash2 className="w-4 h-4" /></button>
        </div>
      </div>
      {/* Editor */}
      <div className="flex-1 flex flex-col">
        {editor && selectedNote ? (
            <>
                <div className="flex items-center gap-2 p-2 border-b border-neutral-200 bg-white">
                    <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1 rounded ${editor.isActive('bold') ? 'bg-neutral-200' : 'hover:bg-neutral-100'}`}><Bold className="w-4 h-4"/></button>
                    <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1 rounded ${editor.isActive('italic') ? 'bg-neutral-200' : 'hover:bg-neutral-100'}`}><Italic className="w-4 h-4"/></button>
                    <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-1 rounded ${editor.isActive('underline') ? 'bg-neutral-200' : 'hover:bg-neutral-100'}`}><Underline className="w-4 h-4"/></button>
                </div>
                <EditorContent editor={editor} className="flex-1 overflow-y-auto"/>
            </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-neutral-500">Select a note or create a new one.</div>
        )}
      </div>
    </div>
  )
}
