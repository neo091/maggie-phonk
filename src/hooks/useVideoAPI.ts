import { useFetch } from "./useFetch";

const API_BASE_URL = "http://phonk-api.local/videos.php";

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

  const addVideo = async (video: VideoPayload) => {
    return execute(API_BASE_URL, {
      method: "POST",
      body: video,
    });
  };

  const deleteVideo = async (id: number) => {
    return execute(API_BASE_URL, {
      method: "DELETE",
      body: { id },
    });
  };

  const getVideos = async () => {
    return execute(API_BASE_URL, {
      method: "GET",
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
