import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    numri_studentit: "",
    programi: "",
    viti_studimit: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/students/${id}`)
      .then(res => setValues(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/students/${id}`, values)
      .then(() => {
        Swal.fire("Sukses!", "Të dhënat u përditësuan.", "success");
        navigate("/dashboard/students"); 
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Ndrysho të dhënat</h2>
        <input 
          type="text" value={values.numri_studentit} 
          className="w-full p-2 mb-3 border rounded" 
          onChange={e => setValues({...values, numri_studentit: e.target.value})}
        />
        <input 
          type="text" value={values.programi} 
          className="w-full p-2 mb-3 border rounded" 
          onChange={e => setValues({...values, programi: e.target.value})}
        />
        <input 
          type="number" value={values.viti_studimit} 
          className="w-full p-2 mb-4 border rounded" 
          onChange={e => setValues({...values, viti_studimit: e.target.value})}
        />
        <button className="w-full bg-indigo-600 text-white p-2 rounded-lg">Përditëso</button>
      </form>
    </div>
  );
}

export default EditStudent;