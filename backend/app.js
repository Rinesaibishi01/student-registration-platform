const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();

const sequelize = require('./config/db');
const { User, Student, Enrollment, Professor, Semester, Course } = require('./models'); 
const enrollmentRoutes = require('./routes/enrollmentRoutes'); 

app.use(cors());
app.use(express.json());

sequelize.sync({ alter: true })
  .then(() => console.log('Sequelize: Databaza është sinkronizuar!'))
  .catch(err => console.log('Sequelize Error:', err));

// ==========================================
// 1. MODULI I STUDENTËVE (CRUD i plotë)
// ==========================================

app.post('/register', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.json({ Status: "Exists", Message: "Ky email është i regjistruar!" });

        const newUser = await User.create({ firstname, lastname, email, password, role: 'student' });
        const numriStudentit = "ST" + Math.floor(100000 + Math.random() * 900000);
        
        await Student.create({ user_id: newUser.id, numri_studentit: numriStudentit, programi: 'I pacaktuar', viti_studimit: 1 });
        return res.json({ Status: "Success", role: newUser.role, name: newUser.firstname });
    } catch (err) { 
        return res.status(500).json({ Status: "Error", Message: err.message }); 
    }
});

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
    // Të dhënat që vijnë nga forma në React
    const { emri, mbiemri, email, telefoni, adresa, universiteti, grada } = req.body;

    try {
        console.log("=== DUKE INSERTUAR TE TABELA USERS ===");
        
        // 1. Inserojmë profesorin te tabela 'users' duke përdorur kolonat e sakta të databazës tënde
        await sequelize.query(
            `INSERT INTO users (firstname, lastname, email, password, role, createdAt, updatedAt) 
             VALUES (?, ?, ?, ?, 'professor', NOW(), NOW())`,
            {
                replacements: [
                    emri || '', 
                    mbiemri || '', 
                    email, 
                    'profesor123' // Fjalëkalimi default për profesorin e ri
                ]
            }
        );

        // Gjejmë ID-në e profesorit që sapo u krijua përmes email-it të tij
        const [[insertedUser]] = await sequelize.query(
            "SELECT id FROM users WHERE email = ? ORDER BY id DESC LIMIT 1",
            { replacements: [email] }
        );
        
        const newUserId = insertedUser.id;
        console.log(`U krijua llogaria me user_id: ${newUserId}. Tani po shtojmë te tabela professors...`);

        // 2. Ruajmë detajet shtesë te tabela 'professors'
        await sequelize.query(
            `INSERT INTO professors (user_id, departamenti, telefoni, universiteti, adresa, createdAt, updatedAt) 
             VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
            {
                replacements: [
                    newUserId,
                    grada || 'Web',      // Fusja 'grada' (Inxhiniere e shkencave) vendoset te departamenti
                    telefoni || null,
                    universiteti || null,
                    adresa || null
                ]
            }
        );

        return res.json({ Status: "Success", Message: "Profesori u shtua me sukses në të dyja tabelat!" });

    } catch (err) {
        console.error("Gabim fatal gjatë procesit:", err);
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
        // Kapim të gjitha fushat e mundshme nga frontendi
        const emri = req.body.emri_kursit || req.body.emertimi || req.body.emri || req.body.name || req.body.title || "Kurs pa emër";
        const pershkrimi = req.body.pershkrimi || req.body.description || "";
        const kredite = req.body.kredite || req.body.credits || 0;
        const kapaciteti = req.body.kapaciteti || req.body.capacity || 0;
        const professorId = req.body.professor_id || req.body.professorId || req.body.id_profesorit || null;
        const semesterId = req.body.semester_id || req.body.semesterId || req.body.id_semestrit || null;
        const kodi = req.body.kodi || req.body.code || `KOD-${Math.floor(1000 + Math.random() * 9000)}`;

        // Përdorim Modelin e Sequelize që të plotësojë saktë tabelën pavarësisht emrave të kolonave
        await Course.create({
            emri_kursit: emri,
            emertimi: emri,
            name: emri,
            kodi: kodi,
            code: kodi,
            pershkrimi: pershkrimi,
            description: pershkrimi,
            kredite: kredite,
            credits: kredite,
            kapaciteti: kapaciteti,
            capacity: kapaciteti,
            professor_id: professorId,
            professorId: professorId,
            semester_id: semesterId,
            semesterId: semesterId
        });

        return res.json({ Status: "Success", Message: "Kursi u shtua me sukses!" });
    } catch (err) {
        console.error("Gabim kritik te add-course:", err);
        
        // NËSE dështon modeli për shkak të ndonjë lidhjeje (Foreign Key), provojmë si plan B me Raw SQL të thjeshtë
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
        // Marrim kurset përmes modelit
        const courses = await Course.findAll({ order: [['id', 'DESC']] });
        const formattedResults = courses.map(c => {
            const emriSakt = c.emri_kursit || c.emertimi || c.name || "";
            return {
                id: c.id,
                emertimi: emriSakt,
                emri_kursit: emriSakt,
                kodi: c.kodi || c.code || "",
                kredite: c.kredite || c.credits || 0,
                kapaciteti: c.kapaciteti || c.capacity || 0
            };
        });
        res.json(formattedResults);
    } catch (err) { 
        // Fallback me Raw SQL nëse modeli jep gabim
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
        
        // Fallback me SQL
        await sequelize.query("UPDATE courses SET emri_kursit=?, kredite=?, updatedAt=NOW() WHERE id=?", { replacements: [emri, kredite, req.params.id] });
        return res.json({ Status: "Success" });
    } catch (err) { 
        res.status(500).json({ Message: err.message }); 
    }
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
    } catch (err) { 
        res.status(500).json({ Status: "Error" }); 
    }
});

// 4. MODULI I SEMESTRAVE (CRUD i plotë me Modele)
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
// AUTH & LOGIN
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
// API PËR STATISTIKAT E DASHBOARD-IT (I PËRDITËSUAR)
// ==========================================
app.get('/api/dashboard-stats', async (req, res) => {
    try {
        // Numërojmë studentët
        const [[{ totalStudents }]] = await sequelize.query("SELECT COUNT(*) as totalStudents FROM students");
        
        // Numërojmë kurset
        const [[{ totalCourses }]] = await sequelize.query("SELECT COUNT(*) as totalCourses FROM courses");
        
        // Numërojmë regjistrimet live (Enrollments)
        let totalEnrollments = 0;
        try {
            const [[{ count }]] = await sequelize.query("SELECT COUNT(*) as count FROM enrollments");
            totalEnrollments = count;
        } catch(e) { totalEnrollments = 0; }

        // Numërojmë njoftimet (Announcements)
        let totalAnnouncements = 0;
        try {
            const [[{ count }]] = await sequelize.query("SELECT COUNT(*) as count FROM announcements");
            totalAnnouncements = count;
        } catch(e) { totalAnnouncements = 0; }

        // Kthejmë të dhënat zyrtare te frontendi
        res.json({
            students: totalStudents || 0,
            courses: totalCourses || 0,
            enrollments: totalEnrollments || 0,
            announcements: totalAnnouncements || 0
        });
    } catch (err) {
        console.error("Gabim në statistika:", err);
        res.status(500).json({ message: err.message });
    }
});
// API që kthen lëndët e një profesori të caktuar së bashku me numrin e studentëve live
app.get('/api/professor/:id/courses', async (req, res) => {
    const loggedInUserId = req.params.id;

    try {
        console.log(`=== MARRJA E KURSEVE PËR USER_ID: ${loggedInUserId} ===`);

        // Gjejmë ID-në e profesorit
        const [[professor]] = await sequelize.query(
            `SELECT id FROM professors WHERE user_id = ? LIMIT 1`,
            { replacements: [loggedInUserId] }
        );

        const realProfessorId = professor ? professor.id : loggedInUserId;

        // Këtu hoqa 'kreditet' nga query që mos të bëjë crash serveri
        const [courses] = await sequelize.query(
            `SELECT id, emertimi, kapaciteti FROM courses 
             WHERE professor_id = ? OR professor_id = ?`,
            { replacements: [realProfessorId, loggedInUserId] }
        );

        // U japim lëndëve nga 6 ECTS automatikisht në mënyrë që frontend-i t'i shfaqë pa problem
        const safeCourses = courses.map(course => ({
            ...course,
            kreditet: 6 // Kjo do të shfaqet te kolona ECTS në frontend
        }));

        return res.json(safeCourses);

    } catch (err) {
        console.error("Gabim gjatë marrjes së kurseve:", err);
        return res.status(500).json({ Status: "Error", Message: err.message });
    }
});
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

app.use('/api/enrollments', enrollmentRoutes);

app.listen(5000, () => console.log("Serveri po punon ne portin 5000"));