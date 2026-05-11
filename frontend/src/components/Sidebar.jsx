import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Ky është blloku kritik - rrugët (path) duhet të jenë 100% si në App.js
  const menuItems = [
    { name: "Dashboard", path: "/Dashboard-admin", icon: "🏠" },
    { name: "Studentët", path: "/Students", icon: "🎓" }, 
    { name: "Profesorët", path: "/teachers", icon: "👨‍🏫" },
    { name: "Kurset", path: "/Courses", icon: "📚" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1e293b] text-white flex flex-col z-[1000] shadow-2xl">
      {/* HEADER */}
      <div className="p-8 border-b border-slate-700/50">
        <h2 className="text-xl font-black tracking-tighter uppercase text-white">
          Uni<span className="text-blue-500">Akademi</span>
        </h2>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Admin Panel</p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all no-underline ${
                isActive 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="p-6 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full py-4 bg-red-600/10 text-red-500 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all border-none cursor-pointer"
        >
          Dil nga sistemi
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;