import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/StudentSidebar'; 

const RegisterCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  const userStorage = localStorage.getItem('user');
  let studentId = localStorage.getItem('userId') || localStorage.getItem('studentId');

  if (userStorage) {
    try {
      studentId = JSON.parse(userStorage).id;
    } catch (e) {
      console.error("Gabim gjatë leximit të përdoruesit", e);
    }
  }
  
  if (!studentId) studentId = 2;

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/all-courses');
      if (!response.ok) throw new Error("Dështoi marrja e lëndëve.");
      const data = await response.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setMessage({ text: "Gabim gjatë ngarkimit të lëndëve.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

const handleEnroll = async (courseId) => {
    const userStorage = localStorage.getItem('user');
    let sId = localStorage.getItem('userId');

    if (!sId && userStorage) {
        try { sId = JSON.parse(userStorage).id; } catch (e) { console.error("Gabim parsing user"); }
    }

    if (!sId) {
        alert("Gabim: Ju lutem logohuni përsëri!");
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/add-to-waiting-list', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ student_id: Number(sId), course_id: Number(courseId) })
        });

        const data = await response.json();

        if (data.Status === "Success") {
            alert("Sukses: Kërkesa juaj është dërguar për shqyrtim nga administratori!");
        } else {
            alert("Njoftim: " + (data.Error || "Dështoi dërgimi i kërkesës"));
        }
    } catch (err) {
        alert("Gabim në lidhje me serverin.");
    }
};
  
  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#F8FAFC]">
        <Sidebar />
        <main className="flex-1 p-10 ml-64 flex items-center justify-center">
          <div className="text-slate-400 font-medium">Duke ngarkuar kurset...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 p-10 ml-64">
        {/* Titulli i Faqes */}
        <div className="mb-10">
          <h5 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2">Akademike</h5>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Regjistrimi i Kurseve</h1>
          <p className="text-slate-500 mt-2">Zgjidhni lëndët e lira më poshtë për t'u regjistruar ose për t'u futur në listë pritjeje.</p>
        </div>

        {/* Shfaqja e Mesazheve të Suksesit ose Gabimit sipër kurseve */}
        {message.text && (
          <div className={`p-5 mb-6 rounded-2xl font-bold text-sm border ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border-green-100' 
              : 'bg-red-50 text-red-700 border-red-100'
          }`}>
            {message.text}
          </div>
        )}

        {/* Lista e Kurseve */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-50 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Kurset e lira për regjistrim</h2>
          
          {courses.length === 0 ? (
            <p className="text-slate-400 font-medium">Nuk ka asnjë kurs të lirë për momentin.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div className="p-6 border border-slate-100 rounded-2xl bg-[#F8FAFC]/60 flex flex-col justify-between" key={course.id}>
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-bold text-slate-900">{course.emertimi}</h4>
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-bold uppercase">
                        {course.kredite || 5} ECTS
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm mt-2 mb-4">{course.pershkrimi || "Nuk ka përshkrim."}</p>
                    <div className="flex flex-col gap-1.5 text-xs text-slate-600 font-semibold bg-white p-3 rounded-xl border border-slate-100 mb-5">
                      <div>Profesor: <span className="text-slate-900 font-bold">{course.prof_name || "Pa profesor"}</span></div>
                      <div>Kapaciteti: <span className="text-slate-900 font-bold">{course.kapaciteti || "18"}</span></div>
                    </div>
                  </div>
                  <button 
                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all active:scale-[0.98]"
                    onClick={() => handleEnroll(course.id)}
                  >
                    + Regjistrohu / Pritje
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RegisterCourse;