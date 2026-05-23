
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "student_db"
});

// 1. DASHBOARD HOME (Statistikat)
app.get('/api/dashboard', (req, res) => {
    const sId = req.query.student_id;
    const sql = `SELECT 
        (SELECT COUNT(*) FROM enrollments WHERE student_id = ?) as active,
        (SELECT COUNT(*) FROM waiting_list WHERE student_id = ?) as waiting,
        (SELECT SUM(c.credits) FROM enrollments e JOIN courses c ON e.course_id = c.id WHERE e.student_id = ?) as credits`;
    db.query(sql, [sId, sId, sId], (err, results) => res.json(results[0]));
});

// 2. REGJISTRIMI (Lista e kurseve me JOIN professors)
app.get('/api/all-courses', (req, res) => {
    const sql = `SELECT c.*, p.name as prof_name 
                 FROM courses c 
                 LEFT JOIN professors p ON c.professor_id = p.id`;
    db.query(sql, (err, results) => res.json(results));
});

app.post('/api/register', (req, res) => {
    const { studentId, courseId } = req.body;
    db.query("SELECT capacity, (SELECT COUNT(*) FROM enrollments WHERE course_id = ?) as total FROM courses WHERE id = ?", [courseId, courseId], (err, results) => {
        if(results[0].total < results[0].capacity) {
            db.query("INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)", [studentId, courseId], () => res.json({Message: "Regjistruar me sukses!"}));
        } else {
            db.query("INSERT INTO waiting_list (student_id, course_id) VALUES (?, ?)", [studentId, courseId], () => res.json({Message: "Kursi është plot, u shtove në listën e pritjes!"}));
        }
    });
});

// 3. KURSET E MIA (Enrollments JOIN courses)
app.get('/api/my-courses', (req, res) => {
    const sql = `SELECT c.* FROM courses c 
                 JOIN enrollments e ON c.id = e.course_id 
                 WHERE e.student_id = ?`;
    db.query(sql, [req.query.student_id], (err, results) => res.json(results));
});

// 4. LISTA E PRITJES (WaitingList JOIN courses)
app.get('/api/waiting-list', (req, res) => {
    const sql = `SELECT c.* FROM courses c 
                 JOIN waiting_list w ON c.id = w.course_id 
                 WHERE w.student_id = ?`;
    db.query(sql, [req.query.student_id], (err, results) => res.json(results));
});

// 5. ORARI (Schedules JOIN enrollments)
app.get('/api/schedule', (req, res) => {
    const sql = `SELECT s.*, c.name FROM schedules s 
                 JOIN enrollments e ON s.course_id = e.course_id 
                 JOIN courses c ON c.id = s.course_id
                 WHERE e.student_id = ?`;
    db.query(sql, [req.query.student_id], (err, results) => res.json(results));
});

// 6. NJOFTIMET (Announcements JOIN enrollments)
app.get('/api/announcements', (req, res) => {
    const sql = `SELECT a.* FROM announcements a 
                 JOIN enrollments e ON a.course_id = e.course_id 
                 WHERE e.student_id = ?`;
    db.query(sql, [req.query.student_id], (err, results) => res.json(results));
});

app.listen(5000, () => console.log("Serveri po punon ne portin 5000"));

