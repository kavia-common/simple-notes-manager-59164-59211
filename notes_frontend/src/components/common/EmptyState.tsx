import React from "react";

// PUBLIC_INTERFACE
export const EmptyState: React.FC<{
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}> = ({ title, subtitle, action }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-neutral-700 gap-3 px-6">
      <div
        aria-hidden
        className="w-20 h-20 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-3xl"
      >
        📝
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {subtitle ? <p className="text-sm text-neutral-500">{subtitle}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
};
