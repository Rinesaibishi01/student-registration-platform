const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Schedule = sequelize.define('Schedule', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    course_id: { type: DataTypes.INTEGER, allowNull: false },
    dita: { type: DataTypes.STRING, allowNull: false }, // psh: E Hënë
    ora_fillimit: { type: DataTypes.TIME, allowNull: false },
    ora_mbarimit: { type: DataTypes.TIME, allowNull: false },
    salla: { type: DataTypes.STRING }
}, { timestamps: false });

module.exports = Schedule;