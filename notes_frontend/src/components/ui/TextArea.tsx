import React from "react";

type TextAreaProps = React.TextareaHTMLAttributes<any> & {
  label?: string;
  mono?: boolean;
};

// PUBLIC_INTERFACE
export const TextArea: React.FC<TextAreaProps> = ({
  label,
  id,
  className,
  mono = false,
  ...rest
}) => {
  const inputId = id || `ta_${Math.random().toString(36).slice(2, 8)}`;
  return (
    <div className={`flex flex-col gap-1 ${className ?? ""}`}>
      {label ? (
        <label htmlFor={inputId} className="text-xs text-neutral-600">
          {label}
        </label>
      ) : null}
      <textarea
        id={inputId}
        className={`border border-neutral-300 rounded-md px-3 py-2 text-sm min-h-[180px] resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          mono ? "font-mono" : ""
        }`}
        {...rest}
      />
    </div>
  );
};
