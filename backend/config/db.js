const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('student_management', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false // Për të mos mbushur konsolën me SQL queries
});

module.exports = sequelize;