import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import 'sweetalert2/dist/sweetalert2.min.css';

function AuthModal({ isOpen, onClose, initialView = "login" }) {
  const [isLogin, setIsLogin] = useState(initialView === "login");
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });

  // Përditëso gjendjen nëse ndryshon prop-i nga Navbar
  useEffect(() => {
    setIsLogin(initialView === "login");
  }, [initialView]);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const url = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/register';
    const res = await axios.post(url, formData);

    console.log("Përgjigja e plotë nga serveri:", res.data); // Shiko këtë në Console!

    if (res.data.Status === "Success") {
      const userRole = res.data.role;
      const userName = res.data.name;

      // Kjo do të na tregojë çfarë roli po merr nga DB
      //alert("Login me sukses! Roli yt është: " + userRole); spo me dueht nihere

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", userRole);
      localStorage.setItem("userName", userName);

      onClose();

      // Kontrollojmë rolin saktësisht
      if (userRole === 'admin') {
        navigate("/Dashboard-admin");
      } else if (userRole === 'professor') {
       // alert("Duke të dërguar te Dashboard i Profesorit...");
        navigate("/teacher-dashboard");
      } else if (userRole === 'student') {
        navigate("/student-panel");
      } else {
        alert("KUJDES: Roli '" + userRole + "' nuk njihet. Po kthehesh në ballinë.");
        navigate("/");
      }
    } else {
      Swal.fire('Gabim!', res.data.Message, 'error');
    }
  } catch (err) {
    console.error(err);
    Swal.fire('Gabim!', 'Serveri nuk u gjet ose ka një gabim në kod.', 'error');
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-slate-800">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative p-10 border border-slate-100">
        
        {/* Butoni për mbyllje */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-400 hover:text-red-600 text-2xl transition-all bg-transparent border-none cursor-pointer"
        >
          ✕
        </button>
        
        <h2 className="text-3xl font-black text-center mb-8 uppercase tracking-tighter text-slate-900">
          {isLogin ? "Kyçu në sistem" : "Krijo Llogari"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Emri" 
                className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none bg-slate-50"
                required
                value={formData.firstname}
                onChange={e => setFormData({...formData, firstname: e.target.value})} 
              />
              <input 
                type="text" 
                placeholder="Mbiemri" 
                className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none bg-slate-50"
                required
                value={formData.lastname}
                onChange={e => setFormData({...formData, lastname: e.target.value})} 
              />
            </div>
          )}
          
          <input 
            type="email" 
            placeholder="Email Adresa" 
            className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none bg-slate-50"
            required
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})} 
          />
          
          <input 
            type="password" 
            placeholder="Fjalëkalimi" 
            className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none bg-slate-50"
            required
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})} 
          />
          
          <button 
            type="submit" 
            className="w-full bg-red-600 text-white py-4 rounded-2xl font-black shadow-xl hover:bg-red-700 transition-all mt-4 uppercase border-none cursor-pointer"
          >
            {isLogin ? "Vazhdo" : "Krijo Llogarinë"}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 font-medium">
          {isLogin ? "Nuk keni llogari? " : "Keni llogari? "}
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)} 
            className="text-red-600 cursor-pointer font-bold hover:underline ml-1 bg-transparent border-none"
          >
            {isLogin ? "Regjistrohu" : "Kyçu"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;