const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Professor = sequelize.define('Professor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulli: {
    type: DataTypes.STRING, // psh. Prof. Dr.
    allowNull: false
  },
  departamenti: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'professors',
  timestamps: true
});

module.exports = Professor;