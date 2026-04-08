import { useState } from "react";
import type { Niveles } from "../hooks/useLevels";
import Button from "./Button";

interface levelsSelectorProps {
  levels: Niveles[];
  onSelected: (videoId: string) => void;
}

const LevelsSelectorEdit = ({ levels, onSelected }: levelsSelectorProps) => {
  const [shownSelector, setShownSelector] = useState(false);

  const toggleShownSelector = () => {
    setShownSelector(!shownSelector);
  };

  const handleSelectLevel = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.dataset.levelId);
    const videoId = e.currentTarget.dataset.levelId;

    if (videoId) {
      onSelected(videoId);
    }
    setShownSelector(!shownSelector);
  };

  return (
    <>
      <div
        className={`absolute bg-white text-black w-md top-0  left-0 flex flex-col ${shownSelector ? "block" : "hidden"}`}
      >
        <h2 className="text-xl font-bold text-center">Niveles</h2>
        {levels.map((level) => (
          <a
            data-level-id={level.id}
            data-level-name={level.nivel}
            href="#"
            onClick={handleSelectLevel}
            key={level.nivel}
            className="p-2 block text-black hover:bg-amber-400"
          >
            {level.nivel}
          </a>
        ))}
      </div>
      <Button onClick={toggleShownSelector}>Seleccionar Nivel</Button>
    </>
  );
};
export default LevelsSelectorEdit;
