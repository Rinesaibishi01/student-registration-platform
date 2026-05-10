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
            <li><Link to="/dashboard">Studentët</Link></li>
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

{/* --- FILLIMI I SEKSIONIT TË KURSEVE --- */}
<section className="py-16 bg-white w-full">
  <div className="max-w-[1200px] mx-auto px-4">
    {/* Titulli me vijën poshtë */}
    <div className="mb-10">
      <h2 className="text-3xl font-bold text-gray-900 relative inline-block">
        Kurset Tona
        <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-yellow-400 rounded-full"></span>
      </h2>
    </div>

    {/* Grid-i i Kartave */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          title: "UI/UX Designing Training Course",
          modules: "11 Moudules",
          rating: "4.7",
          img: "https://images.unsplash.com/photo-1702047054352-cf264d3b1a9c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"        },
        {


          title: "Full Stack Development Course",
          modules: "15 Moudules",
          rating: "4.5",
          img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500",
        },
        {
          title: "Digital Marketing & E-Commerce",
          modules: "9 Moudules",
          rating: "4.3",
          img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
        },
                {
          title: "Python Programming for Beginners",
          modules: "9 Moudules",
          rating: "4.3",
          img: "https://media.istockphoto.com/id/1399203126/photo/leader-give-a-business-presentation-at-an-office-conference-meeting-businessman-coach-mentor.jpg?s=1024x1024&w=is&k=20&c=fW9cF6FExiCONGYdZAmR4MJdC2cwbTxTXjOUkU5NABY=",
        },
                {
          title: "DevOps Mastery Course",
          modules: "9 Moudules",
          rating: "4.3",
          img: "https://media.istockphoto.com/id/2223089986/photo/young-asian-business-people-working-late-into-the-night-in-the-office-meeting-brainstorming.jpg?s=1024x1024&w=is&k=20&c=2orZMgTAGA4pgGQKk36ELB8KbRUE2Fh_ly9PXJPFnmg=",
        },
                {
          title: "Data Science & Machine Learning",
          modules: "9 Moudules",
          rating: "4.3",
          img: "https://media.istockphoto.com/id/2156388139/photo/hispanic-latin-american-couple-software-engineer-developer-use-computer-work-on-program.jpg?s=1024x1024&w=is&k=20&c=BQxkVUrR-Ml8trZLh4qc67gyIVo4CKyrhT6n7uNJgAQ=",
        },
      ].map((course, index) => (
        <div key={index} className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300">
          {/* Imazhi me butonin Learn More */}
          <div className="relative h-64 overflow-hidden">
            <img 
              src={course.img} 
              alt={course.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
            <button className="absolute bottom-4 right-4 bg-[#ffc107] text-black font-bold py-2 px-4 rounded-lg text-sm shadow-md hover:bg-[#e0a800] transition">
              Learn more
            </button>
          </div>

          {/* Përmbajtja e Kartës */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 leading-snug h-14 overflow-hidden">
              {course.title}
            </h3>
            
            <div className="flex items-center justify-between border-t pt-4 mt-2">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span className="text-lg">💼</span> {course.modules}
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900">{course.rating}</span>
                <span className="text-yellow-400 text-lg">★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
{/* --- FUNDI I SEKSIONIT TË KURSEVE --- */}




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