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

Cypress.Commands.add("registerUser", (username, email) => {
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
