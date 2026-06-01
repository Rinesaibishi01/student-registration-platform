import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';

const AdminWaitingList = () => {
  const [list, setList] = useState([]);

  const fetchWaitingList = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/waiting-list');
      setList(res.data);
    } catch (err) { 
      console.error("Gabim në marrjen e listës:", err); 
    }
  };

  useEffect(() => {
    fetchWaitingList();
  }, []);

  const handleApprove = async (item) => {
    if (window.confirm("A jeni të sigurt që doni ta pranoni këtë student?")) {
      try {
        await axios.post('http://localhost:5000/api/enrollments', {
          student_id: item.student_id,
          course_id: item.course_id
        });
        
        // Fshi nga lista e pritjes
        await axios.delete(`http://localhost:5000/api/waiting-list/delete/${item.id}`);
        
        alert("Studenti u regjistrua me sukses!");
        fetchWaitingList(); 
      } catch (err) {
        console.error(err);
        alert("Gabim gjatë miratimit: " + (err.response?.data?.Error || "Kontrollo nëse studenti/kursi ekziston realisht"));
      }
    }
  };

  const handleReject = async (id) => {
    if (window.confirm("A jeni të sigurt që doni ta refuzoni këtë kërkesë?")) {
      try {
        await axios.delete(`http://localhost:5000/api/waiting-list/delete/${id}`);
        alert("Kërkesa u refuzua!");
        fetchWaitingList();
      } catch (err) {
        alert("Gabim gjatë refuzimit!");
      }
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="p-8 flex-1 ml-64">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Lista e Pritjes</h1>
        
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-4">Studenti</th>
                <th className="p-4">Kursi</th>
                <th className="p-4">Vende të lira</th>
                <th className="p-4 text-center">Veprime</th>
              </tr>
            </thead>
            <tbody>
              {list.length > 0 ? list.map(item => {
                const kapaciteti = item.Course ? item.Course.kapaciteti : 0;
                const teRegjistruar = item.Course ? (item.Course.te_regjistruarit || 0) : 0;
                const vendeLira = kapaciteti - teRegjistruar;

                return (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      {item.Student ? `${item.Student.emri} ${item.Student.mbiemri}` : `ID: ${item.student_id}`}
                    </td>
                    <td className="p-4">
                      {item.Course ? item.Course.emertimi : `ID: ${item.course_id}`}
                    </td>
                    <td className="p-4 font-bold text-blue-600">
                      {item.Course ? `${vendeLira} vende` : 'N/A'}
                    </td>
                    <td className="p-4 text-center flex gap-2 justify-center">
                      <button 
                        onClick={() => handleApprove(item)} 
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        Prano
                      </button>
                      <button 
                        onClick={() => handleReject(item.id)} 
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Refuzo
                      </button>
                    </td>
                  </tr>
                );
              }) : (
                <tr><td colSpan="4" className="text-center p-8 text-gray-500">Nuk ka studentë në pritje.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminWaitingList;