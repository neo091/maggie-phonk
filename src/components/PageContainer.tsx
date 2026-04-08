import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return (
    <main
      className={`flex flex-col items-center justify-center w-full min-h-dvh bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 ${className}`}
    >
      <div className="w-full max-w-6xl px-4 py-4 sm:py-8">{children}</div>
    </main>
  );
}
