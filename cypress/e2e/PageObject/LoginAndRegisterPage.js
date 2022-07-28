class LoginAndRegisterPage {
  getLoginForm() {
    return cy.get(`.login-form`);
  }

  getLoginInput() {
    return cy.get(`[data-qa="login-email"]`);
  }

  getLoginPasswordInput() {
    return cy.get(`[data-qa="login-password"]`);
  }

  getLoginBtn() {
    return cy.get(`[data-qa="login-button"]`);
  }

  getRegisterForm() {
    return cy.get(`.signup-form`);
  }

  getRegisterName() {
    return cy.get(`[data-qa="signup-name"]`);
  }

  getRegisterEmail() {
    return cy.get(`[data-qa="signup-email"]`);
  }

  getRegisterBtn() {
    return cy.get(`[data-qa="signup-button"]`);
  }
}

export default new LoginAndRegisterPage();
