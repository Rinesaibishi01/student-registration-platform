const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "student_management" 
});

db.connect(err => {
  if (err) {
    console.error("Gabim gjatë lidhjes me DB:", err);
  } else {
    console.log("Lidhur me sukses në MySQL!");
  }
});

// REGJISTRIMI
app.post('/register', (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    const sqlCheck = "SELECT * FROM users WHERE email = ?";
    db.query(sqlCheck, [email], (err, result) => {
        if (err) return res.status(500).json({ Status: "Error", Message: "Gabim teknik" });

        if (result.length > 0) {
            // Kthejmë mesazh miqësor, JO status(500)
            return res.json({ Status: "Exists", Message: "Ky email është i regjistruar paraprakisht!" });
        } else {
            const sqlInsert = "INSERT INTO users (firstname, lastname, email, password, role) VALUES (?, ?, ?, ?, 'student')";
            db.query(sqlInsert, [firstname, lastname, email, password], (err, data) => {
                if (err) return res.status(500).json({ Status: "Error" });
                return res.json({ Status: "Success" });
            });
        }
    });
});

// LOGIN
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.status(500).json({ Status: "Error" });
        if (data.length > 0) {
            return res.json({ Status: "Success", role: data[0].role, name: data[0].firstname });
        } else {
            return res.json({ Status: "Invalid", Message: "Email ose fjalëkalim i gabuar!" });
        }
    });
});

// CRUD - READ STUDENTS (Shtuar ORDER BY që të shohësh ndryshimet)
app.get('/students', (req, res) => {
    db.query("SELECT * FROM students ORDER BY id DESC", (err, result) => { 
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

app.listen(5000, () => console.log("Serveri po punon në portin 5000"));