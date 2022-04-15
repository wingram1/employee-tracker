const inquirer = require("inquirer");
const ctable = require("console.table");
const {
  getDepartments,
  getRoles,
  getEmployees,
  insertDepartment,
  insertRole,
  insertEmployee,
} = require("./utils/queries");

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
  await getDepartments().then(([rows]) => {
    console.log(rows);
    let values = ctable.getTable(["id", "name"], rows);

    console.log(values);

    // restart application
    init();
  });
}

async function viewAllRoles() {
  // get role array
  await getRoles().then(([rows]) => {
    // create new array, push only needed keys into each object
    roleArray = [];

    rows.forEach((row) => {
      roleArray.push({
        id: row.id,
        title: row.title,
        department_name: row.department_name,
        salary: row.salary,
      });
    });

    return roleArray;
  });
  console.log(roleArray);
  //   format table
  let values = ctable.getTable(
    ["id", "title", "salary", "department_name"],
    roleArray
  );

  console.log(values);

  // restart application
  init();
}

async function viewAllEmployees() {
  await getEmployees().then(([rows]) => {
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

    // restart application
    init();
  });
}

async function addDepartment() {
  await inquirer
    .prompt({
      type: "text",
      name: "departmentName",
      message: "Please enter the name for the new department:\n",
      validate: (input) => {
        if (input) {
          return true;
        } else {
          console.log("Please enter your name!");
          return false;
        }
      },
    })
    .then((input) => {
      // push to mysql
      insertDepartment(input.departmentName.trim());

      // restart application
      init();
    });
}

async function addRole() {
  await inquirer
    .prompt([
      {
        type: "text",
        name: "name",
        message: "Please enter the name for the new role:\n",
        validate: (input) => {
          if (input) {
            return true;
          } else {
            console.log("Please enter your name!");
            return false;
          }
        },
      },
      {
        type: "text",
        name: "salary",
        message: "Please enter the new role's salary:\n",
        validate: (input) => {
          if (input) {
            return true;
          } else {
            console.log("Please enter your name!");
            return false;
          }
        },
      },
      {
        type: "list",
        name: "department",
        message: "Please select the new role's department:\n",
        choices: async function () {
          return await getDepartments().then(([rows]) => {
            return rows.map((row) => {
              return `${row.id}: ${row.name}`;
            });
          });
        },
      },
    ])
    .then((data) => {
      let newRole = {
        title: data.name,
        salary: parseInt(data.salary),
        department_id: parseInt(data.department),
      };
      console.log(newRole);
      // push to mysql
      insertRole(newRole.title.trim(), newRole.salary, newRole.department_id);
    });
}

async function addEmployee() {
  await inquirer
    .prompt([
      {
        type: "text",
        name: "firstName",
        message: "Please enter the new employee's first name:\n",
        validate: (input) => {
          if (input) {
            return true;
          } else {
            console.log("Please enter some text!");
            return false;
          }
        },
      },
      {
        type: "text",
        name: "lastName",
        message: "Please enter the new employee's last name:\n",
        validate: (input) => {
          if (input) {
            return true;
          } else {
            console.log("Please enter some text!");
            return false;
          }
        },
      },
      {
        type: "list",
        name: "role",
        message: "Please select the new employee's role:\n",
        choices: async function () {
          return await getRoles().then(([rows]) => {
            return rows.map((row) => {
              return `${row.id}: ${row.title}`;
            });
          });
        },
      },
      {
        type: "list",
        name: "manager",
        message: "Please select a manager for this employee (if applicable):\n",
        choices: async function () {
          return await getEmployees().then(([rows]) => {
            // create array with first index as "N/A"
            let employeeArray = ["N/A"];

            // push all employees to the existing array
            rows.map((row) => {
              employeeArray.push(
                `${row.id}: ${row.first_name} ${row.last_name}`
              );
            });
            return employeeArray;
          });
        },
      },
    ])
    .then((data) => {
      // if 'N/A' was chosedn for managerId, replace with NULL
      if (data.manager === "N/A") {
        managerId = NULL;
      } else {
        managerId = parseInt(data.manager);
      }

      let newEmployee = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        roleId: parseInt(data.role),
        managerId: managerId,
      };

      console.log(newEmployee);

      // push to mysql
      insertEmployee(
        data.firstName.trim(),
        data.lastName.trim(),
        parseInt(data.role),
        managerId
      );
    });

  // restart application
  init();
}

async function updateEmployee() {}

// function to exit application
function exitApplication() {
  console.log("Bye!");
  process.exit();
}

// FUNCTION CALL
init();
