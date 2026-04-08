import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  gradient?: boolean;
  noPadding?: boolean;
}

export default function Card({
  children,
  className = "",
  title,
  gradient = false,
  noPadding = false,
}: CardProps) {
  const gradientClass = gradient
    ? "bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700"
    : "bg-slate-800 border border-slate-700";

  const paddingClass = noPadding ? "" : "p-4 sm:p-6";

  return (
    <div
      className={`${gradientClass} rounded-lg shadow-lg ${paddingClass} ${className}`}
    >
      {title && (
        <h3 className="text-base sm:text-lg font-bold text-fuchsia-400 mb-3 sm:mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
