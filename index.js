import Task from './task.js';

import express from 'express';
import bodyParser from 'body-parser';
// import pg from 'pg'; // for later
import axios from 'axios';


const app = express();
const port = 3000;

app.set("view engine", "ejs"); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))


// store all the tasks in this array
const globalTaskArray = [];

// task cases so we don't have to test using the database
const task1 = new Task(1, "Task 1", "This is task 1", "John", "2021-01-01", "Not Started", "2021-01-01", "John");
const task2 = new Task(2, "Task 2", "This is task 2", "John", "2021-01-01", "In Progress", "2021-01-01", "John");
const task3 = new Task(3, "Task 3", "This is task 3", "John", "2021-01-01", "Completed", "2021-01-01", "John");
globalTaskArray.push(task1);
globalTaskArray.push(task2);
globalTaskArray.push(task3);

//Default route
app.get("/", async (req, res) => {
  res.render("index.ejs",{
    globalTaskArray: globalTaskArray
  });
});



//To start the server
//run by typing "node index.js" in terminal or install nodemon and run by typing "nodemon index.js"
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });

