/// <reference types="cypress"/>

import LoginPage from "./PageObject/LoginAndRegisterPage";
import HomePage from "./PageObject/HomePage";

describe(`Login user with correct email and password`, () => {
  //get corrrect login data in json from fixtures
  beforeEach(function () {
    cy.fixture("correctLoginData").then((data) => {
      this.loginData = data;
    });
  });
  it(`user should log in`, function () {
    //open login page
    cy.visit(`/login`);
    //verify login page title
    cy.title().should("eq", "Automation Exercise - Signup / Login");
    //get login form div and verify form heading
    LoginPage.getLoginForm()
      .should(`contain`, `Login to your account`)
      .should(`be.visible`);
    //get POM elements and type data from loginData
    LoginPage.getLoginInput().clear().type(this.loginData.email);
    LoginPage.getLoginPasswordInput().clear().type(this.loginData.password);
    //get login button and click
    LoginPage.getLoginBtn().click();
    //verify that "Logged in as ${this.loginData.username} is visible in the navigation bar"
    HomePage.getNavbarLinks().should(
      `contain`,
      `Logged in as ${this.loginData.username}`
    );
  });
});
