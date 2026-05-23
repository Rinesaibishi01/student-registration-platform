import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeacherSidebar from '../../components/TeacherSidebar';

function ProfessorSchedule() {
    const [schedules, setSchedules] = useState([]);
    const loggedInUserId = localStorage.getItem('userId') || 20; // Merr ID-në 20

    useEffect(() => {
        if (loggedInUserId) {
            axios.get(`http://localhost:5000/api/professor/${loggedInUserId}/schedules`)
                .then(res => {
                    setSchedules(res.data);
                })
                .catch(err => console.error("Gabim gjatë marrjes së orarit:", err));
        }
    }, [loggedInUserId]);

    return (
        <div className="flex bg-[#0f172a] min-h-screen">
            {/* Sidebar në të majtë */}
            <TeacherSidebar />

            {/* Kontenieri kryesor - me flex dhe items-center për centrim perfekt në mes */}
            <div className="flex-1 pl-64 p-8 bg-slate-50 min-h-screen flex flex-col justify-center items-center">
                
                {/* Kartela e Tabelës e centruar dhe me hije të bukur */}
                <div className="w-full max-w-4xl bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-slate-100/70 transition-all">
                    
                    {/* Headeri i orarit */}
                    <div className="mb-6 border-b border-gray-100 pb-4 text-center">
                        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Orari im i Ligjëratave</h3>
                        <p className="text-sm text-gray-500 mt-1">Lista e plotë e sallave dhe orareve të caktuara për ju.</p>
                    </div>
                    
                    {/* Struktura e Tabelës */}
                    <div className="overflow-hidden border border-gray-100 rounded-xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#0f172a] text-xs font-semibold uppercase text-slate-200 tracking-wider">
                                    <th className="p-4 text-center">ID e Lëndës</th>
                                    <th className="p-4">Dita</th>
                                    <th className="p-4">Ora e Fillimit</th>
                                    <th className="p-4">Ora e Mbarimit</th>
                                    <th className="p-4 text-center">Salla</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100 text-gray-700 bg-white">
                                {schedules.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-12 text-center text-gray-400 italic bg-slate-50/50">
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <span className="text-2xl">📅</span>
                                                <span className="text-base font-medium text-gray-500">Nuk ka asnjë ligjëratë në orar për këtë profesor.</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    schedules.map((s, i) => (
                                        <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                                            <td className="p-4 font-bold text-blue-600 text-center bg-slate-50/30">
                                                #{s.course_id}
                                            </td>
                                            <td className="p-4 font-semibold text-gray-800">{s.dita}</td>
                                            <td className="p-4 text-emerald-600 font-semibold font-mono">{s.ora_fillimit}</td>
                                            <td className="p-4 text-rose-600 font-semibold font-mono">{s.ora_mbarimit}</td>
                                            <td className="p-4 text-center">
                                                <span className="bg-slate-100 text-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono font-bold border border-slate-200 shadow-sm inline-block">
                                                    {s.salla}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProfessorSchedule;