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
}

export default new CartPage();
