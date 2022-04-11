const inquirer = require("inquirer");
const ctable = require("console.table");
const pool = require("./db/connection");
const { rawListeners } = require("./db/connection");

async function init() {
  //   const employeeList = await testQuery();

  console.log(`
  =================================
  Welcome to your Employee Tracker!
  =================================`);

  await inquirer
    .prompt({
      type: "list",
      name: "optionSelect",
      message: "Please select an option: ",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update employee role",
        "Exit Application",
      ],
    })
    .then(({ optionSelect }) => {
      switch (optionSelect) {
        case "View all departments":
          console.log(optionSelect + " selected.");
          break;
        case "View all roles":
          console.log(optionSelect + " selected.");
          break;
        case "View all employees":
          console.log(optionSelect + " selected.");
          viewAllEmployees();
          break;
        case "Add a department":
          console.log(optionSelect + " selected.");
          break;
        case "Add a role":
          console.log(optionSelect + " selected.");
          break;
        case "Add an employee":
          console.log(optionSelect + " selected.");
          break;
        case "Update employee role":
          console.log(optionSelect + " selected.");
          break;
        case "Exit Application":
          console.log(optionSelect + " selected.");
          break;
      }
    });
}

async function viewAllDepartments() {}

async function viewAllRoles() {}

async function viewAllEmployees() {
  let results = [];

  await pool.query("SELECT * FROM `employees`").then(([rows]) => {
    //   return first and last name of each employee
    rows.forEach((row) => results.push(`${row.first_name} ${row.last_name}`));
  });

  console.log(ctable.getTable(results));

  //   return results;
}

// FUNCTION CALL
init();
