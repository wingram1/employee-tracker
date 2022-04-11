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
          viewAllDepartments();
          break;
        case "View all roles":
          console.log(optionSelect + " selected.");
          viewAllRoles();
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

async function viewAllDepartments() {
  let results = [];

  await pool.query(`SELECT * FROM departments`).then(([rows]) => {
    let values = ctable.getTable(["id", "name"], rows);

    console.log(values);
  });
}

async function viewAllRoles() {
  await pool
    .query(
      `SELECT roles.*, departments.name 
      AS department_name 
      FROM roles 
      LEFT JOIN departments 
      ON roles.department_id = departments.id`
    )
    .then(([rows]) => {
      // create new array, push only needed keys into each object
      let roleArray = [];
      rows.forEach((row) => {
        roleArray.push({
          id: row.id,
          title: row.title,
          department_name: row.department_name,
          salary: row.salary,
        });
      });

      //   format table
      let values = ctable.getTable(
        ["id", "title", "salary", "department_name"],
        roleArray
      );

      console.log(values);
    });
}

async function viewAllEmployees() {
  await pool
    .query(
      `SELECT employees.*, 
      roles.title AS job_title, 
      roles.salary, 
      departments.name AS department_name
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id; 
        `
    )
    .then(([rows]) => {
      console.log(rows);

      //   create new array, push only needed keys into each object
      let employeeArray = [];
      rows.forEach((row) => {
        employeeArray.push({
          id: row.id,
          first_name: row.first_name,
          last_name: row.last_name,
          job_title: row.job_title,
          department_name: row.department_name,
          salary: row.salary,
          manager_id: row.manager_id,
        });
      });

      //   format table
      let values = ctable.getTable(
        ["id", "title", "salary", "department_name"],
        employeeArray
      );

      console.log(values);
    });
}

// FUNCTION CALL
init();
