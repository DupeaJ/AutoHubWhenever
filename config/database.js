const mysql = require("mysql2");
const dbUrl = process.env.JAWSDB_URL

let connection;

if (dbUrl) {
    connection = mysql.createConnection(dbUrl);
} else {

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.LOCAL_DB_PASSWORD,
    database: process.env.LOCAL_DB_NAME,
});
}
connection.connect(err => {
    if (err) {
        throw err;
    }
    console.log("DB connected", results);
});

