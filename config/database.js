const mysql = require("mysql2");

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.query('SELECT 1', (err, results) => {
    if (err) {
        throw err;
    }
    console.log("MYSQL connected", results);
});

module.exports = db;
