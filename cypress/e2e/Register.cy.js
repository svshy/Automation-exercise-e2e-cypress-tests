/// <reference types="cypress"/>

import RegisterPage from "./PageObject/LoginAndRegisterPage";
import AccountInfo from "./PageObject/AccountInfoPage";
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
    cy.title().should("eq", "Automation Exercise - Signup / Login");
    RegisterPage.getRegisterForm()
      .should(`contain`, `New User Signup!`)
      .should(`be.visible`);
    cy.registerUser(this.registerData.userName, this.registerData.email);
    //check all titles
    AccountInfo.getGenderTitles().then((element) => {
      cy.wrap(element).each((item) => {
        cy.wrap(item).check();
      });
    });
    //verify that username has been retrieved and is equal to the generated username in Faker.js
    AccountInfo.getName()
      .invoke("attr", "value")
      .should("eq", this.registerData.userName);
    //verify that email has been retrieved and is equal to the generated email in Faker.js
    AccountInfo.getEmail()
      .invoke("attr", "value")
      .should("eq", this.registerData.email);
    AccountInfo.getRegisterPasswordInput().type(this.registerData.password);
    AccountInfo.getDayOfBirth().select(this.registerData.dayOfBirth);
    AccountInfo.getMonthOfBirth().select(this.registerData.monthOfBirth);
    AccountInfo.getYearOfBirth().select(this.registerData.yearOfBirth);
    AccountInfo.getNewsletterCheckbox().check();
    AccountInfo.getMailOffers().check();
    AccountInfo.getFirstName().type(this.registerData.firstName);
    AccountInfo.getLastName().type(this.registerData.lastName);
    AccountInfo.getCompany().type(this.registerData.company);
    AccountInfo.getFirstLineAdress().type(this.registerData.addressFirstLine);
    AccountInfo.getSecondLineAdress().type(this.registerData.addressSecondLine);
    //check all countries
    AccountInfo.getCountry().then((select) => {
      cy.wrap(select)
        .find(`option`)
        .each((opcja) => {
          cy.wrap(select).select(opcja.text());
        });
    });
    AccountInfo.getState().type(this.registerData.state);
    AccountInfo.getCity().type(this.registerData.city);
    AccountInfo.getZipcode().type(this.registerData.zipcode);
    AccountInfo.getMobileNumber().type(this.registerData.phoneNumber);
    AccountInfo.getCreateAccountBtn().click();
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
    cy.title().should("eq", "Automation Exercise - Signup / Login");
    RegisterPage.getRegisterForm()
      .should(`contain`, `New User Signup!`)
      .should(`be.visible`);
    //use registered email from correctLoginData.json
    cy.fixture("correctLoginData").then((data) => {
      this.registerData = data;
      //generate username
      cy.generateUsername().then((username) => {
        //register new user with generated username and exist in database email
        cy.registerUser(username, this.registerData.email);
      });
    });
    //verify that "Email Address already exist!" is visible in the register form
    RegisterPage.getRegisterForm()
      .should("contain", "Email Address already exist!")
      .and("be.visible");
  });
});
