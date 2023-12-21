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
// export this array so we can use it in other files
export default globalTaskArray

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

<<<<<<< Updated upstream
=======


>>>>>>> Stashed changes
//Default route
app.get("/", async (req, res) => {
  res.render("index.ejs", {
    globalTaskArray: globalTaskArray,
  });
});

<<<<<<< Updated upstream
// auth
const users = [];
app.get("/users", async (req, res) => {
  res.json(users);
=======
app.get("/timeline", async (req, res) => {
  res.render("test.ejs",{
    globalTasksArray: globalTaskArray
  });
});

app.get("/login", async (req, res) => {
  res.render("logIn.ejs",{});
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  console.log(`Server is running at http://localhost:${port}`);
});
=======
    console.log(`Server is running at http://localhost:${port}`);
  });

>>>>>>> Stashed changes
