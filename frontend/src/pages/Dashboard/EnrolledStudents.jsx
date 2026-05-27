import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeacherSidebar from '../../components/TeacherSidebar';

function EnrolledStudents() {
    const [studentet, setStudentet] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const professorUserId = localStorage.getItem('userId');
            
            if (!professorUserId) {
                console.error("ID-ja e profesorit nuk u gjet!");
                setLoading(false);
                return;
            }

            try {
                // URL-ja duhet të jetë saktësisht me prefixin /api/enrollments
                const res = await axios.get(`http://localhost:5000/api/enrollments/professor/students/${professorUserId}`);
                
                // Nëse backend-i kthen të dhëna, i ruajmë
                if (res.data) {
                    setStudentet(res.data);
                }
            } catch (err) {
                console.error("Gabim gjatë marrjes së studentëve:", err);
            } finally {
                setLoading(false); // Ndalo gjendjen e ngarkimit pavarësisht rezultatit
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex w-full min-h-screen bg-slate-50 font-sans antialiased">
            <TeacherSidebar />
            <div className="flex-1 p-8 ml-64 transition-all duration-300">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-10 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-3xl font-bold text-gray-950">Studentët e Regjistruar</h2>
                        <p className="text-gray-500">Menaxhoni notat dhe shikoni studentët në lëndët tuaja.</p>
                    </header>

                    <div className="bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase text-gray-500">
                                <tr>
                                    <th className="px-6 py-5">Studenti</th>
                                    <th className="px-6 py-5">Lënda</th>
                                    <th className="px-6 py-5">Data e Regjistrimit</th>
                                    <th className="px-6 py-5 text-center">Statusi</th>
                                    <th className="px-6 py-5 text-right">Veprimi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {loading ? (
                                    <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-400">Duke ngarkuar të dhënat...</td></tr>
                                ) : (!studentet || studentet.length === 0) ? (
                                    <tr><td colSpan="5" className="px-6 py-16 text-center italic text-gray-400">Nuk ka studentë të regjistruar për këtë profesor.</td></tr>
                                ) : (
                                    studentet.map((s, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-5 font-semibold text-gray-900">
                                                {s.firstname} {s.lastname}
                                            </td>
                                            <td className="px-6 py-5 text-gray-600">
                                                {s.emertimi || 'N/A'}
                                            </td>
                                            <td className="px-6 py-5 text-gray-500">
                                                {s.data_regjistrimit ? new Date(s.data_regjistrimit).toLocaleDateString('sq-AL') : 'N/A'}
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                                                    {s.statusi || 'Aktiv'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <button className="border border-gray-300 px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-100 transition-all">
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

export default EnrolledStudents;