class HomePage {
  getNavbarLinks() {
    return cy.get(`ul.navbar-nav`);
  }
  getLogoutLink() {
    return cy.get('a[href="/logout"]');
  }

  getContactLink() {
    return cy.get('a[href="/contact_us"]');
  }

  getTestCasesLink() {
    return cy.get('li a[href="/test_cases"]');
  }

  getProductsLink() {
    return cy.get('a[href="/products"]');
  }
}

export default new HomePage();
