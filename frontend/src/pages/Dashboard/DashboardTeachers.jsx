import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../../components/Sidebar";
import Swal from 'sweetalert2';
import axios from "axios";

function DashboardTeachers() {
  const [teacher, setTeacher] = useState({
    emri: "", mbiemri: "", email: "", telefoni: "", adresa: "", universiteti: "", grada: ""
  });

  const [teachersList, setTeachersList] = useState([]);
  const [departments, setDepartments] = useState([]); 
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchTeachers = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/get-teachers");
      setTeachersList(res.data);
    } catch (error) { console.error(error); }
  }, []);

  useEffect(() => {
    fetchTeachers();
    axios.get("http://localhost:5000/api/departments")
        .then(res => setDepartments(res.data))
        .catch(err => console.error(err));
  }, [fetchTeachers]);

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleEdit = (t) => {
    setIsEditing(true);
    setEditId(t.id);
    setTeacher({
      emri: t.firstname || "",
      mbiemri: t.lastname || "",
      email: t.email || "",
      telefoni: t.telefoni || "",
      adresa: t.adresa || "",
      universiteti: t.universiteti || "",
      grada: t.departamenti || ""
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isEditing) {
        res = await axios.put(`http://localhost:5000/update-teacher/${editId}`, teacher);
      } else {
        res = await axios.post("http://localhost:5000/add-teacher", teacher);
      }

      if (res.data.Status === "Success") {
        Swal.fire('Sukses!', 'Veprimi u krye me sukses!', 'success');
        setTeacher({ emri: "", mbiemri: "", email: "", telefoni: "", adresa: "", universiteti: "", grada: "" });
        setIsEditing(false);
        fetchTeachers();
      }
    } catch (error) {
      Swal.fire('Gabim!', 'Problem në server.', 'error');
    }
  };

  const handleDelete = (id) => {
    Swal.fire({ title: 'A jeni i sigurt?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Po' })
    .then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/delete-teacher/${id}`);
        fetchTeachers();
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-black mb-6">{isEditing ? "Edito Profesorin" : "Shto Profesor të Ri"}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <input name="emri" value={teacher.emri} onChange={handleChange} placeholder="Emri" className="border p-4 rounded-2xl w-full" required />
            <input name="mbiemri" value={teacher.mbiemri} onChange={handleChange} placeholder="Mbiemri" className="border p-4 rounded-2xl w-full" required />
            <input name="email" value={teacher.email} onChange={handleChange} placeholder="Email" type="email" className="border p-4 rounded-2xl w-full" required />
            <input name="telefoni" value={teacher.telefoni} onChange={handleChange} placeholder="Telefoni" className="border p-4 rounded-2xl w-full" />
            <input name="universiteti" value={teacher.universiteti} onChange={handleChange} placeholder="Universiteti" className="border p-4 rounded-2xl w-full" />
            
            {/* DROPDOWN DINAMIK */}
            <select name="grada" value={teacher.grada} onChange={handleChange} className="border p-4 rounded-2xl w-full bg-white" required>
                <option value="">Zgjidh Departamentin</option>
                {departments.map((dep) => (
                    <option key={dep.id} value={dep.emri_departamentit}>{dep.emri_departamentit}</option>
                ))}
            </select>

            <textarea name="adresa" value={teacher.adresa} onChange={handleChange} placeholder="Adresa" className="col-span-2 border p-4 rounded-2xl w-full" rows="2"></textarea>
            
            <button type="submit" className="col-span-2 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700">
              {isEditing ? "Ruaj Ndryshimet" : "Regjistro Profesorin"}
            </button>
          </form>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 uppercase text-xs font-black">
              <tr><th className="px-8 py-4">Profesor</th><th className="px-8 py-4">Departamenti</th><th className="px-8 py-4 text-right">Aksionet</th></tr>
            </thead>
            <tbody className="divide-y">
              {teachersList.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-8 py-4 font-bold">{t.firstname} {t.lastname}</td>
                  <td className="px-8 py-4">{t.departamenti || '---'}</td>
                  <td className="px-8 py-4 text-right">
                    <button onClick={() => handleEdit(t)} className="text-blue-600 mr-4">Edito</button>
                    <button onClick={() => handleDelete(t.id)} className="text-red-600">Fshij</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default DashboardTeachers;