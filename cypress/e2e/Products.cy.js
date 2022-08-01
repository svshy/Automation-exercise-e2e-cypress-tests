/// <reference types="cypress"/>

import HomePage from "./PageObject/HomePage";
import ProductsPage from "./PageObject/AllProductsPage";
import SingleProductPage from "./PageObject/SingleProductPage";

describe(`Products`, () => {
  it(`Verify all products page and first product details`, () => {
    cy.visit("/");
    cy.verifyTitle("Automation Exercise");
    HomePage.getProductsLink().click();
    cy.verifyTitle("Automation Exercise - All Products");
    ProductsPage.getProductsSection().should("contain", "All Products");
    ProductsPage.getProductsList().should("have.length", 34).and(`be.visible`);
    ProductsPage.getProductsList()
      .first()
      .then((product) => {
        cy.wrap(product).find(".choose a").click();
      });
    cy.verifyTitle("Automation Exercise - Product Details");
    SingleProductPage.getProductInformation().should("be.visible");
    SingleProductPage.getProductName().should("be.visible");
    SingleProductPage.getProductCategory().should("be.visible");
    SingleProductPage.getProductPrice().should("be.visible");
    SingleProductPage.getProductAvailability().should("be.visible");
    SingleProductPage.getProductCondition().should("be.visible");
    SingleProductPage.getProductBrand().should("be.visible");
  });
});
