class CheckoutPage {
  getFullName() {
    return cy.get(`#address_delivery .address_firstname`);
  }
  getCompany() {
    return cy.get(`#address_delivery .address_address1`);
  }
  getFirstLineAddress() {
    return cy.get(`#address_delivery .address_address1`);
  }
  getSecondLineAddress() {
    return cy.get(`#address_delivery .address_city`);
  }
  getCommentInput() {
    return cy.get(`[name="message"]`);
  }
  getPlaceOrderBtn() {
    return cy.get(`.container .check_out`);
  }
}

export default new CheckoutPage();
