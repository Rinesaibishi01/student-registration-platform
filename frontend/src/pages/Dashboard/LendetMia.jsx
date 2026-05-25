import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherSidebar from "../../components/TeacherSidebar"; 

function LendetMia() {
  const [kurset, setKurset] = useState([]);
  
  // MARRJA DINAMIKE: Merr ID-në e saktë të profesorit të kyçur nga localStorage
  const professorId = localStorage.getItem("userId"); 

  useEffect(() => {
    if (!professorId) return;

    axios.get(`http://localhost:5000/api/professor/${professorId}/courses`)
      .then((res) => {
        setKurset(res.data);
      })
      .catch((err) => {
        console.error("Gabim gjatë marrjes së kurseve të profesorit:", err);
      });
  }, [professorId]);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <TeacherSidebar /> 

      <main className="flex-1 p-10 ml-64 overflow-y-auto">
        <div className="mb-10">
          <h5 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2">Sistemi Uni-Akademi</h5>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Lëndët e Mia</h1>
          <p className="text-slate-500 mt-2 font-medium">Lista zyrtare e kurseve që ju menaxhoni dhe udhëhiqni këtë semestër.</p>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-50 shadow-sm overflow-hidden p-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="pb-5 pl-4">Emërtimi i Kursit</th>
                <th className="pb-5">Kreditë (ECTS)</th>
                <th className="pb-5">Kapaciteti Maksimal</th>
                <th className="pb-5 pr-4 text-right">Studentë të Regjistruar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm font-medium text-slate-700">
              {kurset.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-slate-400 font-medium">
                    Nuk u gjet asnjë kurs i regjistruar në emrin tuaj për këtë semestër.
                  </td>
                </tr>
              ) : (
                kurset.map((kurs) => (
                  <tr key={kurs.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-5 pl-4 font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {kurs.emertimi}
                    </td>
                    <td className="py-5 text-slate-500">{kurs.kredite} Kredite</td>
                    <td className="py-5 text-slate-500">{kurs.kapaciteti} Studentë</td>
                    <td className="py-5 pr-4 text-right">
                      <span className="px-4 py-1.5 bg-blue-50 text-blue-600 font-bold rounded-xl text-xs shadow-sm">
                        {kurs.studentetRegjistruar || 0} / {kurs.kapaciteti} Vende
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default LendetMia;