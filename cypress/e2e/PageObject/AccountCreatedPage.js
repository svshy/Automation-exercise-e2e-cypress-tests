class AccountCreatedPage {
  getAccountCreatedTitle() {
    return cy.get(`[data-qa="account-created"]`);
  }

  getContinueBtn() {
    return cy.get(`[data-qa="continue-button"]`);
  }
}

export default new AccountCreatedPage();
