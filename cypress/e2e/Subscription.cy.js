/// <reference types="cypress"/>

import HomePage from "./PageObject/HomePage";

describe(`Subscription`, () => {
  it(`Verify Subscription form in home page`, () => {
    cy.visit("/");
    cy.verifyTitle("Automation Exercise");
    HomePage.getFooter().scrollIntoView().should("contain", "Subscription");
    cy.generateEmail().then((email) => {
      HomePage.getSubscribeEmailInput().clear().type(email);
    });
    HomePage.getSubscribeBtn().click();
    HomePage.getSubscribeStatusMsg()
      .should("contain", "You have been successfully subscribed!")
      .and("be.visible");
  });

  it(`Verify Subscription form in cart page`, () => {
    cy.visit("/");
    cy.verifyTitle("Automation Exercise");
    HomePage.getCartLink().click();
    HomePage.getFooter().scrollIntoView().should("contain", "Subscription");
    cy.generateEmail().then((email) => {
      HomePage.getSubscribeEmailInput().clear().type(email);
    });
    HomePage.getSubscribeBtn().click();
    HomePage.getSubscribeStatusMsg()
      .should("contain", "You have been successfully subscribed!")
      .and("be.visible");
  });
});
