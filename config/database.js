const {Client} = require("pg");
const dbUrl = process.env.JAWSDB_URL

let client = new Client({
        connectionstring: dbUrl,
        ssl: {
            rejectUnauthorized: false
        }
    });
client.connect(err => {
    if (err) {
        console.error('connection error', err.stack);
    } else {
        console.log('connected to postgresql db');
    }
});



module.exports = client;


