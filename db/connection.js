const mysql = require("mysql2");

require("dotenv").config();

// establish connection
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: "employee_db",
});

module.exports = db;
