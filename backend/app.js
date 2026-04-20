const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // Shto këtë (instaloje me: npm install jsonwebtoken)
const app = express();

// Importimi i konfigurimit të DB dhe Modeleve
const sequelize = require('./config/db');
const { User, Student } = require('./models');

app.use(cors());
app.use(express.json());

// 1. SINKRONIZIMI I DATABAZËS
// Kjo krijon tabelat dhe shton kolonat si 'user_id' automatikisht në MySQL
sequelize.sync({ alter: true })
  .then(() => console.log('Sequelize: Databaza është sinkronizuar me sukses!'))
  .catch(err => console.log('Sequelize Error:', err));

// 2. REGJISTRIMI (Duke përdorur Sequelize)
app.post('/register', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        
        if (existingUser) {
            return res.json({ Status: "Exists", Message: "Ky email është i regjistruar!" });
        }

        // Krijojmë përdoruesin e ri
        await User.create({
            firstname,
            lastname,
            email,
            password, // Në projekt real këtu përdoret bcrypt.hash
            role: 'student'
        });

        return res.json({ Status: "Success" });
    } catch (err) {
        return res.status(500).json({ Status: "Error", Message: err.message });
    }
});

// 3. LOGIN (Me gjenerim të Token-it)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email, password } });

        if (user) {
            // Krijohet Token-i (vlefshëm për 1 ditë)
            const token = jwt.sign(
                { id: user.id, role: user.role },
                "sekreti_yt_shume_i_sigurt",
                { expiresIn: '1d' }
            );

            return res.json({ 
                Status: "Success", 
                role: user.role, 
                name: user.firstname,
                token: token // Dërgojmë token-in te frontend-i
            });
        } else {
            return res.json({ Status: "Invalid", Message: "Email ose fjalëkalim i gabuar!" });
        }
    } catch (err) {
        return res.status(500).json({ Status: "Error", Message: err.message });
    }
});

// 4. CRUD - READ STUDENTS
// Marrim studentët dhe i bashkojmë me të dhënat e User (firstname, email)
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

// 5. DELETE STUDENT
app.delete('/delete-student/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Student.destroy({ where: { id: id } });
        return res.json({ Status: "Success" });
    } catch (err) {
        return res.status(500).json({ Status: "Error", Message: err.message });
    }
});

// 6. SHTIMI I NJË STUDENTI TË RI (Me lidhje User-Student)
app.post('/add-student', async (req, res) => {
    try {
        const { firstname, lastname, email, numri_studentit, programi, viti_studimit } = req.body;

        // Krijojmë llogarinë (User)
        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password: 'student123',
            role: 'student'
        });

        // Krijojmë detajet e studentit dhe i lidhim via user_id
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