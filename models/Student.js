const db = require('../db');

// Function-style Student model that exposes CRUD methods.
// Each method accepts parameters and a callback(err, results).
function StudentModel() { }

// Get all students
StudentModel.getAll = function (callback)
{
    const sql = 'SELECT studentId, name, dob, contact, image FROM students ORDER BY studentId';
    db.query(sql, function (err, results)
    {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Get a single student by ID
StudentModel.getById = function (studentId, callback)
{
    const sql = 'SELECT studentId, name, dob, contact, image FROM students WHERE studentId = ? LIMIT 1';
    db.query(sql, [studentId], function (err, results)
    {
        if (err) return callback(err);
        // return single object or null
        const student = results && results.length ? results[0] : null;
        callback(null, student);
    });
};

// Add a new student. `student` is an object: { name, dob, contact, image }
StudentModel.add = function (student, callback)
{
    const sql = 'INSERT INTO students (name, dob, contact, image) VALUES (?, ?, ?, ?)';
    const params = [student.name || null, student.dob || null, student.contact || null, student.image || null];
    db.query(sql, params, function (err, result)
    {
        if (err) return callback(err);
        // return the inserted id and affectedRows for convenience
        callback(null, { insertId: result.insertId, affectedRows: result.affectedRows });
    });
};

// Update an existing student by ID. `student` can contain fields to update: { name, dob, contact, image }
StudentModel.update = function (studentId, student, callback)
{
    const sql = 'UPDATE students SET name = ?, dob = ?, contact = ?, image = ? WHERE studentId = ?';
    const params = [student.name || null, student.dob || null, student.contact || null, student.image || null, studentId];
    db.query(sql, params, function (err, result)
    {
        if (err) return callback(err);
        callback(null, { affectedRows: result.affectedRows, changedRows: result.changedRows });
    });
};

// Delete a student by ID
StudentModel.delete = function (studentId, callback)
{
    const sql = 'DELETE FROM students WHERE studentId = ?';
    db.query(sql, [studentId], function (err, result)
    {
        if (err) return callback(err);
        callback(null, { affectedRows: result.affectedRows });
    });
};

module.exports = StudentModel;
