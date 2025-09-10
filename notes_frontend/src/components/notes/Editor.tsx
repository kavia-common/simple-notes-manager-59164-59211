import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Note, NoteID } from "../../notes/types";
import { Input } from "../ui/Input";
import { TextArea } from "../ui/TextArea";
import { Button } from "../ui/Button";

// PUBLIC_INTERFACE
export const Editor: React.FC<{
  note: Note | null;
  onChange: (id: NoteID, updates: Partial<Pick<Note, "title" | "content">>) => void;
  onDelete: (id: NoteID) => void;
  onCreate: () => void;
}> = ({ note, onChange, onDelete, onCreate }) => {
  const [title, setTitle] = useState<string>(note?.title ?? "");
  const [content, setContent] = useState<string>(note?.content ?? "");
  const titleRef = useRef<any>(null);

  useEffect(() => {
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
  }, [note?.id]);

  useEffect(() => {
    // focus title on note change to encourage editing
    titleRef.current?.focus();
    titleRef.current?.select();
  }, [note?.id]);

  const modified = useMemo(() => {
    return title !== (note?.title ?? "") || content !== (note?.content ?? "");
  }, [title, content, note]);

  const save = useCallback(() => {
    if (note) {
      onChange(note.id, { title, content });
    }
  }, [note, title, content, onChange]);

  // Ctrl/Cmd + Enter to save
  useEffect(() => {
    const handler = (e: any) => {
      const key = typeof e?.key === "string" ? e.key.toLowerCase() : "";
      const meta = !!e?.metaKey;
      const ctrl = !!e?.ctrlKey;
      if ((meta || ctrl) && key === "enter") {
        if (typeof e?.preventDefault === "function") e.preventDefault();
        save();
      }
    };
    if (typeof globalThis !== "undefined" && typeof (globalThis as any).addEventListener === "function") {
      (globalThis as any).addEventListener("keydown", handler);
      return () => {
        if (typeof (globalThis as any).removeEventListener === "function") {
          (globalThis as any).removeEventListener("keydown", handler);
        }
      };
    }
    return () => {};
  }, [save]);

  if (!note) {
    return (
      <div className="h-full">
        <div className="p-8">
          <h2 className="text-lg font-semibold mb-2">No note selected</h2>
          <p className="text-sm text-neutral-600">
            Select an existing note from the left or create a new one.
          </p>
          <div className="mt-4">
            <Button onClick={onCreate}>Create note</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-neutral-200 bg-white">
        <div className="text-sm text-neutral-600">
          Created {new Date(note.createdAt).toLocaleString()} • Updated{" "}
          {new Date(note.updatedAt).toLocaleString()}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={onCreate}>
            New note
          </Button>
          <Button
            variant={modified ? "primary" : "ghost"}
            onClick={save}
            disabled={!modified}
            title="Save (Ctrl/Cmd+Enter)"
          >
            {modified ? "Save changes" : "Saved"}
          </Button>
          <Button variant="danger" onClick={() => onDelete(note.id)}>
            Delete
          </Button>
        </div>
      </div>
      <div className="p-4 grid gap-4">
        <Input
          ref={titleRef as any}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          label="Title"
        />
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note..."
          label="Content"
          mono
          className="min-h-[320px]"
        />
      </div>
    </div>
  );
};
