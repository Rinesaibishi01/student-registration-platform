const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Enrollment = sequelize.define('Enrollment', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    student_id: { type: DataTypes.INTEGER, allowNull: false },
    course_id: { type: DataTypes.INTEGER, allowNull: false },
    data_regjistrimit: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    statusi: { type: DataTypes.ENUM('active', 'completed', 'dropped'), defaultValue: 'active' }
}, { timestamps: false });

module.exports = Enrollment;