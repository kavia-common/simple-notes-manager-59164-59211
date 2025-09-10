import React from "react";

type InputProps = React.InputHTMLAttributes<any> & {
  label?: string;
};

// PUBLIC_INTERFACE
export const Input = React.forwardRef<any, InputProps>(
  ({ label, id, className, ...rest }, ref) => {
    const inputId = id || `in_${Math.random().toString(36).slice(2, 8)}`;
    return (
      <div className={`flex flex-col gap-1 ${className ?? ""}`}>
        {label ? (
          <label htmlFor={inputId} className="text-xs text-neutral-600">
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className="border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...rest}
        />
      </div>
    );
  }
);
Input.displayName = "Input";
