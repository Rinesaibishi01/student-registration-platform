import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeacherSidebar from "../../components/teacherSidebar";

const Grading = () => {
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/get-grades')
            .then(res => {
                if(res.data.Status === "Success") {
                    setGrades(res.data.Data);
                }
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            <TeacherSidebar />
            <main className="flex-1 ml-64 p-10 text-slate-900">
                <h1 className="text-3xl font-black text-slate-800 mb-8">Vlerësimi i Studentëve</h1>
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                            <tr>
                                <th className="px-8 py-5">Studenti</th>
                                <th className="px-8 py-5">Lënda</th>
                                <th className="px-8 py-5">Nota</th>
                                <th className="px-8 py-5 text-right">Veprimi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {grades.map((data, index) => (
                                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-5 font-bold">{data.firstname} {data.lastname}</td>
                                    <td className="px-8 py-5 text-slate-500">{data.course}</td>
                                    <td className="px-8 py-5">
                                        <span className="bg-slate-100 px-3 py-1 rounded-full font-mono font-bold">
                                            {data.grade_value}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button className="text-blue-600 font-bold hover:underline">Ndrysho</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default Grading;