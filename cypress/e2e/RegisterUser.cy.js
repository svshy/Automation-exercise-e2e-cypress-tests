/// <reference types="cypress"/>

import RegisterPage from "./PageObject/LoginAndRegisterPage";
import AccountInfo from "./PageObject/AccountInfoPage";
import AccountCreated from "./PageObject/AccountCreatedPage";
import HomePage from "./PageObject/HomePage";

describe(`User Registration`, () => {
  beforeEach(function () {
    cy.generateRegisterFixture();
    cy.fixture("registerData").then((data) => {
      this.registerData = data;
    });
  });
  it(`Should register new user`, function () {
    let array = [];
    //open register page
    cy.visit(`/login`);
    //verify register page title
    cy.title().should("eq", "Automation Exercise - Signup / Login");
    RegisterPage.getRegisterForm()
      .should(`contain`, `New User Signup!`)
      .should(`be.visible`);
    RegisterPage.getRegisterName().type(this.registerData.userName);
    RegisterPage.getRegisterEmail().type(this.registerData.email);
    RegisterPage.getRegisterBtn().click();
    //check all titles
    AccountInfo.getGenderTitles().then((element) => {
      cy.wrap(element).each((item) => {
        cy.wrap(item).check();
      });
    });
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
});
