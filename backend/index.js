app.get('/get-grades', (req, res) => {
    // Përdorim tabelën 'enrollments' sepse 'grades' nuk ekziston te fotoja jote
    const sql = `
        SELECT 
            students.firstname, 
            students.lastname, 
            courses.name as course, 
            enrollments.grade 
        FROM enrollments 
        JOIN students ON enrollments.student_id = students.id 
        JOIN courses ON enrollments.course_id = courses.id
    `;
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Gabim në SQL:", err);
            return res.json({ Error: "Gabim në leximin e të dhënave nga enrollments" });
        }
        return res.json({ Status: "Success", Data: result });
    });
});