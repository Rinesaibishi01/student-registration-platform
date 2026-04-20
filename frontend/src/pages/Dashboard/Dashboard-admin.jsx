import React from "react";
import { Link, useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();

  const stats = [
    { title: "Studentë", count: "1,240", icon: "👨‍🎓" },
    { title: "Kurse", count: "48", icon: "📘" },
    { title: "Pagesa", count: "12", icon: "💰" },
    { title: "Njoftime", count: "5", icon: "🔔" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{ display: "flex", height: "100vh", background: "#F9FAFB", fontFamily: "Inter, sans-serif" }}>
      
      {/* SIDEBAR */}
      <aside style={{
        width: "240px",
        background: "#111827",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column"
      }}>
        <h2 style={{ marginBottom: "30px", fontWeight: "bold" }}>Akademi</h2>

        {/* DASHBOARD LINK */}
        <Link
  to="/dashboard-admin"  // <--- NDRYSHO KËTË
  style={isActive("/dashboard-admin") ? activeLink : linkStyle} // <--- DHE KËTË
>
  🏠 Dashboard
</Link>
        

        <Link 
          to="/dashboard/students" 
          style={isActive("/dashboard/students") ? activeLink : linkStyle}
        >
          👨‍🎓 Studentët
        </Link>

        <Link to="#" style={linkStyle}>
          📘 Kurset
        </Link>

        <button
          onClick={() => { localStorage.clear(); window.location.href = "/"; }}
          style={logoutBtn}
        >
          ⏻ Dalja
        </button>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, padding: "30px", overflowY: "auto" }}>
        
        {/* HEADER */}
        <div style={{ marginBottom: "30px" }}>
          <h1 style={{ margin: 0 }}>Dashboard</h1>
          <p style={{ color: "#6B7280" }}>Përmbledhje e sistemit</p>
        </div>

        {/* STATS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "30px"
        }}>
          {stats.map((item, i) => (
            <div key={i} style={cardStyle}>
              <div style={{ fontSize: "22px" }}>{item.icon}</div>
              <p style={{ color: "#9CA3AF", margin: "5px 0" }}>{item.title}</p>
              <h2 style={{ margin: 0 }}>{item.count}</h2>
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

          {/* CHART */}
          <div style={{ ...cardStyle, flex: 2, minWidth: "300px" }}>
            <h3 style={{ marginBottom: "20px" }}>Regjistrimet</h3>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", height: "150px" }}>
              {[60, 80, 40, 90].map((h, i) => (
                <div key={i} style={{
                  flex: 1,
                  height: `${h}%`,
                  background: "#4F46E5",
                  borderRadius: "6px"
                }} />
              ))}
            </div>
          </div>

          {/* ACTIVITY */}
          <div style={{ ...cardStyle, flex: 1, minWidth: "250px" }}>
            <h3>Aktivitetet</h3>

            <div style={{ marginTop: "15px" }}>
              <div style={{ marginBottom: "10px" }}>
                <strong>Mbledhje</strong>
                <p style={{ fontSize: "12px", color: "#6B7280" }}>09:00 - 10:00</p>
              </div>

              <div>
                <strong>Regjistrim i ri</strong>
                <p style={{ fontSize: "12px", color: "#6B7280" }}>10:30</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

/* STYLES */




const linkStyle = {
  padding: "10px",
  borderRadius: "8px",
  color: "#9CA3AF",
  textDecoration: "none",
  marginBottom: "10px",
  display: "block"
};

const activeLink = {
  ...linkStyle,
  background: "#4F46E5",
  color: "white",
  fontWeight: "bold"
};


const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid #E5E7EB",
  transition: "0.3s"
};

const logoutBtn = {
  marginTop: "auto",
  padding: "10px",
  background: "#EF4444",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer"
};

export default Dashboard;