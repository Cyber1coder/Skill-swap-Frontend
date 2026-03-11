import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  User
} from "lucide-react";

export default function Sidebar({ open, setOpen }) {

  const navItem = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition
     ${
       isActive
         ? "bg-blue-500 text-white"
         : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
     }`;

  return (
    <>
      {/* Mobile Overlay */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
        fixed lg:static z-40
        w-64 h-screen
        bg-white dark:bg-slate-900
        border-r border-gray-200 dark:border-slate-700
        p-6
        transform
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        transition-transform duration-300
        `}
      >
        {/* Logo */}

        <h1 className="text-2xl font-bold mb-10 text-gray-800 dark:text-white">
          SkillSwap
        </h1>

        {/* Navigation */}

        <nav className="space-y-3">

          <NavLink to="/dashboard" className={navItem}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink to="/marketplace" className={navItem}>
            <Users size={20} />
            Marketplace
          </NavLink>

          <NavLink to="/sessions" className={navItem}>
            <Calendar size={20} />
            Sessions
          </NavLink>

          <NavLink to="/profile" className={navItem}>
            <User size={20} />
            Profile
          </NavLink>

        </nav>
      </aside>
    </>
  );
}