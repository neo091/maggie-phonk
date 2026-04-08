import { useNavigate } from "react-router";
import Header from "../components/Header";
import QuestionFrame from "../components/QuestionFrame";
import ResultsModal from "../components/ResultsModal";
import { useGame } from "../hooks/useGame";
import { useLevels } from "../hooks/useLevels";
import Button from "../components/Button";

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
          <section className="flex flex-col gap-4">
            {levels.map((level) => {
              return (
                <>
                  <Button
                    onClick={() => {
                      const levelID = level.id as number;
                      updateLevel(levelID);
                    }}
                  >
                    {level.nivel}
                  </Button>
                </>
              );
            })}
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
