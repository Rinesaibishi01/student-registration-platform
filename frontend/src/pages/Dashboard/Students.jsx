import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Students() {
  const [students, setStudents] = useState([]);

  const fetchStudents = () => {
    axios.get("http://localhost:5000/students")
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'A jeni i sigurt?',
      text: "Ky student do të fshihet nga sistemi!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Po, fshije!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/students/${id}`)
          .then(() => {
            Swal.fire('Fshirë!', 'Studenti u hoq me sukses.', 'success');
            fetchStudents();
          });
      }
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Menaxhimi i Studentëve</h2>
        <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          + Shto të ri
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-bold text-gray-600">ID</th>
              <th className="p-4 font-bold text-gray-600">Programi</th>
              <th className="p-4 font-bold text-gray-600">Viti</th>
              <th className="p-4 font-bold text-gray-600 text-right">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 text-indigo-600 font-bold">#{s.numri_studentit}</td>
                <td className="p-4">{s.programi}</td>
                <td className="p-4 text-center">
                   <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">Viti {s.viti_studimit}</span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <Link to={`/edit/${s.id}`} className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded hover:bg-indigo-600 hover:text-white transition">
                    Edito
                  </Link>
                  <button onClick={() => handleDelete(s.id)} className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition">
                    Fshij
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;