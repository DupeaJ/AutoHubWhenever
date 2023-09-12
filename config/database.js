const mysql = require("mysql2");

const db = mysql.createConnection(
    process.env.JAWSDB_URL
)

db.connect((err) => {
    if (err) {
        console.error("connection error", err.stack);
    } else {
        console.log("connected to MySQL db");
    }
});

module.exports = db;
