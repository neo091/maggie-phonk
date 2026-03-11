export interface QuestionType {
  id: number | string
  audio: string
  start: number
  image: string
  question: string
  options: string[]
  answer: string
}