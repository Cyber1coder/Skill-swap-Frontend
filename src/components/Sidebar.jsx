import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Calendar, User } from "lucide-react";

export default function Sidebar() {
  const linkClass =
    "flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition";

  return (
    <div className="w-64 h-screen backdrop-blur-xl bg-white/5 border-r border-white/10 p-6 fixed">
      <h1 className="text-2xl font-bold text-white mb-10">
        SkillSwap
      </h1>

      <nav className="space-y-4 text-white">
        <NavLink to="/" className={linkClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/marketplace" className={linkClass}>
          <Users size={20} />
          marketplace
        </NavLink>

        <NavLink to="/sessions" className={linkClass}>
          <Calendar size={20} />
          Sessions
        </NavLink>

        <NavLink to="/profile" className={linkClass}>
          <User size={20} />
          Profile
        </NavLink>
      </nav>
    </div>
  );
}