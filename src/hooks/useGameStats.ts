import { useState, useCallback } from "react";
import {
  getInitialStats,
  updateStats,
  type GameStats,
} from "../services/gameStats";

export function useGameStats() {
  const [stats, setStats] = useState<GameStats>(getInitialStats());

  const recordAnswer = useCallback((isCorrect: boolean) => {
    setStats((prev) => updateStats(prev, isCorrect));
  }, []);

  const reset = useCallback(() => {
    setStats(getInitialStats());
  }, []);

  return {
    stats,
    recordAnswer,
    reset,
  };
}
