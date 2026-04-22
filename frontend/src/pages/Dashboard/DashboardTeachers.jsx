import React from "react";
import Sidebar from "../../components/Sidebar"; // Importojmë Sidebar-in universal

function DashboardTeachers() {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">

      {/* 1. SIDEBAR UNIVERSAL - Ky do të zëvendësojë <aside> e vjetër */}
      <Sidebar />

      {/* 2. MAIN CONTENT - Shtojmë ml-64 që të përputhet me sidebar-in fixed */}
      <main className="flex-1 p-8 ml-64">

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

          {/* HEADER */}
          <div className="flex justify-between items-center p-8 border-b border-gray-50 bg-gray-50/50">
            <div>
              <h2 className="text-2xl font-black text-gray-800">
                Shto Profesor të Ri
              </h2>
              <p className="text-sm text-gray-500">Plotësoni të dhënat profesionale të stafit akademik.</p>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-3 rounded-2xl bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-all">🔔</button>
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-indigo-200">
                A
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="p-8">

            {/* SEKSIONI 1: TË DHËNAT PERSONALE */}
            <div className="flex items-center gap-2 mb-6">
               <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">01</span>
               <h3 className="text-lg font-bold text-gray-700">Të dhënat Personale</h3>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Emri</label>
                <input placeholder="Psh: Filan" className="w-full border-gray-200 border p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-all" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Mbiemri</label>
                <input placeholder="Psh: Fisteku" className="w-full border-gray-200 border p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email Adresa</label>
                <input placeholder="profesori@uni-akademi.com" className="w-full border-gray-200 border p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Numri i Telefonit</label>
                <input placeholder="+383 4X XXX XXX" className="w-full border-gray-200 border p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-all" />
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Adresa e Banimit</label>
                <textarea placeholder="Rruga, Qyteti, Kodi Postar" className="w-full border-gray-200 border p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-all" rows="2"></textarea>
              </div>
            </div>

            {/* SEKSIONI 2: EDUKIMI */}
            <div className="flex items-center gap-2 mb-6">
               <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">02</span>
               <h3 className="text-lg font-bold text-gray-700">Edukimi & Përvoja</h3>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Universiteti</label>
                <input placeholder="Universiteti i Prishtinës" className="w-full border-gray-200 border p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-all" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Grada Shkencore</label>
                <input placeholder="Psh: Master i Shkencave" className="w-full border-gray-200 border p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-all" />
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-50">
              <button className="px-8 py-4 rounded-2xl border border-gray-200 font-bold text-gray-500 hover:bg-gray-50 transition-all">
                Anulo
              </button>
              <button className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transform hover:-translate-y-1 transition-all">
                Regjistro Profesorin
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardTeachers;