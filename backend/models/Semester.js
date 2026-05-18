const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Semester = sequelize.define('Semester', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    emertimi: {
        type: DataTypes.STRING,
        allowNull: false,
        // Shembull: "Semestri Dimëror" ose "Semestri Veror"
    },
    viti_akademik: {
        type: DataTypes.STRING,
        allowNull: false,
        // Shembull: "2025-2026"
    }
}, {
    tableName: 'semesters', // Emri i tabelës në databazë
    timestamps: false       // Nuk na duhen createdAt/updatedAt për këtë tabelë
});

module.exports = Semester;