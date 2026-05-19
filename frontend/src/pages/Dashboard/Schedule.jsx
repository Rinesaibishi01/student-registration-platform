import React from 'react';

const Schedule = ({ myCourses }) => {
  // Njoftime provizore
  const notifications = [
    { id: 1, text: "Ligjërata e UX Design fillon pas 15 minutave.", type: "warning" },
    { id: 2, text: "Keni një detyrë të re në Web Development.", type: "info" }
  ];

  return (
    <div style={{ padding: '20px', width: '100%' }}>
      <h2>Oraret dhe Njoftimet</h2>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        
        {/* Kolona e Orareve */}
        <div style={{ flex: 2 }}>
          <h3>Oraret e Kurseve</h3>
          {myCourses.map((course, index) => (
            <div key={index} className="schedule-card" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
              <div className="time" style={{ fontWeight: 'bold', color: '#4A47E0' }}>10:00 - 12:00</div>
              <div>
                <strong>{course.title}</strong>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Salla 102 - Ligjëratë</p>
              </div>
              <span className="badge" style={{ background: '#E0E0FF', color: '#4A47E0', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' }}>Today</span>
            </div>
          ))}
        </div>

        {/* Kolona e Njoftimeve */}
        <div style={{ flex: 1 }}>
          <h3>Njoftimet</h3>
          {notifications.map(note => (
            <div key={note.id} style={{ padding: '15px', background: note.type === 'warning' ? '#FFF4E5' : '#E5F6FD', borderRadius: '8px', marginBottom: '10px', borderLeft: `5px solid ${note.type === 'warning' ? '#FFA117' : '#03A9F4'}` }}>
              <p style={{ margin: 0, fontSize: '14px' }}>{note.text}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Schedule;