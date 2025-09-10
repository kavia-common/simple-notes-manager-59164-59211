import React, { useEffect, useMemo, useState } from "react";
import { Header } from "../common/Header";
import { NotesList } from "./NotesList";
import { Editor } from "./Editor";
import { notesStore } from "../../notes/store";
import type { Note } from "../../notes/types";

// PUBLIC_INTERFACE
export const NotesApp: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(notesStore.getState().notes);
  const [selectedId, setSelectedId] = useState<string | null>(
    notesStore.getState().selectedId
  );

  useEffect(() => {
    return notesStore.subscribe((s) => {
      setNotes(s.notes);
      setSelectedId(s.selectedId);
    });
  }, []);

  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedId) ?? null,
    [notes, selectedId]
  );

  return (
    <div className="h-full w-full grid grid-rows-[auto,1fr] bg-white">
      <Header onCreate={() => notesStore.createNote()} />
      <div className="grid grid-cols-[320px,1fr] h-full border-t border-neutral-200">
        <aside className="border-r border-neutral-200 overflow-auto">
          <div className="px-3 py-2">
            <input
              placeholder="Search notes… (client-side)"
              className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => {
                // Optional: Extensible for future filtering
                const q = e.target.value.toLowerCase();
                const full = notesStore.getState().notes;
                const filtered = full.filter(
                  (n) =>
                    n.title.toLowerCase().includes(q) ||
                    n.content.toLowerCase().includes(q)
                );
                setNotes(filtered);
              }}
            />
          </div>
          <NotesList
            notes={notes}
            selectedId={selectedId}
            onSelect={(id) => notesStore.selectNote(id)}
            onDelete={(id) => notesStore.deleteNote(id)}
          />
        </aside>
        <main className="overflow-auto">
          <Editor
            note={selectedNote}
            onChange={(id, updates) => notesStore.updateNote(id, updates)}
            onDelete={(id) => notesStore.deleteNote(id)}
            onCreate={() => notesStore.createNote()}
          />
        </main>
      </div>
    </div>
  );
};
