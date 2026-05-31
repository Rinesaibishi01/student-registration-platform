import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/StudentSidebar'; 

const StudentDashboard = () => {
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId") || localStorage.getItem("studentId");
      if (!userId) return;

      try {
        const res = await axios.get(`http://localhost:5000/api/enrollments/my-courses?user_id=${userId}`);
        // Sigurohu që API kthen objektet me fushën 'id' (Primary Key)
        if (Array.isArray(res.data)) {
          setMyCourses(res.data);
        }
      } catch (err) {
        console.error("Gabim gjatë marrjes së kurseve:", err);
      }
    };
    fetchData();
  }, []);

  const handleDrop = async (primaryId) => {
    if (!primaryId) {
        alert("Gabim: ID e regjistrimit nuk është e vlefshme!");
        return;
    }

    if (window.confirm("A jeni i sigurt që dëshironi të çregjistroheni?")) {
        try {
            // Dërgojmë ID-në primare (Primary Key)
            await axios.delete(`http://localhost:5000/api/enrollments/delete/${primaryId}`);
            
            // Përditëso UI-në duke filtruar kursin e fshirë
            setMyCourses(prev => prev.filter(c => c.id !== primaryId));
            
            alert("Çregjistrimi u bë me sukses!");
        } catch (err) {
            console.error("Gabim:", err.response?.data || err.message);
            alert("Gabim: " + (err.response?.data?.error || "Ndodhi një problem në server"));
        }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Kurset e Mia</h1>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          {myCourses.length === 0 ? (
            <p className="text-gray-500">Nuk keni kurse të regjistruara.</p>
          ) : (
            myCourses.map((c, index) => (
              <div key={c.id || index} className="p-4 bg-gray-50 rounded-xl mb-3 border flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">{c.emertimi}</p>
                  <p className="text-sm text-gray-500">ID Regjistrimi: {c.id}</p>
                </div>
                
                <button 
                  // PËRDORIM c.id (Primary Key), JO c.course_id
                  onClick={() => handleDrop(c.id)} 
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Çregjistrohu
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;