const inquirer = require("inquirer");
const db = require("./db");
const mysql = require('mysql2'); 
const consoleTable = require('console.table');

function mainMenu() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add an employee',
                'add a role',
                'update employee',
                'quit'
    ]
        },
    ]).then((data) => {
        switch (data.action) {
            case 'view all departments':
                viewAllDepartments();
                break;
            case "view all roles":
                viewAllRoles();
                break;
            case "view all employees":
                viewAllEmployees();
                break;
            case "add a department":
                addDepartment();
                break;
            case "add a role":
                addRoles();
                break;
            case "add an employee":
                addEmployee();
            case "update employee":
                updateRoles();
                break;
            default:
                process.exit()
                break;
        }
    });
}

function viewAllDepartments() {
    db.findAllDepartments()
    .then(([data]) => {
        console.table(data);
    })
    .then(() => mainMenu())
}

function viewAllRoles() {
    db.findRoles()
    .then(([data]) => {
        console.table(data);
    })
    .then(() => mainMenu());
}

function viewAllEmployees() {
    db.findEmployees()
    .then(([data]) => {
        console.table(data);
    })
    .then(() => mainMenu())
}

function addDepartment() {
    inquirer.prompt([
        {
            type:"input",
            name:"department",
            message:"what is the department name?"
        }
    ]).then((res) => {
        db.connection.query("INSERT INTO department (name) VALUES (?)", [res.department],(err, data) => {
            if (err) throw err;
            console.table(data);
            mainMenu();
        })
    })
}

function addRoles() {
    inquirer.prompt([
        {
            type:"input",
            name:"title",
            message:"enter role"
        },
        {
            type:"number",
            name:"salary",
            message:"enter salary"
        },
        {
            type:"number",
            name:"departmentId",
            message:"enter department ID"
        }
   ]).then((res) => {
    db.connection.query("INSERT INTO role (title, salary, department_id) VALUES(?, ?, ?)", [res.title, res.salary, res.departmentId],(err, data) => {
        if (err) throw err;
        console.table(data);
        mainMenu();
    })
  })
}
function addEmployee() {
    inquirer.prompt([
        {
            type:"input",
            name:"firstName",
            message:"enter first name of employee"
        },
        {
            type:"input",
            name:"lastName",
            message:"enter last name of employee"
        },
        {
            type:"number",
            name:"roleId",
            prompt:"enter role ID"
        },
        {
            type:"number",
            name:"managerId",
            prompt:"enter manager ID"
        }
    ]).then((res) => {
        db.connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [res.firstName, res.lastName, res.roleId, res.managerId], (err, data) => {
            if (err) throw err;
            console.table(data);
            mainMenu();
        })
    })
}
function updateRoles() {
    inquirer.prompt([
        {
            type:"number",
            name:"employeeId",
            message:"enter ID of employee whose role needs to change"
        },
        {
            type:"number",
            name:"roleId",
            message:"enter ID of new role"
        }
    ]).then((res)=> {
        db.connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [res.roleId, res.employeeId],(err, data) => {
            if (err) throw err;
            console.table(data);
            mainMenu();
        })
    })
}
mainMenu();