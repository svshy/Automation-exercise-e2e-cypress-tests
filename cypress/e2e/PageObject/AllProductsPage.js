class AllProductsPage {
  getProductsSection() {
    return cy.get(".features_items");
  }
  getProductsList() {
    return cy.get(".single-products");
  }
  getProductPrice() {
    return cy.get(".productinfo h2");
  }
  getViewProductBtn() {
    return cy.get(".choose a");
  }
  getSearchInput() {
    return cy.get("#search_product");
  }
  getSubmitSearch() {
    return cy.get("#submit_search");
  }
  getOverlayAddToCartBtn(productNumber) {
    return cy.get(`.overlay-content > a[data-product-id="${productNumber}"]`);
  }

  getContinueShoppingBtn() {
    return cy.get(".btn-success").contains("Continue Shopping");
  }
  getModalViewCartBtn() {
    return cy.get(`.modal-content a[href="/view_cart"]`);
  }
}

export default new AllProductsPage();
