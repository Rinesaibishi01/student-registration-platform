import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../../components/Sidebar";
import Swal from 'sweetalert2';
import axios from "axios";

function DashboardTeachers() {
  const [teacher, setTeacher] = useState({
    emri: "", mbiemri: "", email: "", telefoni: "", adresa: "", universiteti: "", grada: ""
  });

  const [teachersList, setTeachersList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Përdorim useCallback që useEffect të mos ankohet
  const fetchTeachers = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/get-teachers");
      setTeachersList(res.data);
    } catch (error) {
      console.error("Gabim gjatë marrjes së profesorëve:", error);
    }
  }, []);

    useEffect(() => {
    const getData = async () => {
      await fetchTeachers();
    };
    getData();
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
        Swal.fire('Sukses!', isEditing ? 'U përditësua me sukses!' : 'U regjistrua me sukses!', 'success');
        setTeacher({ emri: "", mbiemri: "", email: "", telefoni: "", adresa: "", universiteti: "", grada: "" });
        setIsEditing(false);
        setEditId(null);
        fetchTeachers();
      }
    } catch (error) {
      console.error(error); // Përdorim variablin 'error' që të mos kemi vija të kuqe
      Swal.fire('Gabim!', 'Ndodhi një problem në server.', 'error');
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'A jeni i sigurt?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Po, fshije!',
      cancelButtonText: 'Anulo'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/delete-teacher/${id}`);
          Swal.fire('Fshirë!', 'Profesori u fshi.', 'success');
          fetchTeachers();
        } catch (error) {
          console.error(error);
          Swal.fire('Gabim!', 'Problem gjatë fshirjes.', 'error');
        }
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8">
          <div className="p-8 border-b border-gray-50 bg-gray-50/50">
            <h2 className="text-2xl font-black text-gray-800">
              {isEditing ? "Edito Profesorin" : "Shto Profesor të Ri"}
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <input name="emri" value={teacher.emri} onChange={handleChange} placeholder="Emri" className="border p-4 rounded-2xl w-full outline-none focus:border-indigo-500" required />
              <input name="mbiemri" value={teacher.mbiemri} onChange={handleChange} placeholder="Mbiemri" className="border p-4 rounded-2xl w-full outline-none focus:border-indigo-500" required />
              <input name="email" value={teacher.email} onChange={handleChange} placeholder="Email" type="email" className="border p-4 rounded-2xl w-full outline-none focus:border-indigo-500" required />
              <input name="telefoni" value={teacher.telefoni} onChange={handleChange} placeholder="Telefoni" className="border p-4 rounded-2xl w-full outline-none focus:border-indigo-500" />
              <input name="universiteti" value={teacher.universiteti} onChange={handleChange} placeholder="Universiteti" className="border p-4 rounded-2xl w-full outline-none focus:border-indigo-500" />
              <input name="grada" value={teacher.grada} onChange={handleChange} placeholder="Grada (Departamenti)" className="border p-4 rounded-2xl w-full outline-none focus:border-indigo-500" />
              <div className="col-span-2">
                <textarea name="adresa" value={teacher.adresa} onChange={handleChange} placeholder="Adresa e Banimit" className="border p-4 rounded-2xl w-full outline-none focus:border-indigo-500" rows="2"></textarea>
              </div>
            </div>
            <div className="flex gap-4">
              <button type="submit" className={`flex-1 py-4 rounded-2xl text-white font-bold transition-all ${isEditing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
                {isEditing ? "Ruaj Ndryshimet" : "Regjistro Profesorin"}
              </button>
              {isEditing && (
                <button type="button" onClick={() => { setIsEditing(false); setTeacher({emri:"", mbiemri:"", email:"", telefoni:"", adresa:"", universiteti:"", grada:""}); }} className="px-8 py-4 rounded-2xl bg-gray-200 font-bold hover:bg-gray-300 transition-all">Anulo</button>
              )}
            </div>
          </form>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-black">
                <tr>
                  <th className="px-8 py-4">Profesor</th>
                  <th className="px-8 py-4">Departamenti</th>
                  <th className="px-8 py-4">Universiteti</th>
                  <th className="px-8 py-4 text-right">Aksionet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {teachersList.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50/50 transition-all">
                    <td className="px-8 py-4 font-bold text-gray-700">{t.firstname} {t.lastname}</td>
                    <td className="px-8 py-4 text-gray-500">{t.departamenti || '---'}</td>
                    <td className="px-8 py-4 text-gray-500">{t.universiteti || '---'}</td>
                    <td className="px-8 py-4 text-right">
                      <button onClick={() => handleEdit(t)} className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-xl hover:bg-yellow-600 hover:text-white transition-all">Edito</button>
                      <button onClick={() => handleDelete(t.id)} className="bg-red-100 text-red-600 px-4 py-2 rounded-xl hover:bg-red-600 hover:text-white transition-all">Fshij</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardTeachers;