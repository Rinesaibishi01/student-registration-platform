import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import 'sweetalert2/dist/sweetalert2.min.css';

function AuthModal({ isOpen, onClose, initialView = "login" }) {
  const [isLogin, setIsLogin] = useState(initialView === "login");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });

  // Rregullimi i bllokimit aria-hidden (Zgjidhja për image_2c9afa.jpg)
  useEffect(() => {
    if (isOpen) {
      setIsLogin(initialView === "login");
      setErrors({});
      const root = document.getElementById('root');
      if (root) {
        root.removeAttribute('aria-hidden');
        root.style.pointerEvents = 'auto';
      }
    }
  }, [isOpen, initialView]);

  const validate = () => {
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

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const url = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/register';
      const res = await axios.post(url, formData);

      if (res.data.Status === "Success") {
        if (isLogin) {
          // LOGIN SUCCESS
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("userName", res.data.name);
          onClose();
          
          if (res.data.role === 'admin') navigate("/Dashboard-admin");
          else if (res.data.role === 'professor') navigate("/teacher-dashboard");
          else navigate("/student-panel");
        } else {
          // REGISTER SUCCESS (Zgjidhja për image_2c323e.jpg)
          Swal.fire({
            title: 'Sukses!',
            text: 'Llogaria u krijua. Tani mund të kyçeni.',
            icon: 'success',
            confirmButtonColor: '#ef4444'
          }).then((result) => {
            if (result.isConfirmed) {
              setIsLogin(true); // Ktheje te login
              setFormData({ ...formData, password: "" }); // Pastro fushën e fjalëkalimit
            }
          });
        }
      } else {
        setErrors({ server: res.data.Message });
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Gabim!', 'Serveri nuk po përgjigjet. Sigurohu që Node.js dhe XAMPP janë ndezur.', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative p-10 border border-slate-100">
        
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-400 hover:text-red-600 text-2xl cursor-pointer bg-transparent border-none"
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
              <div>
                <input 
                  type="text" placeholder="Emri" 
                  className={`w-full p-4 border rounded-2xl outline-none bg-slate-50 transition-all ${errors.firstname ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 focus:ring-2 focus:ring-red-500'}`}
                  value={formData.firstname}
                  onChange={e => setFormData({...formData, firstname: e.target.value})} 
                />
                {errors.firstname && <p className="text-red-500 text-xs mt-1 ml-2">{errors.firstname}</p>}
              </div>
              <div>
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
          
          <div>
            <input 
              type="email" placeholder="Email Adresa" 
              className={`w-full p-4 border rounded-2xl outline-none bg-slate-50 transition-all ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 focus:ring-2 focus:ring-red-500'}`}
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})} 
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-2">{errors.email}</p>}
          </div>
          
          <div>
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