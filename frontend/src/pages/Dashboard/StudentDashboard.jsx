import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Sigurohu që ke instaluar axios: npm install axios
import Sidebar from '../../components/StudentSidebar'; 

const StudentDashboard = () => {
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {

const res = await axios.get(`http://localhost:5000/api/enrollments/my-courses?user_id=${userId}`);
        if (Array.isArray(res.data)) {
          setMyCourses(res.data);
        }
      } catch (err) {
        console.error("Gabim gjatë marrjes së kurseve:", err);
      }
    };
    fetchData();
  }, []);

  const handleDrop = async (enrollmentId) => {
    if (window.confirm("A jeni i sigurt që dëshironi të çregjistroheni nga ky kurs?")) {
      try {
        await axios.delete(`http://localhost:5000/api/enrollments/drop/${enrollmentId}`);
        // Përditëso listën në UI pa pasur nevojë për refresh
        setMyCourses(myCourses.filter(c => c.enrollment_id !== enrollmentId));
        alert("Çregjistrimi u bë me sukses!");
      } catch (err) {
        console.error("Gabim gjatë çregjistrimit:", err);
        alert("Gabim gjatë procesit të çregjistrimit.");
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Mirë se erdhe, Rina!</h1>
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Kurset e Mia</h2>
            
            {myCourses.length === 0 ? (
              <p className="text-gray-500">Nuk keni kurse të regjistruara në sistem.</p>
            ) : (
              myCourses.map((c) => (
                <div key={c.id} className="p-4 bg-gray-50 rounded-xl mb-3 border border-gray-100 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-lg">{c.emertimi}</p>
                    <p className="text-sm text-gray-600">
                      ID Kursi: {c.id} | Kredite: {c.kredite}
                    </p>
                    <p className="text-sm font-semibold text-blue-700">
                      Prof: {c.firstname ? `${c.firstname} ${c.lastname}` : "Nuk është caktuar"}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => handleDrop(c.enrollment_id)} 
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition font-medium"
                  >
                    Çregjistrohu
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;