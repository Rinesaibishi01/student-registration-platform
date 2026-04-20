import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function DashboardStudents() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    numri_studentit: "",
    programi: "",
    viti_studimit: ""
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get("http://localhost:5000/students")
      .then(res => {
        if (Array.isArray(res.data)) setStudents(res.data);
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("A jeni i sigurt?")) {
axios.delete(`http://localhost:5000/delete-student/${id}`)
        .then(() => {
          setStudents(students.filter(s => s.id !== id));
        })
        .catch(err => console.log(err));
    }
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/add-student", newStudent)
      .then(() => {
        setShowModal(false);
        fetchStudents();
        setNewStudent({ numri_studentit: "", programi: "", viti_studimit: "" });
      })
      .catch(err => console.log(err));
  };

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

      <Link 
  to="/dashboard-admin"  
  style={isActive("/dashboard-admin") ? activeLink : linkStyle} // <--- DHE KËTË
>
  🏠 Dashboard
</Link>

        <Link to="/dashboard/students" style={isActive("/dashboard/students") ? activeLink : linkStyle}>
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
          <h1 style={{ margin: 0 }}>Studentët</h1>
          <p style={{ color: "#6B7280" }}>Menaxhimi i studentëve</p>
        </div>

        {/* STATS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "30px"
        }}>
          <div style={cardStyle}>
            <p style={{ color: "#9CA3AF" }}>Total Studentë</p>
            <h2>{students.length}</h2>
          </div>

          <div style={cardStyle}>
            <p style={{ color: "#9CA3AF" }}>Programe</p>
            <h2>{[...new Set(students.map(s => s.programi))].length}</h2>
          </div>
        </div>

        {/* TABLE */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
            <h3>Lista e Studentëve</h3>
            <button onClick={() => setShowModal(true)} style={addBtn}>
              + Shto Student
            </button>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={th}>ID</th>
                <th style={th}>Nr</th>
                <th style={th}>Programi</th>
                <th style={th}>Viti</th>
                <th style={th}>Veprime</th>
              </tr>
            </thead>

            <tbody>
              {students.length > 0 ? (
                students.map(s => (
                  <tr key={s.id}>
                    <td style={td}>{s.id}</td>
                    <td style={td}>{s.numri_studentit}</td>
                    <td style={td}>{s.programi}</td>
                    <td style={td}>{s.viti_studimit}</td>
                    <td style={td}>
                      <button style={editBtn}>Edit</button>
                      <button onClick={() => handleDelete(s.id)} style={deleteBtn}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "20px", color: "#9CA3AF" }}>
                    Nuk ka studentë
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* MODAL */}
      {showModal && (
        <div style={modalBg}>
          <div style={modalBox}>
            <h2>Shto Student</h2>

            <form onSubmit={handleAddStudent}>
              <input style={input} placeholder="Nr Studenti"
                onChange={e => setNewStudent({...newStudent, numri_studentit: e.target.value})}
              />
              <input style={input} placeholder="Programi"
                onChange={e => setNewStudent({...newStudent, programi: e.target.value})}
              />
              <input style={input} type="number" placeholder="Viti"
                onChange={e => setNewStudent({...newStudent, viti_studimit: e.target.value})}
              />

              <button style={saveBtn}>Ruaj</button>
            </form>
          </div>
        </div>
      )}
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
  border: "1px solid #E5E7EB"
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

const addBtn = {
  background: "#4F46E5",
  color: "white",
  padding: "10px 15px",
  border: "none",
  borderRadius: "8px"
};

const th = { padding: "10px", textAlign: "left" };
const td = { padding: "10px" };

const editBtn = { marginRight: "10px" };
const deleteBtn = { color: "red" };

const modalBg = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modalBox = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "300px"
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #E5E7EB"
};

const saveBtn = {
  background: "#4F46E5",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  width: "100%"
};

export default DashboardStudents;