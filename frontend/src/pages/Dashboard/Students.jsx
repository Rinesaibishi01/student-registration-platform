import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Swal from 'sweetalert2';

function Student() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [studentData, setStudentData] = useState({
    emri: "",
    mbiemri: "",
    email: "",
    numri_studentit: "",
    programi: "",
    viti_studimit: ""
  });

// Ky funksion tani është i "stabilizuar" dhe nuk ndryshon në çdo renderim
  const fetchStudents = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/get-students");
      setStudents(res.data);
    } catch (error) {
      console.error("Gabim gjatë marrjes së të dhënave:", error);
    }
  }, []); // Këto kllapa bosh janë ato që e heqin gabimin

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]); // Tani React është i lumtur sepse funksioni vjen nga useCallback

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleEdit = (s) => {
    setIsEditing(true);
    setEditId(s.id);
    setStudentData({
      emri: s.User?.firstname || s.firstname || "",
      mbiemri: s.User?.lastname || s.lastname || "",
      email: s.User?.email || s.email || "",
      numri_studentit: s.numri_studentit || "",
      programi: s.programi || "",
      viti_studimit: s.viti_studimit || ""
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'A jeni i sigurt?',
      text: "Studenti do të fshihet nga sistemi!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Po, fshije!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Hequr 'const res =' që ESLint të mos ankohet
          await axios.delete(`http://localhost:5000/delete-student/${id}`);
          Swal.fire('Fshirë!', 'U fshi me sukses.', 'success');
          fetchStudents();
        } catch (error) {
          console.error("Gabim gjatë fshirjes:", error.message);
          Swal.fire('Gabim!', 'Problem gjatë fshirjes.', 'error');
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response; 
      if (isEditing) {
        response = await axios.put(`http://localhost:5000/update-student/${editId}`, studentData);
      } else {
        response = await axios.post("http://localhost:5000/add-student", studentData);
      }

      if (response.data && response.data.Status === "Success") {
        Swal.fire('Sukses!', 'Veprimi u krye me sukses!', 'success');
        setShowModal(false);
        setIsEditing(false);
        setEditId(null);
        setStudentData({ emri: "", mbiemri: "", email: "", numri_studentit: "", programi: "", viti_studimit: "" });
        fetchStudents();
      } else {
        // Kapim gabimet e validimit nga Backend-i
        Swal.fire('Gabim!', response.data.Message || 'Ndodhi një problem.', 'error');
      }
    } catch (error) {
      console.error("Gabim në server:", error.response?.data || error.message);
      Swal.fire('Gabim!', 'Problem në lidhjen me serverin.', 'error');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Studentët</h1>
          <button 
            onClick={() => { 
              setIsEditing(false); 
              setShowModal(true); 
              setStudentData({emri:"", mbiemri:"", email:"", numri_studentit:"", programi:"", viti_studimit:""}); 
            }} 
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold"
          >
            + Shto Student
          </button>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b font-bold">
              <tr>
                <th className="p-4">Studenti</th>
                <th className="p-4">Nr. ID</th>
                <th className="p-4 text-center">Veprime</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    {s.User ? `${s.User.firstname} ${s.User.lastname}` : `${s.firstname} ${s.lastname}`}
                  </td>
                  <td className="p-4 text-indigo-600 font-bold">{s.numri_studentit}</td>
                  <td className="p-4 text-center space-x-2">
                    <button onClick={() => handleEdit(s)} className="text-blue-600 hover:underline">Edito</button>
                    <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:underline">Fshij</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-4">{isEditing ? "Edito" : "Shto"} Student</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <input name="emri" value={studentData.emri} onChange={handleChange} placeholder="Emri" className="p-2 border rounded" required />
                <input name="mbiemri" value={studentData.mbiemri} onChange={handleChange} placeholder="Mbiemri" className="p-2 border rounded" required />
              </div>
              <input name="email" type="email" value={studentData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" required />
              <input name="numri_studentit" value={studentData.numri_studentit} onChange={handleChange} placeholder="Nr. i ID së Studentit" className="w-full p-2 border rounded" required />
              <input name="programi" value={studentData.programi} onChange={handleChange} placeholder="Programi" className="w-full p-2 border rounded" required />
              <input name="viti_studimit" type="number" value={studentData.viti_studimit} onChange={handleChange} placeholder="Viti i Studimit" className="w-full p-2 border rounded" required />
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded font-bold">Ruaj</button>
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded font-bold">Anulo</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Student;