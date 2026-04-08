import React from "react";
import { Link, useLocation } from "react-router";
import Button from "./Button";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isDashboard = location.pathname === "/dashboard";

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
          {!isHome && !isDashboard && (
            <Link to="/">
              <Button variant="secondary">← Inicio</Button>
            </Link>
          )}

          {isDashboard && (
            <Link to="/">
              <Button variant="secondary">← Jugar Quiz</Button>
            </Link>
          )}

          {isHome && (
            <Link to="/dashboard">
              <Button variant="primary">⚙️ Admin</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
