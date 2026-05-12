import React, { useState } from "react";
import TeacherSidebar from "../../components/TeacherSidebar";

const Grading = () => {
  const [grade, setGrade] = useState("");

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <TeacherSidebar />
      <main className="flex-1 ml-64 p-10 text-slate-900">
        <h1 className="text-3xl font-black text-slate-800 mb-8">Vlerësimi i Studentëve</h1>
        
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">Studenti</th>
                <th className="px-8 py-5">Lënda</th>
                <th className="px-8 py-5">Nota</th>
                <th className="px-8 py-5 text-right">Veprimi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50">
                <td className="px-8 py-6 font-bold text-slate-700">Filan Fisteku</td>
                <td className="px-8 py-6 text-slate-500">Web Development</td>
                <td className="px-8 py-6">
                  <input 
                    type="number" 
                    className="w-20 p-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold"
                    placeholder="6-10"
                  />
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all cursor-pointer">
                    Ruaj
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Grading;