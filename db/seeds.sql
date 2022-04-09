INSERT INTO departments (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Financing'),
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Salesperson', 30000, 1),
    ('Sales Manager', 50000, 1),
    ('Software Engineer', 100000, 2),
    ('Lead Engineer', 150000, 2),
    ('Accountant', 90000, 3),
    ('Account Manager', 130000, 3),
    ('Lawyer', 140000, 4),
    ('Legal Team Lead', 180000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Tristan', 'Timms', 1, NULL),
    ('Dawn', 'Fountain', 2, NULL),
    ('Chantelle', 'Traynor', 3, NULL),
    ('Naomi', 'Wu', 4, NULL),
    ('Frida', 'Chester', 5, NULL),
    ('Macauly', 'Snow', 6, NULL),
    ('Abdi', 'Plant', 7, NULL),
    ('Fraser', 'Sheldon', 8, NULL),
    ('Kacper', 'Duggan', 3, 4),
    ('Amara', 'Contreras', 1, 2);