interface VideoCardProps {
  videoId: string;
  title: string;
  onDelete?: () => void;
}

export default function VideoCard({
  videoId,
  title,
  onDelete,
}: VideoCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-fuchsia-500/50 transition hover:shadow-lg hover:shadow-fuchsia-500/20">
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-40">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
        />
        {onDelete && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
            <button
              onClick={onDelete}
              className="opacity-0 group-hover:opacity-100 transition transform group-hover:scale-100 scale-75 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold"
            >
              🗑️ Eliminar
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm font-bold text-fuchsia-400 truncate">{title}</p>
        <p className="text-xs text-slate-500 mt-1">Video ID: {videoId}</p>
      </div>
    </article>
  );
}
