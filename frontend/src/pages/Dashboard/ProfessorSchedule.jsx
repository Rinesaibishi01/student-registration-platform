import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherSidebar from "../../components/TeacherSidebar";

function ProfessorSchedule() {
  const [orari, setOrari] = useState([]);
  const [loading, setLoading] = useState(true);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Nuk u gjet asnjë token në localStorage!");
      setLoading(false);
      return;
    }

    const decoded = parseJwt(token);
    
    const userId = decoded?.id || decoded?.userId || decoded?.user_id;

    if (!userId) {
      console.error("Nuk u gjet dot ID e përdoruesit brenda Token-it!");
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:5000/api/professor/${userId}/schedule`)
      .then((res) => {
        setOrari(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gabim gjatë marrjes së orarit:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <TeacherSidebar /> 
      
      <main className="flex-1 p-10 ml-64">
        <div className="mb-10">
          <h5 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2">Sistemi Uni-Akademi</h5>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Orari im i Ligjëratave</h1>
          <p className="text-slate-500 mt-2 font-medium">Këtu shfaqet orari i caktuar nga Admini për lëndët tuaja.</p>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-50 shadow-sm overflow-hidden p-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="pb-5 pl-4">Lënda</th>
                <th className="pb-5">Dita</th>
                <th className="pb-5">Ora e Fillimit</th>
                <th className="pb-5">Ora e Mbarimit</th>
                <th className="pb-5 pr-4 text-right">Salla</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm font-medium text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-slate-400 font-medium">
                    Duke u ngarkuar orari...
                  </td>
                </tr>
              ) : orari.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-slate-400 font-medium">
                    Nuk ka asnjë ligjëratë në orar për ju aktualisht.
                  </td>
                </tr>
              ) : (
                orari.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Shfaqim emrin e lëndës të kthyer nga JOIN në SQL query-n tuaj */}
                    <td className="py-5 pl-4 font-bold text-slate-900">{item.emri_lendes || item.emertimi}</td>
                    <td className="py-5 text-slate-600">{item.dita}</td>
                    <td className="py-5 text-slate-500">{item.ora_fillimit}</td>
                    <td className="py-5 text-slate-500">{item.ora_mbarimit}</td>
                    <td className="py-5 pr-4 text-right">
                      <span className="px-4 py-1.5 bg-blue-50 text-blue-600 font-bold rounded-xl text-xs">
                        {item.salla}
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

export default ProfessorSchedule;