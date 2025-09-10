import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<any> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md";
};

const base =
  "inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-400 ring-offset-white",
  secondary:
    "bg-neutral-200 hover:bg-neutral-300 text-neutral-900 focus:ring-neutral-400 ring-offset-white",
  danger:
    "bg-red-600 hover:bg-red-700 text-white focus:ring-red-400 ring-offset-white",
  ghost:
    "bg-transparent hover:bg-neutral-100 text-neutral-800 focus:ring-neutral-300 ring-offset-white",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2",
};

// PUBLIC_INTERFACE
export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  variant = "primary",
  size = "md",
  ...rest
}) => {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </button>
  );
};
