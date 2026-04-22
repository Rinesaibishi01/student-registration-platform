const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Department = sequelize.define('Department', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    emri_departamentit: { type: DataTypes.STRING, allowNull: false },
    shkurtesa: { type: DataTypes.STRING(10) }
}, { timestamps: false });

module.exports = Department;