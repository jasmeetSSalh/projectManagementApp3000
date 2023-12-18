// import axios from "axios";

const BASE_ENDPOINT = "http://localhost:3000";
const loginButton = document.getElementById("login-button");
const signupButton = document.getElementById("signup-button");
const signUpForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

loginButton.addEventListener("click", async (e) => {
  const loginFormData = new FormData(loginForm);
  //   for (let pair of loginFormData.entries()) {
  //     console.log(pair[0] + ": " + pair[1]);
  //   }

  /*
make a post request to the users/login endpoint, which compares the password with the chosen user
*/
  const response = await fetch(`${BASE_ENDPOINT}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginFormData),
  });
  console.log(response);
});

// signupButton.addEventListener("click", async (e) => {
//   const signUpFormData = new FormData(signUpForm);
//   //   for (let pair of loginFormData.entries()) {
//   //     console.log(pair[0] + ": " + pair[1]);
//   //   }

//   /*
//   make a post request to the users/login endpoint, which compares the password with the chosen user
//   */
//   const response = await fetch(`${BASE_ENDPOINT}/users`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application.json",
//     },
//     body: JSON.stringify(signUpFormData),
//   });
//   console.log(response);
// });
