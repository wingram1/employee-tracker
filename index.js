const inquirer = require("inquirer");
const ctable = require("console.table");
const db = require("./db/connection");

db.query("SELECT * FROM `employees`", function (err, results, fields) {
  console.log(results); // results contains rows returned by server
});

// inquirer
//   .prompt({
//     type: "list",
//     name: "confirm",
//     message: "Did you do it?",
//     choices: ["Yes", "No"],
//   })
//   .then(({ confirm }) => {
//     console.log(confirm + " we did! (or not... I dunno what you put lol)");
//   });
