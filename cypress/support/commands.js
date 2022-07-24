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
  });
});

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
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
