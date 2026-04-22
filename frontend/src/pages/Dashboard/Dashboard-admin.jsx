import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar"; // Importojmë Sidebar-in universal

function Dashboard() {
  const navigate = useNavigate();
  
  // Marrim emrin e adminit nga localStorage
  const adminName = localStorage.getItem("userName") || "Admin";

  const stats = [
    { title: "Studentë", count: "1,240", icon: "👨‍🎓" },
    { title: "Kurse", count: "48", icon: "📘" },
    { title: "Pagesa", count: "12", icon: "💰" },
    { title: "Njoftime", count: "5", icon: "🔔" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F9FAFB", fontFamily: "Inter, sans-serif" }}>
      
      {/* SIDEBAR UNIVERSAL */}
      <Sidebar />

      {/* MAIN CONTENT - shtojmë marginLeft: "240px" ose "256px" (varet nga sidebar) */}
      <main style={{ flex: 1, padding: "40px", marginLeft: "240px", overflowY: "auto" }}>
        
        {/* HEADER */}
        <div style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "32px", fontWeight: "800", color: "#111827" }}>
              Mirësevini prapë, {adminName}! 👋
            </h1>
            <p style={{ color: "#6B7280", marginTop: "5px" }}>Kjo është gjendja aktuale e sistemit Uni-Akademi.</p>
          </div>
          <div style={{ 
            background: "white", 
            padding: "10px 20px", 
            borderRadius: "12px", 
            fontWeight: "bold", 
            border: "1px solid #E5E7EB",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
          }}>
            <span style={{ color: "#4F46E5" }}>●</span> Admin Panel
          </div>
        </div>

        {/* STATS CARDS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "25px",
          marginBottom: "40px"
        }}>
          {stats.map((item, i) => (
            <div key={i} style={cardStyle}>
              <div style={{ 
                fontSize: "30px", 
                background: "#F3F4F6", 
                width: "50px", 
                height: "50px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                borderRadius: "12px",
                marginBottom: "15px" 
              }}>
                {item.icon}
              </div>
              <p style={{ color: "#6B7280", margin: "5px 0", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {item.title}
              </p>
              <h2 style={{ margin: 0, fontSize: "28px", fontWeight: "800", color: "#111827" }}>{item.count}</h2>
            </div>
          ))}
        </div>

        {/* CONTENT GRIDS */}
        <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>

          {/* CHART PLACEHOLDER */}
          <div style={{ ...cardStyle, flex: 2, minWidth: "400px" }}>
            <h3 style={{ marginBottom: "25px", fontSize: "20px", fontWeight: "700" }}>Statistikat e Regjistrimeve</h3>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "20px", height: "200px", padding: "10px" }}>
              {[60, 80, 45, 95, 70, 85].map((h, i) => (
                <div key={i} style={{
                  flex: 1,
                  height: `${h}%`,
                  background: i === 3 ? "#4F46E5" : "#E0E7FF",
                  borderRadius: "10px",
                  transition: "0.3s ease",
                  cursor: "pointer"
                }} 
                title={`${h} regjistrime`}
                />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", color: "#9CA3AF", fontSize: "13px", fontWeight: "600" }}>
              <span>Jan</span><span>Shk</span><span>Mar</span><span>Pri</span><span>Maj</span><span>Qer</span>
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div style={{ ...cardStyle, flex: 1, minWidth: "300px" }}>
            <h3 style={{ marginBottom: "25px", fontSize: "20px", fontWeight: "700" }}>Aktiviteti i Fundit</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              <div style={{ borderLeft: "4px solid #4F46E5", paddingLeft: "20px" }}>
                <strong style={{ display: "block", fontSize: "15px" }}>Mbledhje me Stafin</strong>
                <p style={{ fontSize: "13px", color: "#6B7280", margin: "5px 0" }}>Sot, 09:00 - 10:00</p>
              </div>

              <div style={{ borderLeft: "4px solid #10B981", paddingLeft: "20px" }}>
                <strong style={{ display: "block", fontSize: "15px" }}>3 Regjistrime të reja</strong>
                <p style={{ fontSize: "13px", color: "#6B7280", margin: "5px 0" }}>Para 2 orësh</p>
              </div>

              <div style={{ borderLeft: "4px solid #F59E0B", paddingLeft: "20px" }}>
                <strong style={{ display: "block", fontSize: "15px" }}>Përditësim i Kurrikulës</strong>
                <p style={{ fontSize: "13px", color: "#6B7280", margin: "5px 0" }}>Dje, 16:45</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "24px",
  border: "1px solid #E5E7EB",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.04)",
  transition: "0.3s ease",
  cursor: "default"
};

export default Dashboard;