import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar'; // Rruga e saktë për te folderi components

function AddSchedule() {
    const [courseId, setCourseId] = useState('');
    const [dita, setDita] = useState('E Hënë');
    const [oraFillimit, setOraFillimit] = useState('');
    const [oraMbarimit, setOraMbarimit] = useState('');
    const [salla, setSalla] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/api/admin/schedules', {
            course_id: courseId,
            dita: dita,
            ora_fillimit: oraFillimit,
            ora_mbarimit: oraMbarimit,
            salla: salla
        })
        .then(res => {
            alert("Orari u shtua me sukses!");
            setCourseId('');
            setOraFillimit('');
            setOraMbarimit('');
            setSalla('');
        })
        .catch(err => {
            console.error(err);
            alert("Ndodhi një gabim! Sigurohu që ID e lëndës ekziston.");
        });
    };

    return (
        <div className="flex bg-[#111827] min-h-screen">
            {/* Sidebar i Adminit shfaqet në të majtë */}
            <Sidebar />
            
            {/* Kontenieri kryesor i centruar bukur në mes të ekranit */}
            <div className="flex-1 pl-64 p-8 bg-slate-50 min-h-screen flex flex-col justify-center items-center">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-slate-100/70 transition-all">
                    
                    <div className="mb-6 border-b border-gray-100 pb-4 text-center">
                        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Shto Orar të Ri</h3>
                        <p className="text-sm text-gray-500 mt-1">Panel i Menaxhimit për Adminin</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-gray-400 block mb-1.5 uppercase tracking-wider">ID e Lëndës (Nga Databaza)</label>
                            <input 
                                type="number" 
                                value={courseId} 
                                onChange={e => setCourseId(e.target.value)} 
                                required 
                                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                                placeholder="p.sh. 1" 
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-400 block mb-1.5 uppercase tracking-wider">Dita e Ligjëratës</label>
                            <select 
                                value={dita} 
                                onChange={e => setDita(e.target.value)} 
                                className="w-full border border-gray-200 p-3 rounded-xl text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-gray-700 transition-all cursor-pointer"
                            >
                                <option value="E Hënë">E Hënë</option>
                                <option value="E Martë">E Martë</option>
                                <option value="E Mërkurë">E Mërkurë</option>
                                <option value="E Enjte">E Enjte</option>
                                <option value="E Premte">E Premte</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-gray-400 block mb-1.5 uppercase tracking-wider">Ora e Fillimit</label>
                                <input 
                                    type="time" 
                                    value={oraFillimit} 
                                    onChange={e => setOraFillimit(e.target.value)} 
                                    required 
                                    className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-400 block mb-1.5 uppercase tracking-wider">Ora e Mbarimit</label>
                                <input 
                                    type="time" 
                                    value={oraMbarimit} 
                                    onChange={e => setOraMbarimit(e.target.value)} 
                                    required 
                                    className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-400 block mb-1.5 uppercase tracking-wider">Salla</label>
                            <input 
                                type="text" 
                                value={salla} 
                                onChange={e => setSalla(e.target.value)} 
                                required 
                                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                                placeholder="p.sh. Salla 101, Lab 3" 
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white py-3.5 rounded-xl text-sm font-bold hover:bg-blue-700 active:scale-[0.99] transition-all shadow-md shadow-blue-200 mt-2"
                        >
                            Ruaj Orarin e Ri
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddSchedule;