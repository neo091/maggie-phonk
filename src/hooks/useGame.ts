import { useEffect, useState } from "react";
import type { QuestionType } from "../types/quiz";
import { useGameStats } from "./useGameStats";

const API_URL = import.meta.env.VITE_API_URL || "http://phonk-api.local";

export function useGame() {
  const { stats, recordAnswer, reset } = useGameStats();
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState<number | null>(null);
  const [index, setIndex] = useState(0);
  const [quizzes, setQuizzes] = useState<QuestionType[]>([]);
  const [current, setCurrent] = useState<QuestionType>();

  const loadQuizzes = async () => {
    if (!level) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/videos.php?nivel_id=${level}`);
      if (!response.ok) throw new Error("Failed to fetch videos");

      const data = (await response.json()) as QuestionType[];

      setQuizzes(data);
      setCurrent(data[index]);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer: string, isCorrect: boolean) => {
    recordAnswer(isCorrect);
    setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 500);
  };

  const updateLevel = (levelSelected: number) => {
    setLevel(levelSelected);
  };

  useEffect(() => {
    loadQuizzes();
  }, [level]);

  useEffect(() => {
    setCurrent(quizzes[index]);
  }, [index]);

  const isComplete = index >= quizzes.length;

  return {
    isComplete,
    current,
    stats,
    loading,
    index,
    onRestart: () => {
      setIndex(0);
      reset();
    },
    updateLevel,
    totalQuizzes: quizzes.length,
    handleAnswer,
  };
}
