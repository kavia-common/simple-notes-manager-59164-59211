import React from "react";
import { Button } from "../ui/Button";

// PUBLIC_INTERFACE
export const Header: React.FC<{
  onCreate: () => void;
}> = ({ onCreate }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-white">
      <div className="flex items-center gap-2">
        <span className="text-xl">🗒️</span>
        <h1 className="text-lg font-semibold tracking-tight">Simple Notes</h1>
        <span className="text-xs text-neutral-500 ml-2 hidden md:inline">
          Remotion-based Frontend
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={onCreate}>New note</Button>
      </div>
    </div>
  );
};
