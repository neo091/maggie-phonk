export interface QuestionType {
  id: number | string;
  nivel_id: number;
  video_id: string;
  start: number;
  image: string;
  question: string;
  options: string[];
  answer: string;
}
