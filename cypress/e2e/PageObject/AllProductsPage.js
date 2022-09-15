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
  getProductName() {
    return cy.get(".productinfo p");
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
  getAddToCartBtn() {
    return cy.get(`.productinfo > a.add-to-cart`);
  }
  getContinueShoppingBtn() {
    return cy.get(".btn-success").contains("Continue Shopping");
  }
  getModalViewCartBtn() {
    return cy.get(`.modal-content a[href="/view_cart"]`);
  }
  getCategoryTitle() {
    return cy.get(`.features_items h2`);
  }
  getBrandsProducts() {
    return cy.get(`.brands_products`);
  }
  getMadameBrand() {
    return cy.get(`li a[href="/brand_products/Madame"]`);
  }
  getBabyHugBrand() {
    return cy.get(`li a[href="/brand_products/Babyhug"]`);
  }
}

export default new AllProductsPage();
