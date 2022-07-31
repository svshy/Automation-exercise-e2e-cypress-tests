/// <reference types="cypress"/>

import HomePage from "./PageObject/HomePage";
import ContactPage from "./PageObject/ContactPage";

describe(`Contact Form`, () => {
  it(`Sending message from contact form`, () => {
    cy.visit("/");
    HomePage.getContactLink()
      .should(`contain`, `Contact us`)
      .should(`be.visible`)
      .click();
    cy.verifyTitle("Automation Exercise - Contact Us");
    ContactPage.getContactForm()
      .should(`contain`, `Get In Touch`)
      .should(`be.visible`);
    ContactPage.getNameInput().clear().type("firstname");
    ContactPage.getEmailInput().clear().type("test123@test.pl");
    ContactPage.getSubjectInput().clear().type("Test Subject");
    ContactPage.getMsgInput()
      .clear()
      .type(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptates nesciunt totam quas quidem, suscipit ea similique facilis expedita delectus, veniam fugit eveniet fugiat dolores. Quo vitae labore esse aliquid?"
      );
    ContactPage.getFileUpload().attachFile(`../fixtures/testFile.txt`);
    ContactPage.getFileUpload()
      .invoke("prop", "files")
      .then((element) => {
        cy.wrap(element[0].name).should("contain", "testFile.txt");
      });
    ContactPage.getSubmitBtn().click();
    ContactPage.getContactForm()
      .should(
        "contain",
        "Success! Your details have been submitted successfully."
      )
      .should("be.visible");
    ContactPage.getRedirectBtn().click();
    cy.verifyTitle("Automation Exercise");
  });
});
