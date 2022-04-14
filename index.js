const inquirer = require("inquirer");
const ctable = require("console.table");
const pool = require("./db/connection");
const { rawListeners } = require("./db/connection");

async function init() {
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
      console.log(optionSelect + " selected.");

      switch (optionSelect) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        case "Exit Application":
          exitApplication();
          break;
      }
    });
}

async function viewAllDepartments() {
  await pool.query(`SELECT * FROM departments`).then(([rows]) => {
    let values = ctable.getTable(["id", "name"], rows);

    console.log(values);

    // restart application
    init();
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

      // restart application
      init();
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

async function addDepartment() {
  await inquirer
    .prompt({
      type: "text",
      name: "departmentName",
      message:
        "Please enter the name for the new department (leave blank to exit):\n",
    })
    .then((input) => {
      // if no input or only spaces, return to main menu
      if (!input.departmentName.trim()) {
        console.log("No input detected. returning to main menu...\n");
      } else {
        pool.query(
          `INSERT INTO departments (name)
          VALUES
              ('${input.departmentName.trim()}');`
        );
      }

      // restart application
      init();
    });
}

async function addRole() {}

async function addEmployee() {}

async function updateEmployee() {}

// function to exit application
function exitApplication() {
  console.log("Bye!");
  process.exit();
}

// FUNCTION CALL
init();
