import React from "react";

interface FormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

export default function Form({
  children,
  onSubmit,
  className = "",
}: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col gap-2 max-w-xl w-full ${className}`}
    >
      {children}
    </form>
  );
}
