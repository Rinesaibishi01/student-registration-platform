const express = require("express");
const cors = require("cors");
const { Op } = require("sequelize"); 
const jwt = require("jsonwebtoken"); 
const app = express();
const sequelize = require('./config/db');

// Importimi i modeleve (Shtuar Semester)
const { User, Student, Enrollment, Course, WaitingList, Announcement, Semester } = require('./models'); 

// Middlewares - Konfigurim i plotë për CORS
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ==========================================
// FUNKSIONI I PËRBASHKËT PËR LOGIN (KYÇJE)
// ==========================================
const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Ju lutem plotësoni email-in dhe fjalëkalimin!" });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Ky përdorues nuk ekziston!" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Fjalëkalimi është i gabuar!" });
        }

        let studentData = null;
        if (user.role === 'student') {
            studentData = await Student.findOne({ where: { user_id: user.id } });
        }

        return res.json({
            message: "Kyçja u krye me sukses!",
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
                student_id: studentData ? studentData.id : null
            }
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// ==========================================
// FUNKSIONI I PËRBASHKËT PËR REGJISTRIM (I Rregulluar)
// ==========================================
const handleRegister = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: "Ju lutem plotësoni të gjitha fushat!" });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Ky email është i regjistruar tashmë!" });
        }

        // Krijojmë User-in
        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password,
            role: 'student'
        });

        // Gjenerojmë një numër studenti automatik
        const numriStudentit = "ST" + Math.floor(100000 + Math.random() * 900000);
        
        // Krijojmë profilin e Studentit të lidhur me User
        await Student.create({ 
            user_id: newUser.id, 
            numri_studentit: numriStudentit, 
            programi: 'I pacaktuar', 
            viti_studimit: 1 
        });

        return res.status(201).json({ 
            Status: "Success", 
            message: "Llogaria u krijua me sukses!",
            role: newUser.role, 
            name: newUser.firstname 
        });

    } catch (err) {
        return res.status(500).json({ Status: "Error", Message: err.message });
    }
};

// Rrugët e Auth
app.post('/api/login', handleLogin);
app.post('/api/register', handleRegister);
app.post('/register', handleRegister); // Fallback


// ==========================================
// 1. MODULI I STUDENTËVE (CRUD i plotë)
// ==========================================
app.post('/add-student', async (req, res) => {
    try {
        const emri = req.body.emri || req.body.firstname;
        const mbiemri = req.body.mbiemri || req.body.lastname;
        const email = req.body.email;
        const numri_studentit = req.body.numri_studentit;
        const programi = req.body.programi;
        const viti_studimit = req.body.viti_studimit;

        const [existing] = await sequelize.query("SELECT id FROM users WHERE email = ?", { replacements: [email] });
        if (existing.length > 0) return res.json({ Status: "Error", Message: "Ky email ekziston në sistem!" });

        const [userResult] = await sequelize.query(
            "INSERT INTO users (firstname, lastname, email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, 'student123', 'student', NOW(), NOW())",
            { replacements: [emri, mbiemri, email] }
        );
        const newUserId = userResult.insertId || userResult; 

        await sequelize.query(
            "INSERT INTO students (user_id, numri_studentit, programi, viti_studimit, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())",
            { replacements: [newUserId, numri_studentit, programi, viti_studimit] }
        );
        return res.json({ Status: "Success", Message: "Studenti u shtua!" });
    } catch (err) {
        return res.json({ Status: "Error", Message: err.message });
    }
});

app.get('/get-students', async (req, res) => {
    try {
        const [results] = await sequelize.query(`
            SELECT s.id, s.numri_studentit, s.programi, s.viti_studimit, u.firstname, u.lastname, u.email
            FROM students s JOIN users u ON s.user_id = u.id ORDER BY s.id DESC
        `);
        const formattedResult = results.map(student => ({
            id: student.id, numri_studentit: student.numri_studentit, programi: student.programi, viti_studimit: student.viti_studimit,
            User: { firstname: student.firstname, lastname: student.lastname, email: student.email }
        }));
        res.json(formattedResult);
    } catch (err) { res.status(500).json({ Status: "Error", Message: err.message }); }
});

app.put('/update-student/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (student) {
            await User.update({ firstname: req.body.emri, lastname: req.body.mbiemri, email: req.body.email }, { where: { id: student.user_id } });
            await student.update({ numri_studentit: req.body.numri_studentit, programi: req.body.programi, viti_studimit: req.body.viti_studimit });
            res.json({ Status: "Success" });
        } else { res.status(404).json({ Status: "Error", Message: "Nuk u gjet" }); }
    } catch (err) { res.status(500).json({ Message: err.message }); }
});

app.delete('/delete-student/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (student) {
            const userId = student.user_id;
            await student.destroy();
            await User.destroy({ where: { id: userId } });
            return res.json({ Status: "Success" });
        }
        return res.status(404).json({ Status: "Error" });
    } catch (err) { return res.status(500).json({ Status: "Error" }); }
});

// ==========================================
// 2. MODULI I PROFESORËVE (CRUD i plotë)
// ==========================================
app.post('/add-teacher', async (req, res) => {
    const { emri, mbiemri, email, telefoni, adresa, universiteti, grada } = req.body;

    try {
        await sequelize.query(
            `INSERT INTO users (firstname, lastname, email, password, role, createdAt, updatedAt) 
             VALUES (?, ?, ?, ?, 'professor', NOW(), NOW())`,
            {
                replacements: [
                    emri || '', 
                    mbiemri || '', 
                    email, 
                    'profesor123' 
                ]
            }
        );

        const [[insertedUser]] = await sequelize.query(
            "SELECT id FROM users WHERE email = ? ORDER BY id DESC LIMIT 1",
            { replacements: [email] }
        );
        
        const newUserId = insertedUser.id;

        await sequelize.query(
            `INSERT INTO professors (user_id, departamenti, telefoni, universiteti, adresa, createdAt, updatedAt) 
             VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
            {
                replacements: [
                    newUserId,
                    grada || 'Web',
                    telefoni || null,
                    universiteti || null,
                    adresa || null
                ]
            }
        );

        return res.json({ Status: "Success", Message: "Profesori u shtua me sukses në të dyja tabelat!" });
    } catch (err) {
        return res.status(500).json({ Status: "Error", Message: err.message });
    }
});

app.get('/get-teachers', async (req, res) => {
    try {
        const [results] = await sequelize.query(`
            SELECT p.id, u.firstname, u.lastname, u.email, p.departamenti 
            FROM users u JOIN professors p ON u.id = p.user_id ORDER BY p.id DESC
        `);
        res.json(results);
    } catch (err) { res.status(500).json({ Message: err.message }); }
});

app.put('/update-teacher/:id', async (req, res) => {
    try {
        const emri = req.body.emri || req.body.firstname;
        const mbiemri = req.body.mbiemri || req.body.lastname;
        const email = req.body.email;
        const departamenti = req.body.departamenti || req.body.grada;

        const [prof] = await sequelize.query("SELECT user_id FROM professors WHERE id = ?", { replacements: [req.params.id] });
        if (prof.length > 0) {
            const userId = prof[0].user_id;
            await sequelize.query("UPDATE users SET firstname=?, lastname=?, email=?, updatedAt=NOW() WHERE id=?", { replacements: [emri, mbiemri, email, userId] });
            await sequelize.query("UPDATE professors SET departamenti=?, updatedAt=NOW() WHERE id=?", { replacements: [departamenti, req.params.id] });
            return res.json({ Status: "Success" });
        }
        return res.status(404).json({ Status: "Error" });
    } catch (err) { res.status(500).json({ Message: err.message }); }
});

app.delete('/delete-teacher/:id', async (req, res) => {
    try {
        const [prof] = await sequelize.query("SELECT user_id FROM professors WHERE id = ?", { replacements: [req.params.id] });
        if (prof.length > 0) {
            const userId = prof[0].user_id;
            await sequelize.query("DELETE FROM professors WHERE id = ?", { replacements: [req.params.id] });
            await sequelize.query("DELETE FROM users WHERE id = ?", { replacements: [userId] });
            return res.json({ Status: "Success" });
        }
        return res.status(404).json({ Status: "Error" });
    } catch (err) { res.status(500).json({ Status: "Error" }); }
});

// ==========================================
// 3. MODULI I KURSEVE (CRUD i plotë)
// ==========================================
app.post('/add-course', async (req, res) => {
    try {
        const emri = req.body.emri_kursit || req.body.emertimi || req.body.emri || req.body.name || req.body.title || "Kurs pa emër";
        const pershkrimi = req.body.pershkrimi || req.body.description || "";
        const kredite = req.body.kredite || req.body.credits || 0;
        const kapaciteti = req.body.kapaciteti || req.body.capacity || 0;
        const professorId = req.body.professor_id || req.body.professorId || req.body.id_profesorit || null;
        const semesterId = req.body.semester_id || req.body.semesterId || req.body.id_semestrit || null;
        const kodi = req.body.kodi || req.body.code || `KOD-${Math.floor(1000 + Math.random() * 9000)}`;

        await Course.create({
            emri_kursit: emri, emertimi: emri, name: emri,
            kodi: kodi, code: kodi,
            pershkrimi: pershkrimi, description: pershkrimi,
            kredite: kredite, credits: kredite,
            kapaciteti: kapaciteti, capacity: kapaciteti,
            professor_id: professorId, professorId: professorId,
            semester_id: semesterId, semesterId: semesterId
        });

        return res.json({ Status: "Success", Message: "Kursi u shtua me sukses!" });
    } catch (err) {
        try {
            const emri = req.body.emri_kursit || req.body.emertimi || req.body.emri || req.body.name;
            const kredite = req.body.kredite || 0;
            const kodi = `KOD-${Math.floor(Math.random() * 1000)}`;
            
            await sequelize.query(
                "INSERT INTO courses (emri_kursit, kodi, kredite, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())",
                { replacements: [emri, kodi, kredite] }
            );
            return res.json({ Status: "Success", Message: "Kursi u shtua (Plan B)!" });
        } catch (sqlErr) {
            return res.status(500).json({ Status: "Error", Message: err.message });
        }
    }
});

app.get('/get-courses', async (req, res) => {
    try {
        const courses = await Course.findAll({ order: [['id', 'DESC']] });
        const formattedResults = courses.map(c => {
            const emriSakt = c.emri_kursit || c.emertimi || c.name || "";
            return {
                id: c.id,
                emertimi: emriSakt, emri_kursit: emriSakt,
                kodi: c.kodi || c.code || "",
                kredite: c.kredite || c.credits || 0,
                kapaciteti: c.kapaciteti || c.capacity || 0
            };
        });
        res.json(formattedResults);
    } catch (err) { 
        try {
            const [results] = await sequelize.query("SELECT * FROM courses ORDER BY id DESC");
            const formatted = results.map(c => ({
                id: c.id,
                emertimi: c.emri_kursit || c.emertimi || c.name || "",
                emri_kursit: c.emri_kursit || c.emertimi || c.name || "",
                kredite: c.kredite || 0
            }));
            res.json(formatted);
        } catch (e) {
            res.status(500).json({ Message: err.message }); 
        }
    }
});

app.put('/update-course/:id', async (req, res) => {
    try {
        const emri = req.body.emri_kursit || req.body.emertimi || req.body.emri || req.body.name;
        const kredite = req.body.kredite || 0;
        const pershkrimi = req.body.pershkrimi || "";
        const kapaciteti = req.body.kapaciteti || 0;

        const course = await Course.findByPk(req.params.id);
        if (course) {
            await course.update({
                emri_kursit: emri, emertimi: emri, name: emri,
                kredite: kredite, pershkrimi: pershkrimi, kapaciteti: kapaciteti
            });
            return res.json({ Status: "Success" });
        }
        
        await sequelize.query("UPDATE courses SET emri_kursit=?, kredite=?, updatedAt=NOW() WHERE id=?", { replacements: [emri, kredite, req.params.id] });
        return res.json({ Status: "Success" });
    } catch (err) { res.status(500).json({ Message: err.message }); }
});

app.delete('/delete-course/:id', async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (course) {
            await course.destroy();
            return res.json({ Status: "Success" });
        }
        await sequelize.query("DELETE FROM courses WHERE id = ?", { replacements: [req.params.id] });
        return res.json({ Status: "Success" });
    } catch (err) { res.status(500).json({ Status: "Error" }); }
});

// ==========================================
// 4. MODULI I SEMESTRAVE (CRUD i plotë)
// ==========================================
app.post('/add-semester', async (req, res) => {
    try {
        const emri = req.body.emri_semestrit || req.body.emri || req.body.name || req.body.emertimi;
        const viti = req.body.viti_akademik || req.body.viti || req.body.vitiAcademic || "";

        await Semester.create({
            emri_semestrit: emri, emertimi: emri, name: emri, viti_akademik: viti, viti: viti
        });
        return res.json({ Status: "Success", Message: "Semestri u shtua!" });
    } catch (err) { return res.status(500).json({ Status: "Error", Message: err.message }); }
});

app.get('/get-semesters', async (req, res) => {
    try {
        const semesters = await Semester.findAll({ order: [['id', 'DESC']] });
        const formattedResults = semesters.map(sem => {
            const emriSakt = sem.emri_semestrit || sem.emertimi || sem.name || "";
            const vitiSakt = sem.viti_akademik || sem.viti || "";
            return {
                id: sem.id, emertimi: emriSakt, emri_semestrit: emriSakt, name: emriSakt, viti_akademik: vitiSakt, viti: vitiSakt
            };
        });
        res.json(formattedResults);
    } catch (err) { res.status(500).json({ Message: err.message }); }
});

app.put('/update-semester/:id', async (req, res) => {
    try {
        const emri = req.body.emri_semestrit || req.body.emri || req.body.name || req.body.emertimi;
        const viti = req.body.viti_akademik || req.body.viti || req.body.vitiAcademic || "";

        const semester = await Semester.findByPk(req.params.id);
        if (semester) {
            await semester.update({ emri_semestrit: emri, emertimi: emri, name: emri, viti_akademik: viti, viti: viti });
            return res.json({ Status: "Success" });
        }
        return res.status(404).json({ Status: "Error" });
    } catch (err) { return res.status(500).json({ Status: "Error", Message: err.message }); }
});

app.delete('/delete-semester/:id', async (req, res) => {
    try {
        const semester = await Semester.findByPk(req.params.id);
        if (semester) {
            await semester.destroy();
            return res.json({ Status: "Success" });
        }
        return res.status(404).json({ Status: "Error" });
    } catch (err) { return res.status(500).json({ Status: "Error" }); }
});

// ==========================================
// Rruga tjetër e Login (Me JWT)
// ==========================================
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email, password } });
        if (user) {
            let studentId = null;
            if (user.role === 'student') {
                const student = await Student.findOne({ where: { user_id: user.id } });
                studentId = student ? student.id : null;
            }
            const token = jwt.sign({ id: user.id, role: user.role }, "sekreti_yt_shume_i_sigurt", { expiresIn: '1d' });
            return res.json({ Status: "Success", role: user.role, name: user.firstname, studentId, token });
        } else { 
            return res.json({ Status: "Invalid", Message: "Gabim!" }); 
        }
    } catch (err) { return res.status(500).json({ Status: "Error", Message: err.message }); }
});

// ==========================================
// API PËR STATISTIKAT E DASHBOARD-IT
// ==========================================
app.get('/api/dashboard-stats', async (req, res) => {
    try {
        const [[{ totalStudents }]] = await sequelize.query("SELECT COUNT(*) as totalStudents FROM students");
        const [[{ totalCourses }]] = await sequelize.query("SELECT COUNT(*) as totalCourses FROM courses");
        
        let totalEnrollments = 0;
        try {
            const [[{ count }]] = await sequelize.query("SELECT COUNT(*) as count FROM enrollments");
            totalEnrollments = count;
        } catch(e) { totalEnrollments = 0; }

        let totalAnnouncements = 0;
        try {
            const [[{ count }]] = await sequelize.query("SELECT COUNT(*) as count FROM announcements");
            totalAnnouncements = count;
        } catch(e) { totalAnnouncements = 0; }

        res.json({
            students: totalStudents || 0,
            courses: totalCourses || 0,
            enrollments: totalEnrollments || 0,
            announcements: totalAnnouncements || 0
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ==========================================
// API PËR PROFESORIN DHE ORARIN
// ==========================================
app.get('/api/professor/:id/courses', async (req, res) => {
    const loggedInUserId = req.params.id;
    try {
        const [[professor]] = await sequelize.query(
            `SELECT id FROM professors WHERE user_id = ? LIMIT 1`,
            { replacements: [loggedInUserId] }
        );
        const realProfessorId = professor ? professor.id : loggedInUserId;

        const [courses] = await sequelize.query(
            `SELECT id, emertimi, kapaciteti FROM courses WHERE professor_id = ? OR professor_id = ?`,
            { replacements: [realProfessorId, loggedInUserId] }
        );

        const safeCourses = courses.map(course => ({ ...course, kreditet: 6 }));
        return res.json(safeCourses);
    } catch (err) {
        return res.status(500).json({ Status: "Error", Message: err.message });
    }
});

app.get('/api/professor/:id/grading-students', async (req, res) => {
    const loggedInUserId = req.params.id; 
    try {
        const [studentet] = await sequelize.query(`
            SELECT e.student_id, c.emertimi AS course_title, e.data_regjistrimit, e.statusi,
                   u.firstname AS student_name, u.lastname AS student_lastname
            FROM enrollments e
            JOIN courses c ON e.course_id = c.id
            JOIN students s ON e.student_id = s.id
            JOIN users u ON s.user_id = u.id
            WHERE c.professor_id = 3 OR c.professor_id = ?
        `, { replacements: [loggedInUserId] });

        return res.json(studentet);
    } catch (err) {
        return res.status(500).json({ Status: "Error", Message: err.message });
    }
});

app.get('/api/professor/:id/schedules', async (req, res) => {
    const professorId = req.params.id; 
    try {
        const [orari] = await sequelize.query(`
            SELECT s.course_id, s.dita, s.ora_fillimit, s.ora_mbarimit, s.salla 
            FROM schedules s
            JOIN courses c ON s.course_id = c.id
            WHERE c.professor_id = ?
        `, { replacements: [professorId] });
        res.json(orari);
    } catch (err) {
        res.status(500).json({ Error: "Gabim në server: " + err.message });
    }
});

app.post('/api/professor/announcements', async (req, res) => {
    const { title, content } = req.body; 
    if (!title || !content) return res.status(400).json({ Error: "Titulli dhe përmbajtja janë të detyrueshme!" });

    try {
        await sequelize.query(`
            INSERT INTO announcements (titulli, permbajtja, data_postimit, course_id) 
            VALUES (?, ?, NOW(), NULL)
        `, { replacements: [title, content] });
        res.json({ Message: "Njoftimi u publikua me sukses!" });
    } catch (err) {
        res.status(500).json({ Error: "Gabim në MySQL: " + err.message });
    }
});

// ==========================================
// API PËR STUDENTIN (REGJISTRIMI I KURSEVE)
// ==========================================
app.post('/api/student/register-course', async (req, res) => {
    const { student_user_id, course_id } = req.body;
    try {
        let [student] = await sequelize.query('SELECT id FROM students WHERE user_id = ? LIMIT 1', { replacements: [student_user_id] });

        let studentId;
        if (student.length === 0) {
            const [result] = await sequelize.query('INSERT INTO students (user_id, createdAt, updatedAt) VALUES (?, NOW(), NOW())', { replacements: [student_user_id] });
            studentId = result;
        } else {
            studentId = student[0].id;
        }

        const [existing] = await sequelize.query('SELECT id FROM enrollments WHERE student_id = ? AND course_id = ?', { replacements: [studentId, course_id] });
        if (existing.length > 0) return res.status(400).json({ Message: "Ju jeni të regjistruar në këtë lëndë!" });

        await sequelize.query('INSERT INTO enrollments (student_id, course_id, data_regjistrimit, statusi) VALUES (?, ?, NOW(), ?)', { replacements: [studentId, course_id, 'Aktiv'] });
        return res.json({ Status: "Success", Message: "U regjistruat me sukses!" });
    } catch (err) {
        return res.status(500).json({ Error: err.message });
    }
});

app.get('/api/courses-list', async (req, res) => {
    try {
        const [courses] = await sequelize.query(`
            SELECT c.id, c.emertimi, c.pershkrimi, u.firstname AS professor_name, u.lastname AS professor_lastname 
            FROM courses c
            JOIN professors p ON c.professor_id = p.id
            JOIN users u ON p.user_id = u.id
        `);
        res.json(courses);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

// ==========================================
// API E ADMINIT (ORARI I RI)
// ==========================================
app.post('/api/admin/schedules', async (req, res) => {
    const { course_id, dita, ora_fillimit, ora_mbarimit, salla } = req.body;
    try {
        await sequelize.query(`
            INSERT INTO schedules (course_id, dita, ora_fillimit, ora_mbarimit, salla) 
            VALUES (?, ?, ?, ?, ?)
        `, { replacements: [course_id, dita, ora_fillimit, ora_mbarimit, salla] });
        res.json({ Message: "Orari u shtua me sukses!" });
    } catch (err) {
        res.status(500).json({ Error: "Gabim në databazë: " + err.message });
    }
});

app.get('/', (req, res) => {
    res.send("Serveri i platformës studentore është aktiv dhe po punon!");
});

// =========================================================================
// SHTESA PËR RRUGËT E STUDENTIT (Ngjite në fund të app.js para app.listen)
// =========================================================================

// 1. Për faqen "Përmbledhja" (Kreditë, listat e pritjes, etj.)
const handleStudentDashboard = async (req, res) => {
    const sId = req.params.id || req.query.student_id || 1; // nese mungon, merr ID 1 si default
    try {
        const [[stats]] = await sequelize.query(`
            SELECT 
                (SELECT COUNT(*) FROM enrollments WHERE student_id = ?) as active,
                (SELECT COUNT(*) FROM waiting_lists WHERE student_id = ?) as waiting,
                (SELECT IFNULL(SUM(c.kredite), 0) FROM enrollments e JOIN courses c ON e.course_id = c.id WHERE e.student_id = ?) as credits
        `, { replacements: [sId, sId, sId] });
        
        res.json(stats || { active: 0, waiting: 0, credits: 0 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
app.get('/api/dashboard', handleStudentDashboard);
app.get('/api/student-dashboard/:id', handleStudentDashboard); 

// 2. Për faqen "Regjistro Kurset" (Shfaqja e lëndëve)
app.get('/api/all-courses', async (req, res) => {
    try {
        const [courses] = await sequelize.query(`
            SELECT c.*, u.firstname AS prof_name, u.lastname AS prof_lastname 
            FROM courses c 
            LEFT JOIN professors p ON c.professor_id = p.id
            LEFT JOIN users u ON p.user_id = u.id
            ORDER BY c.id DESC
        `);
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Për faqen "Orari Im"
app.get('/api/schedule', async (req, res) => {
    const sId = req.query.student_id || 1;
    try {
        const [schedules] = await sequelize.query(`
            SELECT s.*, c.emri_kursit AS name FROM schedules s 
            JOIN enrollments e ON s.course_id = e.course_id 
            JOIN courses c ON c.id = s.course_id
            WHERE e.student_id = ?
        `, { replacements: [sId] });
        res.json(schedules || []);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Kurset e mia dhe njoftimet (për t'u siguruar që asgjë nuk bllokohet)
app.get('/api/my-courses', async (req, res) => {
    const sId = req.query.student_id || 1;
    try {
        const [courses] = await sequelize.query("SELECT c.* FROM courses c JOIN enrollments e ON c.id = e.course_id WHERE e.student_id = ?", { replacements: [sId] });
        res.json(courses || []);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/waiting-list', async (req, res) => {
    const sId = req.query.student_id || 1;
    try {
        const [courses] = await sequelize.query("SELECT c.* FROM courses c JOIN waiting_lists w ON c.id = w.course_id WHERE w.student_id = ?", { replacements: [sId] });
        res.json(courses || []);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// ==========================================
// INITIALIZIMI DHE NDEZJA E SERVERIT
// ==========================================
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const courseRoutes = require('./routes/courseRoutes'); 

app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/courses', courseRoutes);

sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced successfully!');
    app.listen(5000, () => {
        console.log("Serveri po punon ne portin 5000");
    });
}).catch(err => {
    console.error("Gabim te databaza:", err);
});
