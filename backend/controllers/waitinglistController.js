const db = require('../config/db');

exports.addToWaitingList = (req, res) => {
    const { student_id, course_id } = req.body;

    // 1. Kontrollo kapacitetin e kursit dhe sa studentë janë të regjistruar
    const sql = `
        SELECT c.kapaciteti, COUNT(e.id) as numri_regjistruar
        FROM courses c
        LEFT JOIN enrollments e ON c.id = e.course_id
        WHERE c.id = ?
        GROUP BY c.id
    `;

    db.query(sql, [course_id], (err, results) => {
        if (err) return res.status(500).json(err);
        
        const { kapaciteti, numri_regjistruar } = results[0];

        if (numri_regjistruar >= kapaciteti) {
            // Shto në listën e pritjes
            db.query("INSERT INTO waitinglist (student_id, course_id) VALUES (?, ?)", 
            [student_id, course_id], (err) => {
                if (err) return res.status(500).json(err);
                res.status(201).json({ message: "Kursi është plot, jeni shtuar në listën e pritjes." });
            });
        } else {
            // Shto në enrollments (regjistrim i rregullt)
            res.status(400).json({ message: "Ka vend, përdor regjistrimin standard." });
        }
    });
};