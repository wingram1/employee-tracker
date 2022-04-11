const mysql = require("mysql2/promise");
require("dotenv").config();

console.log("Creating connection pool...");
const pool = mysql.createPool({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: "employee_db",
});

module.exports = pool;
