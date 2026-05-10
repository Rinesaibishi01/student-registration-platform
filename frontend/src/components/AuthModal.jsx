import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import 'sweetalert2/dist/sweetalert2.min.css';

function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/register';
      const res = await axios.post(url, formData);

      if (res.data.Status === "Success") {
        // --- NDRYSHIMET KRYESORE KËTU ---
        
        // 1. Ruajmë Token-in e gjeneruar nga jsonwebtoken (shumë i rëndësishëm)
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
        
        // 2. Ruajmë të dhënat e tjera si më parë
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("userName", res.data.name);
        
        onClose();

        // 3. NAVIGIMI I KONTROLLUAR
        if (res.data.role === 'admin') {
          navigate("/Dashboard-admin");
        } else if (res.data.role === 'student') {
          navigate("/student-panel"); 
        } else {
          navigate("/");
        }

        Swal.fire({
          title: `Mirësevini ${res.data.name}!`,
          text: isLogin ? 'U kyçët me sukses' : 'Llogaria u krijua me sukses',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        Swal.fire('Gabim!', res.data.Message, 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Gabim!', 'Serveri nuk po përgjigjet ose email-i ekziston.', 'error');
    }
  };

  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-slate-800">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative p-10 border border-slate-100">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-red-600 text-2xl transition-all bg-transparent border-none">✕</button>
        
        <h2 className="text-3xl font-black text-center mb-8 uppercase tracking-tighter">
          {isLogin ? "Kyçu në sistem" : "Regjistrohu si student"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Emri" 
                className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none bg-slate-50"
                required
                onChange={e => setFormData({...formData, firstname: e.target.value})} 
              />
              <input 
                type="text" 
                placeholder="Mbiemri" 
                className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none bg-slate-50"
                required
                onChange={e => setFormData({...formData, lastname: e.target.value})} 
              />
            </div>
          )}
          <input 
            type="email" 
            placeholder="Email Adresa" 
            className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none bg-slate-50"
            required
            onChange={e => setFormData({...formData, email: e.target.value})} 
          />
          <input 
            type="password" 
            placeholder="Fjalëkalimi" 
            className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none bg-slate-50"
            required
            onChange={e => setFormData({...formData, password: e.target.value})} 
          />
          
          <button type="submit" className="w-full bg-red-600 text-white py-4 rounded-2xl font-black shadow-xl hover:bg-red-700 transition-all mt-4 uppercase border-none cursor-pointer">
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
