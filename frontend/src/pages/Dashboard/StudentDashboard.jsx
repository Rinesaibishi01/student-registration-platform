import React from "react";
import { Link } from "react-router-dom";

function StudentDashboard() {
  // Mund ta marrësh emrin nga localStorage nëse e ke ruajtur atje gjatë login-it
  const emri = localStorage.getItem("userName") || "Student"; 

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      {/* 1. SIDEBAR (E ngushtë dhe moderne) */}
      <aside className="w-20 lg:w-64 bg-white border-r border-gray-100 flex flex-col transition-all">
        <div className="p-6 text-indigo-600 font-black text-xl border-b border-gray-50">
          <span className="lg:inline hidden">STUDENTIX</span>
          <span className="lg:hidden">SX</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/student-panel" className="flex items-center gap-3 p-3 bg-indigo-50 text-indigo-700 rounded-2xl font-bold">
            🏠 <span className="hidden lg:block">Dashboard</span>
          </Link>
          <Link to="#" className="flex items-center gap-3 p-3 text-gray-400 hover:bg-gray-50 rounded-2xl transition-all">
            📚 <span className="hidden lg:block">Kurset</span>
          </Link>
          <Link to="#" className="flex items-center gap-3 p-3 text-gray-400 hover:bg-gray-50 rounded-2xl transition-all">
            📅 <span className="hidden lg:block">Orari</span>
          </Link>
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-8">
        
        {/* TOP NAVBAR (E thjeshtë) */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-xl font-bold text-gray-800">Student Dashboard</h1>
          <div className="flex gap-4">
            <button className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">🔔</button>
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 font-bold text-sm">
              Prill 2026
            </div>
          </div>
        </div>

        {/* STRUKTURA E RE (Që dërgove ti) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Seksioni i majtë (Më i gjerë) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Karta e Mirëseardhjes */}
            <div className="bg-indigo-900 p-10 rounded-[2rem] shadow-xl text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-2">Mirëseerdhe prapë, {emri}! 👋</h2>
                <p className="text-indigo-200">Sot keni 3 ligjërata për të ndjekur në departamentin tuaj.</p>
                <button className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full font-bold transition-all">
                  Shiko Orarin
                </button>
              </div>
              {/* Dekorim abstrakt në prapavijë */}
              <div className="absolute top-[-20px] right-[-20px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* Lista e Kurseve */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 text-lg">Kurset e ardhshme</h3>
                <button className="text-indigo-600 text-sm font-bold">Shiko të gjitha</button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl border border-transparent hover:border-gray-100 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center font-bold">MA</div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">Matematika Diskrete</h4>
                      <p className="text-xs text-gray-400">Prof. Arben Hoxha</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">10:00 - 11:30</span>
                </div>

                <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl border border-transparent hover:border-gray-100 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold">WD</div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">Web Development</h4>
                      <p className="text-xs text-gray-400">Prof. Laura Shala</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">12:00 - 13:30</span>
                </div>
              </div>
            </div>
          </div>

          {/* Seksioni i djathtë (Më i ngushtë) */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Kartela e Profilit */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50 text-center">
              <div className="relative inline-block">
                <img 
                  src="https://ui-avatars.com/api/?name=Laura+Shala&background=6366f1&color=fff" 
                  className="w-24 h-24 mx-auto rounded-full border-4 border-indigo-50 mb-4 object-cover" 
                  alt="Profile"
                />
                <span className="absolute bottom-6 right-2 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></span>
              </div>
              <h3 className="font-black text-xl text-gray-800">Laura Shala</h3>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-tighter mt-1">ID: 2021034</p>
              
              <div className="mt-8 pt-8 border-t border-gray-50 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xl font-black text-gray-800">6</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase">Kurse</div>
                </div>
                <div>
                  <div className="text-xl font-black text-gray-800">4.8</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase">GPA</div>
                </div>
              </div>
            </div>

            {/* Attendance Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-8 rounded-[2rem] shadow-lg relative overflow-hidden">
              <h4 className="font-bold mb-2 text-xs text-indigo-200 uppercase tracking-[0.2em]">Attendance</h4>
              <div className="text-5xl font-black mb-4">96%</div>
              <div className="w-full bg-white/10 h-2 rounded-full">
                <div className="w-[96%] bg-emerald-400 h-full rounded-full"></div>
              </div>
              <p className="mt-4 text-[10px] text-indigo-300">Shumë mirë! Vazhdo kështu për të mbajtur bursën.</p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;