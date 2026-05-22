import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentDashboard.css";

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    // Merr kurset e disponueshme
    axios.get('http://localhost:5000/api/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error("Gabim në ngarkimin e kurseve:", err));
  }, []);

  const fetchMyCourses = () => {
    axios.get('http://localhost:5000/api/enrollments/my-courses/1')
      .then(res => setMyCourses(res.data))
      .catch(err => console.error("Gabim në marrjen e kurseve:", err));
  };

  useEffect(() => {
    if (activeTab === "mycourses") fetchMyCourses();
  }, [activeTab]);

  const handleEnroll = async (course_id) => {
    try {
      const response = await axios.post('http://localhost:5000/api/enrollments/add', {
        student_id: 1,
        course_id: course_id
      });

      if (response.data.Status === "Success") {
        alert("Regjistrimi u krye me sukses!");
        fetchMyCourses(); 
      } else {
        alert("Mesazh: " + response.data.Message);
      }
    } catch (err) {
      alert("Gabim lidhjeje. Shiko konsolën F12.");
    }
  };

  // Funksion ndihmës për të gjetur emrin e kursit nga ID
  const getCourseName = (course_id) => {
    const course = courses.find(c => c.id === course_id);
    return course ? course.emertimi : "Duke u ngarkuar...";
  };

  return (
    <div className="dashboard-layout">
      <nav className="sidebar">
        <ul>
          <li onClick={() => setActiveTab("home")}>Dashboard Home</li>
          <li onClick={() => setActiveTab("register")}>Regjistrimi</li>
          <li onClick={() => setActiveTab("mycourses")}>Kurset e Mia</li>
        </ul>
      </nav>
      <main className="content">
        {activeTab === "home" && <h2>Mirë se erdhe, Student!</h2>}
        
        {activeTab === "register" && (
          <div className="table-card">
            <h2>Kurset e Hapura</h2>
            <table className="styled-table">
              <thead><tr><th>ID</th><th>Emri i Kursit</th><th>Veprim</th></tr></thead>
              <tbody>
                {courses.map(c => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.emertimi}</td>
                    <td><button className="btn-enroll" onClick={() => handleEnroll(c.id)}>Regjistrohu</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "mycourses" && (
          <div className="table-card">
            <h2>Kurset e Mia</h2>
            {myCourses.length > 0 ? (
              <table className="styled-table">
                <thead><tr><th>Emri i Kursit</th><th>Statusi</th></tr></thead>
                <tbody>
                  {myCourses.map(en => (
                    <tr key={en.id}>
                      <td>{getCourseName(en.course_id)}</td>
                      <td><span className="badge">{en.statusi}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Nuk jeni regjistruar ende në asnjë kurs.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default StudentDashboard;