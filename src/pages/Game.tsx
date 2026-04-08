import { useNavigate } from "react-router";
import Header from "../components/Header";
import QuestionFrame from "../components/QuestionFrame";
import ResultsModal from "../components/ResultsModal";
import { useGame } from "../hooks/useGame";
import { useLevels } from "../hooks/useLevels";

const ShowAura = ({ level }: { level: number }) => {
  if (!level) return null;

  const datos = Array.from({ length: level });

  return (
    <>
      {datos.map((_, index) => (
        <img key={index} className="w-10" src="/skull-aura.png" alt="aura" />
      ))}
    </>
  );
};
const Game = () => {
  const { levels } = useLevels();
  const navigate = useNavigate();
  const {
    stats,
    isComplete,
    current,
    loading,
    totalQuizzes,
    handleAnswer,
    onRestart,
    updateLevel,
    index,
  } = useGame();

  if (totalQuizzes === 0) {
    return (
      <>
        <Header />
        <div className="max-w-md m-auto px-2">
          <h1 className="text-3xl sm:text-5xl font-black text-fuchsia-500 my-5  text-center">
            Seleccionar nivel
          </h1>
          <section className="flex flex-col gap-4 p-4">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => updateLevel(level.id)}
                className="
        flex items-center gap-4 p-4 rounded-2xl
        bg-zinc-900 border border-zinc-700
        hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.6)]
        transition-all duration-300
        active:scale-95
      "
              >
                {/* Aura */}
                <div className="flex gap-1">
                  <ShowAura level={level.id} />
                </div>

                {/* Texto */}
                <div className="flex flex-col text-left">
                  <span className="text-white font-bold tracking-wider">
                    {level.nivel}
                  </span>

                  <span className="text-sm text-zinc-400">
                    {level.preguntas} PREGUNTAS
                  </span>
                </div>
              </button>
            ))}
          </section>
        </div>
      </>
    );
  }
  if (isComplete) {
    return (
      <>
        <Header />
        {/*<GameHUD stats={stats} />*/}
        <ResultsModal
          stats={stats}
          isComplete={true}
          onRestart={onRestart}
          onBackHome={() => navigate("/")}
        />
      </>
    );
  }

  return (
    <>
      <Header />
      {/*<GameHUD stats={stats} />*/}
      <div className="pt-32 pb-8">
        {!loading && current && (
          <QuestionFrame
            data={current}
            onAnswer={handleAnswer}
            isLast={isComplete}
            questionNumber={index + 1}
            totalQuestions={totalQuizzes}
          />
        )}
      </div>
    </>
  );
};
export default Game;
