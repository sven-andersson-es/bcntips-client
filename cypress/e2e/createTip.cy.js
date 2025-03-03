const username = Cypress.env("user").username
const password = Cypress.env("user").password
const firstName = Cypress.env("user").firstName

const userObject = {username,password,firstName}

describe("Create a new Tip", () => {
	it("passes", () => {
    cy.loginViaUi(userObject, { log: false });

		cy.visit("/#/");
    cy.get(".nav-bar__logo").should("be.visible")
		cy.visit("/#/tip/create");
    cy.get("#title").type("Test place")
  })
});
