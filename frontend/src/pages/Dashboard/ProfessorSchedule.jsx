import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherSidebar from "../../components/TeacherSidebar";

function ProfessorSchedule() {
  const [orari, setOrari] = useState([]);
  const [kurset, setKurset] = useState([]); 
  const [idLendes, setIdLendes] = useState("");
  const [dita, setDita] = useState("");
  const [oraFillimit, setOraFillimit] = useState("");
  const [oraMbarimit, setOraMbarimit] = useState("");
  const [salla, setSalla] = useState("");

  // MARRJA DINAMIKE: Merr ID-në e saktë të profesorit të kyçur nga localStorage
  const professorId = localStorage.getItem("userId"); 

  const ngarkoTeDhenat = () => {
    if (!professorId) return;

    // 1. Marrim orarin e profesorit aktual
    axios.get(`http://localhost:5000/api/professor/${professorId}/schedule`)
      .then((res) => setOrari(res.data))
      .catch((err) => console.error("Gabim gjatë marrjes së orarit:", err));

    // 2. Marrim vetëm lëndët e këtij profesori për dropdown
    axios.get(`http://localhost:5000/api/professor/${professorId}/courses`)
      .then((res) => setKurset(res.data))
      .catch((err) => console.error("Gabim gjatë marrjes së kurseve:", err));
  };

  useEffect(() => {
    ngarkoTeDhenat();
  }, [professorId]);

  const handleShtoOrar = (e) => {
    e.preventDefault();
    
    const dataERe = {
      course_id: idLendes,
      dita: dita,
      ora_fillimit: oraFillimit,
      ora_mbarimit: oraMbarimit,
      salla: salla
    };

    axios.post("http://localhost:5000/api/schedule", dataERe)
      .then(() => {
        alert("Orari u shtua me sukses!");
        setIdLendes(""); setDita(""); setOraFillimit(""); setOraMbarimit(""); setSalla("");
        ngarkoTeDhenat(); 
      })
      .catch((err) => {
        console.error("Gabim gjatë shtmit të orarit:", err);
        alert("Ndodhi një gabim gjatë ruajtjes.");
      });
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <TeacherSidebar /> 

      <main className="flex-1 p-10 ml-64 overflow-y-auto">
        <div className="mb-10">
          <h5 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2">Sistemi Uni-Akademi</h5>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Orari im i Ligjëratave</h1>
        </div>

        {/* FORMA DINAMIKE */}
        <div className="bg-white rounded-[2rem] border border-slate-50 shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Shto një Orar të Ri</h2>
          <form onSubmit={handleShtoOrar} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Zgjidh Lëndën</label>
              <select value={idLendes} onChange={(e) => setIdLendes(e.target.value)} required className="w-full p-3 border rounded-xl bg-slate-50 focus:outline-blue-500 text-sm">
                <option value="">Zgjidh lëndën</option>
                {kurset.map((kurs) => (
                  <option key={kurs.id} value={kurs.id}>
                    {kurs.emertimi}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Dita</label>
              <select value={dita} onChange={(e) => setDita(e.target.value)} required className="w-full p-3 border rounded-xl bg-slate-50 focus:outline-blue-500 text-sm">
                <option value="">Zgjidh ditën</option>
                <option value="E Hënë">E Hënë</option>
                <option value="E Martë">E Martë</option>
                <option value="E Mërkurë">E Mërkurë</option>
                <option value="E Enjte">E Enjte</option>
                <option value="E Premte">E Premte</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Ora Fillimit</label>
              <input type="time" value={oraFillimit} onChange={(e) => setOraFillimit(e.target.value)} required className="w-full p-3 border rounded-xl bg-slate-50 focus:outline-blue-500 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Ora Mbarimit</label>
              <input type="time" value={oraMbarimit} onChange={(e) => setOraMbarimit(e.target.value)} required className="w-full p-3 border rounded-xl bg-slate-50 focus:outline-blue-500 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Salla</label>
              <input type="text" value={salla} onChange={(e) => setSalla(e.target.value)} required className="w-full p-3 border rounded-xl bg-slate-50 focus:outline-blue-500 text-sm" placeholder="Salla" />
            </div>
            <div className="md:col-span-5 text-right mt-2">
              <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition">
                Ruaj Orarin
              </button>
            </div>
          </form>
        </div>

        {/* TABELA */}
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
              {orari.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-slate-400 font-medium">
                    Nuk ka asnjë ligjëratë në orar për këtë profesor.
                  </td>
                </tr>
              ) : (
                orari.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 pl-4 font-bold text-slate-900">{item.emri_lendes}</td>
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