const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Waitinglist = sequelize.define('Waitinglist', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    student_id: { type: DataTypes.INTEGER, allowNull: false },
    course_id: { type: DataTypes.INTEGER, allowNull: false },
    data_aplikimit: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'WaitingList', timestamps: false });

module.exports = Waitinglist;