class AccountInfoPage {
  getGenderTitles() {
    return cy.get(`[name="title"]`);
  }

  getName() {
    return cy.get(`[data-qa="name"]`);
  }

  getEmail() {
    return cy.get(`[data-qa="email"]`);
  }

  getRegisterPasswordInput() {
    return cy.get(`#password`);
  }

  getDayOfBirth() {
    return cy.get(`#days`);
  }

  getMonthOfBirth() {
    return cy.get(`#months`);
  }

  getYearOfBirth() {
    return cy.get(`#years`);
  }

  getNewsletterCheckbox() {
    return cy.get(`#newsletter`);
  }

  getMailOffers() {
    return cy.get(`#optin`);
  }

  getFirstName() {
    return cy.get(`#first_name`);
  }

  getLastName() {
    return cy.get(`#last_name`);
  }

  getCompany() {
    return cy.get(`#company`);
  }

  getFirstLineAdress() {
    return cy.get(`#address1`);
  }

  getSecondLineAdress() {
    return cy.get(`#address2`);
  }

  getCountry() {
    return cy.get(`#country`);
  }

  getState() {
    return cy.get(`#state`);
  }

  getCity() {
    return cy.get(`#city`);
  }

  getZipcode() {
    return cy.get(`#zipcode`);
  }

  getMobileNumber() {
    return cy.get(`#mobile_number`);
  }

  getCreateAccountBtn() {
    return cy.get(`[data-qa="create-account"]`);
  }
}

export default new AccountInfoPage();
