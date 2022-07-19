class HomePage {
  getNavbarLinks() {
    return cy.get(`ul.navbar-nav`);
  }
}

export default new HomePage();
