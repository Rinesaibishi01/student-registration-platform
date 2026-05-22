const express = require('express');
const router = express.Router();
const { Enrollment, Student, Course } = require('../models');

// 1. MARRJA E TË GJITHA REGJISTRIMEVE
router.get('/', async (req, res) => {
    try {
        const enrollments = await Enrollment.findAll();
        res.json(enrollments);
    } catch (err) {
        res.status(500).json({ Status: "Error", Message: err.message });
    }
});

// 2. MARRJA E REGJISTRIMEVE TË NJË STUDENTI SPECIFIK
router.get('/my-courses/:student_id', async (req, res) => {
    try {
        const enrollments = await Enrollment.findAll({
            where: { student_id: req.params.student_id }
        });
        res.json(enrollments);
    } catch (err) {
        res.status(500).json({ Status: "Error", Message: err.message });
    }
});

// 3. REGJISTRIMI I NJË STUDENTI NË LËNDË
router.post('/add', async (req, res) => {
    try {
        const { student_id, course_id } = req.body;

        // Kontrollo nëse studenti dhe kursi ekzistojnë
        const studentExists = await Student.findByPk(student_id);
        const courseExists = await Course.findByPk(course_id);

        if (!studentExists || !courseExists) {
            return res.json({ Status: "Error", Message: "Studenti ose Kursi nuk ekziston në sistem!" });
        }

        // Kontrollo nëse studenti është regjistruar tashmë
        const existingEnrollment = await Enrollment.findOne({
            where: { student_id, course_id }
        });

        if (existingEnrollment) {
            return res.json({ Status: "Error", Message: "Studenti është i regjistruar tashmë në këtë lëndë!" });
        }

        // Krijimi i regjistrimit
        const newEnrollment = await Enrollment.create({
            student_id,
            course_id,
            statusi: 'active'
        });

        res.json({ Status: "Success", Data: newEnrollment });
    } catch (err) {
        console.error("Gabim në server:", err);
        res.status(500).json({ Status: "Error", Message: "Gabim gjatë regjistrimit në bazën e të dhënave." });
    }
});

// 4. ANULIMI I NJË REGJISTRIMI (DELETE)
router.delete('/drop/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Enrollment.destroy({ where: { id } });
        res.json({ Status: "Success", Message: "Regjistrimi u fshi me sukses!" });
    } catch (err) {
        res.status(500).json({ Status: "Error", Message: err.message });
    }
});

module.exports = router;