import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex">
      
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 border-r border-slate-700 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8">SkillSwap</h1>

          <nav className="space-y-4">
            <Link
              to="/dashboard"
              className={`block ${
                location.pathname === "/dashboard"
                  ? "text-blue-400"
                  : "hover:text-blue-400"
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/matches"
              className={`block ${
                location.pathname === "/matches"
                  ? "text-blue-400"
                  : "hover:text-blue-400"
              }`}
            >
              Matches
            </Link>

            <Link
              to="/sessions"
              className={`block ${
                location.pathname === "/sessions"
                  ? "text-blue-400"
                  : "hover:text-blue-400"
              }`}
            >
              Sessions
            </Link>

            <Link
              to="/profile"
              className={`block ${
                location.pathname === "/profile"
                  ? "text-blue-400"
                  : "hover:text-blue-400"
              }`}
            >
              Profile
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 p-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 relative">
        <div className="flex justify-end mb-6 relative">
          <div
            onClick={() => setOpen(!open)}
            className="cursor-pointer bg-slate-700 px-4 py-2 rounded-lg"
          >
            {user?.email}
          </div>

          {open && (
            <div className="absolute top-12 right-0 bg-slate-700 p-4 rounded-lg shadow-lg">
              <p className="text-sm mb-2">{user?.role}</p>
              <button
                onClick={handleLogout}
                className="text-red-400 text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}