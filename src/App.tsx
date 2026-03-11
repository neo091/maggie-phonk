import { useState } from "react";
import Cover from "./components/Cover";
//import Question from "./components/Question";
import questions from "./data/questionsv2.json";
import type { QuestionType } from "./types/quiz";
import QuestionFrame from "./components/QuestionFrame";

function App() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);

  const quiz = questions as QuestionType[];
  const current = quiz[index];

  function handleAnswer() {
    setIndex((prev) => prev + 1);
  }

  if (!started) {
    return <Cover start={() => setStarted(true)} />;
  }

  if (index >= quiz.length) {
    return (
      <div className="flex items-center justify-center h-screen text-3xl flex-col ">
        <p>¡Quiz terminado!</p>
        <button
          className="mt-8 px-6 py-3 bg-fuchsia-500 text-black rounded-lg hover:scale-110 transition"
          onClick={() => {
            setStarted(false);
            setIndex(0);
          }}
        >
          volver
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* primer click del usuario activa reproducción automática */}
      <QuestionFrame data={current} onAnswer={handleAnswer} />
    </div>
  );
}

export default App;
