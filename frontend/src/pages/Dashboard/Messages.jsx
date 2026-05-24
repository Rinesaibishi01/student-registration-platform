import React, { useState } from 'react';
import Sidebar from '../../components/StudentSidebar'; 

const Messages = () => {
  const [contacts] = useState([
    { id: 1, name: "Prof. Arben Luli", lastMsg: "Projekti u pranua.", online: true },
    { id: 2, name: "Grupi UX Design", lastMsg: "Kur e kemi ligjëratën?", online: false },
    { id: 3, name: "Asistente Elsa", lastMsg: "Shihemi në laborator.", online: true },
  ]);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <div style={{ display: 'flex', gap: '20px', padding: '20px', height: '70vh' }}>
          
          {/* Lista e kontakteve */}
          <div style={{ flex: 1, background: '#fff', borderRadius: '15px', padding: '15px', overflowY: 'auto', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginBottom: '15px', color: '#333' }}>Bisedat</h3>
            {contacts.map(c => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#4A47E0', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{c.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>{c.name} {c.online && <span style={{ color: '#44b700', fontSize: '10px' }}>●</span>}</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>{c.lastMsg}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Dritarja e Chat-it */}
          <div style={{ flex: 2, background: '#fff', borderRadius: '15px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ padding: '15px', borderBottom: '1px solid #f0f0f0', fontWeight: 'bold', color: '#333' }}>
              Prof. Arben Luli
            </div>
            
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
              <div style={{ alignSelf: 'flex-start', background: '#f1f0f0', padding: '10px', borderRadius: '10px', marginBottom: '10px', maxWidth: '70%', color: '#333' }}>
                Përshëndetje! A keni pyetje rreth projektit?
              </div>
              <div style={{ alignSelf: 'flex-end', background: '#4A47E0', color: 'white', padding: '10px', borderRadius: '10px', marginBottom: '10px', maxWidth: '70%', marginLeft: 'auto' }}>
                Po profesor, sapo e dërgova në sistem.
              </div>
            </div>

            <div style={{ padding: '15px', borderTop: '1px solid #f0f0f0', display: 'flex', gap: '10px' }}>
              <input type="text" placeholder="Shkruaj një mesazh..." style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
              <button style={{ background: '#4A47E0', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Dërgo</button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Messages;