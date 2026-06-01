import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const Semesters = () => {
  const [semesterData, setSemesterData] = useState({ emertimi: "", viti_akademik: "" });
  const [semesters, setSemesters] = useState([]); // State për listën
  const [isEditing, setIsEditing] = useState(false); // State për modin e editimit
  const [editId, setEditId] = useState(null);

  // 1. Funksioni për të marrë semestrat nga backend
  const fetchSemesters = async () => {
    try {
      const res = await axios.get("http://localhost:5000/get-semesters");
      setSemesters(res.data);
    } catch (err) {
      console.error("Gabim gjatë marrjes së të dhënave:", err);
    }
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

  const handleChange = (e) => {
    setSemesterData({ ...semesterData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        //  UPDATE
        await axios.put(`http://localhost:5000/update-semester/${editId}`, semesterData);
        alert("✅ Semestri u përditësua!");
      } else {
        await axios.post("http://localhost:5000/add-semester", semesterData);
        alert("✅ Semestri u shtua!");
      }
      
      setSemesterData({ emertimi: "", viti_akademik: "" });
      setIsEditing(false);
      setEditId(null);
      fetchSemesters(); // Rifresko listën
    } catch (err) {
      console.error(err);
      alert("❌ Gabim në server: " + (err.response?.data?.message || err.message));
    }
  };

  // 2. Funksioni për fshirje
  const handleDelete = async (id) => {
    if (window.confirm("A jeni të sigurt që dëshironi ta fshini?")) {
      try {
        await axios.delete(`http://localhost:5000/delete-semester/${id}`);
        fetchSemesters();
      } catch (err) {
        alert("Gabim gjatë fshirjes");
      }
    }
  };

  // 3. Funksioni që mbush formën për editim
  const handleEdit = (s) => {
    setIsEditing(true);
    setEditId(s.id);
    setSemesterData({ emertimi: s.emertimi, viti_akademik: s.viti_akademik });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Menaxhimi i Semestrave</h1>
          <p className="text-gray-500 mt-2 text-lg">Shtoni dhe menaxhoni periudhat akademike.</p>
        </div>

        {/* Form Section */}
        <div className="max-w-2xl bg-white p-10 rounded-3xl shadow-xl border border-gray-100 mb-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {isEditing ? "Ndrysho Semestrin" : "Detajet e Semestrit të Ri"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Emërtimi</label>
              <input 
                name="emertimi" 
                placeholder="Psh. Semestri Dimëror" 
                onChange={handleChange} 
                value={semesterData.emertimi} 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Viti Akademik</label>
              <input 
                name="viti_akademik" 
                placeholder="Psh. 2025-2026" 
                onChange={handleChange} 
                value={semesterData.viti_akademik} 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                required
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className={`flex-1 ${isEditing ? 'bg-yellow-500' : 'bg-indigo-600'} text-white p-4 rounded-2xl font-bold shadow-lg hover:opacity-90 transition-all uppercase tracking-widest cursor-pointer`}>
                {isEditing ? "Përditëso" : "Ruaj Semestrin"}
              </button>
              {isEditing && (
                <button 
                  type="button" 
                  onClick={() => { setIsEditing(false); setSemesterData({ emertimi: "", viti_akademik: "" }); }}
                  className="bg-gray-400 text-white px-6 rounded-2xl font-bold"
                >
                  Anulo
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Table Section (READ) */}
        <div className="max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
              <tr>
                <th className="p-5">ID</th>
                <th className="p-5">Emërtimi</th>
                <th className="p-5">Viti Akademik</th>
                <th className="p-5 text-center">Veprimet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {semesters.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-5 text-gray-500">#{s.id}</td>
                  <td className="p-5 font-semibold text-gray-700">{s.emertimi}</td>
                  <td className="p-5 text-gray-600">{s.viti_akademik}</td>
                  <td className="p-5 text-center space-x-2">
                    <button onClick={() => handleEdit(s)} className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-xl hover:bg-yellow-600 hover:text-white transition-all">Edit</button>
                    <button onClick={() => handleDelete(s.id)} className="bg-red-100 text-red-600 px-4 py-2 rounded-xl hover:bg-red-600 hover:text-white transition-all">Fshij</button>
                  </td>
                </tr>
              ))}
              {semesters.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-gray-400 italic">Asnjë semestër nuk u gjet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Semesters;