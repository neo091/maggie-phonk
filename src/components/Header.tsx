import { Link, useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate("/dashboard");
  };

  return (
    <header className="bg-slate-900 border-b border-fuchsia-500/50 sticky top-0 z-50 shadow-lg shadow-fuchsia-500/20">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-1 sm:gap-2 hover:opacity-80 transition min-w-0"
        >
          <span className="text-xl sm:text-2xl">🎵</span>
          <span className="text-lg sm:text-xl font-bold text-fuchsia-500 truncate">
            Phonk Quiz
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <button
            onClick={handleAdminClick}
            className="text-sm text-gray-400 hover:text-fuchsia-400 transition"
          >
            ⚙️ Admin
          </button>
        </nav>
      </div>
    </header>
  );
}
