/// <reference types="cypress"/>

import HomePage from "./PageObject/HomePage";
import ProductsPage from "./PageObject/AllProductsPage";
import CartPage from "./PageObject/CartPage";
import SingleProductPage from "./PageObject/SingleProductPage";

describe(`Products Cart`, () => {
  it(`Add Products in Cart`, () => {
    let productsPrices = [];
    cy.visit("/");
    HomePage.getProductsLink().click();
    ProductsPage.getProductsList().each((product, index) => {
      if (index + 1 <= 2) {
        cy.wrap(product).then(() => {
          cy.wrap(product)
            .find(`.productinfo h2`)
            .invoke("text")
            .then((text) => {
              productsPrices.push(text);
            });

          ProductsPage.getOverlayAddToCartBtn(index + 1).click({
            force: true,
          });
          if (index + 1 !== 2) {
            ProductsPage.getContinueShoppingBtn().click();
          } else ProductsPage.getModalViewCartBtn().click();
        });
      } else return false;
    });
    CartPage.getCartTable()
      .find("tbody tr")
      .should("have.length", 2)
      .each((element, index) => {
        cy.wrap(element)
          .find(".cart_price p")
          .should("contain", productsPrices[index]);
        cy.wrap(element).find(`.cart_quantity button`).should("contain", "1");
        cy.wrap(element)
          .find(".cart_total p")
          .should("contain", productsPrices[index]);
      });
  });
  it(`Add Product in Cart and verify quantity equal to 4`, () => {
    let product = "";
    const quantity = 4;
    cy.visit("/");
    HomePage.getProductsLink().click();
    ProductsPage.getProductsList()
      .first()
      .then(() => {
        ProductsPage.getViewProductBtn().first().click();
      });
    SingleProductPage.getProductInformation().should("be.visible");
    SingleProductPage.getProductName()
      .invoke("text")
      .then((text) => {
        product = text;
      });
    SingleProductPage.getProductQuantity().clear().type(quantity);
    SingleProductPage.getAddToCartBtn().click();
    SingleProductPage.getModalViewCartBtn().click();
    CartPage.getCartTable().find("tbody tr").should("have.length", 1);
    CartPage.getCartTable()
      .find(".cart_description a")
      .invoke("text")
      .then((text) => {
        cy.wrap(text).should("contain", product);
      });
    CartPage.getCartTable()
      .find(".cart_quantity button")
      .invoke("text")
      .then((text) => {
        cy.wrap(text).should("contain", quantity);
      });
  });
  it(`Remove all products From Cart`, () => {
    cy.visit(`/`);
    cy.verifyTitle("Automation Exercise");
    HomePage.getProductsLink().click();
    cy.verifyTitle("Automation Exercise - All Products");
    ProductsPage.getProductsList()
      .first()
      .then(() => {
        ProductsPage.getAddToCartBtn().first().click();
      });
    ProductsPage.getModalViewCartBtn().click();
    cy.verifyTitle("Automation Exercise - Checkout");
    CartPage.getCartTable().find("tbody tr").should("have.length", 1);
    CartPage.getCartTable().find(".cart_quantity_delete").click();
    CartPage.getEmptyCartMsg().should("contain", "Cart is empty!");
  });
});
