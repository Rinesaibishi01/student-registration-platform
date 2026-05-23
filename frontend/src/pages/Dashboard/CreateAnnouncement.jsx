import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeacherSidebar from '../../components/TeacherSidebar';

function CreateAnnouncement() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');

    const loggedInUserId = localStorage.getItem('userId') || 20;

    useEffect(() => {
        axios.get(`http://localhost:5000/api/professor/${loggedInUserId}/courses`)
            .then(res => {
                setCourses(res.data);
                if (res.data.length > 0) {
                    setSelectedCourse(res.data[0].id);
                }
            })
            .catch(err => console.error("Gabim gjatë marrjes së lëndëve:", err));
    }, [loggedInUserId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedCourse) {
            alert("Ju lutem zgjedhni një lëndë!");
            return;
        }

        axios.post('http://localhost:5000/api/professor/announcements', {
            title: title,
            content: content,
            course_id: selectedCourse
        })
        .then(res => {
            alert("Njoftimi u publikua me sukses!");
            setTitle('');
            setContent('');
        })
        .catch(err => {
            console.error(err);
            alert("Ndodhi një gabim gjatë publikimit.");
        });
    };

    return (
        <div className="flex bg-[#0f172a] min-h-screen">
            {/* Sidebar në anën e majtë */}
            <TeacherSidebar />

            {/* Kontenieri kryesor - flex dhe items-center e sjellin formularin ekzaktësisht në MES */}
            <div className="flex-1 pl-64 p-8 bg-slate-50 min-h-screen flex flex-col justify-center items-center">
                
                {/* Kartela e formularit me hije të madhe dhe kënde të rrumbullakosura */}
                <div className="w-full max-w-xl bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-slate-100/70 transition-all">
                    
                    <div className="mb-6 border-b border-gray-100 pb-4 text-center">
                        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Krijo një Njoftim të Ri</h3>
                        <p className="text-sm text-gray-500 mt-1">Njoftimi do të shfaqet menjëherë në panelin e studentëve të lëndës përkatëse.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Dropdown-i për përzgjedhjen e lëndës */}
                        <div>
                            <label className="text-xs font-bold text-gray-400 block mb-1.5 uppercase tracking-wider">Zgjidh Lëndën</label>
                            <select 
                                value={selectedCourse}
                                onChange={e => setSelectedCourse(e.target.value)}
                                className="w-full border border-gray-200 p-3 rounded-xl text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-gray-700 transition-all cursor-pointer"
                            >
                                {courses.length === 0 ? (
                                    <option value="">Po ngarkohen lëndët...</option>
                                ) : (
                                    courses.map(c => (
                                        <option key={c.id} value={c.id}>{c.emertimi || c.title}</option>
                                    ))
                                )}
                            </select>
                        </div>

                        {/* Inputi i Titullit */}
                        <div>
                            <label className="text-xs font-bold text-gray-400 block mb-1.5 uppercase tracking-wider">Titulli i Njoftimit</label>
                            <input 
                                type="text" 
                                value={title} 
                                onChange={e => setTitle(e.target.value)} 
                                required 
                                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                                placeholder="p.sh. Anulimi i ligjëratës ose shtyrja e afatit" 
                            />
                        </div>

                        {/* Textarea e Përmbajtjes */}
                        <div>
                            <label className="text-xs font-bold text-gray-400 block mb-1.5 uppercase tracking-wider">Përmbajtja e Njoftimit</label>
                            <textarea 
                                value={content} 
                                onChange={e => setContent(e.target.value)} 
                                required 
                                className="w-full border border-gray-200 p-3 rounded-xl text-sm h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                                placeholder="Shkruani detajet ose mesazhin që dëshironi t'u dërgoni studentëve..."
                            ></textarea>
                        </div>

                        {/* Butoni i Publikimit */}
                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white py-3.5 rounded-xl text-sm font-bold hover:bg-blue-700 active:scale-[0.99] transition-all shadow-md shadow-blue-200"
                        >
                            Publiko Njoftimin
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default CreateAnnouncement;