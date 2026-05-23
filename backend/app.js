const express = require("express");
const cors = require("cors");
const { Op } = require("sequelize"); 
const app = express();
const sequelize = require('./config/db');

// Importimi i modeleve
const { User, Student, Enrollment, Course, WaitingList, Announcement } = require('./models'); 

// Middlewares - Konfigurim i plotë për CORS që të mos bllokohet asnjë kërkesë
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // Portat e React-it
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
        // 1. Kontrollojmë nëse përdoruesi ekziston
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Ky përdorues nuk ekziston!" });
        }

        // 2. Kontrollojmë fjalëkalimin tekstual
        if (user.password !== password) {
            return res.status(401).json({ message: "Fjalëkalimi është i gabuar!" });
        }

        let studentData = null;
        if (user.role === 'student') {
            studentData = await Student.findOne({ where: { user_id: user.id } });
        }

        // Kthejmë të dhënat e plota për Frontend-in
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
// FUNKSIONI I PËRBASHKËT PËR REGJISTRIM
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

        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password,
            role: 'student'
        });

        await Student.create({ user_id: newUser.id });

        return res.status(201).json({ message: "Llogaria u krijua me sukses!" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Rrugët (Routes) - Mbështesim të dyja formatet që asnjë kërkesë të mos kthejë 404
app.post('/api/login', handleLogin);
app.post('/login', handleLogin);

app.post('/api/register', handleRegister);
app.post('/register', handleRegister);

// Rrugë testuese për të parë nëse serveri përgjigjet në browser (http://localhost:5000/)
app.get('/', (req, res) => {
    res.send("Serveri i platformës studentore është aktiv dhe po punon!");
});

// Sinkronizimi dhe ndezja e serverit
sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced successfully!');
    app.listen(5000, () => console.log("Serveri po punon ne portin 5000"));
}).catch(err => {
    console.error("Gabim te databaza:", err);
});