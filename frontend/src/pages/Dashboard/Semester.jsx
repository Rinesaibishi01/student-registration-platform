import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const Semesters = () => {
  const [semesterData, setSemesterData] = useState({ emertimi: "", viti_akademik: "" });

  const handleChange = (e) => {
    setSemesterData({ ...semesterData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
await axios.post("http://localhost:5000/semesters/add", semesterData);
      alert("✅ Semestri u shtua!");
      setSemesterData({ emertimi: "", viti_akademik: "" });
} catch (err) {
    console.error(err); // Kjo e bën variablën të përdorur
    alert("❌ Gabim në server: " + (err.response?.data?.message || err.message));
}
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Shto Semestër</h1>
        <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded-xl shadow">
          <input name="emertimi" placeholder="Emri (psh. Dimëror)" onChange={handleChange} value={semesterData.emertimi} className="w-full p-2 border mb-4 rounded" />
          <input name="viti_akademik" placeholder="Viti (psh. 2025-2026)" onChange={handleChange} value={semesterData.viti_akademik} className="w-full p-2 border mb-4 rounded" />
          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">Ruaj</button>
        </form>
      </main>
    </div>
  );
};

export default Semesters;