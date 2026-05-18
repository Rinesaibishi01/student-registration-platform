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
    }
  ];

  return (
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
    </div>
  );
};

export default Courses;