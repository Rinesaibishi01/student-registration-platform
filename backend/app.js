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
    console.log("Lidhur me sukses në MySQL dhe gati për CRUD!");
  }
});

// 1. CREATE - Shtimi i studentit
app.post('/students', (req, res) => {
    const { numri_studentit, programi, viti_studimit } = req.body;
    const sql = "INSERT INTO students (numri_studentit, programi, viti_studimit) VALUES (?, ?, ?)";    
    db.query(sql, [numri_studentit, programi, viti_studimit], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Studenti u shtua me sukses!" });
    });
});

// 2. READ ALL - Marrja e të gjithë studentëve
app.get('/students', (req, res) => {
    db.query("SELECT * FROM students", (err, result) => { 
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// 3. READ ONE - Marrja e një studenti të vetëm (për Editim)
app.get("/students/:id", (req, res) => {
    const sql = "SELECT * FROM students WHERE id = ?";
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data[0]); 
    });
});

// 4. UPDATE - Përditësimi i të dhënave
app.put("/students/:id", (req, res) => {
    const { numri_studentit, programi, viti_studimit } = req.body;
    const sql = "UPDATE students SET numri_studentit = ?, programi = ?, viti_studimit = ? WHERE id = ?";
    db.query(sql, [numri_studentit, programi, viti_studimit, req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "Të dhënat u përditësuan me sukses!" });
    });
});

// 5. DELETE - Fshirja e studentit
app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM students WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Studenti u fshi me sukses!" });
    });
});

app.listen(5000, () => console.log("Serveri po punon në portin 5000"));
