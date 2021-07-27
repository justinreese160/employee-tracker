var inquirer = require("inquirer");
let connection;

const table = require("console.table");

// var teamMembers = [];
const mysql2 = require("mysql2/promise");

async function main() {
    connection = await mysql2.createConnection({
        host: "localhost",
        user: "root",
        database: "employee_tracker_db",
        password: "root123",
    });
}

const departmentQuestions = [{
    type: "input",
    name: "name",
    message: "What is the name of the department?",
}, ];

const roleQuestions = [{
        type: "input",
        name: "department",
        message: "What is the role's department ID number?",
    },
    {
        type: "input",
        name: "title",
        message: "What is the role's title?",
    },
    {
        type: "input",
        name: "salary",
        message: "What is the role's salary?",
    },
];
const employeeQuestions = [{
        type: "input",
        name: "role_id",
        message: "What is employee's role id?",
    },
    {
        type: "input",
        name: "manager_id",
        message: "What is employees manager id?",
    },
    {
        type: "input",
        name: "first_name",
        message: "What is employees first name?",
    },
    {
        type: "input",
        name: "last_name",
        message: "What is the employees last name?",
    },
];
const managerQuestions = [{
        type: "input",
        name: "role_id",
        message: "What is employee's role id?",
    },

    {
        type: "input",
        name: "first_name",
        message: "What is employees first name?",
    },
    {
        type: "input",
        name: "last_name",
        message: "What is the employees last name?",
    },
];
const updateQuestions = [{
        type: "input",
        name: "update_id",
        message: "What is employee's Id?",
    },
    {
        type: "input",
        name: "manager_id",
        message: "What is employee's new manager's id? (leave blank if no manager)",
    },
    {
        type: "input",
        name: "role_id",
        message: "What is employee's new role id?",
    },

    {
        type: "input",
        name: "first_name",
        message: "What is employees new first name?",
    },
    {
        type: "input",
        name: "last_name",
        message: "What is the employees new last name?",
    },
];

const continueQuestions = [{
    type: "list",
    name: "type",
    message: "What do you want to do?",
    choices: [
        "view all roles",
        "view all departments",
        "view all employees",
        "add role",
        "add department",
        "add employee",
        "update employee",
        "quit",
    ],
}, ];

function init() {
    inquirer.prompt(continueQuestions).then(function(answers) {
        switch (answers.type) {
            case "view all roles":
                getAllRoles();
                break;
            case "view all departments":
                getAllDepartments();
                break;
            case "view all employees":
                getAllEmployees();
                break;
            case "add department":
                createDepartment();
                break;
            case "add role":
                createRole();
                break;
            case "add employee":
                createEmployee();
                break;
            case "update employee":
                updateEmployee();
                break;
            case "quit":
                process.exit();
                break;

            default:
                break;
        }
    });
}

async function createRole() {
    const role = await inquirer.prompt(roleQuestions);

    await connection.execute(
        "INSERT INTO role (title, department_id, salary) VALUES (?,?,?) ", [role.title, role.department, role.salary],
        (err) => {
            if (err) {
                console.log("there was an error");
            }
        }
    );
    console.log("success");
    init();
}

async function createDepartment() {
    const department = await inquirer.prompt(departmentQuestions);
    console.log(department);
    await connection.execute(
        "INSERT INTO department (name) VALUES (?) ", [department.name],
        (err) => {
            if (err) {
                console.log("there was an error");
            }
        }
    );
    console.log("success");
    init();
}

async function createEmployee() {
    const employee = await inquirer.prompt([{
        type: "list",
        name: "manager",
        message: "Is this employee a manager?",
        choices: ["yes", "No"],
    }, ]);
    console.log(employee);
    if (employee.manager === "yes") {
        const manager = await inquirer.prompt(managerQuestions);
        await connection.execute(
            "INSERT INTO employee (role_id, first_name, last_name) VALUES (?,?,?) ", [manager.role_id, manager.first_name, manager.last_name],
            (err) => {
                if (err) {
                    console.log("there was an error");
                }
            }
        );
    } else {
        const employee = await inquirer.prompt(employeeQuestions);
        await connection.execute(
            "INSERT INTO employee (role_id, manager_id, first_name, last_name) VALUES (?,?,?,?) ", [
                employee.role_id,
                employee.manager_id,
                employee.first_name,
                employee.last_name,
                employee.update_id,
            ],
            (err) => {
                if (err) {
                    console.log("there was an error");
                }
            }
        );
    }
    console.log("success");
    init();
}

async function getAllDepartments() {
    const [rows, fields] = await connection.execute("SELECT * FROM department");
    console.log(rows);
    console.table(rows);
    init();
}

async function getAllRoles() {
    const [rows, fields] = await connection.execute(
        "SELECT * FROM role INNER JOIN department ON role.department_id = department.id"
    );
    console.log(rows);
    console.table(rows);
    init();
}

async function getAllEmployees() {
    const [rows, fields] = await connection.execute(
        "SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id"
    );
    console.log(rows);
    console.table(rows);
    init();
}

async function updateEmployee() {
    const employee = await inquirer.prompt(updateQuestions);
    if (employee.manager_id === "") {
        employee.manager_id = null;
    }
    const [rows, fields] = await connection.execute(
        "UPDATE employee SET first_name=?,last_name=?,manager_id=?,role_id=? WHERE id=?", [
            employee.first_name,
            employee.last_name,
            employee.manager_id,
            employee.role_id,
            employee.update_id,
        ]
    );
    console.log("employee was updated.");
    init();
}



main().then(() => {
    init();
});