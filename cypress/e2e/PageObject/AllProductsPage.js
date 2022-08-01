class AllProductsPage {
  getProductsSection() {
    return cy.get(".features_items");
  }
  getProductsList() {
    return cy.get(".product-image-wrapper");
  }
}

export default new AllProductsPage();
