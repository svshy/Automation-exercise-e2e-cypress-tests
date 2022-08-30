/// <reference types="cypress"/>

import CartPage from "./PageObject/CartPage";
import HomePage from "./PageObject/HomePage";
import ProductsPage from "./PageObject/AllProductsPage";
import CheckoutPage from "./PageObject/CheckoutPage";
import AccountInfo from "./PageObject/AccountInfoPage";
import AccountCreated from "./PageObject/AccountCreatedPage";
import PaymentPage from "./PageObject/PaymentPage";

describe(`Place Order`, () => {
  beforeEach(function () {
    cy.generateRegisterFixture();
    cy.fixture("registerData").then((data) => {
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
    cy.registerUser(this.registerData.userName, this.registerData.email);
    AccountInfo.getGenderTitles().then((element) => {
      cy.wrap(element).each((item) => {
        cy.wrap(item).check();
      });
    });
    //verify that username has been retrieved and is equal to the generated username in Faker.js
    AccountInfo.getName()
      .invoke("attr", "value")
      .should("eq", this.registerData.userName);
    //verify that email has been retrieved and is equal to the generated email in Faker.js
    AccountInfo.getEmail()
      .invoke("attr", "value")
      .should("eq", this.registerData.email);
    AccountInfo.getRegisterPasswordInput().type(this.registerData.password);
    AccountInfo.getDayOfBirth().select(this.registerData.dayOfBirth);
    AccountInfo.getMonthOfBirth().select(this.registerData.monthOfBirth);
    AccountInfo.getYearOfBirth().select(this.registerData.yearOfBirth);
    AccountInfo.getNewsletterCheckbox().check();
    AccountInfo.getMailOffers().check();
    AccountInfo.getFirstName().type(this.registerData.firstName);
    AccountInfo.getLastName().type(this.registerData.lastName);
    AccountInfo.getCompany().type(this.registerData.company);
    AccountInfo.getFirstLineAdress().type(this.registerData.addressFirstLine);
    AccountInfo.getSecondLineAdress().type(this.registerData.addressSecondLine);
    //check all countries
    AccountInfo.getCountry().then((select) => {
      cy.wrap(select)
        .find(`option`)
        .each((opcja) => {
          cy.wrap(select).select(opcja.text());
        });
    });
    AccountInfo.getState().type(this.registerData.state);
    AccountInfo.getCity().type(this.registerData.city);
    AccountInfo.getZipcode().type(this.registerData.zipcode);
    AccountInfo.getMobileNumber().type(this.registerData.phoneNumber);
    AccountInfo.getCreateAccountBtn().click();
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
  });
});
