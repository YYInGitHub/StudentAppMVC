const mysql = require('mysql2');
require('dotenv').config(); // Load variables from .env

//Database connection details
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

//Connecting to database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        console.log('Make sure your.env file is correct and try again.');
        console.log('Happy DB Connection ...');
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = db;
