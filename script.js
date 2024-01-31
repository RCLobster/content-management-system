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
    inquirer.prompt([{
            type: "list",
            message: "What would you like to do?",
            name: "main_menu",
            choices: [
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role"
            ]
        }]).then(answers => {
            if(answers.main_menu === "View all employees"){
                console.log("view employees");
                viewAllEmployees();
            }
        })

}

const viewAllEmployees = () => {
    console.log("Here are all the employees");
    db.query('SELECT * FROM employee', function (err, results) {
      console.table(results);
    });
}








// if we get a 404 error end the server
app.use((req, res) => {
  res.status(404).end();
});

// listen for an interaction on the designated PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mainMenu();