import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import 'sweetalert2/dist/sweetalert2.min.css';

const validateForm = (isLogin, formData) => {
  let tempErrors = {};
  const emailRegex = /\S+@\S+\.\S+/;

  if (!isLogin) {
    if (!formData.firstname.trim()) tempErrors.firstname = "Emri kërkohet";
    if (!formData.lastname.trim()) tempErrors.lastname = "Mbiemri kërkohet";
  }
  if (!formData.email.trim()) {
    tempErrors.email = "Email-i kërkohet";
  } else if (!emailRegex.test(formData.email)) {
    tempErrors.email = "Email-i nuk është valid";
  }
  if (!formData.password) {
    tempErrors.password = "Fjalëkalimi kërkohet";
  } else if (formData.password.length < 6) {
    tempErrors.password = "Të paktën 6 karaktere";
  }
  return tempErrors;
};

function AuthModal({ isOpen, onClose, initialView = "login" }) {
  // RREGULLIMI KRYESOR: Vlera fillestare vendoset direkt këtu në bazë të prop-it
  const [isLogin, setIsLogin] = useState(initialView === "login");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });

  // Sinkronizimi i pamjes kur modali hapet apo ndryshon prop-i, pa shkaktuar loop
  useEffect(() => {
    setIsLogin(initialView === "login");
  }, [initialView]);

  // useEffect për menaxhimin e efekteve të jashtme (DOM) kur hapet modali
  useEffect(() => {
    if (isOpen) {
      setErrors({});

      const root = document.getElementById('root');
      if (root) {
        root.removeAttribute('aria-hidden');
        root.style.pointerEvents = 'auto';
      }
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = validateForm(isLogin, formData);
    
    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    try {
      const url = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/register';
      const res = await axios.post(url, formData);

      if (res.data.Status === "Success") {
        if (isLogin) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("userName", res.data.name);
          onClose();
          
          if (res.data.role === 'admin') navigate("/Dashboard-admin");
          else if (res.data.role === 'professor') navigate("/teacher-dashboard");
          else navigate("/student-panel");
        } 
        else {
          setIsLogin(true);
          setFormData(prev => ({ ...prev, password: "" })); 
          Swal.fire({
            title: 'Sukses!',
            text: 'Llogaria u krijua, Studenti u Regjistrua.',
            icon: 'success',
            confirmButtonColor: '#6366f1'
          });
        }
      } else {
        setErrors({ server: res.data.Message });
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Gabim!', 'Serveri nuk po përgjigjet.', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative p-10 border border-slate-100">
        
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-400 hover:text-red-600 text-2xl cursor-pointer bg-transparent border-none outline-none"
        >
          ✕
        </button>
        
        <h2 className="text-3xl font-black text-center mb-8 uppercase text-slate-900 tracking-tighter">
          {isLogin ? "Kyçu në sistem" : "Krijo Llogari"}
        </h2>

        {errors.server && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-center font-bold mb-4 border border-red-100">
            {errors.server}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <input 
                  type="text" placeholder="Emri" 
                  className={`w-full p-4 border rounded-2xl outline-none bg-slate-50 transition-all ${errors.firstname ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 focus:ring-2 focus:ring-red-500'}`}
                  value={formData.firstname}
                  onChange={e => setFormData({...formData, firstname: e.target.value})} 
                />
                {errors.firstname && <p className="text-red-500 text-xs mt-1 ml-2">{errors.firstname}</p>}
              </div>
              <div className="flex flex-col">
                <input 
                  type="text" placeholder="Mbiemri" 
                  className={`w-full p-4 border rounded-2xl outline-none bg-slate-50 transition-all ${errors.lastname ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 focus:ring-2 focus:ring-red-500'}`}
                  value={formData.lastname}
                  onChange={e => setFormData({...formData, lastname: e.target.value})} 
                />
                {errors.lastname && <p className="text-red-500 text-xs mt-1 ml-2">{errors.lastname}</p>}
              </div>
            </div>
          )}
          
          <div className="flex flex-col">
            <input 
              type="email" placeholder="Email Adresa" 
              className={`w-full p-4 border rounded-2xl outline-none bg-slate-50 transition-all ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 focus:ring-2 focus:ring-red-500'}`}
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})} 
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-2">{errors.email}</p>}
          </div>
          
          <div className="flex flex-col">
            <input 
              type="password" placeholder="Fjalëkalimi" 
              className={`w-full p-4 border rounded-2xl outline-none bg-slate-50 transition-all ${errors.password ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 focus:ring-2 focus:ring-red-500'}`}
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})} 
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-2">{errors.password}</p>}
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-red-600 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-red-700 transition-all mt-4 uppercase cursor-pointer border-none"
          >
            {isLogin ? "Vazhdo" : "Krijo Llogarinë"}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 font-medium">
          {isLogin ? "Nuk keni llogari? " : "Keni llogari? "}
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)} 
            className="text-red-600 cursor-pointer font-bold hover:underline ml-1 bg-transparent border-none outline-none"
          >
            {isLogin ? "Regjistrohu" : "Kyçu"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;