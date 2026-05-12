import React from "react";
import TeacherSidebar from "../../components/TeacherSidebar";

const TeacherDashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <TeacherSidebar />
      <main className="flex-1 ml-64 p-10">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Mirësevini, Profesor</h1>
          <p className="text-slate-500 font-medium">Statistikat tuaja për semestrin aktual.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Karta e Statistikave */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 transform hover:-translate-y-1 transition-all">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lëndët Aktive</p>
            <h3 className="text-4xl font-black text-slate-800 mt-2">04</h3>
          </div>
          {/* Karta për Listat e Pritjes */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 transform hover:-translate-y-1 transition-all">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-amber-500">Në Pritje</p>
            <h3 className="text-4xl font-black text-slate-800 mt-2">12</h3>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 transform hover:-translate-y-1 transition-all">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-blue-500">Studentë Total</p>
            <h3 className="text-4xl font-black text-slate-800 mt-2">86</h3>
          </div>
        </div>

        {/* Seksioni i Aktiviteteve */}
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Njoftimet e fundit nga sistemi</h2>
          <div className="space-y-4">
            <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100 text-blue-700 font-medium">
              🔔 5 studentë të rinj janë zhvendosur nga lista e pritjes në kursin "Programimi".
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;