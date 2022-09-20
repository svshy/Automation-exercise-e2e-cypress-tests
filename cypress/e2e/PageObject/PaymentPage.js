class PaymentPage {
  getNameOnCard() {
    return cy.get(`[data-qa="name-on-card"]`);
  }
  getCardNumber() {
    return cy.get(`[data-qa="card-number"]`);
  }
  getCardCvc() {
    return cy.get(`[data-qa="cvc"]`);
  }
  getExpirationMonth() {
    return cy.get(`[data-qa="expiry-month"]`);
  }
  getExpirationYear() {
    return cy.get(`[data-qa="expiry-year"]`);
  }
  getPayBtn() {
    return cy.get(`[data-qa="pay-button"]`);
  }
  getSuccessMessage() {
    return cy.get(`h2[data-qa="order-placed"] + p`);
  }
  getContinueBtn() {
    return cy.get(`[data-qa="continue-button"]`);
  }
  getDownloadInvoiceBtn() {
    return cy.get(`a.check_out`);
  }
}

export default new PaymentPage();
