const express = require('express');
const router = express.Router();
const waitinglistController = require('../controllers/waitinglistController');

router.post('/add', waitinglistController.addToWaitingList);

router.post('/add-to-waiting-list', async (req, res) => {
    try {
        const { student_id, course_id } = req.body;
       
        await WaitingList.create({ 
            student_id, 
            course_id, 
            status: 'pending' 
        });
        res.status(201).json({ Status: "Success" });
    } catch (err) {
        res.status(500).json({ Error: "Gabim në server" });
    }
});

module.exports = router;