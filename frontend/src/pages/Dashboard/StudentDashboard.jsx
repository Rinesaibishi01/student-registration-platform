import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [data, setData] = useState({ myEnrollments: [], waitingList: [], announcements: [] });
  const [message, setMessage] = useState({ text: '', type: '' });
  const studentId = localStorage.getItem("studentId") || localStorage.getItem("userId") || 1; // E sigurojmë një ID

  // Funksioni për të marrë të dhënat nga Dashboard API
  const fetchDashboardData = () => {
    if (studentId) {
        fetch(`http://localhost:5000/api/student-dashboard/${studentId}`)
        .then(res => res.json())
        .then(result => setData(result))
        .catch(err => console.error("Gabim gjatë marrjes së të dhënave:", err));
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [studentId]);

  // Funksioni për çregjistrim (Drop Course)
  const handleDropCourse = async (enrollmentId) => {
    if (!window.confirm("A jeni të sigurt që dëshironi të çregjistroheni nga kjo lëndë?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/enrollments/drop/${enrollmentId}`, {
        method: 'DELETE'
      });
      const resData = await response.json();

      if (response.ok) {
        setMessage({ text: resData.message, type: 'success' });
        fetchDashboardData(); // Rifreskojmë të dhënat e dashboard-it në kohë reale
      } else {
        setMessage({ text: resData.message || "Gabim gjatë çregjistrimit.", type: 'error' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: "Gabim në lidhje me serveri.", type: 'error' });
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

        {/* Seksoni i Statistikave të Shpejta */}
        <div className="stats-grid">
           <div className="card-stat">
             <h3>Kurse Aktive</h3>
             <p>{data.myEnrollments.length}</p>
           </div>
           <div className="card-stat">
             <h3>Në Listë Pritjeje</h3>
             <p>{data.waitingList.length}</p>
           </div>
           <div className="card-stat">
             <h3>Njoftime</h3>
             <p>{data.announcements.length}</p>
           </div>
        </div>

        <div className="dashboard-sections">
          
          {/* PJESA 1: KURSET E MIA */}
          <div className="section-block">
            <h2>Kurset e Mia të Regjistruara</h2>
            {data.myEnrollments.length === 0 ? (
              <p className="no-data">Nuk jeni regjistruar në asnjë kurs ende.</p>
            ) : (
              <div className="dashboard-list">
                {data.myEnrollments.map(e => (
                  <div className="list-item" key={e.id}>
                    <div>
                      <span className="item-title">{e.Course?.emertimi}</span>
                      <span className="item-sub">Kredite: {e.Course?.kredite}</span>
                    </div>
                    <button 
                      className="btn-drop" 
                      onClick={() => handleDropCourse(e.id)}
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
            {data.waitingList.length === 0 ? (
              <p className="no-data">Nuk keni asnjë lëndë në pritje.</p>
            ) : (
              <div className="dashboard-list">
                {data.waitingList.map(w => (
                  <div className="list-item waiting-item" key={w.id}>
                    <div>
                      <span className="item-title">{w.Course?.emertimi}</span>
                      <span className="item-sub">Në pritje që nga: {new Date(w.data_aplikimit).toLocaleDateString()}</span>
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
            {data.announcements.length === 0 ? (
              <p className="no-data">Nuk ka asnjë njoftim për lëndët tuaja.</p>
            ) : (
              <div className="announcements-list">
                {data.announcements.map(a => (
                  <div className="announcement-card" key={a.id}>
                    <h4>{a.titulli || "Njoftim nga Fakulteti"}</h4>
                    <p>{a.permbajtja}</p>
                    <span className="announcement-date">
                      {a.createdAt ? new Date(a.createdAt).toLocaleDateString() : ""}
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