import type { NotesState, Note } from "./types";

const STORAGE_KEY = "notes_frontend_state_v1";

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

// PUBLIC_INTERFACE
export function loadState(): NotesState {
  const fallback: NotesState = { notes: seedNotes(), selectedId: null };
  const raw =
    typeof globalThis !== "undefined" && typeof (globalThis as any).localStorage !== "undefined"
      ? (globalThis as any).localStorage.getItem(STORAGE_KEY)
      : null;
  const parsed = safeParse<NotesState>(raw, fallback);
  // Data validation lite: ensure notes shape
  const cleanNotes: Note[] = Array.isArray(parsed.notes)
    ? parsed.notes
        .filter((n) => n && typeof n.id === "string")
        .map((n) => ({
          id: n.id,
          title: typeof n.title === "string" ? n.title : "",
          content: typeof n.content === "string" ? n.content : "",
          createdAt: typeof n.createdAt === "number" ? n.createdAt : Date.now(),
          updatedAt: typeof n.updatedAt === "number" ? n.updatedAt : Date.now(),
        }))
    : seedNotes();

  return {
    notes: cleanNotes,
    selectedId: parsed.selectedId && cleanNotes.some((n) => n.id === parsed.selectedId) ? parsed.selectedId : null,
  };
}

// PUBLIC_INTERFACE
export function saveState(state: NotesState) {
  try {
    if (
      typeof globalThis !== "undefined" &&
      typeof (globalThis as any).localStorage !== "undefined"
    ) {
      (globalThis as any).localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  } catch {
    // ignore
  }
}

function seedNotes(): Note[] {
  const now = Date.now();
  return [
    {
      id: "seed-1",
      title: "Welcome to Simple Notes",
      content: "Create, edit, and delete notes. Your notes are saved in your browser.",
      createdAt: now - 10000,
      updatedAt: now - 10000,
    },
    {
      id: "seed-2",
      title: "Tip",
      content: "Click a note to edit. Use Ctrl/Cmd+Enter to save quickly.",
      createdAt: now - 8000,
      updatedAt: now - 8000,
    },
  ];
}
