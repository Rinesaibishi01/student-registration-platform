import React from 'react';

const RegisterCourse = ({ availableCourses, onEnroll }) => {
  return (
    <div className="left" style={{ width: "100%" }}>
      <h3>Kurset e lira për regjistrim</h3>
      <div className="course-list">
        {availableCourses.map((course) => (
          <div className="course-item" key={course.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '15px',
            background: '#fff',
            borderRadius: '10px',
            marginBottom: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
          }}>
            <div>
              {/* Ndryshuar nga course.title në course.emertimi */}
              <h4 style={{ margin: 0 }}>{course.emertimi}</h4>
              {/* Ndryshuar nga course.description në course.pershkrimi */}
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{course.pershkrimi}</p>
            </div>
            <button 
              onClick={() => onEnroll(course)} // Kjo dërgon të gjithë objektin e kursit
              style={{
                backgroundColor: '#4A47E0',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              + Regjistrohu
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisterCourse;