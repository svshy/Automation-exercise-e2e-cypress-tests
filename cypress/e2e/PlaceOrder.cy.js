/// <reference types="cypress"/>

import CartPage from "./PageObject/CartPage";
import HomePage from "./PageObject/HomePage";
import ProductsPage from "./PageObject/AllProductsPage";
import CheckoutPage from "./PageObject/CheckoutPage";
import AccountCreated from "./PageObject/AccountCreatedPage";
import PaymentPage from "./PageObject/PaymentPage";
import RegisterPage from "./PageObject/LoginAndRegisterPage";

describe(`Place Order`, () => {
  beforeEach(function () {
    cy.generateRegisterFixture();
    cy.readFile("cypress/fixtures/registerData.json").then((data) => {
      this.registerData = data;
    });
  });
  it(`Place Order: Register while Checkout`, function () {
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
    CartPage.getCheckoutBtn().click();
    CartPage.getModalCheckoutRegisterBtn().click();
    cy.registerUser(this.registerData);
    AccountCreated.getAccountCreatedTitle()
      .should("contain", `Account Created!`)
      .should(`be.visible`);
    AccountCreated.getContinueBtn().click();
    HomePage.getNavbarLinks().should(
      `contain`,
      `Logged in as ${this.registerData.userName}`
    );
    HomePage.getCartLink().click();
    CartPage.getCheckoutBtn().click();
    CheckoutPage.getFullName().contains(
      `${this.registerData.firstName} ${this.registerData.lastName}`
    );
    CheckoutPage.getCompany().contains(`${this.registerData.company}`);
    CheckoutPage.getFirstLineAddress().contains(
      `${this.registerData.addressFirstLine}`
    );
    CheckoutPage.getSecondLineAddress().contains(
      `${this.registerData.city} ${this.registerData.state} ${this.registerData.zipcode}`
    );
    CheckoutPage.getCommentInput()
      .clear()
      .type(
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque quas quisquam, officiis sapiente voluptatem aut suscipit a optio sed dolores repellat hic autem dicta quia neque quidem ex quo deserunt."
      );
    CheckoutPage.getPlaceOrderBtn().click();
    PaymentPage.getNameOnCard()
      .clear()
      .type(`${this.registerData.firstName} ${this.registerData.lastName}`);
    PaymentPage.getCardNumber().clear().type(`${this.registerData.cardNumber}`);
    PaymentPage.getCardCvc().clear().type(`${this.registerData.cvvCardNumber}`);
    PaymentPage.getExpirationMonth()
      .clear()
      .type(`${this.registerData.expirationMonth}`);
    PaymentPage.getExpirationYear()
      .clear()
      .type(`${this.registerData.expirationYear}`);
    PaymentPage.getPayBtn().click();
    PaymentPage.getSuccessMessage().contains(
      `Congratulations! Your order has been confirmed!`
    );
    PaymentPage.getContinueBtn().click();
    cy.verifyTitle("Automation Exercise");
  });
  it(`Place Order: Register before Checkout`, function () {
    cy.visit(`/login`);
    cy.verifyTitle("Automation Exercise - Signup / Login");
    RegisterPage.getRegisterForm()
      .should(`contain`, `New User Signup!`)
      .should(`be.visible`);
    cy.registerUser(this.registerData);
    AccountCreated.getAccountCreatedTitle()
      .should("contain", `Account Created!`)
      .should(`be.visible`);
    AccountCreated.getContinueBtn().click();
    HomePage.getNavbarLinks().should(
      `contain`,
      `Logged in as ${this.registerData.userName}`
    );
    HomePage.getProductsLink().click();
    cy.verifyTitle("Automation Exercise - All Products");
    ProductsPage.getProductsList()
      .first()
      .then(() => {
        ProductsPage.getAddToCartBtn().first().click();
      });
    ProductsPage.getModalViewCartBtn().click();
    cy.verifyTitle("Automation Exercise - Checkout");
    CartPage.getCheckoutBtn().click();
    CheckoutPage.getFullName().contains(
      `${this.registerData.firstName} ${this.registerData.lastName}`
    );
    CheckoutPage.getCompany().contains(`${this.registerData.company}`);
    CheckoutPage.getFirstLineAddress().contains(
      `${this.registerData.addressFirstLine}`
    );
    CheckoutPage.getSecondLineAddress().contains(
      `${this.registerData.city} ${this.registerData.state} ${this.registerData.zipcode}`
    );
    CheckoutPage.getCommentInput()
      .clear()
      .type(
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque quas quisquam, officiis sapiente voluptatem aut suscipit a optio sed dolores repellat hic autem dicta quia neque quidem ex quo deserunt."
      );
    CheckoutPage.getPlaceOrderBtn().click();
    PaymentPage.getNameOnCard()
      .clear()
      .type(`${this.registerData.firstName} ${this.registerData.lastName}`);
    PaymentPage.getCardNumber().clear().type(`${this.registerData.cardNumber}`);
    PaymentPage.getCardCvc().clear().type(`${this.registerData.cvvCardNumber}`);
    PaymentPage.getExpirationMonth()
      .clear()
      .type(`${this.registerData.expirationMonth}`);
    PaymentPage.getExpirationYear()
      .clear()
      .type(`${this.registerData.expirationYear}`);
    PaymentPage.getPayBtn().click();
    PaymentPage.getSuccessMessage().contains(
      `Congratulations! Your order has been confirmed!`
    );
    PaymentPage.getContinueBtn().click();
    cy.verifyTitle("Automation Exercise");
  });
});

//seperate "describe" to use a different beforeEach hook or not to use any. Alternative solution is to use Cypress.currentTest.title and switch in beforeEach hook
describe(`Place Order: Login before Checkout`, () => {
  before(function () {
    cy.readFile("cypress/fixtures/correctLoginData.json").then((data) => {
      this.loginData = data;
    });
    cy.visit(`/login`);
    cy.verifyTitle("Automation Exercise - Signup / Login");
    RegisterPage.getLoginForm()
      .should(`contain`, `Login to your account`)
      .should(`be.visible`);
  });
  it(`Place Order: Login before Checkout`, function () {
    cy.login(this.loginData.email, this.loginData.password);
    HomePage.getNavbarLinks().should(
      `contain`,
      `Logged in as ${this.loginData.username}`
    );

    HomePage.getProductsLink().click();
    cy.verifyTitle("Automation Exercise - All Products");
    ProductsPage.getProductsList()
      .first()
      .then(() => {
        ProductsPage.getAddToCartBtn().first().click();
      });
    ProductsPage.getModalViewCartBtn().click();
    cy.verifyTitle("Automation Exercise - Checkout");
    CartPage.getCheckoutBtn().click();
    CheckoutPage.getFullName().contains(
      `${this.loginData.firstName} ${this.loginData.lastName}`
    );
    CheckoutPage.getCompany().contains(`${this.loginData.company}`);
    CheckoutPage.getFirstLineAddress().contains(
      `${this.loginData.addressFirstLine}`
    );
    CheckoutPage.getSecondLineAddress().contains(
      `${this.loginData.city} ${this.loginData.state} ${this.loginData.zipcode}`
    );
    CheckoutPage.getCommentInput()
      .clear()
      .type(
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque quas quisquam, officiis sapiente voluptatem aut suscipit a optio sed dolores repellat hic autem dicta quia neque quidem ex quo deserunt."
      );
    CheckoutPage.getPlaceOrderBtn().click();
    PaymentPage.getNameOnCard()
      .clear()
      .type(`${this.loginData.firstName} ${this.loginData.lastName}`);
    PaymentPage.getCardNumber().clear().type(`${this.loginData.cardNumber}`);
    PaymentPage.getCardCvc().clear().type(`${this.loginData.cvvCardNumber}`);
    PaymentPage.getExpirationMonth()
      .clear()
      .type(`${this.loginData.expirationMonth}`);
    PaymentPage.getExpirationYear()
      .clear()
      .type(`${this.loginData.expirationYear}`);
    PaymentPage.getPayBtn().click();
    PaymentPage.getSuccessMessage().contains(
      `Congratulations! Your order has been confirmed!`
    );
    PaymentPage.getContinueBtn().click();
    cy.verifyTitle("Automation Exercise");
  });
});
