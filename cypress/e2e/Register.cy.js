/// <reference types="cypress"/>

import RegisterPage from "./PageObject/LoginAndRegisterPage";
import AccountCreated from "./PageObject/AccountCreatedPage";
import HomePage from "./PageObject/HomePage";

describe(`User Registration`, () => {
  before(function () {
    cy.generateRegisterFixture();
    cy.fixture("registerData").then((data) => {
      this.registerData = data;
    });
  });
  it(`Should register new user with email that is not used `, function () {
    //open register page
    cy.visit(`/login`);
    //verify register page title
    cy.verifyTitle("Automation Exercise - Signup / Login");
    RegisterPage.getRegisterForm()
      .should(`contain`, `New User Signup!`)
      .should(`be.visible`);
    cy.registerUser(this.registerData);
    AccountCreated.getAccountCreatedTitle()
      .should("contain", `Account Created!`)
      .should(`be.visible`);
    AccountCreated.getContinueBtn().click();
    HomePage.getNavbarLinks().should(
      `contain`,
      `Logged in as ${this.registerData.userName}`
    );
  });
  it(`Shouldn't register new user with email that is exist`, function () {
    //open register page
    cy.visit(`/login`);
    //verify register page title
    cy.verifyTitle("Automation Exercise - Signup / Login");
    RegisterPage.getRegisterForm()
      .should(`contain`, `New User Signup!`)
      .should(`be.visible`);
    //use registered email from correctLoginData.json
    cy.fixture("correctLoginData").then((data) => {
      this.registerData = data;
      //generate username
      cy.generateUsername().then((username) => {
        //register new user with generated username and exist in database email
        cy.registerUserWithExistEmail(username, this.registerData.email);
      });
    });
    //verify that "Email Address already exist!" is visible in the register form
    RegisterPage.getRegisterForm()
      .should("contain", "Email Address already exist!")
      .and("be.visible");
  });
});
