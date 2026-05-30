const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

router.get('/', departmentController.getAllDepartments);

router.post('/add', departmentController.addDepartment);
router.delete('/delete/:id', departmentController.deleteDepartment);
router.put('/update/:id', departmentController.updateDepartment);

module.exports = router;