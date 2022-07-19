class LoginPage {
  getLoginForm() {
    return cy.get(`.login-form`);
  }

  getLoginInput() {
    return cy.get(`[data-qa="login-email"]`);
  }

  getPasswordInput() {
    return cy.get(`[data-qa="login-password"]`);
  }

  getLoginBtn() {
    return cy.get(`[data-qa="login-button"]`);
  }
}

export default new LoginPage();
