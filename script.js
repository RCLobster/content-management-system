// import code depdendencies 
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

// set up port to host server
const PORT = process.env.PORT || 3001;

// initilize the app
const app = express();

//set up middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// boot up and connect to the mySQL database by sending relevant data
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'mysqlpassword',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

// MAIN CODE

const mainMenu = () => {
    // add a line spacer before each time main menu asks the user a question
    console.log("\n");

    // prompt the user to select an option from the list
    inquirer.prompt([{
            type: "list",
            message: "What would you like to do?",
            name: "main_menu",
            choices: [
                "View all employees",
                "View all departments",
                "View all roles",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role"
            ]
        }]).then(answers => {
            // depending on user's choice, run the corresponding function
            if(answers.main_menu === "View all employees"){
                viewAllEmployees();

            } else if(answers.main_menu === "Add a department"){
                addDepartment();
            } else if(answers.main_menu === "View all departments"){
                viewAllDepartments();
            } else if(answers.main_menu === "View all roles"){
                viewAllRoles();
            } else if(answers.main_menu === "Add a role"){
                addRole();
            } else if(answers.main_menu === "Add an employee"){
                addEmployee();
            } else if(answers.main_menu === "Update an employee role"){
                updateEmployeeRole();
            }
        })

};

const viewAllEmployees = () => {
    console.log("\nHere are all the employees");
    db.query('SELECT * FROM employee', function (err, data) {
      console.table(data);

      mainMenu();
    });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the new department?",
            name: "dept_name"
        }
    ]).then(answers => {
        db.query(`INSERT INTO department (name) VALUES ("${answers.dept_name}")`, (err, data) => {
            console.log(`New department created: ${answers.dept_name}`);
            mainMenu();
        });
    });
};

const viewAllDepartments = () => {
    console.log("\nHere are all the departments");
    db.query('SELECT * FROM department', function (err, data) {
      console.table(data);

      mainMenu();
    });
};

const viewAllRoles = () => {
    console.log("\nHere are all the roles");
    db.query('SELECT * FROM roles', function (err, data) {
      console.table(data);

      mainMenu();
    });
};

const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the new role?",
            name: "role_name"
        },
        {
            type: "input",
            message: "What is the salary for this new role? (ex: 2000.00)",
            name: "salary"
        },
        {
            type: "input",
            message: "What is the department_id of this role?",
            name: "dept_id"
        }
        
    ]).then(answers => {
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${answers.role_name}", ${answers.salary}, ${answers.dept_id})`, (err, data) => {
            console.log(`New role created: ${answers.role_name} with a salary of ${answers.salary}`);
            mainMenu();
        });
    });
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "first_name"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "last_name"
        },
        {
            type: "input",
            message: "What is the role_id for this new employee?",
            name: "role_id"
        },
        {
            type: "input",
            message: "What is the manager_id for this new employee?",
            name: "man_id"
        },
        
    ]).then(answers => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.first_name}", "${answers.last_name}", ${answers.role_id}, ${answers.man_id})`, (err, data) => {
            console.log(`New employee created: ${answers.first_name} ${answers.last_name}. Their role is ${answers.role_id} and they are managed by ${answers.man_id}`);
            mainMenu();
        });
    });
}

const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the employee you wish to update?",
            name: "employ_id"
        },
        {
            type: "input",
            message: "What is the new role_id for this employee?",
            name: "new_role"
        }
    ]).then(answers => {
        db.query(`UPDATE employee SET role_id = ${answers.new_role} WHERE id = ${answers.employ_id}`, (err, data) => {
            console.log(`This employee's new role is ${answers.new_role}`);
            mainMenu();
        });
    });
};



// if we get a 404 error end the server
app.use((req, res) => {
  res.status(404).end();
});

// listen for an interaction on the designated PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mainMenu();