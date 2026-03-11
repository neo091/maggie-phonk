interface CoverProps {
  start: () => void;
}

export default function Cover({ start }: CoverProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <img
        src="/cover.png"
        className="w-80 rounded-xl shadow-[0_0_30px_#ff00ff]"
      />
      <h1 className="text-4xl mt-6 text-fuchsia-500 font-bold">PHONK QUIZ</h1>
      <button
        onClick={start}
        className="mt-8 px-6 py-3 bg-fuchsia-500 text-black rounded-lg hover:scale-110 transition"
      >
        ▶ Haz click para empezar
      </button>
    </div>
  );
}
