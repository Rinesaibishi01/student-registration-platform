const express = require('express');
const router = express.Router();
const { Course } = require('../models');

// Kjo merr të gjitha kurset
router.get('/', async (req, res) => {
    const courses = await Course.findAll();
    res.json(courses);
});

// Kjo shton një kurs të ri
router.post('/add', async (req, res) => {
    try {
        const newCourse = await Course.create(req.body);
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;