// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'W2_87381_Akash', 
    password: 'roottoor@96656650', 
    database: 'enzigma' 
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = db;