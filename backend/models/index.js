const User = require('./User');
const Student = require('./Student');
const Professor = require('./Professor');
const Course = require('./Course');
const Semester = require('./Semester');
const Enrollment = require('./Enrollment');
const WaitingList = require('./Waitinglist');
const Schedule = require('./Schedule');
const Department = require('./Department');
const Announcement = require('./Announcement');


// --- LIDHJET (ASSOCIATIONS) ---

// 1. Students & Professors -> Users (One-to-One)
User.hasOne(Student, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Student.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Professor, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Professor.belongsTo(User, { foreignKey: 'user_id' });

// 2. Courses -> Professors & Semesters (Many-to-One)
Professor.hasMany(Course, { foreignKey: 'professor_id' });
Course.belongsTo(Professor, { foreignKey: 'professor_id' });

Semester.hasMany(Course, { foreignKey: 'semester_id' });
Course.belongsTo(Semester, { foreignKey: 'semester_id' });

// 3. Enrollments (Many-to-Many via Enrollment Table)
Student.hasMany(Enrollment, { foreignKey: 'student_id' });
Enrollment.belongsTo(Student, { foreignKey: 'student_id' });

Course.hasMany(Enrollment, { foreignKey: 'course_id' });
Enrollment.belongsTo(Course, { foreignKey: 'course_id' });

// 4. WaitingList (Lidhja me Studentin dhe Kursin)
Student.hasMany(WaitingList, { foreignKey: 'student_id' });
WaitingList.belongsTo(Student, { foreignKey: 'student_id' });

Course.hasMany(WaitingList, { foreignKey: 'course_id' });
WaitingList.belongsTo(Course, { foreignKey: 'course_id' });

// 5. Schedules & Announcements -> Courses
Course.hasMany(Schedule, { foreignKey: 'course_id' });
Schedule.belongsTo(Course, { foreignKey: 'course_id' });

Course.hasMany(Announcement, { foreignKey: 'course_id' });
Announcement.belongsTo(Course, { foreignKey: 'course_id' });

// 6. Departments (Opsionale: lidhja me shefin e departamentit)
Professor.hasOne(Department, { foreignKey: 'head_id' });
Department.belongsTo(Professor, { foreignKey: 'head_id', as: 'Shefi' });

module.exports = {
  User,
  Student,
  Professor,
  Course,
  Semester,
  Enrollment,
  WaitingList,
  Schedule,
  Department,
  Announcement
};