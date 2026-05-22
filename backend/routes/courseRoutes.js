const express = require('express');
const router = express.Router();
// Sigurohu që i ke importuar modelet e duhura nga dosja models
const { Course, Enrollment, WaitingList } = require('../models');

// 1. Merr të gjitha kurset
router.get('/', async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Shto një kurs të ri
router.post('/add', async (req, res) => {
    try {
        const newCourse = await Course.create(req.body);
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Regjistrimi (Enroll) - Logjika për kontrollin e vendeve
router.post('/enroll', async (req, res) => {
    const { student_id, course_id } = req.body;

    try {
        // Kontrollo sa janë regjistruar aktualisht
        const enrolledCount = await Enrollment.count({ where: { course_id } });
        // Gjej kursin për të parë kapacitetin
        const course = await Course.findByPk(course_id);

        if (!course) {
            return res.status(404).json({ message: "Kursi nuk ekziston." });
        }

        if (enrolledCount < course.kapaciteti) {
            // Ka vend -> Regjistrohu
            const enrollment = await Enrollment.create({ student_id, course_id });
            return res.status(201).json({ message: "Regjistrim i suksesshëm!", status: "enrolled" });
        } else {
            // S'ka vend -> Shto në pritje
            const waiting = await WaitingList.create({ student_id, course_id });
            return res.status(200).json({ message: "Kursi është plot, u shtove në listën e pritjes.", status: "waiting" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;