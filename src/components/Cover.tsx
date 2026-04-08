import { Link } from "react-router";

export default function Cover() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-8">
      <div className="mb-4 sm:mb-8">
        <img
          src="/cover.png"
          className="w-64 sm:w-80 rounded-2xl shadow-[0_0_40px_#ff00ff] border-2 border-fuchsia-500"
          alt="Phonk Quiz Cover"
        />
      </div>

      <h1 className="text-3xl sm:text-5xl font-black text-fuchsia-500 mb-1 sm:mb-2">
        🎵 PHONK QUIZ 🎵
      </h1>
      <p className="text-base sm:text-xl text-slate-300 mb-6 sm:mb-8">
        ¿Cuánto sabes de Phonk? ¡Demuéstralo!
      </p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link
          to={"game"}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-black font-bold text-base sm:text-lg rounded-xl hover:scale-105 transition transform shadow-lg hover:shadow-[0_0_30px_#ff00ff]"
        >
          ▶️ JUGAR
        </Link>

        <Link
          to="/dashboard"
          className="px-6 sm:px-8 py-3 sm:py-4 bg-slate-700 text-white font-bold text-base sm:text-lg rounded-xl hover:bg-slate-600 transition"
        >
          ⚙️ ADMINISTRADOR
        </Link>
      </div>

      <div className="mt-8 sm:mt-12 text-slate-400 text-xs sm:text-sm">
        <p>
          Sube tus mejores tracks de Phonk y crea cuestionarios personalizados
        </p>
      </div>
    </div>
  );
}
