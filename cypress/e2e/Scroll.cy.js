/// <reference types="cypress"/>

import HomePage from "./PageObject/HomePage";
import ProductsPage from "./PageObject/AllProductsPage";
import CartPage from "./PageObject/CartPage";
import SingleProductPage from "./PageObject/SingleProductPage";

describe(`Verify scroll on homepage`, () => {
  it(`Verify Scroll Up using 'Arrow' button and Scroll Down functionality`, () => {
    cy.visit(`/`);
    cy.verifyTitle("Automation Exercise");
    cy.scrollTo("bottom");
    HomePage.getSubscriptionTitle().should("be.visible");
    HomePage.getScrollArrow().click();
    HomePage.getSubtitleFromCarousel().should(
      "contain",
      "Full-Fledged practice website for Automation Engineers"
    );
  });
  it(`Verify Scroll Up without 'Arrow' button and Scroll Down functionality`, () => {
    cy.visit(`/`);
    cy.verifyTitle("Automation Exercise");
    cy.scrollTo("bottom");
    HomePage.getSubscriptionTitle().should("be.visible");
    cy.scrollTo("top");
    HomePage.getSubtitleFromCarousel().should(
      "contain",
      "Full-Fledged practice website for Automation Engineers"
    );
  });
});
