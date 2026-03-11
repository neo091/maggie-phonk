import { useState, useRef } from "react";
import Option from "./Option";
import type { QuestionType } from "../types/quiz";

interface QuestionProps {
  data: QuestionType;
  onAnswer: (answer: string) => void;
  snippetStart?: number;
  snippetDuration?: number;
  fullDuration?: number; // duración completa al acertar
  isLast?: boolean; // indica si es la última pregunta
}

export default function QuestionFrame({
  data,
  onAnswer,
  snippetStart = 0,
  snippetDuration = 5,
  fullDuration = 20000,
  isLast = false,
}: QuestionProps) {
  const [revealed, setRevealed] = useState(false);
  const [playingSnippet, setPlayingSnippet] = useState(false);
  const [playingFull, setPlayingFull] = useState(false);
  const [lastWrong, setLastWrong] = useState<string | null>(null);

  const fullTimeoutRef = useRef<number | null>(null);

  const videoId = data.audio.split("v=")[1];
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  function handlePlay() {
    if (!revealed) {
      setPlayingSnippet(true);
      setTimeout(() => setPlayingSnippet(false), snippetDuration * 1000);
    }
  }

  function handleOption(answer: string, optText: string) {
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
        onAnswer(answer);
      }, fullDuration);
    } else {
      setLastWrong(optText);
      onAnswer(answer);
    }
  }

  function handleNext() {
    if (playingFull) {
      // Limpiar el timeout para que no se ejecute doble
      if (fullTimeoutRef.current) {
        clearTimeout(fullTimeoutRef.current);
        fullTimeoutRef.current = null;
      }
      setPlayingFull(false);
      setRevealed(false);
      setLastWrong(null);
      onAnswer(data.answer); // consideramos la respuesta correcta completada
    }
  }

  return (
    <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-6 py-8">
      <div
        className={`relative w-80 h-80 rounded-xl shadow-[0_0_60px_#ff00ff] overflow-hidden
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
      </div>

      <button
        onClick={handlePlay}
        className="bg-zinc-800 px-4 py-2 rounded"
        disabled={playingSnippet || playingFull || revealed}
      >
        {playingSnippet ? "Reproduciendo..." : "🔊 Reproducir"}
      </button>

      <h2 className="text-2xl text-fuchsia-400">{data.question}</h2>

      <div className="flex flex-col gap-3 w-full">
        {data.options.map((opt, i) => (
          <Option
            key={i}
            text={opt}
            onClick={(value) => handleOption(value, opt)}
            disabled={revealed}
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
          className="mt-4 px-4 py-2 rounded bg-fuchsia-500 hover:bg-fuchsia-600"
        >
          ➡️ Siguiente
        </button>
      )}
    </div>
  );
}
