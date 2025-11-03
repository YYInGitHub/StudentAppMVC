const Student = require('../models/Student');

// Controller object exporting Express handlers
const studentController = {};

// List all students
studentController.list = function (req, res)
{
    Student.getAll(function (err, students)
    {
        if (err)
        {
            console.error('Error fetching students:', err);
            return res.status(500).send('Error retrieving students');
        }
        res.render('index', { students });
    });
};

// Get student by ID and render detail view
studentController.getById = function (req, res)
{
    const id = req.params.id;
    Student.getById(id, function (err, student)
    {
        if (err)
        {
            console.error('Error fetching student by id:', err);
            return res.status(500).send('Error retrieving student');
        }
        if (!student) return res.status(404).send('Student not found');
        res.render('student', { student });
    });
};

// Add a new student (expects multer to have run if file upload)
studentController.add = function (req, res)
{
    const { name, dob, contact } = req.body;
    const image = req.file ? req.file.filename : null;
    const student = { name, dob, contact, image };

    Student.add(student, function (err, info)
    {
        if (err)
        {
            console.error('Error adding student:', err);
            return res.status(500).send('Error adding student');
        }
        res.redirect('/');
    });
};

// Render edit form for an existing student
studentController.updateForm = function (req, res)
{
    const id = req.params.id;
    Student.getById(id, function (err, student)
    {
        if (err)
        {
            console.error('Error fetching student for edit:', err);
            return res.status(500).send('Error retrieving student');
        }
        if (!student) return res.status(404).send('Student not found');
        res.render('editStudent', { student });
    });
};

// Update an existing student. If no new file, keep currentImage from form
studentController.update = function (req, res)
{
    const id = req.params.id;
    const { name, dob, contact } = req.body;
    let image = req.body.currentImage || null;
    if (req.file) image = req.file.filename;

    const student = { name, dob, contact, image };

    Student.update(id, student, function (err, info)
    {
        if (err)
        {
            console.error('Error updating student:', err);
            return res.status(500).send('Error updating student');
        }
        if (info && info.affectedRows === 0) return res.status(404).send('Student not found');
        res.redirect('/');
    });
};

// Delete a student by ID
studentController.delete = function (req, res)
{
    const id = req.params.id;
    Student.delete(id, function (err, info)
    {
        if (err)
        {
            console.error('Error deleting student:', err);
            return res.status(500).send('Error deleting student');
        }
        res.redirect('/');
    });
};

module.exports = studentController;
