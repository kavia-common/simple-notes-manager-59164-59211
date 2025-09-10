import type { Note, NotesState, NotesStore, NoteID } from "./types";
import { loadState, saveState } from "./storage";

// Simple evented store (no external deps)
type Listener = (s: NotesState) => void;

function uid(): string {
  return `n_${Math.random().toString(36).slice(2, 9)}_${Date.now().toString(36)}`;
}

function createInitialState(): NotesState {
  // Try localStorage first
  return loadState();
}

function makeStore(): NotesStore {
  let state: NotesState = createInitialState();
  const listeners: Listener[] = [];

  function setState(updater: (prev: NotesState) => NotesState) {
    state = updater(state);
    saveState(state);
    listeners.forEach((l) => l(state));
  }

  const store: NotesStore = {
    getState: () => state,
    subscribe: (fn) => {
      listeners.push(fn);
      fn(state);
      return () => {
        const idx = listeners.indexOf(fn);
        if (idx >= 0) listeners.splice(idx, 1);
      };
    },
    // PUBLIC_INTERFACE
    createNote: (title = "Untitled note", content = "") => {
      const now = Date.now();
      const newNote: Note = {
        id: uid(),
        title: title.trim() || "Untitled note",
        content,
        createdAt: now,
        updatedAt: now,
      };
      setState((prev) => ({
        ...prev,
        notes: [newNote, ...prev.notes],
        selectedId: newNote.id,
      }));
      return newNote;
    },
    // PUBLIC_INTERFACE
    updateNote: (id: NoteID, updates) => {
      setState((prev) => {
        const updated = prev.notes.map((n) =>
          n.id === id ? { ...n, ...updates, updatedAt: Date.now() } : n
        );
        return { ...prev, notes: updated };
      });
    },
    // PUBLIC_INTERFACE
    deleteNote: (id: NoteID) => {
      setState((prev) => {
        const idx = prev.notes.findIndex((n) => n.id === id);
        const remaining = prev.notes.filter((n) => n.id !== id);
        let nextSelected: NoteID | null = prev.selectedId;
        if (prev.selectedId === id) {
          if (remaining.length === 0) nextSelected = null;
          else {
            const neighborIndex = Math.max(0, idx - 1);
            nextSelected = remaining[neighborIndex]?.id ?? null;
          }
        }
        return { ...prev, notes: remaining, selectedId: nextSelected };
      });
    },
    // PUBLIC_INTERFACE
    selectNote: (id: NoteID | null) => {
      setState((prev) => ({ ...prev, selectedId: id }));
    },
    // PUBLIC_INTERFACE
    hydrate: (initial: NotesState) => {
      setState(() => initial);
    },
  };

  return store;
}

export const notesStore = makeStore();
