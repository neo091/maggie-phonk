import VideoCard from "../components/VideoCard";
import { useVideoList } from "../hooks";
import Card from "../components/Card";
import EmptyState from "../components/EmptyState";

const List = () => {
  const { videos, loading, error, deleteVideo } = useVideoList();

  if (loading) {
    return (
      <div className="text-center py-6 sm:py-12">
        <div className="inline-flex flex-col items-center gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-fuchsia-500/30 border-t-fuchsia-500 rounded-full animate-spin"></div>
          <p className="text-xs sm:text-base text-slate-400 font-semibold">
            Cargando videos...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-500/10 border-red-500/30">
        <p className="text-red-400 text-center font-semibold text-sm">
          ❌ Error: {error.message}
        </p>
      </Card>
    );
  }

  if (videos.length === 0) {
    return (
      <EmptyState
        icon="🎵"
        title="Sin videos"
        description="No hay videos aún. ¡Agrega uno en la sección de Agregar!"
        fullScreen={false}
      />
    );
  }

  return (
    <div>
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-fuchsia-400 mb-1 sm:mb-2">
          📹 Videos en la Base de Datos
        </h2>
        <p className="text-xs sm:text-base text-slate-400">
          Total: {videos.length} videos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            videoId={video.video_id}
            title={video.answer}
            onDelete={() => deleteVideo(video.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
