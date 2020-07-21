const mysql = require("mysql");
const inquirer = require("inquirer");
const ctable = require("console.table");
const { start } = require("repl");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "dbpassword",
    database: "employeetrackerDB"
});

// connect to mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;

    // run start function after connection is made
    start();
});

// prompt user what they would like to do
function start() {
    inquirer
    .prompt({
        name: "addViewUpdate",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Add Employee",
            "View All Employees",
            "View All Employees By Department",
            "Update Employee Role",
            "Exit"]
    })
    .then(function(answer) {
        switch (answer.addViewUpdate) {
            case "Add Employee":
                addEmployee();
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
}

function addEmployee() {
    console.log("Adding new employee...\n");
    var query = connection.query(
        "INSERT INTO employee SET ?",
        {
            first_name: "",
            last_name: "",
            role_id: "",
            manager_id: ""
        }
    )
}