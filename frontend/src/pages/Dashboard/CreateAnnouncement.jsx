import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeacherSidebar from '../../components/TeacherSidebar';

function CreateAnnouncement() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    const loggedInUserId = localStorage.getItem('userId') || 25; // Marrim id-në e profesorit

    // 1. Merr lëndët e profesorit kur ngarkohet faqja
    useEffect(() => {
        axios.get(`http://localhost:5000/api/professor/${loggedInUserId}/courses`)
            .then(res => {
                setCourses(res.data);
                if (res.data.length > 0) {
                    setSelectedCourse(res.data[0].id || res.data[0].course_id);
                }
            })
            .catch(err => console.error("Gabim gjatë marrjes së lëndëve: ", err));

        // 2. Merr njoftimet ekzistuese
        axios.get(`http://localhost:5000/api/professor/${loggedInUserId}/announcements`)
            .then(res => {
                setAnnouncements(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Gabim gjatë marrjes së njoftimeve: ", err);
                setLoading(false);
            });
    }, [loggedInUserId]);

    // 3. Funksioni kur klikohet butoni "Publiko Njoftimin"
    const handlePubliko = (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim() || !selectedCourse) {
            alert("Ju lutem plotësoni të gjitha fushat!");
            return;
        }

        // Paketojmë të dhënat ekzaktësisht siç i pret backend-i
        const data = {
            title: title,
            content: content,
            course_id: parseInt(selectedCourse)
        };

        axios.post("http://localhost:5000/api/professor/announcements", data)
            .then(res => {
                alert("Njoftimi u publikua me sukses!");
                setTitle('');
                setContent('');
                // Rifreskojmë listën e njoftimeve automatikisht
                return axios.get(`http://localhost:5000/api/professor/${loggedInUserId}/announcements`);
            })
            .then(res => setAnnouncements(res.data))
            .catch(err => {
                console.error("Gabim gjatë postimit:", err);
                alert("Ndodhi një gabim në server gjatë publikimit!");
            });
    };

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
            <TeacherSidebar />
            
            <main className="flex-1 p-10 ml-64">
                <div className="mb-10">
                    <h5 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2">Komunikimi</h5>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Krijo një Njoftim të Ri</h1>
                    <p className="text-slate-500 mt-2">Njoftimi do të shfaqet menjëherë në panelin e studentëve të lëndës përkatëse.</p>
                </div>

                {/* FORMA */}
                <div className="bg-white p-8 rounded-[2rem] border border-slate-50 shadow-sm mb-8">
                    <form onSubmit={handlePubliko} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Zgjidh Lëndën</label>
                            <select 
                                value={selectedCourse} 
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium text-slate-700 bg-slate-50"
                            >
                                <option value="">Zgjidhni lëndën...</option>
                                {courses.map(c => (
                                    <option key={c.id || c.course_id} value={c.id || c.course_id}>
                                        {c.emertimi || c.emri_lendes}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Titulli i Njoftimit</label>
                            <input 
                                type="text" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="p.sh. Anulimi i ligjëratës ose shtyrja e afatit"
                                className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium bg-slate-50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Përmbajtja e Njoftimit</label>
                            <textarea 
                                rows="5"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Shkruani detajet ose mesazhin që dëshironi t'u dërgoni studentëve..."
                                className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium bg-slate-50"
                            ></textarea>
                        </div>

                        <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg block text-center">
                            Publiko Njoftimin
                        </button>
                    </form>
                </div>

                {/* LISTA E NJOFTIMEVE POSHTË FORME */}
                <div className="bg-white p-8 rounded-[2rem] border border-slate-50 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Njoftimet e Publikuara Më Parë</h2>
                    <div className="space-y-4">
                        {loading ? (
                            <p className="text-slate-400 font-medium">Duke ngarkuar...</p>
                        ) : announcements.length === 0 ? (
                            <p className="text-slate-400 font-medium">Nuk keni publikuar asnjë njoftim deri më tani.</p>
                        ) : (
                            announcements.map(n => (
                                <div key={n.id} className="p-6 border border-slate-100 rounded-2xl bg-slate-50/50">
                                    <h3 className="text-lg font-bold text-slate-900 mb-1">{n.title}</h3>
                                    <p className="text-slate-600 text-sm font-medium">{n.content}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default CreateAnnouncement;