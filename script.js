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
  console.log(`Connected to the classlist_db database.`)
);

// MAIN CODE

db.query('SELECT * FROM students', function (err, results) {
  console.log(results);
});







// if we get a 404 error end the server
app.use((req, res) => {
  res.status(404).end();
});

// listen for an interaction on the designated PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
