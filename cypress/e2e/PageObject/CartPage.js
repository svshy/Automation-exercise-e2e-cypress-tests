class CartPage {
  getCartTable() {
    return cy.get(`#cart_info_table`);
  }
}

export default new CartPage();
