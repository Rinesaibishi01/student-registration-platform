import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const Courses = () => {
  const [courseData, setCourseData] = useState({
    emertimi: "",
    pershkrimi: "",
    kredite: "",
    professor_id: "",
    semester_id: "",
    kapaciteti: ""
  });

  // Funksioni universal për kapjen e të dhënave nga çdo input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Konvertojmë vlerat në numra para dërgimit
    const dataToSend = {
      ...courseData,
      kredite: Number(courseData.kredite),
      professor_id: Number(courseData.professor_id),
      semester_id: Number(courseData.semester_id),
      kapaciteti: Number(courseData.kapaciteti)
    };

    try {
      // Sigurohu që kjo rrugë (URL) përputhet saktësisht me atë të Backend-it tënd
await axios.post("http://localhost:5000/add-course", courseData);
      alert("✅ Kursi u shtua me sukses!");
      
      // Pastrojmë formën pas suksesit
      setCourseData({ 
        emertimi: "", 
        pershkrimi: "", 
        kredite: "", 
        professor_id: "", 
        semester_id: "", 
        kapaciteti: "" 
      });
    } catch (err) {
      console.error("Gabim gjatë shtimit të kursit:", err);
      alert("❌ Diçka shkoi keq! Kontrolloni nëse profesori ose semestri ekzistojnë në databazë.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      <Sidebar />

      <main className="flex-1 p-8 ml-64">
        {/* Header Section */}
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Menaxhimi i Kurseve</h1>
          <p className="text-gray-500 mt-2 text-lg">Shtoni kurse të reja në sistemin akademik.</p>
        </div>

        <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Detajet e Kursit</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Emri i Kursit */}
            <div className="group">
              <label className="block text-sm font-bold text-gray-700 mb-2 transition-colors group-focus-within:text-indigo-600">
                Emërtimi i Kursit
              </label>
              <input 
                type="text" 
                name="emertimi"
                required
                placeholder="Psh. Shkenca Kompjuterike 1"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                value={courseData.emertimi}
                onChange={handleChange}
              />
            </div>

            {/* Përshkrimi */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Përshkrimi i Kursit</label>
              <textarea 
                name="pershkrimi"
                rows="3"
                placeholder="Shkruani një përshkrim të shkurtër..."
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                value={courseData.pershkrimi}
                onChange={handleChange}
              />
            </div>

            {/* Kreditet dhe Kapaciteti */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Kredite (ECTS)</label>
                <input 
                  type="number" 
                  name="kredite"
                  required
                  placeholder="Psh. 6"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                  value={courseData.kredite}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Kapaciteti (Studentë)</label>
                <input 
                  type="number" 
                  name="kapaciteti"
                  required
                  placeholder="Psh. 40"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                  value={courseData.kapaciteti}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* ID e Profesorit dhe Semestrit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">ID e Profesorit (Nga DB)</label>
                <input 
                  type="number" 
                  name="professor_id"
                  required
                  placeholder="ID psh. 5 ose 7"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                  value={courseData.professor_id}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">ID e Semestrit (Nga DB)</label>
                <input 
                  type="number" 
                  name="semester_id"
                  required
                  placeholder="ID psh. 1"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                  value={courseData.semester_id}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-100 transition-all transform active:scale-95 uppercase tracking-widest mt-4 cursor-pointer"
            >
              Ruaj Kursin në Sistem
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Courses;