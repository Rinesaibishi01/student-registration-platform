import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/StudentSidebar'; 
import './StudentDashboard.css';

const StudentDashboard = () => {
  // Përshtatur me strukturën që kthen backend-i yt (statistikat direkte)
  const [stats, setStats] = useState({ active: 0, waiting: 0, credits: 0 });
  const [myCourses, setMyCourses] = useState([]);
  const [waitingList, setWaitingList] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const studentId = localStorage.getItem("studentId") || localStorage.getItem("userId") || 1;

  const fetchDashboardData = async () => {
    if (!studentId) return;
    try {
      // 1. Merr statistikat e shpejta
      const resStats = await fetch(`http://localhost:5000/api/dashboard?student_id=${studentId}`);
      const dataStats = await resStats.json();
      setStats(dataStats || { active: 0, waiting: 0, credits: 0 });

      // 2. Merr kurset e mia
      const resCourses = await fetch(`http://localhost:5000/api/my-courses?student_id=${studentId}`);
      const dataCourses = await resCourses.json();
      setMyCourses(Array.isArray(dataCourses) ? dataCourses : []);

      // 3. Merr listën e pritjes
      const resWaiting = await fetch(`http://localhost:5000/api/waiting-list?student_id=${studentId}`);
      const dataWaiting = await resWaiting.json();
      setWaitingList(Array.isArray(dataWaiting) ? dataWaiting : []);

      // 4. Merr njoftimet
      const resAnnouncements = await fetch(`http://localhost:5000/api/announcements?student_id=${studentId}`);
      const dataAnnouncements = await resAnnouncements.json();
      setAnnouncements(Array.isArray(dataAnnouncements) ? dataAnnouncements : []);

    } catch (err) {
      console.error("Gabim gjatë marrjes së të dhënave:", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [studentId]);

  const handleDropCourse = async (courseId) => {
    if (!window.confirm("A jeni të sigurt që dëshironi të çregjistroheni nga kjo lëndë?")) return;

    try {
      // Ndryshuar për t'u përshtatur me fshirjen e thjeshtë sipas courseId dhe studentId nëse s'ke rrugë specifike
      const response = await fetch(`http://localhost:5000/api/enrollments/drop/${courseId}`, {
        method: 'DELETE'
      });
      const resData = await response.json();

      if (response.ok) {
        setMessage({ text: resData.message || "U çregjistruat me sukses!", type: 'success' });
        fetchDashboardData(); 
      } else {
        setMessage({ text: resData.message || "Gabim gjatë çregjistrimit.", type: 'error' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: "Gabim në lidhje me serverin.", type: 'error' });
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <h1>Mirë se erdhe në Panelin tënd!</h1>
        
        {message.text && (
          <div className={`alert-message ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Seksioni i Statistikave të Shpejta */}
        <div className="stats-grid">
           <div className="card-stat">
             <h3>Kurse Aktive</h3>
             <p>{stats.active || 0}</p>
           </div>
           <div className="card-stat">
             <h3>Në Listë Pritjeje</h3>
             <p>{stats.waiting || 0}</p>
           </div>
           <div className="card-stat">
             <h3>Kredite të Grumbulluara</h3>
             <p>{stats.credits || 0}</p>
           </div>
        </div>

        <div className="dashboard-sections">
          
          {/* PJESA 1: KURSET E MIA */}
          <div className="section-block">
            <h2>Kurset e Mia të Regjistruara</h2>
            {myCourses.length === 0 ? (
              <p className="no-data">Nuk jeni regjistruar në asnjë kurs ende.</p>
            ) : (
              <div className="dashboard-list">
                {myCourses.map(course => (
                  <div className="list-item" key={course.id}>
                    <div>
                      <span className="item-title">{course.emertimi}</span>
                      <span className="item-sub">Kredite: {course.kredite} | Kodi: {course.kodi}</span>
                    </div>
                    <button 
                      className="btn-drop" 
                      onClick={() => handleDropCourse(course.id)}
                    >
                      Çregjistrohu (Drop)
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PJESA 2: LISTA E PRITJES */}
          <div className="section-block">
            <h2>Lëndët në Listën e Pritjes (Waiting List)</h2>
            {waitingList.length === 0 ? (
              <p className="no-data">Nuk keni asnjë lëndë në pritje.</p>
            ) : (
              <div className="dashboard-list">
                {waitingList.map(w => (
                  <div className="list-item waiting-item" key={w.id}>
                    <div>
                      <span className="item-title">{w.emertimi}</span>
                      <span className="item-sub">Kredite: {w.kredite}</span>
                    </div>
                    <span className="badge-waiting-status">Në Pritje</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PJESA 3: NJOFTIMET E FUNDIT */}
          <div className="section-block announcements-section">
            <h2>🔔 Njoftimet e Fundit</h2>
            {announcements.length === 0 ? (
              <p className="no-data">Nuk ka asnjë njoftim për lëndët tuaja.</p>
            ) : (
              <div className="announcements-list">
                {announcements.map(a => (
                  <div className="announcement-card" key={a.id}>
                    <h4>{a.titulli || "Njoftim i ri"}</h4>
                    <p>{a.permbajtja}</p>
                    <span className="announcement-date">
                      {a.data_publikimit ? new Date(a.data_publikimit).toLocaleDateString() : ""}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;