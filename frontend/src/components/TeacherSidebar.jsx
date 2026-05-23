import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function TeacherSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Masivi i përditësuar me dy faqet e reja
  const menuItems = [
    { name: "Përmbledhja", path: "/teacher-dashboard", icon: "📊" },
    { name: "Lëndët e Mia", path: "/teacher-courses", icon: "📚" },
    { name: "Vlerësimi", path: "/grading", icon: "📝" },
    { name: "Krijo Njoftim", path: "/create-announcement", icon: "📢" },
    { name: "Orari im", path: "/professor-schedule", icon: "📅" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0f172a] text-white flex flex-col z-[1000] shadow-2xl border-r border-slate-800">
      <div className="p-8 mb-4 flex-none">
        <h2 className="text-xl font-black tracking-tighter uppercase">
          Uni<span className="text-blue-500">Akademi</span>
        </h2>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Profesor Panel</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto no-scrollbar" style={{ scrollbarWidth: 'none' }}>
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${
              location.pathname === item.path ? "bg-blue-600 shadow-lg shadow-blue-900/40" : "text-slate-400 hover:bg-slate-800/50"
            }`}
          >
            <span>{item.icon}</span> {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-6 mt-auto border-t border-slate-800 flex-none">
        <button onClick={handleLogout} className="w-full py-4 bg-red-600/10 text-red-500 rounded-2xl font-bold text-xs uppercase cursor-pointer border border-red-500/20 hover:bg-red-600 hover:text-white transition-all">
          Dil nga sistemi
        </button>
      </div>
    </aside>
  );
}

export default TeacherSidebar;