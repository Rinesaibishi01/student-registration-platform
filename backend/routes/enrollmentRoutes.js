const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment'); // Importojmë modelin që më dërgove pak më parë

// 1. MARRJA E TË GJITHA REGJISTRIMEVE (GET)
router.get('/', async (req, res) => {
    try {
        const enrollments = await Enrollment.findAll();
        res.json(enrollments);
    } catch (err) {
        res.status(500).json({ Status: "Error", Message: err.message });
    }
});

// 2. REGJISTRIMI I NJË STUDENTI NË LËNDË (POST)
router.post('/add', async (req, res) => {
    try {
        const { student_id, course_id } = req.body;

        // Kontrollojmë nëse studenti është regjistruar një herë në këtë lëndë
        const existingEnrollment = await Enrollment.findOne({
            where: { student_id, course_id }
        });

        if (existingEnrollment) {
            return res.json({ Status: "Exists", Message: "Studenti është i regjistruar tashmë në këtë lëndë!" });
        }

        // Krijojmë regjistrimin e ri
        const newEnrollment = await Enrollment.create({
            student_id,
            course_id,
            statusi: 'active'
        });

        res.json({ Status: "Success", Data: newEnrollment });
    } catch (err) {
        res.status(500).json({ Status: "Error", Message: err.message });
    }
});

// 3. ANULIMI I NJË REGJISTRIMI (DELETE)
router.delete('/drop/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Enrollment.destroy({ where: { id } });
        res.json({ Status: "Success", Message: "Regjistrimi u fshi me sukses!" });
    } catch (err) {
        res.status(500).json({ Status: "Error", Message: err.message });
    }
});

// 🔴 KJO ISHTE PJESA QË TË MUNGONTE DHE SILLTE GABIMIN:
module.exports = router;