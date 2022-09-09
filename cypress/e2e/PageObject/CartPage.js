class CartPage {
  getCartTable() {
    return cy.get(`#cart_info_table`);
  }
  getCheckoutBtn() {
    return cy.get(`.check_out`);
  }
  getModalCheckoutRegisterBtn() {
    return cy.get(`.modal-content a[href="/login"]`);
  }
  getEmptyCartMsg() {
    return cy.get(`#empty_cart`);
  }
}

export default new CartPage();
