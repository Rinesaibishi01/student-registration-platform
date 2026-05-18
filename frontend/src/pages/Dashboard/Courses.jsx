<<<<<<< HEAD
import React from 'react';

const Courses = () => {
  // Këto janë të dhënat që do të shfaqen. 
  // Më vonë këto do të vijnë nga databaza jote.
  const myCourses = [
    {
      id: 1,
      title: "UX Design Foundations",
      category: "UI/UX Basics",
      progress: 45,
      instructor: "Filan Fisteku"
    },
    {
      id: 2,
      title: "Web Development",
      category: "HTML, CSS, JS",
      progress: 10,
      instructor: "Filane Fisteku"
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const Courses = () => {
  const [courseData, setCourseData] = useState({
    emertimi: "",
    pershkrimi: "",
    kredite: "",
    professor_id: "",
    semester_id: "",
    kapaciteti: ""
  });

  const [courses, setCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // State për të ditur nëse po editojmë
  const [editId, setEditId] = useState(null); // ID e kursit që po editojmë

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/get-courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Gabim gjatë marrjes së kurseve:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  // Funksioni që mbush formën për editim
  const handleEdit = (course) => {
    setIsEditing(true);
    setEditId(course.id);
    setCourseData({
      emertimi: course.emertimi,
      pershkrimi: course.pershkrimi,
      kredite: course.kredite,
      professor_id: course.professor_id,
      semester_id: course.semester_id,
      kapaciteti: course.kapaciteti
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Te dërgon lart te forma
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...courseData,
      kredite: Number(courseData.kredite),
      professor_id: Number(courseData.professor_id),
      semester_id: Number(courseData.semester_id),
      kapaciteti: Number(courseData.kapaciteti)
    };

    try {
      if (isEditing) {
        // UPDATE (PUT)
        await axios.put(`http://localhost:5000/update-course/${editId}`, dataToSend);
        alert("✅ Kursi u përditësua!");
      } else {
        // CREATE (POST)
        await axios.post("http://localhost:5000/add-course", dataToSend);
        alert("✅ Kursi u shtua!");
      }
      
      // Resetimi i formës
      setIsEditing(false);
      setEditId(null);
      setCourseData({ emertimi: "", pershkrimi: "", kredite: "", professor_id: "", semester_id: "", kapaciteti: "" });
      fetchCourses();
    } catch (err) {
      alert("❌ Gabim! Kontrolloni të dhënat.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("A jeni të sigurt?")) {
      try {
        await axios.delete(`http://localhost:5000/delete-course/${id}`);
        fetchCourses();
      } catch (err) {
        alert("Gabim gjatë fshirjes");
      }
>>>>>>> 9485883195329012fa56d5b30923afec63a4de61
    }
  ];

  return (
<<<<<<< HEAD
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Kurset e mia</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {myCourses.map((course) => (
          <div 
            key={course.id} 
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid #eee'
            }}
          >
            {/* Informacioni i Kursit */}
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>{course.title}</h3>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{course.category}</p>
            </div>

            {/* Progresi */}
            <div style={{ flex: 1, padding: '0 20px' }}>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '5px' }}>
                Progresi: {course.progress}%
              </div>
              <div style={{ 
                width: '100%', 
                height: '8px', 
                backgroundColor: '#e0e0e0', 
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${course.progress}%`, 
                  height: '100%', 
                  backgroundColor: '#4A47E0', // Ngjyra vjollcë si në foto
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>

            {/* Butoni për të vazhduar */}
            <div>
              <button style={{
                padding: '10px 20px',
                backgroundColor: '#4A47E0',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                Vazhdo Mësimin
              </button>
            </div>
          </div>
        ))}
      </div>
=======
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Menaxhimi i Kurseve</h1>
          <p className="text-gray-500 mt-2 text-lg">{isEditing ? "Po editoni kursin..." : "Shtoni kurse të reja në sistem."}</p>
        </div>

        {/* FORM SECTION */}
        <div className={`max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl border transition-all ${isEditing ? 'border-yellow-400' : 'border-gray-100'} mb-12`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">{isEditing ? "Ndrysho Detajet" : "Shto Kurs të Ri"}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Emërtimi i Kursit</label>
                <input type="text" name="emertimi" required className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" value={courseData.emertimi} onChange={handleChange} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Përshkrimi</label>
                <textarea name="pershkrimi" rows="2" className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" value={courseData.pershkrimi} onChange={handleChange} />
              </div>
              <input type="number" name="kredite" placeholder="Kredite" className="p-4 bg-gray-50 border rounded-2xl" value={courseData.kredite} onChange={handleChange} />
              <input type="number" name="kapaciteti" placeholder="Kapaciteti" className="p-4 bg-gray-50 border rounded-2xl" value={courseData.kapaciteti} onChange={handleChange} />
              <input type="number" name="professor_id" placeholder="ID e Profesorit" className="p-4 bg-gray-50 border rounded-2xl" value={courseData.professor_id} onChange={handleChange} />
              <input type="number" name="semester_id" placeholder="ID e Semestrit" className="p-4 bg-gray-50 border rounded-2xl" value={courseData.semester_id} onChange={handleChange} />
            </div>
            
            <div className="flex gap-4">
               <button type="submit" className={`flex-1 ${isEditing ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-black py-4 rounded-2xl shadow-lg transition-all uppercase tracking-widest cursor-pointer`}>
                {isEditing ? "Përditëso Kursin" : "Ruaj Kursin në Sistem"}
              </button>
              {isEditing && (
                <button type="button" onClick={() => { setIsEditing(false); setCourseData({ emertimi: "", pershkrimi: "", kredite: "", professor_id: "", semester_id: "", kapaciteti: "" }); }} className="bg-gray-400 text-white px-6 rounded-2xl">Anulo</button>
              )}
            </div>
          </form>
        </div>

        {/* TABLE SECTION */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-4">Emërtimi</th>
                <th className="p-4">Kredite</th>
                <th className="p-4 text-center">Veprimet</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{course.emertimi}</td>
                  <td className="p-4">{course.kredite} ECTS</td>
                  <td className="p-4 text-center space-x-2">
                    <button onClick={() => handleEdit(course)} className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-xl hover:bg-yellow-600 hover:text-white transition-all">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(course.id)} className="bg-red-100 text-red-600 px-4 py-2 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                      Fshij
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
>>>>>>> 9485883195329012fa56d5b30923afec63a4de61
    </div>
  );
};
export default Courses;