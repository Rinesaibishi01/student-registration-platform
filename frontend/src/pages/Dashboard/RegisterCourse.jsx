import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/StudentSidebar'; 
import './RegisterCourse.css'; 

const RegisterCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  const studentId = localStorage.getItem('userId') || localStorage.getItem('studentId') || 1;

  // Korrigjuar rruga për t'u përputhur me pikën 2 në backend (`/api/all-courses`)
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

  // Korrigjuar rruga e POST dhe parametrat (studentId, courseId) për t'u përputhur me backend-in
  const handleEnroll = async (courseId) => {
    setMessage({ text: '', type: '' }); 

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentId: studentId, // Përputhet me backend-in tënd { studentId, courseId }
          courseId: courseId
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: data.Message || "Veprimi u krye me sukses!", type: 'success' });
        fetchCourses(); // Rifreskojmë listën
      } else {
        setMessage({ text: data.error || "Ndodhi një gabim gjatë regjistrimit.", type: 'error' });
      }

    } catch (err) {
      console.error(err);
      setMessage({ text: "Gabim në lidhje met serverin.", type: 'error' });
    }
  };

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Sidebar />
        <main className="main-content">
          <div className="loading">Duke ngarkuar kurset...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <div className="register-container">
          <h3 className="text-2xl font-bold mb-6">Kurset e lira për regjistrim</h3>

          {message.text && (
            <div className={`alert-message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="course-list">
            {courses.map((course) => (
              <div className="course-item" key={course.id}>
                <div className="course-details">
                  <h4 className="text-lg font-semibold">{course.emertimi}</h4>
                  <p className="text-gray-500 text-sm">{course.pershkrimi || "Nuk ka përshkrim."}</p>
                  
                  <div className="course-meta">
                    <span className="badge-kredite">Kredite: {course.kredite}</span>
                    <span className="badge-prof">Profesor: {course.prof_name || "Pa profesor"}</span>
                  </div>

                  <div className="capacity-info mt-2">
                    <p className="text-xs text-gray-600">
                      Kapaciteti i kursit: <strong>{course.capacity || course.kapaciteti} vlerë</strong>
                    </p>
                  </div>
                </div>

                <button 
                  className="btn-enroll"
                  onClick={() => handleEnroll(course.id)}
                >
                  + Regjistrohu / Pritje
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterCourse;