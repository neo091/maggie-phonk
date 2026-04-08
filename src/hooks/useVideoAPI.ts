import { useFetch } from "./useFetch";
import { useAuthStore } from "../store/authStore";

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface VideoPayload {
  videoId: string;
  question: string;
  options: string[];
  answer: string;
  nivel_id: string;
}

interface VideoResponse {
  id?: number;
  success?: boolean;
  message?: string;
}

export function useVideoAPI() {
  const { data, loading, error, execute } = useFetch<VideoResponse>();
  const { token } = useAuthStore();

  const addVideo = async (video: VideoPayload) => {
    if (!token) {
      throw new Error("No autenticado. Token no disponible");
    }

    return execute(`${API_BASE_URL}/video.php`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: video,
    });
  };

  const deleteVideo = async (id: number) => {
    if (!token) {
      throw new Error("No autenticado. Token no disponible");
    }

    return execute(`${API_BASE_URL}/video.php`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: { id },
    });
  };

  const getVideos = async () => {
    if (!token) {
      throw new Error("No autenticado. Token no disponible");
    }

    return execute(`${API_BASE_URL}/video.php`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return {
    data,
    loading,
    error,
    addVideo,
    deleteVideo,
    getVideos,
  };
}
