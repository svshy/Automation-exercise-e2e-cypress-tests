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
      .then(() => {
        ProductsPage.getViewProductBtn().first().click();
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
  it(`View category products`, () => {
    const categories = ["WOMEN", "MEN", "KIDS"];
    cy.visit("/");
    cy.verifyTitle("Automation Exercise");
    HomePage.getCategories().each((category, index) => {
      cy.wrap(category)
        .invoke("prop", "innerText")
        .then((text) => {
          cy.wrap(text).should("eq", `${categories[index]}`);
        });
    });
    HomePage.getWomenCategory().click();
    HomePage.getDressSubcategory().click();
    ProductsPage.getCategoryTitle().should("contain", `Women - Dress Products`);
    HomePage.getMenCategory().click();
    HomePage.getTshirtsSubcategory().click();
    ProductsPage.getCategoryTitle().should("contain", `Men - Tshirts Products`);
  });
  it.only(`View & Cart Brand Products`, () => {
    cy.visit("/");
    cy.verifyTitle("Automation Exercise");
    HomePage.getProductsLink().click();
    ProductsPage.getBrandsProducts().should("be.visible");
    ProductsPage.getBrandsProducts()
      .find(`li`)
      .should("have.length", 8)
      .each((element) => {
        cy.wrap(element)
          .find(`a`)
          .invoke(`text`)
          .then((text) => {
            cy.log(text);
          });
      });
    ProductsPage.getMadameBrand().click();
    ProductsPage.getCategoryTitle().should(
      "contain",
      `Brand - Madame Products`
    );
    ProductsPage.getBabyHugBrand().click();
    ProductsPage.getCategoryTitle().should(
      "contain",
      `Brand - Babyhug Products`
    );
  });
});
