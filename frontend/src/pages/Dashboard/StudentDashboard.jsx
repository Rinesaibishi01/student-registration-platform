import React, { useState } from "react";
import "./StudentDashboard.css";
import RegisterCourse from './RegisterCourse';
import Schedule from './Schedule';
import Messages from './Messages'; // Importimi i faqes së re

function StudentDashboard() {
  const emri = localStorage.getItem("userName") || "Alyssa";

  const [activeTab, setActiveTab] = useState("dashboard");

  const [myCourses, setMyCourses] = useState([
    { id: 1, title: "UX Design Foundations", description: "UI/UX Basics" },
  ]);

  const [courses, setCourses] = useState([
    { id: 2, title: "Web Development", description: "HTML, CSS, JS" },
    { id: 3, title: "Data Structures", description: "Algorithms & DS" },
    { id: 4, title: "Database Systems", description: "SQL & Design" },
  ]);

  const enroll = (course) => {
    const exists = myCourses.find((c) => c.id === course.id);
    if (exists) {
      alert("Je i regjistruar në këtë kurs!");
      return;
    }
    setMyCourses([...myCourses, course]);
    alert("U regjistruat me sukses!");
    setActiveTab("kurset");
  };

  const unenroll = (id) => {
    if (window.confirm("A jeni i sigurt që dëshironi të fshini këtë kurs?")) {
      const updated = myCourses.filter((course) => course.id !== id);
      setMyCourses(updated);
    }
  };

  const deleteFromAvailable = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <div className="container">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">Caplen</h2>
        <ul className="menu">
          <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>Dashboard</li>
          <li className={activeTab === "kurset" ? "active" : ""} onClick={() => setActiveTab("kurset")}>Kurset e mia</li>
          <li className={activeTab === "regjistro" ? "active" : ""} onClick={() => setActiveTab("regjistro")}>Regjistro kursin</li>
          <li className={activeTab === "oraret" ? "active" : ""} onClick={() => setActiveTab("oraret")}>Oraret</li>
          
          {/* SHTUAR: Aktivizimi i Mesazheve */}
          <li className={activeTab === "mesazhet" ? "active" : ""} onClick={() => setActiveTab("mesazhet")}>Mesazhet</li>
        </ul>
        <div className="logout">Log out</div>
      </aside>

      {/* MAIN */}
      <div className="main">
        <div className="topbar">
          <input type="text" placeholder="Kërko për kurse.." className="search" />
          <div className="icons">🔔 👤</div>
        </div>

        <div className="hero">
          <div className="hero-text">
            <p>Hi, {emri}!</p>
            <h1>You have {myCourses.length} active courses</h1>
          </div>
        </div>

        <div className="content">
          
          {/* 1. PAMJA DASHBOARD */}
          {activeTab === "dashboard" && (
            <>
              <div className="left">
                <h3>Statistics</h3>
                <div className="stats">
                  <div className="stat-box"><h2>{myCourses.length}</h2><p>Kurse të regjistruara</p></div>
                  <div className="stat-box"><h2>3</h2><p>Kurse Aktive</p></div>
                  <div className="stat-box"><h2>8.5</h2><p>Pikët e Fitura</p></div>
                </div>
                <p style={{marginTop: '20px', color: '#666'}}>Mirëseerdhët në panelin tuaj të kontrollit.</p>
              </div>

              <div className="right">
                <div className="calendar"><h3>Calendar</h3><input type="date" /></div>
                <div className="upcoming">
                  <h4>Orari i shpejtë</h4>
                  {myCourses.map((course, index) => (
                    <div className="schedule-card" key={index}>
                      <div className="time">10:00 - 12:00</div>
                      <div><strong>{course.title}</strong><p>Lecture</p></div>
                      <span className="badge">Today</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* 2. PAMJA KURSET E MIA */}
          {activeTab === "kurset" && (
            <div className="left" style={{ width: "100%" }}>
              <h3>Kurset e mia</h3>
              <div className="course-grid">
                {myCourses.length > 0 ? myCourses.map((course) => (
                  <div className="course-card" key={course.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h4>{course.title}</h4>
                      <button 
                        onClick={() => unenroll(course.id)} 
                        style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        ✕
                      </button>
                    </div>
                    <p>{course.description}</p>
                    <div className="course-footer">
                      <span>Progress</span>
                      <div className="progress-bar"><div className="progress" style={{ width: "60%" }}></div></div>
                    </div>
                  </div>
                )) : <p>Nuk keni kurse të regjistruara.</p>}
              </div>
            </div>
          )}

          {/* 3. PAMJA REGJISTRO KURSIN */}
          {activeTab === "regjistro" && (
            <RegisterCourse 
              availableCourses={courses} 
              onEnroll={enroll} 
              onDelete={deleteFromAvailable}
            />
          )}

          {/* 4. PAMJA ORARET */}
          {activeTab === "oraret" && (
            <Schedule myCourses={myCourses} />
          )}

          {/* 5. SHTUAR: PAMJA MESAZHET */}
          {activeTab === "mesazhet" && (
            <Messages />
          )}

        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;