var inquirer = require("inquirer");
let connection
console.log(connection)
const table = require("console.table");

var teamMembers = [];
const mysql2 = require("mysql2/promise");

async function main() {
    connection = await mysql2.createConnection({
        host: "localhost",
        user: "root",
        database: "employee_tracker_db",
        password: "root123",
    });
    // query database
    // const [rows, fields] = await connection.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);
}




const internQuestions = [{
        type: "input",
        name: "name",
        message: "What is employee's name?",
    },
    {
        type: "input",
        name: "Id",
        message: "What is employee's Id?",
    },
    {
        type: "input",
        name: "email",
        message: "What is employee's email?",
    },
    {
        type: "input",
        name: "school",
        message: "What is interns school?",
    },
];

const managerQuestions = [{
        type: "input",
        name: "name",
        message: "What is employee's name?",
    },
    {
        type: "input",
        name: "Id",
        message: "What is employee's Id?",
    },
    {
        type: "input",
        name: "email",
        message: "What is employee's email?",
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is manager's office number?",
    },
];

const engineerQuestions = [{
        type: "input",
        name: "name",
        message: "What is employee's name?",
    },
    {
        type: "input",
        name: "Id",
        message: "What is employee's Id?",
    },
    {
        type: "input",
        name: "email",
        message: "What is employee's email?",
    },
    {
        type: "input",
        name: "gitHub",
        message: "What is engineer's git hub?",
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
                break;
            case "view all departments":
                getAllDepartments()
                break;
            case "view all employees":
                break;
            case "add department":
                break;
            case "add employee":
                break;
            case "update employee":
                break;
            case "view all roles":
                break;

            default:
                break;
        }
    });
}

function createEngineer(role) {
    inquirer.prompt(engineerQuestions).then(function(answers) {
        var newEngineer = new Engineer(
            answers.name,
            answers.Id,
            answers.email,
            answers.gitHub,
            role
        );
        teamMembers.push(newEngineer);
        init();
    });
}

function createManager(role) {
    inquirer.prompt(managerQuestions).then(function(answers) {
        var newManager = new Manager(
            answers.name,
            answers.Id,
            answers.email,
            answers.officeNumber,
            role
        );
        teamMembers.push(newManager);
        init();
    });
}

function createIntern(role) {
    inquirer.prompt(internQuestions).then(function(answers) {
        var newIntern = new Intern(
            answers.name,
            answers.Id,
            answers.email,
            answers.school,
            role
        );
        teamMembers.push(newIntern);
        init();
    });
}

async function getAllDepartments() {
    const [rows, fields] = await connection.execute("SELECT * FROM department")
    console.log(rows);
    console.table(rows)

}

main().then(() => {
    init()
})