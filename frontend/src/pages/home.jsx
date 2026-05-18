import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthModal from "../components/AuthModal"; 

function Students() {
  const [activeTab, setActiveTab] = useState("ballina");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState("login");

  // Funksioni për të hapur modalin në pamjen e specifikuar
  const openAuth = (viewType) => {
    setModalView(viewType);
    setIsModalOpen(true);
  };

  // Ndalojmë scroll-in kur modali është i hapur
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  return (
    <div className="bg-[#f8faff] min-h-screen font-sans">
      {/* Modali që ndryshon dinamikisht mes Login dhe Register */}
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialView={modalView} 
      />

      {/* --- NAVBAR --- */}
      <nav className="flex items-center justify-between px-10 py-5 bg-white sticky top-0 z-[100] shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-blue-700 p-2 rounded-lg text-white text-xl">🎓</div>
          <span className="text-2xl font-black text-blue-900 tracking-tight">STUDENTIX</span>
        </div>
        
 <ul className="hidden md:flex space-x-8 font-bold text-slate-600 list-none p-0">
  {/* BALLINA */}
  <li 
    onClick={() => {
      setActiveTab("ballina");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }} 
    className={`relative cursor-pointer transition-all duration-300 pb-1 ${
      activeTab === "ballina" ? "text-blue-700" : "hover:text-blue-700"
    }`}
  >
    Ballina
    {activeTab === "ballina" && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 rounded-full"></span>
    )}
  </li>

  {/* FAKULTETET / KURSET */}
  <li 
    onClick={() => {
      setActiveTab("fakultetet");
      document.getElementById('kurset-section').scrollIntoView({ behavior: 'smooth' });
    }} 
    className={`relative cursor-pointer transition-all duration-300 pb-1 ${
      activeTab === "fakultetet" ? "text-blue-700" : "hover:text-blue-700"
    }`}
  >
    Fakultetet
    {activeTab === "fakultetet" && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 rounded-full"></span>
    )}
  </li>

  {/* KONTAKTI */}
  <li 
    onClick={() => {
      setActiveTab("kontakti");
      // Nëse ke një seksion footer me id="footer", mund ta bësh scroll deri atje
      document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
    }} 
    className={`relative cursor-pointer transition-all duration-300 pb-1 ${
      activeTab === "kontakti" ? "text-blue-700" : "hover:text-blue-700"
    }`}
  >
    Kontakt
    {activeTab === "kontakti" && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 rounded-full"></span>
    )}
  </li>
</ul>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => openAuth("login")} 
            className="px-6 py-2 border-none bg-transparent text-blue-700 font-bold cursor-pointer hover:text-blue-900"
          >
            Sign In
          </button>
          <button 
            onClick={() => openAuth("register")} 
            className="bg-blue-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-800 transition shadow-md border-none cursor-pointer"
          >
            Regjistrohu Tani
          </button>
        </div>
      </nav>

      <div className={`${isModalOpen ? 'blur-md' : 'blur-0'} transition-all duration-300`}>
        
        {/* --- HERO SECTION --- */}
        <section className="relative bg-white pt-20 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 text-left relative z-10">
              <h5 className="text-blue-600 font-bold uppercase tracking-widest mb-4">Welcome to Studentix</h5>
              <h1 className="text-7xl font-black text-slate-900 leading-tight mb-6">
                Your Future <br /> <span className="text-blue-700">Starts Here</span>
              </h1>
              <p className="text-slate-500 text-xl mb-10 leading-relaxed max-w-lg">
Një platformë e integruar që thjeshton çdo hap të regjistrimit, duke ju mundësuar të fokusoheni në atë që ka më shumë rëndësi: edukimin tuaj dhe karrierën e ëndrrave.              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => openAuth("register")} 
                  className="bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition shadow-xl border-none cursor-pointer"
                >
                  Register Now →
                </button>
                <button 
                  onClick={() => openAuth("login")}
                  className="bg-white text-blue-700 border-2 border-blue-100 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition border-none cursor-pointer"
                >
                  Login to Account
                </button>
              </div>
            </div>

            <div className="md:w-1/2 relative">
               <div className="relative z-10 rounded-[2rem] rounded-tr-[10rem] overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800" alt="Students" className="w-full h-full object-cover" />
               </div>
               <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-100 rounded-full -z-0 opacity-50"></div>
            </div>
          </div>
        </section>

        {/* --- INFO CARDS --- */}
        <div className="max-w-7xl mx-auto px-10 -mt-16 relative z-20 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: "📄", title: "Online Application", desc: "Apply from anywhere at any time." },
            { icon: "📚", title: "Choose Programs", desc: "Select your preferred programs." },
            { icon: "🛡️", title: "Secure & Safe", desc: "Your data is protected." },
            { icon: "📈", title: "Track Progress", desc: "Track your status in real time." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-50 hover:-translate-y-2 transition-all">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* --- KURSET SECTION --- */}
  {/* --- KURSET SECTION (Si faculties te UniPortal) --- */}
        <section id="kurset-section" className="py-24 px-10 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Our Faculties</h2>
          <div className="w-20 h-1 bg-blue-700 mx-auto mb-16 rounded-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { t: "Computer Science", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500" },
              { t: "Engineering", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500" },
              { t: "Business Administration", img: "https://plus.unsplash.com/premium_photo-1664474559614-74d16c1c6f6f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
              { t: "Computer Science", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500" },
              { t: "Engineering", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500" },
              { t: "Business Administration", img: "https://plus.unsplash.com/premium_photo-1664474559614-74d16c1c6f6f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
            ].map((course, i) => (
              <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all">
                <div className="h-48 overflow-hidden">
                  <img src={course.img} alt={course.t} className="w-full h-full object-cover group-hover:scale-110 transition-duration-500" />
                </div>
                <div className="p-6 text-left">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{course.t}</h3>
                  <button className="text-blue-700 font-bold hover:underline cursor-pointer bg-transparent border-none">Explore Programs →</button>
                </div>
              </div>
            ))}
          </div>
        </section>
        

 {/* --- SEKSIONI I STATISTIKAVE (Professional Version) --- */}
<section className="relative py-24 bg-white overflow-hidden">
  {/* Dekori në prapavijë */}
  <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
    <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-700 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-700 rounded-full blur-3xl"></div>
  </div>

  <div className="max-w-7xl mx-auto px-10 relative z-10">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
      
      {/* Stat 1 */}
      <div className="group">
        <div className="text-5xl font-black text-blue-700 mb-2 flex items-center justify-center gap-1 group-hover:scale-110 transition-transform duration-300">
          10<span className="text-blue-500">K</span>+
        </div>
        <div className="w-10 h-1 bg-yellow-400 mx-auto mb-4 rounded-full"></div>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Studentë të Regjistruar</p>
      </div>

      {/* Stat 2 */}
      <div className="group">
        <div className="text-5xl font-black text-blue-700 mb-2 group-hover:scale-110 transition-transform duration-300">
          20+
        </div>
        <div className="w-10 h-1 bg-yellow-400 mx-auto mb-4 rounded-full"></div>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Fakultete Akademike</p>
      </div>

      {/* Stat 3 */}
      <div className="group">
        <div className="text-5xl font-black text-blue-700 mb-2 group-hover:scale-110 transition-transform duration-300">
          50+
        </div>
        <div className="w-10 h-1 bg-yellow-400 mx-auto mb-4 rounded-full"></div>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Programe Studimi</p>
      </div>

      {/* Stat 4 */}
      <div className="group">
        <div className="text-5xl font-black text-blue-700 mb-2 group-hover:scale-110 transition-transform duration-300">
          95%
        </div>
        <div className="w-10 h-1 bg-yellow-400 mx-auto mb-4 rounded-full"></div>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Kënaqësia e Studentëve</p>
      </div>

    </div>
  </div>
</section>
        {/* --- FOOTER --- */}
        <footer id="kontakti" className="bg-[#0f172a] text-white pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-left">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-600 p-1.5 rounded text-lg">🎓</div>
                  <span className="text-2xl font-black tracking-tight">STUDENTIX</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Studentix është porta juaj drejt një procesi regjistrimi të thjeshtë dhe modern.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-6 border-l-4 border-blue-600 pl-3">Quick Links</h4>
                <ul className="space-y-4 text-slate-400 list-none p-0">
                  <li className="hover:text-white cursor-pointer transition">Ballina</li>
                  <li className="hover:text-white cursor-pointer transition">Fakultetet</li>
                  <li className="hover:text-white cursor-pointer transition">Kontakti</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-6 border-l-4 border-blue-600 pl-3">Resources</h4>
                <ul className="space-y-4 text-slate-400 list-none p-0">
                  <li className="hover:text-white cursor-pointer transition">FAQ</li>
                  <li className="hover:text-white cursor-pointer transition">Bursat</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-6 border-l-4 border-blue-600 pl-3">Contact Us</h4>
                <ul className="space-y-4 text-slate-400 list-none p-0 text-sm">
                  <li>📧 info@studentix.edu</li>
                  <li>📞 +383 44 123 456</li>
                  <li>📍 Prishtinë, Kosovë</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-xs">
              <p>© 2026 Studentix Enrollment Portal. Të gjitha të drejtat e rezervuara.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Students;