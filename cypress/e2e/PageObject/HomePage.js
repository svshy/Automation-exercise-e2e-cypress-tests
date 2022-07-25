class HomePage {
  getNavbarLinks() {
    return cy.get(`ul.navbar-nav`);
  }
  getLogoutLink(){
    return cy.get('a[href="/logout"]')
  }
}

export default new HomePage();
