// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
import { faker } from "@faker-js/faker";
import LoginPage from "../e2e/PageObject/LoginAndRegisterPage";
import RegisterPage from "../e2e/PageObject/LoginAndRegisterPage";
import AccountInfo from "../e2e/PageObject/AccountInfoPage";
import CartPage from "../e2e/PageObject/CartPage";
import HomePage from "../e2e/PageObject/HomePage";

Cypress.Commands.add("generateRegisterFixture", () => {
  cy.writeFile("cypress/fixtures/registerData.json", {
    userName: `${faker.internet.userName()}`,
    email: `${faker.internet.email()}`,
    password: `${faker.internet.password()}`,
    dayOfBirth: `${faker.datatype.number({ min: 1, max: 27 })}`,
    monthOfBirth: `${faker.date.month()}`,
    yearOfBirth: `${faker.datatype.number({ min: 1950, max: 2012 })}`,
    firstName: `${faker.name.firstName()}`,
    lastName: `${faker.name.lastName()}`,
    company: `${faker.company.companyName()}`,
    addressFirstLine: `${faker.address.streetName()}`,
    addressSecondLine: `${faker.address.secondaryAddress()}`,
    state: `${faker.address.state()}`,
    city: `${faker.address.city()}`,
    zipcode: `${faker.address.zipCode()}`,
    phoneNumber: `${faker.phone.number()}`,
    cardNumber: `${faker.finance.creditCardNumber()}`,
    cvvCardNumber: `${faker.finance.creditCardCVV()}`,
    expirationMonth: `${faker.datatype.number({ min: 1, max: 12 })}`,
    expirationYear: `${faker.datatype.number({ min: 2022, max: 2040 })}`,
  });
});

Cypress.Commands.add("login", (email, password) => {
  //get POM elements and type data from loginData
  LoginPage.getLoginInput().clear().type(email);
  LoginPage.getLoginPasswordInput().clear().type(password);
  //get login button and click
  LoginPage.getLoginBtn().click();
});
Cypress.Commands.add("verifyLogin", (username) => {
  HomePage.getNavbarLinks().should(`contain`, `Logged in as ${username}`);
});

Cypress.Commands.add("registerUser", (registerData) => {
  RegisterPage.getRegisterName().type(registerData.userName);
  RegisterPage.getRegisterEmail().type(registerData.email);
  RegisterPage.getRegisterBtn().click();
  AccountInfo.getGenderTitles().then((element) => {
    cy.wrap(element).each((item) => {
      cy.wrap(item).check();
    });
  });
  //verify that username has been retrieved and is equal to the generated username in Faker.js
  AccountInfo.getName()
    .invoke("attr", "value")
    .should("eq", registerData.userName);
  //verify that email has been retrieved and is equal to the generated email in Faker.js
  AccountInfo.getEmail()
    .invoke("attr", "value")
    .should("eq", registerData.email);
  AccountInfo.getRegisterPasswordInput().type(registerData.password);
  AccountInfo.getDayOfBirth().select(registerData.dayOfBirth);
  AccountInfo.getMonthOfBirth().select(registerData.monthOfBirth);
  AccountInfo.getYearOfBirth().select(registerData.yearOfBirth);
  AccountInfo.getNewsletterCheckbox().check();
  AccountInfo.getMailOffers().check();
  AccountInfo.getFirstName().type(registerData.firstName);
  AccountInfo.getLastName().type(registerData.lastName);
  AccountInfo.getCompany().type(registerData.company);
  AccountInfo.getFirstLineAdress().type(registerData.addressFirstLine);
  AccountInfo.getSecondLineAdress().type(registerData.addressSecondLine);
  AccountInfo.getCountry().then((select) => {
    cy.wrap(select)
      .find(`option`)
      .each((opcja) => {
        cy.wrap(select).select(opcja.text());
      });
  });
  AccountInfo.getState().type(registerData.state);
  AccountInfo.getCity().type(registerData.city);
  AccountInfo.getZipcode().type(registerData.zipcode);
  AccountInfo.getMobileNumber().type(registerData.phoneNumber);
  AccountInfo.getCreateAccountBtn().click();
});

Cypress.Commands.add("registerUserWithExistEmail", (username, email) => {
  RegisterPage.getRegisterName().type(username);
  RegisterPage.getRegisterEmail().type(email);
  RegisterPage.getRegisterBtn().click();
});

Cypress.Commands.add("generateUsername", () => {
  return faker.internet.userName();
});

Cypress.Commands.add("generateEmail", () => {
  return faker.internet.email();
});

Cypress.Commands.add("verifyTitle", (title) => {
  cy.title().should("eq", title);
});

Cypress.Commands.add("compareProductsNameWithArray", (productsNameArray) => {
  CartPage.getCartTable()
    .find(".cart_description a")
    .each((name, index) => {
      cy.wrap(name)
        .invoke("text")
        .then((text) => {
          cy.wrap(text).should("eq", `${productsNameArray[index]}`);
        });
    });
});

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
