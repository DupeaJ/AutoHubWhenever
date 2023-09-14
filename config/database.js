const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection(
    process.env.JAWSDB_SILVER_URL
);

db.connect((err) => {
    if (err) {
        console.error("connection error", err.stack);
    } else {
        console.log("connected to MySQL db");
    }
});

module.exports = db;
