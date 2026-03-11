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

  let classes = "w-full p-3 rounded-lg border font-semibold transition-all ";

  if (revealed) {
    if (isCorrect) {
      // opción correcta revelada
      classes +=
        "bg-fuchsia-500 text-black phonk-beat scale-105 border-white border-2";
    } else {
      // incorrectas reveladas: estilo normal, sin negro ni borde blanco
      classes += "bg-zinc-900 border-fuchsia-500 text-white";
    }
  } else {
    if (flash) {
      classes += "bg-red-600 text-white animate-pulse";
    } else {
      // antes de revelar, todas las opciones normales
      classes +=
        "bg-zinc-900 border-fuchsia-500 hover:bg-fuchsia-500 hover:text-black";
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
