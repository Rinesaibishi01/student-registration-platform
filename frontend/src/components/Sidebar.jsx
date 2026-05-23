import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard-admin", icon: "🏠" },
    { name: "Studentët", path: "/students", icon: "🎓" }, 
    { name: "Profesorët", path: "/teachers", icon: "👨‍🏫" },
    { name: "Kurset", path: "/courses", icon: "📚" },
    { name: "Semestrat", path: "/semesters", icon: "🗓️" },
    { name: "Shto Orar", path: "/add-schedule", icon: "📅" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#111827] text-white flex flex-col z-[1000] shadow-2xl border-r border-slate-800">
      
      {/* LOGO SECTION */}
      <div className="p-8 mb-2">
        <h2 className="text-xl font-black tracking-tighter uppercase flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-xs italic">UA</div>
          Uni<span className="text-blue-500">Akademi</span>
        </h2>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-2">Admin Panel</p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        <style>
          {`.no-scrollbar::-webkit-scrollbar { display: none; }`}
        </style>
        
        {menuItems.map((item) => {
          const isActive = location.pathname.toLowerCase() === item.path.toLowerCase();
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 no-underline ${
                isActive 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40" 
                : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* LOGOUT BUTTON */}
      <div className="p-6 mt-auto border-t border-slate-800/50 bg-[#111827]">
        <button
          onClick={handleLogout}
          className="w-full py-4 bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all duration-300 border border-red-500/20 hover:border-red-600 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>🚪</span> Dil nga sistemi
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;