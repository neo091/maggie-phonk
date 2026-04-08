import React from "react";
import Button from "./Button";
import type { GameStats } from "../services/gameStats";

interface ResultsModalProps {
  stats: GameStats;
  isComplete: boolean;
  onRestart: () => void;
  onBackHome: () => void;
}

export default function ResultsModal({
  stats,
  isComplete,
  onRestart,
  onBackHome,
}: ResultsModalProps) {
  if (!isComplete) return null;

  const accuracy =
    stats.totalAnswers === 0
      ? 0
      : Math.round((stats.correctAnswers / stats.totalAnswers) * 100);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-2 border-fuchsia-500 rounded-2xl p-5 sm:p-8 text-center max-w-md w-full shadow-2xl shadow-fuchsia-500/30">
        <h1 className="text-2xl sm:text-4xl font-black text-fuchsia-500 mb-1 sm:mb-2">
          ¡QUIZ COMPLETADO!
        </h1>

        <div className="text-5xl sm:text-6xl mb-4 sm:mb-6 animate-bounce">
          🎉
        </div>

        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20 border border-fuchsia-500/40 rounded-lg p-4 sm:p-5">
            <p className="text-xs sm:text-sm text-slate-400 mb-1 font-semibold">
              NIVEL
            </p>
            <p className="text-4xl sm:text-5xl font-black text-fuchsia-500">
              {stats.level}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div className="bg-slate-700/50 border border-slate-600/50 rounded-lg p-3 sm:p-4">
              <p className="text-xs text-slate-400 font-semibold mb-1">
                PUNTOS
              </p>
              <p className="text-2xl sm:text-3xl font-black text-fuchsia-500">
                {stats.points}
              </p>
            </div>

            <div className="bg-slate-700/50 border border-slate-600/50 rounded-lg p-3 sm:p-4">
              <p className="text-xs text-slate-400 font-semibold mb-1">
                PRECISIÓN
              </p>
              <p className="text-2xl sm:text-3xl font-black text-cyan-400">
                {accuracy}%
              </p>
            </div>

            <div className="bg-slate-700/50 border border-slate-600/50 rounded-lg p-3 sm:p-4">
              <p className="text-xs text-slate-400 font-semibold mb-1">
                CORRECTAS
              </p>
              <p className="text-2xl sm:text-3xl font-black text-green-400">
                {stats.correctAnswers}
              </p>
            </div>

            <div className="bg-slate-700/50 border border-slate-600/50 rounded-lg p-3 sm:p-4">
              <p className="text-xs text-slate-400 font-semibold mb-1">
                RACHA MAX
              </p>
              <p className="text-2xl sm:text-3xl font-black text-amber-400">
                {stats.streak}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 flex-col sm:flex-row">
          <Button
            onClick={onRestart}
            variant="primary"
            className="flex-1 text-base"
          >
            Jugar de Nuevo
          </Button>

          <Button
            onClick={onBackHome}
            variant="secondary"
            className="flex-1 text-base"
          >
            Inicio
          </Button>
        </div>
      </div>
    </div>
  );
}
