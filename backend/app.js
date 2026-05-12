const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();



// Importimi i konfigurimit të DB dhe Modeleve
const sequelize = require('./config/db');
// 1. NDRYSHIMI: Shto 'Professor' te importet nga models
const { User, Student, Professor, Semester, Course} = require('./models');
app.use(cors());
app.use(express.json());

// 1. SINKRONIZIMI I DATABAZËS
sequelize.sync({ alter: true })
  .then(() => console.log('Sequelize: Databaza është sinkronizuar me sukses!'))
  .catch(err => console.log('Sequelize Error:', err));

// --- RRUGËT EKZISTUESE (REGISTER, LOGIN, STUDENTS) ---
app.post('/register', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.json({ Status: "Exists", Message: "Ky email është i regjistruar!" });
        await User.create({ firstname, lastname, email, password, role: 'student' });
        return res.json({ Status: "Success" });
    } catch (err) { return res.status(500).json({ Status: "Error", Message: err.message }); }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email, password } });
        if (user) {
            const token = jwt.sign({ id: user.id, role: user.role }, "sekreti_yt_shume_i_sigurt", { expiresIn: '1d' });
            return res.json({ Status: "Success", role: user.role, name: user.firstname, token: token });
        } else { return res.json({ Status: "Invalid", Message: "Email ose fjalëkalim i gabuar!" }); }
    } catch (err) { return res.status(500).json({ Status: "Error", Message: err.message }); }
});

app.get('/get-students', async (req, res) => {
    try {
        const result = await Student.findAll({
            // Join me tabelën User për të marrë emrin dhe mbiemrin
            include: [{ 
                model: User, 
                attributes: ['firstname', 'lastname', 'email'] 
            }],
            order: [['id', 'DESC']]
        });
        res.json(result);
    } catch (err) { 
        res.status(500).json({ Status: "Error", Message: err.message }); 
    }
});

app.delete('/delete-student/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // 1. Gjejmë studentin për të marrë user_id-në e lidhur
        const student = await Student.findByPk(id);
        
        if (!student) {
            return res.status(404).json({ Status: "Error", Message: "Studenti nuk u gjet" });
        }

        const userId = student.user_id;

        // 2. Fshijmë studentin (tabela students)
        await student.destroy();

        // 3. Fshijmë përdoruesin (tabela users)
        await User.destroy({ where: { id: userId } });

        return res.json({ Status: "Success" });
    } catch (err) { 
        console.error("Gabim gjatë fshirjes:", err);
        return res.status(500).json({ Status: "Error", Message: err.message }); 
    }
});
app.put('/update-student/:id', async (req, res) => {
    const { id } = req.params;
    const { emri, mbiemri, email, numri_studentit, programi, viti_studimit } = req.body;

    try {
        // Gjejmë studentin për të marrë user_id-në
        const student = await Student.findByPk(id);
        
        if (student) {
            // Përditësojmë User-in
            await User.update(
                { firstname: emri, lastname: mbiemri, email: email },
                { where: { id: student.user_id } }
            );

            // Përditësojmë Studentin
            await student.update({ numri_studentit, programi, viti_studimit });

            res.json({ Status: "Success" });
        } else {
            res.status(404).json({ Message: "Studenti nuk u gjet" });
        }
    } catch (err) {
        res.status(500).json({ Message: err.message });
    }
});

//
app.post('/add-student', async (req, res) => {
    try {
        // Marrim të gjitha fushat që dërgon Frontend-i
        const { emri, mbiemri, email, numri_studentit, programi, viti_studimit } = req.body;

        // 1. Krijohet User-i me të dhënat reale
        const newUser = await User.create({
            firstname: emri,
            lastname: mbiemri,
            email: email,
            password: 'student123',
            role: 'student'
        });

        // 2. Lidhet me tabelën Student
        await Student.create({ 
            user_id: newUser.id, 
            numri_studentit, 
            programi, 
            viti_studimit: viti_studimit || 1 
        });

        res.json({ Status: "Success" });
    } catch (err) { 
        res.status(500).json({ Status: "Error", Message: err.message }); 
    }
});

// 2. NDRYSHIMI: RRUGA E RREGULLUAR PËR PROFESORËT
app.post('/add-teacher', async (req, res) => {
    try {
        // Shiko në terminal se çfarë po vjen saktësisht nga frontendi
        console.log("Të dhënat e pranuara:", req.body); 

        const { emri, mbiemri, email, telefoni, grada, universiteti, adresa } = req.body;

        const newUser = await User.create({
            firstname: emri,
            lastname: mbiemri,
            email: email,
            password: 'professor123',
            role: 'professor'
        });

        // KETU DUHET KUJDES: Emrat majtas duhet të jenë si në DB
        // Emrat djathtas duhet të jenë si ato te { const } më lart
        await Professor.create({
            user_id: newUser.id,
            departamenti: grada, 
            telefoni: telefoni,
            universiteti: universiteti,
            adresa: adresa
        });

        return res.json({ Status: "Success" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ Status: "Error", Message: err.message });
    }
});

//kodi per me marre listen e prfesorve nga databaza dhe me i dergu ne frontend
app.get('/get-teachers', async (req, res) => {
    try {
        // Përdorim një Query SQL për të bashkuar tabelat dhe për të marrë emrin e plotë
        const [results] = await sequelize.query(`
            SELECT u.id, u.firstname, u.lastname, u.email, p.departamenti, p.universiteti 
            FROM users u 
            JOIN professors p ON u.id = p.user_id
            WHERE u.role = 'professor'
        `);
        
        console.log("Profesorët u gjetën me sukses");
        res.status(200).json(results);
    } catch (err) {
        console.error("Gabim te get-teachers:", err);
        res.status(500).json({ Message: "Gabim gjatë marrjes së të dhënave: " + err.message });
    }
});
// Rruga për të fshirë një profesor
app.delete('/delete-teacher/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Fshijmë së pari nga tabela professors (për shkak të Foreign Key)
        await sequelize.query("DELETE FROM professors WHERE user_id = ?", { replacements: [id] });
        // Pastaj fshijmë nga tabela users
        await sequelize.query("DELETE FROM users WHERE id = ?", { replacements: [id] });
        
        res.json({ Status: "Success" });
    } catch (err) {
        res.status(500).json({ Message: err.message });
    }
});

// Rruga për të përditësuar një profesor (përditëson edhe në tabelën users dhe professors)
// Rruga për përditësimin e profesorit
app.put('/update-teacher/:id', async (req, res) => {
    const { id } = req.params;
    const { emri, mbiemri, email, telefoni, grada, universiteti, adresa } = req.body;

    try {
        // 1. Përditësojmë të dhënat bazë në tabelën users
        await sequelize.query(
            "UPDATE users SET firstname = ?, lastname = ?, email = ? WHERE id = ?",
            { replacements: [emri, mbiemri, email, id] }
        );

        // 2. Përditësojmë detajet profesionale në tabelën professors
        await sequelize.query(
            "UPDATE professors SET departamenti = ?, telefoni = ?, universiteti = ?, adresa = ? WHERE user_id = ?",
            { replacements: [grada, telefoni, universiteti, adresa, id] }
        );

        console.log(`Profesorit me ID ${id} iu përditësuan të dhënat.`);
        res.json({ Status: "Success" });
    } catch (err) {
        console.error("Gabim gjatë UPDATE:", err);
        res.status(500).json({ Message: "Gabim në server: " + err.message });
    }

    
});
app.post("/semesters/add", async (req, res) => {
    try {
        const { emertimi, viti_akademik } = req.body;
        // Sigurohu që variabla 'Semester' është e definuar më lart
        const iRi = await Semester.create({ emertimi, viti_akademik });
        res.status(200).json({ message: "U shtua!", data: iRi });
    } catch (err) {
        console.error("Gabim te shtimi i semestrit:", err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/add-course', async (req, res) => {
    try {
        const { emertimi, pershkrimi, kredite, professor_id, semester_id, kapaciteti } = req.body;

        const kursiIRi = await Course.create({
            emertimi,
            pershkrimi,
            kredite,
            professor_id,
            semester_id,
            kapaciteti
        });

        res.status(200).json({ Status: "Success", Message: "Kursi u shtua me sukses!", data: kursiIRi });
    } catch (err) {
        console.error("Gabim te shtimi i kursit:", err);
        res.status(500).json({ Status: "Error", Message: err.message });
    }
});
app.listen(5000, () => console.log("Serveri po punon me Sequelize në portin 5000"));