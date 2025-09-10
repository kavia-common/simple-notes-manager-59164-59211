export type NoteID = string;

export interface Note {
  id: NoteID;
  title: string;
  content: string;
  createdAt: number; // epoch ms
  updatedAt: number; // epoch ms
}

export interface NotesState {
  notes: Note[];
  selectedId: NoteID | null;
}

export interface NotesStore {
  getState: () => NotesState;
  subscribe: (fn: (s: NotesState) => void) => () => void;
  // PUBLIC_INTERFACE
  createNote: (title?: string, content?: string) => Note;
  // PUBLIC_INTERFACE
  updateNote: (id: NoteID, updates: Partial<Pick<Note, "title" | "content">>) => void;
  // PUBLIC_INTERFACE
  deleteNote: (id: NoteID) => void;
  // PUBLIC_INTERFACE
  selectNote: (id: NoteID | null) => void;
  // PUBLIC_INTERFACE
  hydrate: (initial: NotesState) => void;
}
