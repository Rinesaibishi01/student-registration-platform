import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar'; 




const AdminWaitingList = () => {
  const [list, setList] = useState([]);

  // Bëj fetch listën kur ngarkohet faqja
  useEffect(() => {
    axios.get('http://localhost:5000/api/waitinglist')
      .then(res => setList(res.data));
  }, []);

  

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Lista e Pritjes</h1>
      {list.map(item => (
        <div key={item.id} className="border p-4 mt-2 flex justify-between">
          <span>Studenti ID: {item.student_id} - Kursi ID: {item.course_id}</span>
          <button className="bg-green-500 text-white px-4 py-1 rounded">Prano</button>
        </div>
      ))}
    </div>
  );
};
export default AdminWaitingList;