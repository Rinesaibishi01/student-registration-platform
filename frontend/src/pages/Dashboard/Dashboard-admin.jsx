import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function Dashboard() {
  const navigate = useNavigate();
  
  // Marrim emrin e adminit nga localStorage
  const adminName = localStorage.getItem("userName") || "Admin";

  const stats = [
    { title: "Studentë", count: "1,240", icon: "👨‍🎓", color: "bg-blue-50 text-blue-600" },
    { title: "Kurse", count: "48", icon: "📘", color: "bg-indigo-50 text-indigo-600" },
    { title: "Pagesa", count: "12", icon: "💰", color: "bg-emerald-50 text-emerald-600" },
    { title: "Njoftime", count: "5", icon: "🔔", color: "bg-amber-50 text-amber-600" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      
      {/* SIDEBAR UNIVERSAL */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 ml-[256px] overflow-y-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-12 flex justify-between items-center">
          <div>
            <h5 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2">Sistemi Uni-Akademi</h5>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Mirësevini prapë, <span className="text-blue-700">{adminName}!</span> 👋
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Kjo është gjendja aktuale e platformës për sot.</p>
          </div>
          
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="font-bold text-slate-700 text-sm">Paneli i Kontrollit</span>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-50 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer">
              <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-1">
                {item.title}
              </p>
              <h2 className="text-3xl font-black text-slate-900">{item.count}</h2>
            </div>
          ))}
        </div>

        {/* CONTENT GRIDS (Charts & Activity) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* CHART CARD */}
          <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Statistikat e Regjistrimeve</h3>
              <select className="bg-slate-50 border-none text-slate-500 font-bold text-xs p-2 rounded-lg outline-none cursor-pointer">
                <option>6 Mujori i Fundit</option>
                <option>Viti i Fundit</option>
              </select>
            </div>
            
            <div className="flex items-flex-end gap-5 h-[220px] items-end px-2">
              {[60, 85, 45, 100, 75, 90].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                  <div 
                    style={{ height: `${h}%` }}
                    className={`w-full rounded-2xl transition-all duration-500 cursor-pointer ${
                      i === 3 ? "bg-blue-600 shadow-lg shadow-blue-200" : "bg-blue-50 group-hover:bg-blue-100"
                    }`}
                  ></div>
                  <span className="text-slate-400 font-bold text-xs">
                    {["Jan", "Shk", "Mar", "Pri", "Maj", "Qer"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT ACTIVITY CARD */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Aktiviteti i Fundit</h3>

            <div className="space-y-8">
              <div className="flex gap-4 relative">
                <div className="w-1 bg-blue-600 rounded-full h-full absolute left-0"></div>
                <div className="pl-6">
                  <strong className="block text-slate-800 text-sm font-bold">Mbledhje me Stafin</strong>
                  <p className="text-xs text-slate-400 font-medium mt-1">Sot, 09:00 - 10:00</p>
                </div>
              </div>

              <div className="flex gap-4 relative">
                <div className="w-1 bg-emerald-500 rounded-full h-full absolute left-0"></div>
                <div className="pl-6">
                  <strong className="block text-slate-800 text-sm font-bold">3 Regjistrime të reja</strong>
                  <p className="text-xs text-slate-400 font-medium mt-1">Para 2 orësh</p>
                </div>
              </div>

              <div className="flex gap-4 relative">
                <div className="w-1 bg-amber-500 rounded-full h-full absolute left-0"></div>
                <div className="pl-6">
                  <strong className="block text-slate-800 text-sm font-bold">Përditësim i Kurrikulës</strong>
                  <p className="text-xs text-slate-400 font-medium mt-1">Dje, 16:45</p>
                </div>
              </div>
              
              <button className="w-full py-4 mt-4 bg-slate-50 text-slate-500 font-bold text-xs rounded-2xl hover:bg-blue-50 hover:text-blue-600 transition-colors uppercase tracking-widest">
                Shiko të gjitha
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;