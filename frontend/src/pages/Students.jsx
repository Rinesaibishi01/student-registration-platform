import { useEffect, useState } from "react";
import axios from "axios";
import "./Students.css"; 

function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then(res => {
        setStudents(res.data);
      })
      .catch(err => console.log("Gabim gjatë marrjes së të dhënave:", err));
  }, []);

  return (
    <div className="main-container">
      {/* 1. TOP BAR */}
      <div className="top-bar">
        <div className="inner-container">
          <div className="contact-info">
            
            <span>📧 info@student-management.com</span>
          </div>
          <div className="top-links">
            <a href="#">Login</a>
          </div>
        </div>
      </div>

      {/* 2. NAVBAR */}
      <nav className="navbar">
        <div className="inner-container">
          <div className="logo">🎓 <strong>STUDENT</strong>IX</div>
          <ul className="nav-menu">
            <li>Ballina</li>
            <li>Kurset</li>
            <li>Studentët</li>
            <li>Kontakt</li>
          </ul>
          <button className="btn-pickup">Regjistrohu Tani</button>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <div className="hero-section">
        <div className="inner-container">
          <div className="hero-text">
            <h1 className="hero-title">
              Eksploro <span>kurset</span> tona <br /> 
              profesionale online
            </h1>
            <p className="hero-description">
              Merrni njohuritë më të reja akademike përmes platformës sonë. 
              Librat dhe materialet më të mira për rrugëtimin tuaj.
            </p>
            
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Kërko kurse ose libra..." 
                className="search-input" 
              />
              <button className="search-btn">Search</button>
            </div>
          </div>

          <div className="hero-visual">
            <img 
              src="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop" 
              alt="Books" 
              className="hero-custom-img"
            />
          </div>
        </div>
      </div>

      {/* 4. LISTA E STUDENTËVE */}
      <div className="content-area">
        <div className="inner-container">
            <div className="list-wrapper">
                <h2 className="list-title">Studentët e Regjistruar</h2>
                <div className="student-list">
                {students.length > 0 ? (
                    students.map(s => (
                    <div key={s.id} className="students-item">
                        <p><strong>ID:</strong> {s.numri_studentit}</p>
                        <p><strong>Viti Akademik:</strong> {s.viti_studimit}</p>
                    </div>
                    ))
                ) : (
                    <p>VAZHDIM...</p>
                )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Students;