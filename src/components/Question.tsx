import { useEffect, useRef, useState } from "react";
import Option from "./Option";
import type { QuestionType } from "../types/quiz";

interface QuestionProps {
  data: QuestionType;
  onAnswer: (answer: string) => void;
}

export default function Question({ data, onAnswer }: QuestionProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [flashError, setFlashError] = useState<string | null>(null);
  const [fade, setFade] = useState(false);

  function playSnippet() {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    audio.pause();
    audio.currentTime = 0;
    audio.play();
    setIsPlaying(true);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      audio.pause();
      setIsPlaying(false);
    }, 5000);
  }

  function handleOption(answer: string) {
    if (answer === data.answer) {
      setCorrectAnswer(answer);
      setRevealed(true);

      playSnippet();

      setTimeout(() => {
        triggerFade();
        setTimeout(() => {
          onAnswer(answer);
          resetState();
        }, 500); // fade out delay
      }, 2000); // deja que se vea animación correcta
    } else {
      // incorrecta: flash y delay antes de avanzar
      setFlashError(answer);

      setTimeout(() => {
        triggerFade();
        setTimeout(() => {
          onAnswer(answer);
          resetState();
        }, 500);
      }, 800); // pequeño delay para ver el flash rojo
    }
  }

  function triggerFade() {
    setFade(true);
    setTimeout(() => setFade(false), 500);
  }

  function resetState() {
    setRevealed(false);
    setCorrectAnswer(null);
    setFlashError(null);
  }

  useEffect(() => {
    const audio = new Audio(data.audio);
    audio.volume = 0.6;
    audioRef.current = audio;

    playSnippet();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      audio.pause();
      setIsPlaying(false);
    };
  }, [data]);

  return (
    <div
      className={`max-w-xl mx-auto text-center flex flex-col items-center gap-6 py-8 transition-opacity duration-500
        ${fade ? "opacity-0" : "opacity-100"}`}
    >
      <div className="relative w-80 h-80 rounded-xl shadow-[0_0_60px_#ff00ff] overflow-hidden">
        <img
          src={data.image}
          className={`w-full h-full object-cover transition-all duration-500
            ${revealed ? "blur-0 brightness-100 scale-105 phonk-beat" : "blur-sm brightness-90"}
            ${isPlaying ? "phonk-beat" : ""}`}
        />
      </div>

      <button onClick={playSnippet} className="bg-zinc-800 px-4 py-2 rounded">
        {isPlaying ? "Reproduciendo..." : "🔊 Reproducir"}
      </button>

      <h2 className="text-2xl text-fuchsia-400">{data.question}</h2>

      <div className="flex flex-col gap-3 w-full">
        {data.options.map((opt, i) => (
          <Option
            key={i}
            text={opt}
            onClick={handleOption}
            disabled={revealed}
            isCorrect={opt === correctAnswer}
            flashError={flashError === opt}
          />
        ))}
      </div>
    </div>
  );
}
