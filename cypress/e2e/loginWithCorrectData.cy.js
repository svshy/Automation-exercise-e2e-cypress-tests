/// <reference types="cypress"/>

describe(`Login user with correct email and password`, () => {
  //pobranie jsona z fixture z danymi do logowania
  beforeEach(function () {
    cy.fixture("correctLoginData").then((data) => {
      this.loginData = data;
    });
  });
  it(`user should log in`, function () {
    cy.visit(`/`);
    //sprawdzenie czy tytuł strony jest zgodny
    cy.title().should("eq", "Automation Exercise");
    cy.get(`a[href*="/login"]`).click();
    cy.get(`.login-form`)
      .should(`contain`, `Login to your account`)
      .should(`be.visible`);
    //wykorzystanie custom commands, funkcja logowania
    cy.login(this.loginData.email, this.loginData.password);
    cy.get(`ul.navbar-nav`).should(
      `contain`,
      `Logged in as ${this.loginData.username}`
    );
  });
});
