import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

import Swal from 'sweetalert2';

function DashboardStudents() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    numri_studentit: "",
    programi: "",
    viti_studimit: ""
  });

  // 1. Marrja e të dhënave nga Backend (E deklaruar para përdorimit)
  const fetchStudents = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/students");
      if (Array.isArray(res.data)) {
        setStudents(res.data);
      }
    } catch (err) {
      console.error("Gabim gjatë marrjes së studentëve:", err);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // 2. Fshirja e Studentit
  const handleDelete = async (id) => {
    if (window.confirm("A jeni i sigurt që dëshironi ta fshini këtë student?")) {
      try {
        await axios.delete(`http://localhost:5000/delete-student/${id}`);
        setStudents(prev => prev.filter(s => s.id !== id));
      } catch (err) {
        console.error("Gabim gjatë fshirjes:", err);
        alert("Ndodhi një gabim gjatë fshirjes.");
      }
    }
  };

  // 3. Shtimi i Studentit të Ri
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("http://localhost:5000/add-student", newStudent);
        
        if (res.data.Status === "Success") {
            // 2. Zëvendëso alert-in me këtë bllok profesional
            Swal.fire({
                title: 'Sukses!',
                text: 'Studenti u regjistrua me sukses në sistem.',
                icon: 'success',
                confirmButtonColor: '#4e73df', // Ngjyra e butonit tënd primar
                timer: 3000 // Mbyllet vetë pas 3 sekondave
            });

            setShowModal(false);
            fetchStudents(); // Rifreskon tabelën
        }
    } catch (err) {
        // Mesazh profesional edhe për gabimet
        Swal.fire({
            title: 'Gabim!',
            text: 'Ndodhi një problem gjatë ruajtjes. Te lutem provo sërish.',
            icon: 'error',
            confirmButtonColor: '#e74a3b'
        });
    }
};

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      <Sidebar />

      <main className="flex-1 p-8 ml-64">
        {/* Header-i */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Studentët</h1>
            <p className="text-gray-500 mt-1">Menaxhimi i regjistrimeve dhe të dhënave akademike.</p>
          </div>
          <button 
            onClick={() => setShowModal(true)} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1"
          >
            + Shto Student
          </button>
        </div>

        {/* Kartat e Statistikave */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 uppercase font-black tracking-widest mb-1">Total Studentë</p>
            <h2 className="text-3xl font-bold">{students.length}</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 uppercase font-black tracking-widest mb-1">Programe Studimore</p>
            <h2 className="text-3xl font-bold">
              {[...new Set(students.map(s => s.programi))].length}
            </h2>
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase">ID</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase">Nr. ID</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase">Programi</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase">Viti</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase text-center">Veprime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {students.length > 0 ? (
                students.map(s => (
                  <tr key={s.id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="py-4 px-6 text-sm text-gray-500">#{s.id}</td>
                    <td className="py-4 px-6 text-sm font-bold text-indigo-600">{s.numri_studentit}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{s.programi}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">Viti {s.viti_studimit}</td>
                    <td className="py-4 px-6 text-center">
                      <button className="text-gray-400 hover:text-indigo-600 mr-4 transition-colors font-semibold text-sm">Edit</button>
                      <button 
                        onClick={() => handleDelete(s.id)} 
                        className="text-gray-400 hover:text-red-600 transition-colors font-semibold text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-20 text-center text-gray-400 font-medium italic">
                    Nuk u gjet asnjë student në sistem.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal-i me inpute të lidhura */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Shto Student të Ri</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nr. i ID së Studentit</label>
                <input 
                  required
                  value={newStudent.numri_studentit}
                  onChange={e => setNewStudent({...newStudent, numri_studentit: e.target.value})}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                  placeholder="Psh: 200101001"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Programi Studimor</label>
                <input 
                  required
                  value={newStudent.programi}
                  onChange={e => setNewStudent({...newStudent, programi: e.target.value})}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                  placeholder="Psh: Shkenca Kompjuterike"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Viti i Studimeve</label>
                <input 
                  required
                  type="number"
                  value={newStudent.viti_studimit}
                  onChange={e => setNewStudent({...newStudent, viti_studimit: e.target.value})}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                  placeholder="Psh: 1"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black shadow-lg shadow-indigo-100 transition-all mt-4 uppercase tracking-widest"
              >
                Ruaj në Databazë
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardStudents;