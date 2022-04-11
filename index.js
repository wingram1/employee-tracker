const inquirer = require("inquirer");
const ctable = require("console.table");
const pool = require("./db/connection");

async function prompt() {
  const employeeList = await testQuery();

  await inquirer
    .prompt({
      type: "rawlist",
      name: "employeeSelect",
      message: "Select an employee from the list",
      choices: employeeList,
    })
    .then(({ employeeSelect }) => {
      console.log("You selected: " + employeeSelect);
    });
}

async function testQuery() {
  let results = [];

  await pool.query("SELECT * FROM `employees`").then(([rows]) => {
    //   return first and last name of each employee
    rows.forEach((row) => results.push(`${row.first_name} ${row.last_name}`));
  });
  return results;
}

prompt();
