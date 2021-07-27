var inquirer = require("inquirer");
let connection;
console.log(connection);
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
                createEmployee()
                break;
            case "update employee":
                break;

            default:
                break;
        }
    });
}

async function createRole() {
    const role = await inquirer.prompt(roleQuestions)
    console.log(role)
    await connection.execute("INSERT INTO role (title, department_id, salary) VALUES (?,?,?) ", [role.title, role.department, role.salary], (err) => {
        if (err) {
            console.log("there was an error")

        }


    })
    console.log("success")
    init()
}

async function createDepartment() {
    const department = await inquirer.prompt(departmentQuestions)
    console.log(department)
    await connection.execute("INSERT INTO department (name) VALUES (?) ", [department.name], (err) => {
        if (err) {
            console.log("there was an error")

        }


    })
    console.log("success")
    init()
}

async function createEmployee() {
    const employee = await inquirer.prompt(employeeQuestions)
    console.log(employee)
    await connection.execute("INSERT INTO department (role_id, manager_id, firstName, lastName, ) VALUES (?,?,?,?) ", [employee.role_id, employee.manager_id, employee.firstName, employee.lastName], (err) => {
        if (err) {
            console.log("there was an error")

        }


    })
    console.log("success")
    init()
}




async function getAllDepartments() {
    const [rows, fields] = await connection.execute("SELECT * FROM department");
    console.log(rows);
    console.table(rows);
}

async function getAllRoles() {
    const [rows, fields] = await connection.execute("SELECT * FROM roles");
    console.log(rows);
    console.table(rows);
}

async function getAllEmployees() {
    const [rows, fields] = await connection.execute("SELECT * FROM employees");
    console.log(rows);
    console.table(rows);
}

main().then(() => {
    init();
});