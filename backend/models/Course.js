const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Course = sequelize.define('Course', {
  emertimi: { type: DataTypes.STRING, allowNull: false },
  pershkrimi: { type: DataTypes.TEXT },
  kredite: { type: DataTypes.INTEGER },
  kapaciteti: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'courses',
  timestamps: true
});

module.exports = Course;