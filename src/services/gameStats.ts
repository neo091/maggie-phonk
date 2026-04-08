/**
 * Sistema de Puntos y Niveles
 */

export interface GameStats {
  points: number;
  level: number;
  correctAnswers: number;
  totalAnswers: number;
  streak: number; // respuestas correctas consecutivas
}

/**
 * Puntos por respuesta correcta
 */
const POINTS_PER_CORRECT = 10;
const STREAK_BONUS = 5; // bonus por cada respuesta consecutiva

/**
 * Puntos requeridos para subir de nivel
 */
const POINTS_PER_LEVEL = 100;

/**
 * Inicializa las estadísticas del juego
 */
export function getInitialStats(): GameStats {
  return {
    points: 0,
    level: 1,
    correctAnswers: 0,
    totalAnswers: 0,
    streak: 0,
  };
}

/**
 * Calcula los puntos ganados por una respuesta correcta
 */
export function calculatePointsGained(streak: number): number {
  const streakBonus = streak * STREAK_BONUS;
  return POINTS_PER_CORRECT + streakBonus;
}

/**
 * Actualiza las estadísticas después de una respuesta
 */
export function updateStats(stats: GameStats, isCorrect: boolean): GameStats {
  const newStats = { ...stats };
  newStats.totalAnswers += 1;

  if (isCorrect) {
    const pointsGained = calculatePointsGained(newStats.streak);
    newStats.points += pointsGained;
    newStats.correctAnswers += 1;
    newStats.streak += 1;

    // Comprobar si subió de nivel
    const newLevel = Math.floor(newStats.points / POINTS_PER_LEVEL) + 1;
    if (newLevel > newStats.level) {
      newStats.level = newLevel;
    }
  } else {
    newStats.streak = 0;
  }

  return newStats;
}

/**
 * Calcula el porcentaje de precisión
 */
export function getAccuracy(stats: GameStats): number {
  if (stats.totalAnswers === 0) return 0;
  return Math.round((stats.correctAnswers / stats.totalAnswers) * 100);
}

/**
 * Calcula puntos hasta el siguiente nivel
 */
export function getPointsToNextLevel(stats: GameStats): {
  current: number;
  required: number;
} {
  const currentLevelPoints = (stats.level - 1) * POINTS_PER_LEVEL;
  const current = stats.points - currentLevelPoints;
  const required = POINTS_PER_LEVEL;

  return {
    current: Math.min(current, required),
    required,
  };
}

/**
 * Obtiene el color basado en el nivel
 */
export function getLevelColor(level: number): string {
  if (level <= 5) return "text-blue-500";
  if (level <= 10) return "text-purple-500";
  if (level <= 20) return "text-fuchsia-500";
  if (level <= 50) return "text-red-500";
  return "text-yellow-500";
}
