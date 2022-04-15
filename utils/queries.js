const pool = require("../db/connection");

// returns an array of all departments
async function getDepartments() {
  return await pool.query(`SELECT * FROM departments`);
}

// returns an array of all roles
const getRoles = async function () {
  return await pool.query(
    `SELECT roles.*, departments.name 
      AS department_name 
      FROM roles 
      LEFT JOIN departments 
      ON roles.department_id = departments.id`
  );
};

// returns an array of all employees
const getEmployees = async function () {
  return await pool.query(
    `SELECT employees.*, 
      roles.title AS job_title, 
      roles.salary, 
      departments.name AS department_name
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id; 
        `
  );
};

const insertDepartment = async function (name) {
  return await pool.query(
    `INSERT INTO departments (name)
        VALUES
            ('${name}');`
  );
};

const insertRole = async function (title, salary, departmentId) {
  return await pool.query(
    `INSERT INTO roles (title, salary, department_id)
        VALUES
            ('${title}', ${salary}, ${departmentId});`
  );
};

const insertEmployee = async function (firstName, lastName, roleId, managerId) {
  return await pool.query(
    `INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES
            ('${firstName}', '${lastName}', ${roleId}, ${managerId});`
  );
};

module.exports = {
  getDepartments,
  getRoles,
  getEmployees,
  insertDepartment,
  insertRole,
  insertEmployee,
};
