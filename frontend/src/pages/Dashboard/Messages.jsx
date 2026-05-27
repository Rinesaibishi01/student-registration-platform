import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentDashboard() {
  const [njoftimet, setNjoftimet] = useState([]);

  // Funksioni për të deshifruar token-in e studentit të kyçur
  const parseJwt = (token) => {
    try { return JSON.parse(atob(token.split('.')[1])); } catch (e) { return null; }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = parseJwt(token);
      const studentUserId = decoded?.id; // Nxjerr id e përdoruesit

      if (studentUserId) {
        // Thërrasim API-në e re që shtuam në backend
        axios.get(`http://localhost:5000/api/student/${studentUserId}/announcements`)
          .then(res => {
            setNjoftimet(res.data);
          })
          .catch(err => console.error("Gabim gjatë ngarkimit të njoftimeve:", err));
      }
    }
  }, []);

  return (
    <div className="p-6">
      {/* Kjo është pjesa e njoftimeve ku do të renditen ato që publikon profesori */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Njoftimet e Fundit</h2>
        
        <div className="space-y-4">
          {njoftimet.length === 0 ? (
            <p className="text-slate-400 font-medium text-sm">Nuk ka asnjë njoftim të ri nga profesorët tuaj.</p>
          ) : (
            njoftimet.map((n) => (
              <div key={n.id} className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                    {n.emri_lendes}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {new Date(n.createdAt).toLocaleDateString('sq-AL')}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">{n.title}</h4>
                <p className="text-slate-600 text-sm font-medium mb-3 whitespace-pre-line">{n.content}</p>
                <div className="text-xs text-slate-400 font-semibold">
                  Nga prof. <span className="text-slate-500">{n.prof_emri} {n.prof_mbiemri}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;