export interface QuestionType {
  id: number | string;
  nivel_id: number;
  video_id: string;
  video_url?: string; // URL del video para reproducir audio
  audio?: string; // URL del audio alternativo
  start: number;
  image: string;
  question: string;
  options: string[];
  answer: string;
}
