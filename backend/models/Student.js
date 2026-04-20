const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Student = sequelize.define('Student', {
  // 1. id (Primary Key) - Krijohet automatikisht, por po e shkruajmë për detyrë
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  // 2. user_id (Lidhja me tabelën Users)
  // Kjo fushë do të krijohet automatikisht nga lidhja (Association), 
  // por mund ta lësh kështu për t'iu përmbajtur kërkesës.
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Emri i tabelës së Users
      key: 'id'
    }
  },

  // 3. numri_studentit
  numri_studentit: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  // 4. programi
  programi: {
    type: DataTypes.STRING,
    allowNull: false
  },

  // 5. viti_studimit
  viti_studimit: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'students',
  timestamps: true // Kjo shton createdAt dhe updatedAt që janë standard në ORM
});

module.exports = Student;