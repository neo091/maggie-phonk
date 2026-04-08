import { useState, useEffect } from "react";

interface OptionProps {
  text: string;
  onClick: (value: string) => void;
  disabled: boolean;
  isCorrect: boolean;
  flashError?: boolean;
  revealed?: boolean;
}

export default function Option({
  text,
  onClick,
  disabled,
  isCorrect,
  flashError = false,
  revealed = false,
}: OptionProps) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (flashError && !revealed) {
      // flash solo si no se reveló
      setFlash(true);
      const timer = setTimeout(() => setFlash(false), 300);
      return () => clearTimeout(timer);
    }
  }, [flashError, revealed]);

  let classes =
    "w-full p-3 sm:p-4 rounded-lg border-2 font-bold transition-all text-base sm:text-lg ";

  if (revealed) {
    if (isCorrect) {
      // opción correcta revelada
      classes +=
        "bg-gradient-to-r from-green-500 to-green-600 text-white phonk-beat scale-105 border-green-400 shadow-lg shadow-green-500/50";
    } else {
      // incorrectas reveladas
      classes += "bg-slate-700/50 border-slate-600 text-slate-300";
    }
  } else {
    if (flash) {
      classes +=
        "bg-red-500/80 text-white animate-pulse border-red-400 shadow-lg shadow-red-500/50";
    } else if (disabled) {
      classes +=
        "bg-slate-800/50 border-slate-600/50 text-slate-500 cursor-not-allowed";
    } else {
      classes +=
        "bg-slate-800 border-fuchsia-500/50 text-white hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-purple-600 hover:border-fuchsia-500 hover:text-black hover:scale-105 active:scale-95";
    }
  }

  return (
    <button
      disabled={disabled}
      onClick={() => !disabled && onClick(text)}
      className={classes}
    >
      {text}
    </button>
  );
}
