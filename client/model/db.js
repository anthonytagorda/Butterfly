// model/db.js
const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    options: {
        trustedconnection: true,
        enableArithAort: true,
        instancename: 'SQLEXPRESS'
    }
})

// Connect to the database [butterfly]
db.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL:', error.message);
    } else {
        console.log('Connected to ' + process.env.MYSQL_DATABASE);
    }
});

module.exports = db;
