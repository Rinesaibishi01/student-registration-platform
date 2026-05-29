const express = require('express');
const router = express.Router();
// Importo sequelize nga skedari yt db.js (sigurohu për rrugën e saktë)
const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');

// 1. MARRJA E TË GJITHA REGJISTRIMEVE
router.get('/', async (req, res) => {
    try {
        const enrollments = await Enrollment.findAll();
        res.json(enrollments);
    } catch (err) {
        res.status(500).json({ Status: "Error", Message: err.message });
    }
});

router.get('/my-courses', async (req, res) => {
    const userId = req.query.user_id;
    if (!userId) return res.status(400).json({ error: "User ID mungon" });

    try {
        const courses = await sequelize.query(
            `SELECT c.emertimi, c.id, c.kredite, u.firstname, u.lastname
             FROM courses c
             JOIN enrollments e ON c.id = e.course_id
             JOIN students s ON e.student_id = s.id
             LEFT JOIN professors p ON c.professor_id = p.id
             LEFT JOIN users u ON p.user_id = u.id
             WHERE s.user_id = :uId`,
            {
                replacements: { uId: userId },
                type: QueryTypes.SELECT
            }
        );
        res.json(courses);
    } catch (err) {
        console.error("Gabim SQL:", err);
        res.status(500).json({ error: err.message });
    }
});


// 4. ANULIMI I NJË REGJISTRIMI (DELETE)
// 2. Rruga për çregjistrim (DELETE)
router.delete('/drop/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Fshi regjistrimin duke përdorur ID-në e marrë nga parametri
        const deleted = await Enrollment.destroy({ 
            where: { id: id } 
        });

        if (deleted) {
            res.json({ Status: "Success", Message: "Regjistrimi u fshi me sukses!" });
        } else {
            res.status(404).json({ Status: "Error", Message: "Regjistrimi nuk u gjet." });
        }
    } catch (err) {
        console.error("Gabim gjatë fshirjes:", err);
        res.status(500).json({ Status: "Error", Message: err.message });
    }
});
// Në backend/routes/enrollmentRoutes.js
// Te backend/routes/enrollmentRoutes.js
router.get('/professor/students/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        

const query = `
    SELECT u.firstname, u.lastname, c.emertimi, e.data_regjistrimit, 'Aktiv' AS statusi 
    FROM enrollments e
    JOIN students s ON e.student_id = s.id
    JOIN users u ON s.user_id = u.id
    JOIN courses c ON e.course_id = c.id
    JOIN professors p ON c.professor_id = p.id
    WHERE p.user_id = ?
`;

        const students = await sequelize.query(query, {
            replacements: [userId],
            type: sequelize.QueryTypes.SELECT
        });
        
        res.json(students);
    } catch (err) {
        console.error("SQL Error detajuar:", err); // Kjo do të nxjerrë gabimin në terminalin e VS Code
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;