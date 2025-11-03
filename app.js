const express = require('express');
// const mysql = require('mysql2');
const multer = require('multer');
const app = express();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) =>
    {
        cb(null, 'public/images'); // Directory to save uploaded files
    },
    filename: (req, file, cb) =>
    {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const studentController = require('./controllers/studentController');

// Set up view engine
app.set('view engine', 'ejs');
//  enable static files
app.use(express.static('public'));
// enable form processing
app.use(express.urlencoded({
    extended: false
}));

// Define routes
app.get('/', studentController.list);
app.get('/student/:id', studentController.getById);
app.get('/addStudent', (req, res) => res.render('addStudent'));
app.post('/addStudent', upload.single('image'), studentController.add);

app.get('/editStudent/:id', studentController.updateForm);

app.post('/editStudent/:id', upload.single('image'), studentController.update);
app.get('/deleteStudent/:id', studentController.delete);

const PORT = process.env.PORT || 3000;
console.log(`http://localhost:${PORT}`)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

console.log(`App started, go to http://localhost:${PORT}/ to view it.`);
