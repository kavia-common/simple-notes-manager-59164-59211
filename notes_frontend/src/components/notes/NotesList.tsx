import React, { useMemo } from "react";
import type { Note, NoteID } from "../../notes/types";
import { Button } from "../ui/Button";

// PUBLIC_INTERFACE
export const NotesList: React.FC<{
  notes: Note[];
  selectedId: NoteID | null;
  onSelect: (id: NoteID) => void;
  onDelete: (id: NoteID) => void;
}> = ({ notes, selectedId, onSelect, onDelete }) => {
  const ordered = useMemo(
    () => [...notes].sort((a, b) => b.updatedAt - a.updatedAt),
    [notes]
  );

  if (ordered.length === 0) {
    return (
      <div className="p-4 text-sm text-neutral-500">
        No notes yet.
        <br />
        Create a new one to get started.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-neutral-200">
      {ordered.map((n) => {
        const active = n.id === selectedId;
        const preview =
          n.content.trim().split("\n").filter(Boolean)[0]?.slice(0, 80) ?? "";
        return (
          <li
            key={n.id}
            className={`group grid grid-cols-[1fr,auto] gap-2 items-center px-3 py-3 cursor-pointer ${
              active ? "bg-blue-50" : "hover:bg-neutral-50"
            }`}
            onClick={() => onSelect(n.id)}
          >
            <div className="min-w-0">
              <div
                className={`truncate text-sm font-medium ${
                  active ? "text-blue-700" : "text-neutral-900"
                }`}
                title={n.title}
              >
                {n.title || "Untitled note"}
              </div>
              <div className="truncate text-xs text-neutral-500" title={preview}>
                {preview}
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="danger"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(n.id);
                }}
                title="Delete note"
              >
                Delete
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
