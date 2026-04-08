import Button from "./Button";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
  actionLabel?: string;
  onAction?: () => void;
  fullScreen?: boolean;
}

export default function EmptyState({
  title,
  description,
  icon = "📭",
  actionLabel,
  onAction,
  fullScreen = true,
}: EmptyStateProps) {
  const containerClass = fullScreen
    ? "flex items-center justify-center min-h-screen text-center flex-col gap-4"
    : "text-center py-6 sm:py-12 flex items-center justify-center flex-col gap-3 sm:gap-4";

  return (
    <div className={containerClass}>
      <div className="text-5xl sm:text-6xl mb-2 sm:mb-4">{icon}</div>
      <h1 className="text-2xl sm:text-3xl font-black text-slate-300">
        {title}
      </h1>
      {description && (
        <p className="text-xs sm:text-base text-slate-400 max-w-md px-2 sm:px-0">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" className="mt-4">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
