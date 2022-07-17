/// <reference types="cypress"/>

import { generateRandomString } from "../support/generateRandomString";

const userName = generateRandomString();
const password = generateRandomString();
const user = {
  userName: userName,
  email: `${userName}@test.pl`,
  password: password,
  dayOfBirth: "5",
  monthOfBirth: "December",
  yearOfBirth: "1996",
  firstName: "Bruce",
  lastName: "Wayne",
  company: "Wayne Enterprises",
  addressFirstLine: "Gotham City",
  addressSecondLine: "666",
  country: "United States",
  state: "New York",
  city: "Gotham City",
  zipcode: "66-6666",
  phoneNumber: "123456789",
};

describe(`User Registration and deleting logged user`, () => {
  it(`should register new user`, () => {
    cy.visit(`/`);
    cy.title().should("eq", "Automation Exercise");
    cy.get(`a[href*="/login"]`).click();
    cy.get(`.signup-form`)
      .should(`contain`, `New User Signup!`)
      .should(`be.visible`);
    cy.get(`input[data-qa="signup-name"]`).type(user.userName);
    cy.get(`input[data-qa="signup-email"]`).type(user.email);
    cy.get(`button[data-qa="signup-button"]`).click();
    cy.get(`#id_gender1`).check();
    cy.get(`#password`).type(user.password);
    cy.get(`#days`).select(user.dayOfBirth);
    cy.get(`#months`).select(user.monthOfBirth);
    cy.get(`#years`).select(user.yearOfBirth);
    cy.get(`#newsletter`).check();
    cy.get(`#optin`).check();
    cy.get(`#first_name`).type(user.firstName);
    cy.get(`#last_name`).type(user.lastName);
    cy.get(`#company`).type(user.company);
    cy.get(`#address1`).type(user.addressFirstLine);
    cy.get(`#address2`).type(user.addressSecondLine);
    cy.get(`#country`).select(user.country);
    cy.get(`#state`).type(user.state);
    cy.get(`#city`).type(user.city);
    cy.get(`#zipcode`).type(user.zipcode);
    cy.get(`#mobile_number`).type(user.phoneNumber);
    cy.get(`[data-qa="create-account"]`).click();
    cy.get(`[data-qa="account-created"]`)
      .should("contain", `Account Created!`)
      .should(`be.visible`);
    cy.get(`[data-qa="continue-button"]`).click();
    cy.get(`ul.navbar-nav`).should(`contain`, `Logged in as ${user.userName}`);
  });
  it(`should delete logged user`, () => {
    cy.get('[href="/delete_account"]').click();
    cy.contains(`ACCOUNT DELETED!`).should(`be.visible`);
  });
});
