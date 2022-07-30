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
}

export default new HomePage();
