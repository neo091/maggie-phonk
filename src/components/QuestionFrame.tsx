import { useState, useRef, useEffect } from "react";
import Option from "./Option";
import type { QuestionType } from "../types/quiz";

interface QuestionProps {
  data: QuestionType;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  snippetStart?: number;
  snippetDuration?: number;
  fullDuration?: number; // duración completa al acertar
  isLast?: boolean; // indica si es la última pregunta
  questionNumber?: number; // número de la pregunta actual
  totalQuestions?: number; // total de preguntas
}

export default function QuestionFrame({
  data,
  onAnswer,
  snippetStart = 0,
  snippetDuration = 5,
  fullDuration = 20000,
  isLast = false,
  questionNumber = 1,
  totalQuestions = 10,
}: QuestionProps) {
  const [revealed, setRevealed] = useState(false);
  const [playingSnippet, setPlayingSnippet] = useState(false);
  const [playingFull, setPlayingFull] = useState(false);
  const [lastWrong, setLastWrong] = useState<string | null>(null);
  const [snippetTimeout, setSnippetTimeout] = useState<number | null>(null);

  const fullTimeoutRef = useRef<number | null>(null);

  const videoId = data.video_id;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  // Función para detener el snippet
  function stopSnippet() {
    if (snippetTimeout) {
      clearTimeout(snippetTimeout);
      setSnippetTimeout(null);
    }
    setPlayingSnippet(false);
  }

  function handlePlay() {
    if (!revealed && !playingSnippet) {
      setPlayingSnippet(true);
      const timeout = window.setTimeout(() => {
        setPlayingSnippet(false);
        setSnippetTimeout(null);
      }, snippetDuration * 1000);
      setSnippetTimeout(timeout);
    }
  }

  function handleOption(answer: string, optText: string) {
    // Detener inmediatamente el snippet si está reproduciendo
    stopSnippet();

    if (answer === data.answer) {
      setRevealed(true);
      setPlayingFull(true);

      // Limpiar timeout previo si existiera
      if (fullTimeoutRef.current) clearTimeout(fullTimeoutRef.current);

      // Avanzar automáticamente después de fullDuration
      fullTimeoutRef.current = setTimeout(() => {
        setPlayingFull(false);
        setRevealed(false);
        setLastWrong(null);
        fullTimeoutRef.current = null;
        onAnswer(answer, true); // Respuesta correcta
      }, fullDuration);
    } else {
      setLastWrong(optText);
      onAnswer(answer, false); // Respuesta incorrecta
    }
  }

  function handleNext() {
    if (playingFull) {
      // Limpiar el timeout para que no se ejecute doble
      if (fullTimeoutRef.current) {
        clearTimeout(fullTimeoutRef.current);
        fullTimeoutRef.current = null;
      }
      stopSnippet(); // Asegurar que el snippet también está detenido
      setPlayingFull(false);
      setRevealed(false);
      setLastWrong(null);
      onAnswer(data.answer, true); // consideramos la respuesta correcta completada
    }
  }

  // Cleanup al desmontar el componente
  useEffect(() => {
    return () => {
      if (fullTimeoutRef.current) clearTimeout(fullTimeoutRef.current);
      if (snippetTimeout) clearTimeout(snippetTimeout);
    };
  }, [snippetTimeout]);

  return (
    <div className="w-full text-center flex flex-col items-center gap-4 sm:gap-6 py-6 sm:py-8 px-4">
      {/* Indicador de progreso */}
      <div className="w-full text-xs sm:text-sm text-slate-400 font-semibold">
        Pregunta {questionNumber} de {totalQuestions}
      </div>

      <div
        className={`relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl shadow-[0_0_60px_#ff00ff] overflow-hidden border-2 border-fuchsia-500/30
        ${revealed ? "phonk-beat" : ""}`}
      >
        <img
          src={thumbnailUrl}
          className={`w-full h-full object-cover transition-all duration-500
            ${revealed ? "blur-0 brightness-100 scale-105 phonk-beat" : "blur-sm brightness-90"}
            ${playingSnippet ? "phonk-beat" : ""}`}
        />

        {/* Snippet oculto */}
        {playingSnippet && (
          <iframe
            className="absolute top-0 left-0 w-0 h-0"
            src={`https://www.youtube.com/embed/${videoId}?start=${snippetStart}&end=${
              snippetStart + snippetDuration
            }&autoplay=1&controls=0&modestbranding=1`}
            title="Phonk snippet"
            allow="autoplay; encrypted-media"
            frameBorder="0"
          />
        )}

        {/* Video completo al acertar */}
        {playingFull && (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1`}
            title="Phonk full video"
            allow="autoplay; encrypted-media"
            frameBorder="0"
          />
        )}

        {/* Overlay con Play button */}
        {!playingFull && !revealed && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button
              onClick={handlePlay}
              disabled={playingSnippet}
              className={`w-20 h-20 rounded-full bg-fuchsia-500/80 hover:bg-fuchsia-500 transition flex items-center justify-center shadow-lg text-4xl
                ${playingSnippet ? "opacity-50" : ""}`}
            >
              🔊
            </button>
          </div>
        )}
      </div>

      <h2 className="text-xl sm:text-3xl font-black text-fuchsia-400 bg-gradient-to-r from-fuchsia-500 to-purple-500 bg-clip-text text-transparent px-2">
        {data.question}
      </h2>

      <div className="flex flex-col gap-2 sm:gap-3 w-full max-w-md">
        {data.options.map((opt, i) => (
          <Option
            key={i}
            text={opt}
            onClick={(value) => handleOption(value, opt)}
            disabled={revealed || playingSnippet}
            isCorrect={opt === data.answer}
            flashError={lastWrong === opt}
            revealed={revealed}
          />
        ))}
      </div>

      {/* Botón Siguiente solo si se está reproduciendo la música full */}
      {playingFull && !isLast && (
        <button
          onClick={handleNext}
          className="mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 font-bold text-black transition shadow-lg"
        >
          ➡️ Siguiente
        </button>
      )}
    </div>
  );
}
