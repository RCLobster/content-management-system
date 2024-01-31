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
    db.query('SELECT * FROM role', function (err, data) {
      console.table(data);

      mainMenu();
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