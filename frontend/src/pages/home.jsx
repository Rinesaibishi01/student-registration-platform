import React, { useState } from "react";
import "./home.css"; 
import { Link } from "react-router-dom";
import AuthModal from "../components/AuthModal"; 

function Students() {
  // State i vetëm që na duhet për të hapur/mbyllur dritaren
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="main-container">
      {/* Ky komponent rri "i fshehur" dhe aktivizohet vetëm kur isModalOpen bëhet true */}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* TOP BAR */}
      <div className="top-bar">
        <div className="inner-container">
          <div className="contact-info">
            <span>📧 info@student-management.com</span>
          </div>
          <div className="top-links">
            {/* Kyçja tani hap modalin direkt */}
            <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>
              Login
            </a>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="inner-container">
          <div className="logo">🎓 <strong>STUDENT</strong>IX</div>
          <ul className="nav-menu">
            <li>Ballina</li>
            <li>Kurset</li>
            <li>Kontakt</li>
          </ul>
          
          {/* NDRYSHUAR: Butoni tani vetëm hap modalin, nuk të dërgon në faqe tjetër */}
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="btn-pickup" 
            style={{ 
              backgroundColor: '#d32f2f', // Ngjyra e kuqe profesionale
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}
          >
            Regjistrohu Tani
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="hero-section">
        <div className="inner-container">
          <div className="hero-text">
            <h1 className="hero-title">
              Eksploro <span>kurset</span> tona <br /> profesionale online
            </h1>
            <p className="hero-description">
              Merrni njohuritë më të reja akademike përmes platformës sonë. 
            </p>
            <div className="search-container">
              <input type="text" placeholder="Kërko kursin tuaj..." className="search-input" />
              <button className="search-btn" style={{ backgroundColor: '#d32f2f' }}>Search</button>
            </div>
          </div>
          <div className="hero-visual">
            <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop" alt="Books" className="hero-custom-img" />
          </div>
        </div>
      </div>

      <div className="features-area" style={{ padding: '60px 0', textAlign: 'center', backgroundColor: '#fff' }}>
        <div className="inner-container">
          <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#333' }}>Pse të zgjidhni STUDENTIX?</h2>
          <p style={{ color: '#666' }}>Platforma lider për menaxhimin dhe edukimin e studentëve në kohë reale.</p>
        </div>
      </div>
    </div>
  );
}

export default Students;