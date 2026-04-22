import React from "react";
import { Link, useNavigate } from "react-router-dom";
// Mund të përdorësh ikona thjesht me tekst nëse s'ke instaluar react-icons
const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed flex flex-col p-5">
      <h2 className="text-xl font-bold mb-10 border-b pb-4">Paneli i Adminit</h2>
      
      <nav className="flex-1 space-y-2">
        <Link to="/Dashboard-admin" className="block p-3 hover:bg-gray-700 rounded transition">🏠 Dashboard</Link>
        <Link to="/students" className="block p-3 hover:bg-gray-700 rounded transition">🎓 Studentët</Link>
        <Link to="/teachers" className="block p-3 hover:bg-gray-700 rounded transition">👨‍🏫 Profesorët</Link>
        <Link to="/courses" className="block p-3 hover:bg-gray-700 rounded transition">📚 Kurset</Link>
      </nav>

      <button 
        onClick={handleLogout}
        className="mt-auto bg-red-600 p-3 rounded font-bold hover:bg-red-700 transition"
      >
        Dil nga sistemi
      </button>
    </div>
  );
};

export default Sidebar;