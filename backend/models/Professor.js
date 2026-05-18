const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Professor = sequelize.define('Professor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    departamenti: { type: DataTypes.STRING, allowNull: true },
    telefoni: { type: DataTypes.STRING, allowNull: true },
    universiteti: { type: DataTypes.STRING, allowNull: true },
    adresa: { type: DataTypes.TEXT, allowNull: true }
}, {
    tableName: 'professors',
    timestamps: true, // Kjo përdor kolonat createdAt dhe updatedAt që i ke në DB
    underscored: false 
});

module.exports = Professor;