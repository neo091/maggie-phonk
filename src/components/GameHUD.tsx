import { useState, useEffect } from "react";
import { getPointsToNextLevel, getLevelColor } from "../services/gameStats";
import type { GameStats } from "../services/gameStats";

interface HUDProps {
  stats: GameStats;
}

export default function GameHUD({ stats }: HUDProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Replegar el HUD cuando pasa a la siguiente pregunta
  useEffect(() => {
    setIsExpanded(false);
  }, [stats.totalAnswers]);

  const { current, required } = getPointsToNextLevel(stats);
  const progressPercent = (current / required) * 100;
  const levelColor = getLevelColor(stats.level);
  const accuracy =
    stats.totalAnswers === 0
      ? 0
      : Math.round((stats.correctAnswers / stats.totalAnswers) * 100);

  return (
    <div className="fixed top-16 sm:top-20 left-0 right-0 z-40 pointer-events-none">
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        <div className="bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-md border border-fuchsia-500/40 rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-xl shadow-fuchsia-500/10">
          {/* Header con botón de toggle */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-fuchsia-400 hover:text-fuchsia-300 transition font-bold text-sm sm:text-base"
              >
                {isExpanded ? "▼" : "▶"}
              </button>
              <div className="text-center">
                <p className={`text-lg sm:text-2xl font-black ${levelColor}`}>
                  LVL {stats.level}
                </p>
              </div>
            </div>
            {!isExpanded && (
              <div className="flex gap-2 sm:gap-3 text-2xs sm:text-xs">
                <span className="text-fuchsia-400">⭐ {stats.points}</span>
                <span
                  className={
                    stats.streak > 0 ? "text-amber-400" : "text-slate-500"
                  }
                >
                  🔥 {stats.streak}
                </span>
              </div>
            )}
          </div>

          {/* Contenido desplegable */}
          {isExpanded && (
            <>
              {/* Grid responsivo */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4 mt-3 sm:mt-4">
                {/* Nivel */}
                <div className="bg-slate-800/40 border border-fuchsia-500/20 rounded-lg p-2 sm:p-3 text-center">
                  <p className="text-2xs sm:text-xs text-slate-400 mb-1 font-semibold">
                    LVL
                  </p>
                  <p
                    className={`text-2xl sm:text-3xl font-black ${levelColor}`}
                  >
                    {stats.level}
                  </p>
                </div>

                {/* Puntos */}
                <div className="bg-slate-800/40 border border-fuchsia-500/20 rounded-lg p-2 sm:p-3 text-center">
                  <p className="text-2xs sm:text-xs text-slate-400 mb-1 font-semibold">
                    PTS
                  </p>
                  <p className="text-xl sm:text-2xl font-black text-fuchsia-500">
                    {stats.points}
                  </p>
                </div>

                {/* Racha */}
                <div className="bg-slate-800/40 border border-fuchsia-500/20 rounded-lg p-2 sm:p-3 text-center">
                  <p className="text-2xs sm:text-xs text-slate-400 mb-1 font-semibold">
                    RACHA
                  </p>
                  <p
                    className={`text-xl sm:text-2xl font-black ${
                      stats.streak > 0 ? "text-amber-400" : "text-slate-500"
                    }`}
                  >
                    {stats.streak} 🔥
                  </p>
                </div>

                {/* Precisión */}
                <div className="bg-slate-800/40 border border-fuchsia-500/20 rounded-lg p-2 sm:p-3 text-center">
                  <p className="text-2xs sm:text-xs text-slate-400 mb-1 font-semibold">
                    ACC
                  </p>
                  <p className="text-xl sm:text-2xl font-black text-cyan-400">
                    {accuracy}%
                  </p>
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-2xs sm:text-xs text-slate-400 font-semibold">
                    LVL {stats.level} → {stats.level + 1}
                  </p>
                  <p className="text-2xs sm:text-xs text-slate-400">
                    {current}/{required}
                  </p>
                </div>
                <div className="w-full bg-slate-800/60 rounded-full h-2 sm:h-2.5 overflow-hidden border border-fuchsia-500/20">
                  <div
                    className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500 h-full transition-all duration-300 shadow-glow"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Preguntas respondidas */}
              <div className="mt-2 sm:mt-3 text-center text-2xs sm:text-xs text-slate-400">
                Pregunta {stats.totalAnswers + 1} ({stats.correctAnswers}{" "}
                correctas)
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
