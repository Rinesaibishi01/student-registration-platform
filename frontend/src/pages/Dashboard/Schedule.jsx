import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/StudentSidebar';

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId") || localStorage.getItem("student_id");

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`http://localhost:5000/api/student/${userId}/schedule`);
        const data = await res.json();
        setSchedules(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Gabim gjatë marrjes së orarit:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [userId]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto ml-65 px-10 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-sm border p-8 mb-8">
            <h2 className="text-4xl font-bold text-center text-gray-800">Orari Im Akademik</h2>
          </div>

          {loading ? (
            <div className="text-center text-gray-500">Duke ngarkuar...</div>
          ) : schedules.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-sm border p-8 text-center">
              <p className="text-gray-500 text-lg">Nuk keni orar për momentin. Kontrolloni regjistrimet.</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-md border overflow-hidden">
              <div className="grid grid-cols-[1fr_1fr_1fr_2fr_1fr] bg-blue-900 text-white font-semibold text-base">
                <div className="p-6 text-center">Dita</div>
                <div className="p-6 text-center">Ora</div>
                <div className="p-6 text-center">Salla</div>
                <div className="p-6 text-center">Lënda</div>
                <div className="p-6 text-center">Statusi</div>
              </div>

              {schedules.map((item, index) => (
                <div key={`${item.id}-${index}`} className="grid grid-cols-[1fr_1fr_1fr_2fr_1fr] items-center border-b hover:bg-gray-50 transition">
                  <div className="p-6 text-center font-medium text-gray-700">{item.dita}</div>
                  <div className="p-6 text-center text-blue-700 font-bold">{item.ora_fillimit?.slice(0, 5)} - {item.ora_mbarimit?.slice(0, 5)}</div>
                  <div className="p-6 text-center text-gray-700">{item.salla}</div>
                  <div className="p-6 text-center font-semibold text-gray-800">{item.emertimi}</div>
                  <div className="p-6 flex justify-center">
                    <span className="bg-green-100 text-green-700 text-sm font-bold px-5 py-2 rounded-full">AKTIV</span>
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

export default Schedule;