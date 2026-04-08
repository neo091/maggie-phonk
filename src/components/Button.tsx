import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger" | "success";
  className?: string;
  fullWidth?: boolean;
}

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  className = "",
  fullWidth = false,
}: ButtonProps) {
  const baseClasses =
    "px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-fuchsia-500 to-purple-600 text-black hover:from-fuchsia-600 hover:to-purple-700 shadow-lg hover:shadow-fuchsia-500/50",
    secondary:
      "bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 shadow-md",
    danger:
      "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-500/50",
    success:
      "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-500/50",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
}
