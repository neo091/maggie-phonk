import { useState, useCallback, useEffect } from "react";

export interface Video {
  id: number;
  video_id: string;
  answer: string;
  question: string;
  options: string[];
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://phonk-api.local";

export function useVideoList() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/videos.php`);
      if (!response.ok) throw new Error("Failed to fetch videos");
      const data = (await response.json()) as Video[];
      setVideos(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteVideo = useCallback(async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/videos.php`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error("Failed to delete video");

      setVideos((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return {
    videos,
    loading,
    error,
    fetchVideos,
    deleteVideo,
  };
}
