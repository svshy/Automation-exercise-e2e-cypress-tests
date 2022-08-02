/// <reference types="cypress"/>

import HomePage from "./PageObject/HomePage";
import ProductsPage from "./PageObject/AllProductsPage";
import SingleProductPage from "./PageObject/SingleProductPage";

describe(`Search products`, () => {
  it(`Search and verify all the products related to search`, () => {
    const searchText = "jeans";
    cy.visit("/");
    cy.verifyTitle("Automation Exercise");
    HomePage.getProductsLink().click();
    cy.verifyTitle("Automation Exercise - All Products");
    ProductsPage.getSearchInput().type(searchText);
    ProductsPage.getSubmitSearch().click();
    ProductsPage.getProductsSection().should("contain", "Searched Products");
    ProductsPage.getProductsList().each((product) => {
      cy.wrap(product)
        .find(".productinfo p")
        .contains(searchText, { matchCase: false })
        .should("be.visible");
    });
  });
});
