/// <reference types="cypress"/>

import HomePage from "./PageObject/HomePage";

describe(`Verify pages`, () => {
  it(`Verify Test Cases Page`, () => {
    cy.visit(`/`);
    HomePage.getTestCasesLink()
      .should(`contain`, `Test Cases`)
      .should(`be.visible`)
      .click();
    cy.verifyTitle(`Automation Practice Website for UI Testing - Test Cases`);
  });
});
