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

app.post('/register', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.json({ Status: "Exists", Message: "Ky email është i regjistruar!" });

        const newUser = await User.create({
            firstname, lastname, email, password, role: 'student'
        });

        return res.json({ Status: "Success", role: newUser.role, name: newUser.firstname });
    } catch (err) { 
        return res.status(500).json({ Status: "Error", Message: err.message }); 
    }
});

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

app.get('/get-students', async (req, res) => {
    try {
        const result = await Student.findAll({
            include: [{ model: User, attributes: ['firstname', 'lastname', 'email'] }],
            order: [['id', 'DESC']]
        });
        res.json(result);
    } catch (err) { res.status(500).json({ Status: "Error", Message: err.message }); }
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
    } catch (err) { return res.status(500).json({ Status: "Error" }); }
});

app.put('/update-student/:id', async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (student) {
            await User.update({ firstname: req.body.emri, lastname: req.body.mbiemri, email: req.body.email }, { where: { id: student.user_id } });
            await student.update({ numri_studentit: req.body.numri_studentit, programi: req.body.programi, viti_studimit: req.body.viti_studimit });
            res.json({ Status: "Success" });
        }
    } catch (err) { res.status(500).json({ Message: err.message }); }
});

app.post('/add-teacher', async (req, res) => {
    try {
        const { emri, mbiemri, email, telefoni, grada, universiteti, adresa } = req.body;
        const newUser = await User.create({ firstname: emri, lastname: mbiemri, email, password: 'professor123', role: 'professor' });
        await Professor.create({ user_id: newUser.id, departamenti: grada, telefoni, universiteti, adresa });
        return res.json({ Status: "Success" });
    } catch (err) { return res.status(500).json({ Status: "Error" }); }
});

app.get('/get-teachers', async (req, res) => {
    try {
        const [results] = await sequelize.query("SELECT u.id, u.firstname, u.lastname, u.email, p.departamenti FROM users u JOIN professors p ON u.id = p.user_id");
        res.json(results);
    } catch (err) { res.status(500).json({ Message: err.message }); }
});

app.use('/api/enrollments', enrollmentRoutes);

app.listen(5000, () => console.log("Serveri po punon ne portin 5000"));