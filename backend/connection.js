const mysql = require("mysql2");
require("dotenv").config();

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});

connection.connect((err) => {
    if (!err) console.log("Connected!");
    else throw err;
});

module.exports = connection;
