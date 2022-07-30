class ContactPage {
  getContactForm() {
    return cy.get(`div .contact-form`);
  }

  getNameInput() {
    return cy.get(`[data-qa="name"]`);
  }

  getEmailInput() {
    return cy.get(`[data-qa="email"]`);
  }

  getSubjectInput() {
    return cy.get(`[data-qa="subject"]`);
  }

  getMsgInput() {
    return cy.get(`[data-qa="message"]`);
  }

  getFileUpload() {
    return cy.get(`[name="upload_file"]`);
  }

  getSubmitBtn() {
    return cy.get(`[data-qa="submit-button"]`);
  }

  getSubmitBtn() {
    return cy.get(`[data-qa="submit-button"]`);
  }

  getRedirectBtn() {
    return cy.get(`.btn-success`);
  }
}

export default new ContactPage();
