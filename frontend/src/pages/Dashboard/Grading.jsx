import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeacherSidebar from '../../components/TeacherSidebar'; // Sigurohu që path-i është i saktë

function Grading() {
    const [studentet, setStudentet] = useState([]);
    const [loading, setLoading] = useState(true);

    const loggedInUserId = localStorage.getItem('userId') || 20; 

    useEffect(() => {
        axios.get(`http://localhost:5000/api/professor/${loggedInUserId}/grading-students`)
            .then(res => {
                setStudentet(Array.isArray(res.data) ? res.data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Gabim gjatë marrjes së të dhënave:", err);
                setLoading(false);
            });
    }, [loggedInUserId]);

    return (
        <div className="flex w-full min-h-screen bg-slate-50 font-sans antialiased">
            <TeacherSidebar />

            <div className="flex-1 p-8 ml-64 transition-all duration-300">
                <div className="max-w-6xl mx-auto">
                    
                    {/* Header modern si në kërkesën tuaj */}
                    <header className="mb-10 p-6 bg-white rounded-2xl border border-gray-200 flex justify-between items-center shadow-sm">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-950 tracking-tight">
                                Vlerësimi i Studentëve
                            </h2>
                            <p className="text-base text-gray-500 mt-1 max-w-2xl">
                                Menaxhoni notat dhe shikoni studentët e regjistruar në lëndët tuaja.
                            </p>
                        </div>
                        <span className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm">
                            Semestri Aktual
                        </span>
                    </header>

                    {/* Tabela pa hije të rënda, e pastër */}
                    <div className="bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse table-auto">
                            <thead className="border-b border-gray-200">
                                <tr className="bg-gray-50 text-xs font-bold uppercase text-gray-500 tracking-wider">
                                    <th className="px-6 py-5">Studenti</th>
                                    <th className="px-6 py-5">Lënda</th>
                                    <th className="px-6 py-5">Data e Regjistrimit</th>
                                    <th className="px-6 py-5 text-center">Statusi</th>
                                    <th className="px-6 py-5 text-right">Veprimi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm text-gray-800">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                            <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                            Duke ngarkuar...
                                        </td>
                                    </tr>
                                ) : studentet.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-16 text-center text-gray-400 italic bg-gray-50/20">
                                            Nuk u gjet asnjë student i regjistruar në lëndët tuaja.
                                        </td>
                                    </tr>
                                ) : (
                                    studentet.map((s, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    {/* KËTU ESHTE NDRYSHIMI: Rrethi me iniciale violet si te image_4e1d90.png */}
                                                    <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs uppercase shadow-sm border border-white">
                                                        {s.student_name ? s.student_name.substring(0, 2) : 'RI'}
                                                    </div>
                                                    <span className="font-semibold text-gray-950 whitespace-nowrap">
                                                        {s.student_name} {s.student_lastname}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-gray-600 font-medium">
                                                {s.course_title}
                                            </td>
                                            <td className="px-6 py-5 text-gray-500">
                                                {s.data_regjistrimit ? new Date(s.data_regjistrimit).toLocaleDateString('sq-AL') : '22.5.2026'}
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                                                    s.statusi === 'Aktiv' || s.statusi === 'I rregullt'
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                                                        : 'bg-amber-50 text-amber-700 border-amber-200/60'
                                                }`}>
                                                    {s.statusi || 'I rregullt'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer">
                                                    Vendos Notën
                                                </button>
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

export default Grading;