const express = require('express');
const router = express.Router();
const sequelize = require('../config/db');

router.get('/all-courses', async (req, res) => {
    try {
        const [results] = await sequelize.query(`SELECT * FROM courses`);
        res.json(results);
    } catch (err) { res.status(500).json({ error: err.message }); }
});
module.exports = router;