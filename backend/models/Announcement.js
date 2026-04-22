const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Announcement = sequelize.define('Announcement', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    titulli: { type: DataTypes.STRING, allowNull: false },
    permbajtja: { type: DataTypes.TEXT, allowNull: false },
    data_postimit: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: false });

module.exports = Announcement;
