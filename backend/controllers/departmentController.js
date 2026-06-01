const Department = require('../models/Department');
exports.getAllDepartments = async (req, res) => {
    try {
        const deps = await Department.findAll();
        res.json(deps);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.addDepartment = async (req, res) => {
    try {
        const { emri_departamentit, shkurtesa } = req.body;
        const newDept = await Department.create({ emri_departamentit, shkurtesa });
        res.status(201).json(newDept);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.deleteDepartment = async (req, res) => {
    try {
        await Department.destroy({ where: { id: req.params.id } });
        res.json({ message: "Departamenti u fshi!" });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateDepartment = async (req, res) => {
    try {
        const { emri_departamentit, shkurtesa } = req.body;
        await Department.update({ emri_departamentit, shkurtesa }, { where: { id: req.params.id } });
        res.json({ message: "Departamenti u përditësua!" });
    } catch (err) { res.status(500).json({ error: err.message }); }
};