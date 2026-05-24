import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/StudentSidebar'; 
import './Schedule.css'; 

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const studentId = localStorage.getItem("studentId") || localStorage.getItem("userId") || 1;

  useEffect(() => {
    if (studentId) {
      // Korrigjuar rruga për t'u përputhur me pikën 5 në backend-in tënd
      fetch(`http://localhost:5000/api/schedule?student_id=${studentId}`)
        .then(res => res.json())
        .then(data => {
          setSchedules(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(err => {
          console.error("Gabim gjatë marrjes së orarit:", err);
          setLoading(false);
        });
    }
  }, [studentId]);

  const quickNotifications = [
    { id: 1, text: "Sistemi i orareve është përditësuar me databazën zyrtare.", type: "info" },
    { id: 2, text: "Gjithmonë kontrolloni sallën përpara se të niseni në fakultet.", type: "warning" }
  ];

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Sidebar />
        <main className="main-content">
          <div className="loading">Duke ngarkuar orarin javor...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <div className="schedule-wrapper">
          <h2>Oraret Akademike dhe Kujtesat</h2>

          <div className="schedule-container">
            <div className="schedule-col">
              <h3>Orari Im Javor (Lëndët e Regjistruara)</h3>
              
              {schedules.length === 0 ? (
                <p className="no-schedule">Nuk u gjet asnjë orar. Sigurohuni që jeni regjistruar në lëndë!</p>
              ) : (
                schedules.map((item) => (
                  <div key={item.id} className="schedule-card">
                    <div className="time-slot">
                      {item.ora_fillimit ? item.ora_fillimit.substring(0, 5) : "00:00"} - {item.ora_mbarimit ? item.ora_mbarimit.substring(0, 5) : "00:00"}
                    </div>
                    
                    <div className="schedule-details">
                      <strong>{item.name || item.emertimi}</strong>
                      <p className="room-text">🏫 Salla: {item.salla || "Pa përcaktuar"}</p>
                    </div>
                    
                    <span className="badge-day">{item.dita}</span>
                  </div>
                ))
              )}
            </div>

            <div className="notify-col">
              <h3>Kujtesa të Shpejta</h3>
              {quickNotifications.map(note => (
                <div key={note.id} className={`notify-item ${note.type === 'warning' ? 'notify-warning' : 'notify-info'}`}>
                  <p style={{ margin: 0, fontSize: '14px' }}>{note.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Schedule;