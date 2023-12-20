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
const globalTaskArray = [];

// task cases so we don't have to test using the database
const task1 = new Task(
  1,
  "Task 1",
  "This is task 1",
  "John",
  "2021-01-01",
  "Not Started",
  "2021-01-01",
  "John"
);
const task2 = new Task(
  2,
  "Task 2",
  "This is task 2",
  "John",
  "2021-01-01",
  "In Progress",
  "2021-01-01",
  "John"
);
const task3 = new Task(
  3,
  "Task 3",
  "This is task 3",
  "John",
  "2021-01-01",
  "Completed",
  "2021-01-01",
  "John"
);
const task4 = new Task(
  4,
  "Task 4",
  "This is task 4",
  "John",
  "2021-01-01",
  "Not Started",
  "2021-01-01",
  "John"
);
globalTaskArray.push(task1);
globalTaskArray.push(task2);
globalTaskArray.push(task3);
globalTaskArray.push(task4);

//Default route
app.get("/", async (req, res) => {
  res.render("index.ejs", {
    globalTaskArray: globalTaskArray,
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

// Custom user endpoints, might be used to display specific user data
app.get("/users/:id", (req, res) => {
  res.redirect("/");
});

// Can incorporate password requirements here
// Endpoint used for initial user signup. Checks if user email already exists, and for matching confirmed password, if so, hashes a new password using bcrypt library, stores user information in a Person object.
app.post("/users/signup", async (req, res) => {
  if (users.find((user) => user.email === req.body.email)) {
    res.send(
      new Error("User with same email already exists, please try again")
    );
  } else if (!checkPasswordRequirements(req.body.password)) {
    res.send(
      new Error(
        "Password does not fulfill requirements. Please try a new password"
      )
    );
  } else {
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
        res.redirect(201, `/users/${user.id}`);
      } catch {
        res.status(500).send("An error has occurred, please try again");
      }
    } else {
      res.status(401).send(new Error("Non matching passwords"));
    }
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

function checkPasswordRequirements(password) {
  return (
    password.length >= 6 &&
    password.length <= 20 &&
    /[A-Z]/.test(password) &&
    /[^A-Za-z0-9\s]/.test(password)
  );
}

//To start the server
//run by typing "node index.js" in terminal or install nodemon and run by typing "nodemon index.js"
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
