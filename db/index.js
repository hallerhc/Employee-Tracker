const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    findAllDepartments() {
        return this.connection.promise().query(
            "SELECT * FROM department;"
        );
    }

    findRoles() {
        return this.connection.promise().query(
            "SELECT role.title, role.id, department.name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id; "
        );
    }

    findEmployees() {
        return this.connection.promise().query(
        `SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.salary AS salary, role.title AS title, CONCAT(manager.first_name," ", manager.last_name) AS manager
        FROM employee
        JOIN role 
        ON employee.role_id = role.id
        JOIN department
        ON role.department_id = department.id
        LEFT JOIN employee manager
        ON manager.id = employee.manager_id;`);
    }
}

module.exports = new DB(connection);