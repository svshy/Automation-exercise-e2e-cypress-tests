/// <reference types="cypress"/>

import HomePage from "./PageObject/HomePage";
import ProductPage from "./PageObject/AllProductsPage";
import CartPage from "./PageObject/CartPage";

describe(`Products Cart`, () => {
  it(`Add Products in Cart`, () => {
    let productsPrices = [];
    cy.visit("/");
    HomePage.getProductsLink().click();
    ProductPage.getProductsList().each((product, index) => {
      if (index + 1 <= 2) {
        cy.wrap(product).then(() => {
          cy.wrap(product)
            .find(`.productinfo h2`)
            .invoke("text")
            .then((text) => {
              productsPrices.push(text);
            });

          ProductPage.getOverlayAddToCartBtn(index + 1).click({
            force: true,
          });
          if (index + 1 !== 2) {
            ProductPage.getContinueShoppingBtn().click();
          } else ProductPage.getModalViewCartBtn().click();
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
  it(`Add Product in Cart and verify quantity equal to 4`, () => {});
});
