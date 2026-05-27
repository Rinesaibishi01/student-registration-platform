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
  const [isLogin, setIsLogin] = useState(initialView === "login");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstname: "", lastname: "", email: "", password: "" });

  useEffect(() => { setIsLogin(initialView === "login"); }, [initialView]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = validateForm(isLogin, formData);
    if (Object.keys(tempErrors).length > 0) { setErrors(tempErrors); return; }

    try {
      const url = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/register';
      const res = await axios.post(url, formData);

      if (res.data.Status === "Success") {
        if (isLogin) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("userName", res.data.name);
          // SHTESA KRITIKE: Ruajmë ID-në e përdoruesit
          localStorage.setItem("userId", res.data.id); 
          
          onClose();
          if (res.data.role === 'admin') navigate("/Dashboard-admin");
          else if (res.data.role === 'professor') navigate("/teacher-dashboard");
          else navigate("/student-panel");
        } else {
          setIsLogin(true);
          setFormData(prev => ({ ...prev, password: "" }));
          Swal.fire('Sukses!', 'Llogaria u krijua.', 'success');
        }
      } else { setErrors({ server: res.data.Message }); }
    } catch (err) { Swal.fire('Gabim!', 'Serveri nuk po përgjigjet.', 'error'); }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-10">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400">✕</button>
        <h2 className="text-3xl font-black text-center mb-8">{isLogin ? "Kyçu" : "Regjistrohu"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Emri" className="w-full p-4 border rounded-2xl" value={formData.firstname} onChange={e => setFormData({...formData, firstname: e.target.value})} />
              <input type="text" placeholder="Mbiemri" className="w-full p-4 border rounded-2xl" value={formData.lastname} onChange={e => setFormData({...formData, lastname: e.target.value})} />
            </div>
          )}
          <input type="email" placeholder="Email" className="w-full p-4 border rounded-2xl" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Fjalëkalimi" className="w-full p-4 border rounded-2xl" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          <button type="submit" className="w-full bg-red-600 text-white py-4 rounded-2xl">{isLogin ? "Vazhdo" : "Regjistrohu"}</button>
        </form>
      </div>
    </div>
  );
}
export default AuthModal;