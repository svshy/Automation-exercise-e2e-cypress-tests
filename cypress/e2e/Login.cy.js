/// <reference types="cypress"/>

import LoginPage from "./PageObject/LoginAndRegisterPage";
import HomePage from "./PageObject/HomePage";

describe(`User Login`, () => {
  beforeEach(() => {
    //open login page
    cy.visit(`/login`);
    //verify login page title
    cy.title().should("eq", "Automation Exercise - Signup / Login");
    //get login form div and verify form heading
    LoginPage.getLoginForm()
      .should(`contain`, `Login to your account`)
      .should(`be.visible`);
  });
  it(`User should log in`, () => {
    //use json from fixtures to use correct credentials
    cy.fixture("correctLoginData").then((data) => {
      //login function from commands.js
      cy.login(data.email, data.password);
      //verify that "Logged in as ${this.loginData.username} is visible in the navigation bar"
      HomePage.getNavbarLinks().should(
        `contain`,
        `Logged in as ${data.username}`
      );
    });
  });

  it(`User shouldn't log in`, function () {
    //use json from fixtures to use incorrect credentials
    cy.fixture("incorrectLoginData").then((data) => {
      //login function from commands.js
      cy.login(data.email, data.password);
      //verify that "Your email or password is incorrect!" is visible in the login form
      LoginPage.getLoginForm()
        .should("contain", "Your email or password is incorrect!")
        .and("be.visible");
    });
  });
});
