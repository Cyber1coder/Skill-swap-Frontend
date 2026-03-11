import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [dark, setDark] = useState(localStorage.theme === "dark");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  /* ---------- Dark Mode ---------- */

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [dark]);

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-white">

      {/* ---------- Mobile Sidebar Overlay ---------- */}

      {sidebar && (
        <div
          onClick={() => setSidebar(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      {/* ---------- Sidebar ---------- */}

      <div
        className={`
        fixed lg:static z-40
        w-64 h-full
        bg-white dark:bg-slate-900
        border-r border-gray-200 dark:border-slate-700
        p-6
        transform
        ${sidebar ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        transition-transform duration-300
        flex flex-col justify-between
        `}
      >
        <div>

          <h1 className="text-2xl font-bold mb-8">SkillSwap</h1>

          <nav className="space-y-4">

            <NavItem
              to="/dashboard"
              label="Dashboard"
              active={location.pathname === "/dashboard"}
            />

            <NavItem
              to="/marketplace"
              label="Marketplace"
              active={location.pathname === "/marketplace"}
            />

            <NavItem
              to="/sessions"
              label="Sessions"
              active={location.pathname === "/sessions"}
            />

            <NavItem
              to="/forum"
              label="Community Forum"
              active={location.pathname === "/forum"}
            />

            <NavItem
              to="/profile"
              label="Profile"
              active={location.pathname === "/profile"}
            />

          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* ---------- Main Content ---------- */}

      <div className="flex-1 p-4 sm:p-6 lg:p-8">

        {/* Top Bar */}

        <div className="flex justify-between items-center mb-6">

          {/* Mobile Menu Button */}

          <button
            onClick={() => setSidebar(true)}
            className="lg:hidden bg-gray-200 dark:bg-slate-700 px-3 py-2 rounded"
          >
            ☰
          </button>

          <div className="flex items-center gap-4 ml-auto">

            {/* Dark Mode Toggle */}

            <button
              onClick={() => setDark(!dark)}
              className="bg-gray-200 dark:bg-slate-700 px-3 py-2 rounded-lg"
            >
              {dark ? "☀" : "🌙"}
            </button>

            {/* User Menu */}

            <div className="relative">

              <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer bg-gray-200 dark:bg-slate-700 px-4 py-2 rounded-lg"
              >
                {user?.email}
              </div>

              {open && (
                <div className="absolute top-12 right-0 w-48 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg shadow-lg p-4">

                  <p className="text-sm mb-3 opacity-70">
                    {user?.role}
                  </p>

                  <button
                    onClick={handleLogout}
                    className="text-red-500 text-sm"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>

          </div>

        </div>

        {children}

      </div>
    </div>
  );
}

/* ---------- Navigation Item ---------- */

function NavItem({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`block px-2 py-1 rounded transition
        ${
          active
            ? "text-blue-500 font-medium"
            : "opacity-80 hover:text-blue-500"
        }`}
    >
      {label}
    </Link>
  );
}