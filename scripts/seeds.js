require('dotenv').config();
const db = require('../config/database'); 

const createTableQuery = `
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

db.query(createTableQuery, (err, results) => {
    if (err) {
        throw err;
    }
    console.log("Table created", results);
});
