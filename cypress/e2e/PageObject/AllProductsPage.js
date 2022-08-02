class AllProductsPage {
  getProductsSection() {
    return cy.get(".features_items");
  }
  getProductsList() {
    return cy.get(".single-products");
  }
  getProductTitle
  getViewProductBtn() {
    return cy.get(".choose a");
  }
  getSearchInput() {
    return cy.get("#search_product");
  }
  getSubmitSearch() {
    return cy.get("#submit_search");
  }
}

export default new AllProductsPage();
