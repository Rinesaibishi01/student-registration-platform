import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/StudentSidebar'; 

const Messages = () => {
  const [njoftimet, setNjoftimet] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNjoftimet = async () => {
      try {
        const userId = localStorage.getItem("userId"); 
        const res = await axios.get(`http://localhost:5000/api/student/${userId}/announcements`);
        
        console.log("Rezultati:", res.data);
        setNjoftimet(res.data);
      } catch (err) {
        console.error("Gabim gjatë fetch-it:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNjoftimet();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 flex flex-col items-center p-8 overflow-y-auto">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Mesazhet e mia</h1>

          {loading ? (
            <p>Duke ngarkuar...</p>
          ) : njoftimet.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
              <p className="text-gray-500">Nuk keni asnjë njoftim të ri nga profesorët.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {njoftimet.map((n, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 transition-all hover:shadow-md">
                  <h3 className="font-bold text-lg text-blue-900">{n.titulli || n.title}</h3>
                  <p className="text-gray-700 mt-2">{n.permbajtja || n.content}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {n.kursi}
                    </span>
                    <span className="text-xs text-gray-400">
                      {n.data_postimit ? new Date(n.data_postimit).toLocaleDateString() : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Messages;