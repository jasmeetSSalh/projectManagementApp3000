import Task from "./task.js";
import express from "express";
import bodyParser from "body-parser";
// import pg from 'pg'; // for later
import axios from "axios";
import bcrypt, { hash } from "bcrypt";
import Person from "./person.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// For having post requests to the users
app.use(express.json());

// store all the tasks in this array
const projects = [];
const globalTaskArray = [];
const globalTaskArray2 = [];

// task cases so we don't have to test using the database
const task1 = new Task(1, "Task 1", "This is task 1", 'Irfan', '2023-12-03', '2023-12-06', "Not Started", "2021-01-01", "John");
const task2 = new Task(2, "Task 2", "This is task 2", 'Jasmeet', '2023-12-06', '2023-12-09', "In Progress", "2021-01-01", "John");
const task3 = new Task(3, "Task 3", "This is task 3", 'Gavin', '2023-12-09', '2023-12-20', "Completed", "2021-01-01", "John");
const task4 = new Task(4, "Task 4", "This is task 4", 'Sharyar', '2023-12-12', '2023-12-24', "Not Started", "2021-01-01", "John");
globalTaskArray.push(task1);
globalTaskArray.push(task2);
globalTaskArray.push(task3);
globalTaskArray.push(task4);

const task5 = new Task(1, "Task 5", "This is task 5", 'John', '2023-12-03', '2023-12-12', "Not Started", "2021-01-01", "John");
const task6 = new Task(2, "Task 6", "This is task 6", 'Bob', '2023-12-06', '2023-12-07', "In Progress", "2021-01-01", "John");
const task7 = new Task(3, "Task 7", "This is task 7", 'Obama', '2023-12-09', '2023-12-20', "Completed", "2021-01-01", "John");
const task8 = new Task(4, "Task 8", "This is task 8", 'Joeover', '2023-12-20', '2023-12-28', "Completed", "2021-01-01", "John");

globalTaskArray2.push(task5);
globalTaskArray2.push(task6);
globalTaskArray2.push(task7);
globalTaskArray2.push(task8);

projects.push(globalTaskArray);
projects.push(globalTaskArray2);


app.get("/", async (req, res) => {
  res.render("index.ejs", {
    globalTaskArray: globalTaskArray,
  });
});


//timeline
app.get("/timeline", async (req, res) => {
  res.render("timeline.ejs",{
    projects: projects
  });
});

// auth
const users = [];
app.get("/users", async (req, res) => {
  res.json(users);
});

app.get("/users/login", (req, res) => {
  res.render("logIn.ejs");
});

app.get("/users/signup", (req, res) => {
  res.render("signUp.ejs");
});

//Custom user endpoints, might be used to display specific user data
app.get("/users/:id", (req, res) => {
  res.redirect("/");
});

// Can incorporate password requirements here
app.post("/users/signup", async (req, res) => {
  if (req.body.password == req.body.confirmPassword) {
    try {
      const hashedPass = await bcrypt.hash(req.body.password, 10); // salt and hash
      // console.log(hashedPass);
      // How will roles be assigned?
      const user = new Person(
        req.body.name,
        req.body.role,
        req.body.email,
        hashedPass,
        users.length
      );
      // console.log(user);
      users.push(user); // for short term storage
      res.status(201).redirect(`/users/${user.id}`);
    } catch {
      res.status(500).send("An error has occurred, please try again");
    }
  } else {
    res.status(401).send(new Error("Non matching passwords"));
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.email === req.body.email);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.redirect("/");
    } else {
      res.send("Invalid password");
      
    }
  } catch {
    res.status(500).send("An error has occurred, please try again");
  }
});

//To start the server
//run by typing "node index.js" in terminal or install nodemon and run by typing "nodemon index.js"
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
