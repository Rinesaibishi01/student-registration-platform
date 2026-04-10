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
    console.log("Lidhur me sukses në MySQL");
  }
});

// 1. GET - Marrja e studentëve
app.get('/students', (req, res) => {
    // Përdorim shkronja të vogla 'students' siç është në phpMyAdmin
    db.query("SELECT * FROM students", (err, result) => { 
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

app.post('/students', (req, res) => {
    // Marrim vetëm fushat që ekzistojnë në tabelën tënde
    const { numri_studentit, programi, viti_studimit } = req.body;

const sql = "INSERT INTO students (numri_studentit, programi, viti_studimit) VALUES (?, ?, ?)";    
    db.query(sql, [numri_studentit, programi, viti_studimit], (err, result) => {
        if (err) {
            console.error("GABIM SQL:", err);
            return res.status(500).json(err);
        }
        res.json({ message: "Studenti u shtua me sukses!" });
    });
});

// 3. DELETE - Fshirja e studentit
app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM students WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Studenti u fshi!" });
    });
});

app.listen(5000, () => console.log("Serveri po punon në portin 5000"));