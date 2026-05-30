import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';

const AdminDepartments = () => {
  const [deps, setDeps] = useState([]);
  const [formData, setFormData] = useState({ emri_departamentit: '', shkurtesa: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchDeps = () => {
    axios.get('http://localhost:5000/api/departments')
      .then(res => setDeps(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchDeps(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.emri_departamentit || !formData.shkurtesa) return alert("Plotësoni të gjitha fushat!");

    try {
        if (isEditing) {
            await axios.put(`http://localhost:5000/api/departments/update/${editId}`, formData);
            alert("U përditësua!");
            setIsEditing(false);
        } else {
            await axios.post('http://localhost:5000/api/departments/add', formData);
            alert("U shtua!");
        }
        setFormData({ emri_departamentit: '', shkurtesa: '' });
        fetchDeps();
    } catch (err) { alert("Gabim në server"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Fshini departamentin?")) {
        await axios.delete(`http://localhost:5000/api/departments/delete/${id}`);
        fetchDeps();
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="p-8 flex-1 ml-64">
        <h1 className="text-3xl font-bold mb-8 text-center">Menaxhimi i Departamenteve</h1>
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white shadow-lg rounded-2xl flex justify-center gap-4">
            <input placeholder="Emri" value={formData.emri_departamentit} onChange={(e) => setFormData({...formData, emri_departamentit: e.target.value})} className="border p-3 rounded-lg" required />
            <input placeholder="Shkurtesa" value={formData.shkurtesa} onChange={(e) => setFormData({...formData, shkurtesa: e.target.value})} className="border p-3 rounded-lg" required />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">{isEditing ? 'Ruaj' : 'Shto'}</button>
        </form>
        <table className="w-full bg-white shadow-lg rounded-2xl">
            <thead className="bg-gray-800 text-white"><tr><th className="p-4">Emri</th><th className="p-4">Shkurtesa</th><th className="p-4">Veprime</th></tr></thead>
            <tbody>
                {deps.map(d => (
                    <tr key={d.id} className="border-b text-center">
                        <td className="p-4">{d.emri_departamentit}</td>
                        <td className="p-4">{d.shkurtesa}</td>
                        <td className="p-4">
                            <button onClick={() => { setIsEditing(true); setEditId(d.id); setFormData(d); }} className="text-blue-600 mr-4">Edit</button>
                            <button onClick={() => handleDelete(d.id)} className="text-red-600">Fshi</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminDepartments;