const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();

// Importimi i konfigurimit të DB dhe Modeleve
const sequelize = require('./config/db');
const { User, Student, Enrollment } = require('./models'); 

// Importi i rrugëve të reja (Vetëm një herë këtu lart)
const enrollmentRoutes = require('./routes/enrollmentRoutes'); 

// Middleware-ët kryesorë (Duhet të jenë gjithmonë para rrugëve/routes)
app.use(cors());
app.use(express.json());

// 1. SINKRONIZIMI I DATABAZËS
sequelize.sync({ alter: true })
  .then(() => console.log('Sequelize: Databaza është sinkronizuar me sukses!'))
  .catch(err => console.log('Sequelize Error:', err));

// 2. REGJISTRIMI
app.post('/register', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        
        if (existingUser) {
            return res.json({ Status: "Exists", Message: "Ky email është i regjistruar!" });
        }

        await User.create({
            firstname,
            lastname,
            email,
            password, 
            role: 'student'
        });

        return res.json({ Status: "Success" });
    } catch (err) {
        return res.status(500).json({ Status: "Error", Message: err.message });
    }
});

// 3. LOGIN (I përmirësuar me studentId)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email, password } });

        if (user) {
            // Gjejmë studentId nëse përdoruesi është student
            let studentId = null;
            if (user.role === 'student') {
                const student = await Student.findOne({ where: { user_id: user.id } });
                studentId = student ? student.id : null;
            }

            const token = jwt.sign(
                { id: user.id, role: user.role },
                "sekreti_yt_shume_i_sigurt",
                { expiresIn: '1d' }
            );

            return res.json({ 
                Status: "Success", 
                role: user.role, 
                name: user.firstname,
                studentId: studentId, // Kjo i dërgohet Frontend-it
                token: token 
            });
        } else {
            return res.json({ Status: "Invalid", Message: "Email ose fjalëkalim i gabuar!" });
        }
    } catch (err) {
        return res.status(500).json({ Status: "Error", Message: err.message });
    }
});

// 4. REGJISTRO RRUGËT E ENROLLMENTS (Vetëm një herë, këtu poshtë express.json())
app.use('/api/enrollments', enrollmentRoutes);

// 5. CRUD - READ STUDENTS
app.get('/students', async (req, res) => {
    try {
        const result = await Student.findAll({
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

// 6. DELETE STUDENT
app.delete('/delete-student/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Student.destroy({ where: { id: id } });
        return res.json({ Status: "Success" });
    } catch (err) {
        return res.status(500).json({ Status: "Error", Message: err.message });
    }
});

// 7. SHTIMI I NJË STUDENTI TË RI
app.post('/add-student', async (req, res) => {
    try {
        const { firstname, lastname, email, numri_studentit, programi, viti_studimit } = req.body;

        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password: 'student123',
            role: 'student'
        });

        await Student.create({
            user_id: newUser.id,
            numri_studentit,
            programi,
            viti_studimit
        });

        res.json({ Status: "Success" });
    } catch (err) {
        res.status(500).json({ Status: "Error", Message: err.message });
    }
});

app.listen(5000, () => console.log("Serveri po punon me Sequelize në portin 5000"));