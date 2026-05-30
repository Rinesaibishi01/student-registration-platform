const express = require('express');
const router = express.Router();
const waitinglistController = require('../controllers/waitinglistController');

router.post('/add', waitinglistController.addToWaitingList);

module.exports = router;