const mysql = require("mysql");
const inquirer = require("inquirer");
const ctable = require("console.table");
// const { start } = require("repl");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "dbpassword",
    database: "employeetrackerDB"
});

// connect to mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;

    // run start function after connection is made
    start();
});

// prompt user what they would like to do
function start() {
    inquirer
        .prompt({
            name: "menu",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add Employee",
                "Add Department",
                "Add Role",
                "View All Employees",
                "View All Employees By Department",
                "Update Employee Role",
                "Exit"]
        })
        .then(function (answer) {
            switch (answer.menu) {
                case "Add Employee":
                    addEmployee();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "View All Employees":
                    viewEmployees();
                    break;

                case "View All Employees By Department":
                    viewEmployeesByDept();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();

                case "Exit":
                    connection.end();
                    break;
            }
        });
};

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "Enter employee's first name."
            },
            {
                name: "lastName",
                type: "input",
                message: "Enter employee's last name."
            },
            {
                name: "roleID",
                type: "input",
                message: "Enter employee's role ID."
            },
            {
                name: "managerID",
                type: "input",
                message: "Enter employee's manager ID."
            },
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.roleID,
                    manager_id: answer.managerID
                },
                function (err) {
                    if (err) throw err;

                    console.log("Employee Successfully Added!");
                    start();
                });
        })
};

function addRole() {
    inquirer
        .prompt([
            {
                name: "title",
                type: "list",
                message: "Enter employee's title.",
                choices: [
                    "HR Manager",
                    "Project Manager",
                    "Salesperson",
                    "Software Engineer"
                ]
            },
            {
                name: "salary",
                type: "input",
                message: "Enter employee's annual salary."
            },
            {
                name: "departmentID",
                type: "input",
                message: "Enter employee's department ID."
            },
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.departmentID,
                },
                function (err) {
                    if (err) throw err;

                    console.log("Employee Role Successfully Added!");
                    start();
                });
        })
};

function addDepartment() {
    inquirer
        .prompt([
            {
                name: "department",
                type: "list",
                message: "What department is employee in?",
                choices: [
                    "Sales",
                    "Engineering",
                    "Human Resources",
                    "Operations"
                ]
            },
        ]).then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.name
                },
                function (err) {
                    if (err) throw err;

                    console.log("Department Successfully Added!");
                    start();
                });
        })
};

// function viewEmployees() {
//     var query = "SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id ";
//     query += "FROM employee INNER JOIN role ON employee.id = role.id";
//     query += "FROM role INNER JOIN department on role.id = department.id";

//     connection.query(query, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], function(err, res) {
//         console.log(res.length + " matches found!");
//         for (var i = 0; i < res.length; i++) {
//             console.table(viewEmployees);
//         }
//     })
// };

