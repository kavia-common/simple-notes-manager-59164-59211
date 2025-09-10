import React, { useEffect } from "react";
import { AbsoluteFill } from "remotion";
import { NotesApp } from "./components/notes/NotesApp";
import "./styles.css";

/**
 * PUBLIC_INTERFACE
 * NotesPage is a mountable UI component to run the Notes Manager within Remotion Studio.
 * This does not render a video; instead it uses Remotion's Studio to render a full web UI.
 * Usage:
 *  - Appears in the Remotion Studio sidebar as "NotesAppUI".
 *  - Run: npm run dev
 *  - Interact with the UI in the right-hand preview.
 */
export const NotesPage: React.FC = () => {
  // Ensure the UI fills the available space inside Studio.
  useEffect(() => {
    // no-op; reserved for future Studio-specific side effects.
  }, []);
  return (
    <AbsoluteFill style={{ background: "#ffffff" }}>
      <div style={{ height: "100%", width: "100%" }}>
        <NotesApp />
      </div>
    </AbsoluteFill>
  );
};
