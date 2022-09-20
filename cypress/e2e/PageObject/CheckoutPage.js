class CheckoutPage {
  getDeliveryFullName() {
    return cy.get(`#address_delivery .address_firstname`);
  }
  getDeliveryCompany() {
    return cy.get(`#address_delivery .address_address1`);
  }
  getDeliveryFirstLineAddress() {
    return cy.get(`#address_delivery .address_address1`);
  }
  getDeliverySecondLineAddress() {
    return cy.get(`#address_delivery .address_city`);
  }
  getCommentInput() {
    return cy.get(`[name="message"]`);
  }
  getPlaceOrderBtn() {
    return cy.get(`.container .check_out`);
  }
  getInvoiceFirstLineAddress() {
    return cy.get(`#address_invoice .address_address1`);
  }
  getInvoiceSecondLineAddress() {
    return cy.get(`#address_invoice .address_city`);
  }
}

export default new CheckoutPage();
