import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import Button from "./Button";

interface AdminHeaderProps {
  children?: React.ReactNode;
}

export default function AdminHeader({ children }: AdminHeaderProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-slate-900 border-b border-fuchsia-500/50 sticky top-0 z-50 shadow-lg shadow-fuchsia-500/20">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link
          to="/dashboard"
          className="flex items-center gap-1 sm:gap-2 hover:opacity-80 transition min-w-0"
        >
          <span className="text-xl sm:text-2xl">🎵</span>
          <span className="text-lg sm:text-xl font-bold text-fuchsia-500 truncate">
            Phonk Admin
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <Link to="/">
            <Button variant="secondary">← Ir a Jugar</Button>
          </Link>

          {user && (
            <div className="flex items-center gap-3 pl-3 sm:pl-4 border-l border-fuchsia-500/30">
              <span className="text-sm text-gray-300 hidden sm:block">
                {user.name || user.username}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-400 hover:text-fuchsia-400 transition"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
      {children}
    </header>
  );
}
