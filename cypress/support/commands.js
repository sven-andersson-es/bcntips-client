// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginViaUi', (user) => {
  cy.session(
    user,
    () => {
      cy.visit('/#/login')
      cy.get('[data-cy="username"]').type(user.username)
      cy.get('[data-cy="password"]').type(user.password, { log: false })
      cy.get('[data-cy="login-button"]').click()
      cy.get('.modal__content').contains(`you have successfully logged in`)
    },
    {
      validate: () => {
        cy.getAllLocalStorage('authToken').should('exist')
      },
    }
  )
})