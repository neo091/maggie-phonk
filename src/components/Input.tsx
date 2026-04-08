import React from "react";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  error?: string;
}

export default function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  className = "",
  label,
  error,
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`bg-slate-700 border-2 border-slate-600 rounded-lg p-4 w-full text-white placeholder-slate-500 
          focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 
          disabled:opacity-50 disabled:cursor-not-allowed transition-all
          ${error ? "border-red-500 focus:border-red-500" : ""}
          ${className}`}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
