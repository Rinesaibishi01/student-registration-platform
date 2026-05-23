import React, { useState, useEffect } from 'react';
import './RegisterCourse.css'; // Importojmë CSS-in

const RegisterCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Marrim ID-në e studentit të kyçur nga localStorage (Supozojmë se ruhet si 'userId' ose 'studentId')
  const studentId = localStorage.getItem('userId') || localStorage.getItem('studentId') || 1; // Default 1 sa për testim nëse s'ka login

  // 1. GET: Marrja e të gjitha lëndëve nga backend-i
  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/courses');
      if (!response.ok) throw new Error("Dështoi marrja e lëndëve.");
      const data = await response.json();
      setCourses(data);
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

  // 2. POST: Logjika kur studenti klikon butonin "Regjistrohu"
  const handleEnroll = async (courseId) => {
    setMessage({ text: '', type: '' }); // Fshijmë mesazhet e vjetra

    try {
      const response = await fetch('http://localhost:5000/api/enrollments/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          student_id: studentId,
          course_id: courseId
        })
      });

      const data = await response.json();

      if (response.status === 201) {
        // U regjistrua me sukses (Statusi 201 nga backend-i ynë)
        setMessage({ text: data.message, type: 'success' });
        fetchCourses(); // Rifreskojmë listën për të përditësuar vendet e lira
      } else if (response.status === 200 && data.status === 'waiting') {
        // Lënda ishte plot -> Kaloi në listë pritjeje
        setMessage({ text: data.message, type: 'warning' });
        fetchCourses();
      } else {
        // Mesazhe gabimi (P.sh: "Ju jeni të regjistruar në këtë lëndë!")
        setMessage({ text: data.message || "Ndodhi një gabim.", type: 'error' });
      }

    } catch (err) {
      console.error(err);
      setMessage({ text: "Gabim në lidhje me serverin.", type: 'error' });
    }
  };

  if (loading) return <div className="loading">Duke ngarkuar kurset...</div>;

  return (
    <div className="register-container">
      <h3 className="text-2xl font-bold mb-6">Kurset e lira për regjistrim</h3>

      {/* Shfaqja e njoftimeve apo mesazheve dinamike */}
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
              <p className="text-gray-500 text-sm">{course.pershkrimi}</p>
              
              <div className="course-meta">
                <span className="badge-kredite">Kredite: {course.kredite}</span>
                <span className="badge-prof">Profesor: {course.profesori}</span>
              </div>

              {/* Shfaqja e kapacitetit dinamik */}
              <div className="capacity-info mt-2">
                <p className="text-xs text-gray-600">
                  Vende të zëna: <strong>{course.vende_te_zëna}</strong> / {course.kapaciteti}
                </p>
                {course.vende_te_lira === 0 ? (
                  <span className="text-xs text-red-500 font-bold">⚠️ Kursi është plot (Lista e Pritjes)</span>
                ) : (
                  <span className="text-xs text-green-600 font-medium">✅ {course.vende_te_lira} vende të lira</span>
                )}
              </div>
            </div>

            <button 
              className={`btn-enroll ${course.vende_te_lira === 0 ? 'btn-waiting' : ''}`}
              onClick={() => handleEnroll(course.id)}
            >
              {course.vende_te_lira === 0 ? 'Futuni në Pritje' : '+ Regjistrohu'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisterCourse;